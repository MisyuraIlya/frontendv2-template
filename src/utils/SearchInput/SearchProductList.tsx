import React, { FC, useState } from 'react'
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import SearchInput from '.'
import { useDebounce } from 'use-debounce'
import hooks from '../../hooks'

interface SearchUserListProps {
  onClick: (product: IProduct) => void
}

const SearchProductList: FC<SearchUserListProps> = ({ onClick }) => {
  const [search, setSearch] = useState('')
  const [valueDebounced] = useDebounce(search, 1000)
  const [clickedProduct, setClikedProduct] = useState<IProduct | null>(null)

  const { data, isValidating } = hooks.useDataCatalog(valueDebounced)

  const handlSearch = (e: string) => {
    setSearch(e)
    setClikedProduct(null)
  }

  const handleClick = (user: IProduct) => {
    onClick(user)
    setSearch('')
    setClikedProduct(user)
  }

  return (
    <SearchInput
      value={clickedProduct ? clickedProduct.title : search}
      setValue={handlSearch}
      placeholder="חפש מוצר"
      ListComponent={
        <>
          {search && (
            <Paper
              elevation={2}
              sx={{
                height: '300px',
                overflow: 'auto',
                position: 'absolute',
                width: '100%',
                zIndex: 10,
              }}
            >
              <Box sx={{ height: '100%', overflow: 'auto' }}>
                {isValidating ? (
                  <Box
                    sx={{ display: 'flex', height: '300px' }}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <List>
                    {data?.data?.map((element) => {
                      return (
                        <ListItem
                          key={element.id}
                          sx={{ background: 'white' }}
                          onClick={() => handleClick(element)}
                        >
                          <ListItemButton sx={{ display: 'flex', gap: '20px' }}>
                            <ListItemText
                              primary={element.sku}
                              secondary={
                                <>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {element.title}
                                  </Typography>
                                </>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      )
                    })}
                  </List>
                )}
              </Box>
            </Paper>
          )}
        </>
      }
    />
  )
}

export default SearchProductList
