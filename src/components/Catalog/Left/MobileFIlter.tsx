import React, { useState, useEffect, useCallback } from 'react'
import Utils from '../../../utils'
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ToggleButton,
  ToggleButtonGroup,
  Checkbox,
  Button,
} from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'
import GridViewIcon from '@mui/icons-material/GridView'
import TocIcon from '@mui/icons-material/Toc'
import useDataCatalog from '../../../hooks/useDataCatalog'
import hooks from '../../../hooks'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { useCatalog } from '../../../store/catalog.store'

interface IAttributeMain {
  id: number
  title: string
  SubAttributes?: { id: number; title: string }[]
}

const MobileFilterWithAttributes: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openOrden, setOpenOrden] = useState(false)
  const [openProd, setOpenProd] = useState(false)
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({})
  const [searchDebounce] = useDebounce(search, 1000)

  const { data } = useDataCatalog()
  const [searchParams, setSearchParams] = useSearchParams()
  const [localSelectedValues, setLocalSelectedValues] = useState<
    Record<number, string[]>
  >({})
  const [filters, setFilters] = useState<IAttributeMain[]>([])

  const location = useLocation()
  const navigate = useNavigate()
  const { mutate } = hooks.useDataCatalog()

  const {
    listView,
    setListView,
    prodsPerPage,
    setProdsPerPage,
    sortProdSetting,
    setSortProdSetting,
    sortArr,
    prodsPerPageArr,
  } = useCatalog()

  const handleSearchValue = useCallback(
    (value: string) => {
      const params = new URLSearchParams(location.search)
      params.set('page', '1')
      if (value) params.set('search', value)
      else params.delete('search')

      navigate(location.pathname + '?' + params.toString())
      mutate()
      setOpenDrawer(false)
    },
    [location.pathname, location.search, navigate, mutate]
  )

  const handleChangeItemsPerPage = useCallback(
    (value: string) => {
      const params = new URLSearchParams(location.search)
      params.set('itemsPerPage', value)
      params.set('page', '1')

      setProdsPerPage(value)
      navigate(location.pathname + '?' + params.toString())
      mutate()
      setOpenDrawer(false)
    },
    [location.pathname, location.search, navigate, mutate, setProdsPerPage]
  )

  const handleOrderBy = useCallback(
    (value: string) => {
      const found = sortArr?.find((x) => x.label === value)
      if (found) setSortProdSetting(found)

      let orderKey = value
      if (value === 'שם') orderKey = 'title'
      else if (value === 'מומלץ') orderKey = 'isSpecial'
      else if (value === 'חדש') orderKey = 'isNew'

      const params = new URLSearchParams(location.search)
      params.set('orderBy', orderKey)

      navigate(location.pathname + '?' + params.toString())
      mutate()
      setOpenDrawer(false)
    },
    [
      location.pathname,
      location.search,
      navigate,
      mutate,
      sortArr,
      setSortProdSetting,
    ]
  )

  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment) setListView(newAlignment as any)
  }

  const handleChange = (id: number, value: string) => {
    setLocalSelectedValues((prev) => {
      const existing = prev[id] || []
      const next = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value]

      const params = new URLSearchParams(searchParams.toString())
      params.delete(`filter[${id}]`)
      next.forEach((v) => params.append(`filter[${id}]`, v))
      setSearchParams(params)

      return { ...prev, [id]: next }
    })
  }

  const toggleFilter = (id: string) => {
    setOpenFilters((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    if (data?.filters) {
      setFilters((prev) => {
        const newFs = data.filters
        const preserved: Record<number, string[]> = {}
        prev.forEach((f) => {
          if (newFs.some((nf) => nf.id === f.id)) {
            preserved[f.id] = localSelectedValues[f.id] || []
          }
        })
        setLocalSelectedValues((pv) => ({ ...pv, ...preserved }))
        return newFs
      })
    }
  }, [data, localSelectedValues])

  useEffect(() => {
    const initVals: Record<number, string[]> = {}
    filters.forEach((f) => {
      const vals = searchParams.getAll(`filter[${f.id}]`)
      if (vals.length) initVals[f.id] = vals
    })
    setLocalSelectedValues(initVals)
  }, [filters, searchParams])

  useEffect(() => {
    handleSearchValue(searchDebounce)
  }, [searchDebounce])

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <Utils.SearchInput
            value={search}
            setValue={setSearch}
            placeholder="חפש מוצר..."
            sx={{
              '& .muirtl-152mnda-MuiInputBase-input-MuiOutlinedInput-input': {
                padding: '12px',
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Button
            onClick={() => setOpenDrawer(true)}
            variant="contained"
            sx={{ p: 0, m: 0, minWidth: 40, height: '90%' }}
          >
            <FilterAltIcon />
          </Button>
        </Grid>
        <Grid
          size={{ xs: 4 }}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <ToggleButtonGroup
            value={listView}
            exclusive
            onChange={handleAlignment}
            aria-label="view toggle"
          >
            <ToggleButton value="grid">
              <GridViewIcon
                sx={{ color: listView === 'grid' ? 'white' : 'black' }}
              />
            </ToggleButton>
            <ToggleButton value="list">
              <TocIcon
                sx={{ color: listView === 'list' ? 'white' : 'black' }}
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>

      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box sx={{ height: '100vh', width: '100%' }}>
          <List
            component="nav"
            subheader={
              <ListSubheader
                sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}
              >
                <Box>סננים</Box>
                <IconButton onClick={() => setOpenDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              </ListSubheader>
            }
          >
            <Divider />

            <ListItemButton onClick={() => setOpenOrden((o) => !o)}>
              <ListItemText
                primary="מיון:"
                secondary={sortProdSetting.value}
                sx={{
                  textAlign: 'center',
                  '& .MuiListItemText-secondary': { fontSize: 16 },
                }}
              />
              {openOrden ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openOrden} timeout="auto" unmountOnExit>
              <List disablePadding>
                {sortArr?.map((item, i) => (
                  <ListItemButton
                    key={i}
                    sx={{ pl: 4 }}
                    onClick={() => handleOrderBy(item.value)}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            <ListItemButton onClick={() => setOpenProd((o) => !o)}>
              <ListItemText
                primary="מוצרים:"
                secondary={prodsPerPage}
                sx={{
                  textAlign: 'center',
                  '& .MuiListItemText-secondary': { fontSize: 16 },
                }}
              />
              {openProd ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProd} timeout="auto" unmountOnExit>
              <List disablePadding>
                {prodsPerPageArr?.map((item, i) => (
                  <ListItemButton
                    key={i}
                    sx={{ pl: 4 }}
                    onClick={() => handleChangeItemsPerPage(item.value)}
                  >
                    <ListItemText primary={`כמות: ${item.value}`} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            {filters.map((filter) => (
              <React.Fragment key={filter.id}>
                <ListItemButton
                  onClick={() => toggleFilter(filter.id.toString())}
                >
                  <ListItemText
                    primary={filter.title}
                    secondary={
                      (localSelectedValues[filter.id]?.length || 0) > 0
                        ? `${localSelectedValues[filter.id].length} נבחרו`
                        : 'לא נבחר'
                    }
                  />
                  {openFilters[filter.id] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openFilters[filter.id]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List disablePadding>
                    {filter.SubAttributes?.map((sub) => (
                      <ListItem key={sub.id} sx={{ pl: 4 }}>
                        <Checkbox
                          checked={localSelectedValues[filter.id]?.includes(
                            sub.id.toString()
                          )}
                          onChange={() =>
                            handleChange(filter.id, sub.id.toString())
                          }
                        />
                        <ListItemText primary={sub.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default MobileFilterWithAttributes
