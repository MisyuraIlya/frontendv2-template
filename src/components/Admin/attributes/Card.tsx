import {
  Button,
  Checkbox,
  IconButton,
  TableCell,
  Typography,
} from '@mui/material'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { themeColors } from '../../../styles/mui'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import useAdminAttributes from '../../../hooks/admin/useAdminAttributes'
import { URLS } from '../../../enums/urls'

interface CardProps {
  element: IAttributeMain
}

const Card: FC<CardProps> = ({ element }) => {
  const navigate = useNavigate()
  const [isInProductCard, setIsInProductCard] = useState(
    element?.isInProductCard
  )
  const [isInFilter, setIsInFilter] = useState(element?.isInFilter)
  const [isPublished, setIsPublished] = useState(element?.isPublished)
  const { handleUpdate } = useAdminAttributes()

  const handleisInProductCard = async () => {
    setIsInProductCard(!isInProductCard)
    handleUpdate({
      id: element.id.toString(),
      isInProductCard: !isInProductCard,
    })
  }

  const handleisInFilter = async () => {
    setIsInFilter(!isInFilter)
    handleUpdate({
      id: element.id.toString(),
      isInFilter: !isInFilter,
    })
  }

  const handleisPublished = async () => {
    setIsPublished(!isPublished)
    handleUpdate({
      id: element.id.toString(),
      isPublished: !isPublished,
    })
  }

  return (
    <>
      <TableCell>
        <Button
          onClick={() =>
            navigate(
              `${URLS.ADMIN_EDIT_ATTRIBUTE_DETAILED.LINK}/${element?.id}`
            )
          }
          variant="outlined"
        >
          כניסה
        </Button>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">
          {element?.extId ?? element?.id}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">{element?.title}</Typography>
      </TableCell>
      <TableCell>
        <Checkbox
          checked={isInProductCard}
          onChange={() => handleisInProductCard()}
          sx={{ color: themeColors.primary, cursor: 'pointer' }}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={isInFilter}
          onChange={() => handleisInFilter()}
          sx={{ color: themeColors.primary, cursor: 'pointer' }}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={isPublished}
          onChange={() => handleisPublished()}
          sx={{ color: themeColors.primary, cursor: 'pointer' }}
        />
      </TableCell>
      <TableCell>
        <IconButton>
          <DragIndicatorIcon sx={{ fontSize: '35px' }} />
        </IconButton>
      </TableCell>
    </>
  )
}

export default Card
