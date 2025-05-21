import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useState } from 'react'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { themeColors } from '../../../styles/mui'
import { useNavigate, useParams } from 'react-router-dom'
import { useCatalog } from '../../../store/catalog.store'
import useDirection from '../../../hooks/useDirection'
import { useCart } from '../../../store/cart.store'

const Card = ({
  element,
  pl,
  color,
}: {
  element: ICategory
  pl: number
  color: string
}) => {
  const [open, setOpen] = useState(false)
  const { selectedMode } = useCart()
  const { lvl1, lvl2, lvl3, documentType } = useParams()
  const navigate = useNavigate()
  const { setMobileCategoryDrawver, mobileCategoryDrawver } = useCatalog()
  const dir = useDirection()

  const handleClick = (category: ICategory) => {
    setOpen(!open)
    if (category.lvlNumber === 1) {
      navigate(
        `/client/${documentType}/${selectedMode?.value}/${category?.id}/0/0?page=1`
      )
    }
    if (category.lvlNumber === 2) {
      navigate(
        `/client/${documentType}/${selectedMode?.value}/${lvl1}/${category.id}/0?page=1`
      )
    }
    if (category.lvlNumber === 3) {
      navigate(
        `/client/${documentType}/${selectedMode?.value}/${lvl1}/${lvl2}/${category?.id}?page=1`
      )
    }
    setMobileCategoryDrawver(!mobileCategoryDrawver)
  }

  const isExistCategory = () => {
    if (
      element?.id.toString() == lvl1 ||
      element?.id.toString() == lvl2 ||
      element?.id.toString() == lvl3
    ) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <ListItemButton sx={{ pl: pl }} onClick={() => handleClick(element)}>
        <ListItemText
          primary={dir === 'rtl' ? element?.title : element?.englishTitle}
          sx={{ color: isExistCategory() ? themeColors.primary : color }}
        />
        {element && element.categories && element.categories.length > 0 && (
          <>{open ? <ExpandLess /> : <ExpandMore />}</>
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: pl }}>
          {element?.categories?.map((lvl2) => (
            <Box key={lvl2.id}>
              <Card element={lvl2} pl={4} color={themeColors.asphalt} />
            </Box>
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default Card
