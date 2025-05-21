import { Checkbox, IconButton, TableCell, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { themeColors } from '../../../styles/mui'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import useAdminAttributeDetailed from '../../../hooks/admin/useAdminAttributeDetailed'

interface CardProps {
  element: ISubAttributes
}

const Card: FC<CardProps> = ({ element }) => {
  const [isPublished, setIsPublished] = useState(element?.isPublished)
  const { handleUpdate } = useAdminAttributeDetailed()

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
        <Typography variant="subtitle2">{element?.title}</Typography>
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
