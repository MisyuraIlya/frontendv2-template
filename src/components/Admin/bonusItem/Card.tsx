import { FC, useState } from 'react'
import {
  CardMedia,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import logo from '../../../assets/images/logo.png'

interface CardProps {
  element: IBonusDetaildes
}
const Card: FC<CardProps> = ({ element }) => {
  const [loading, setLoading] = useState(true)

  const handleImageLoad = () => {
    setLoading(false)
  }

  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">{element?.product?.sku}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">{element?.product?.title}</Typography>
        </TableCell>
        <TableCell>
          <CardMedia
            component="img"
            height={!loading ? 150 : 0}
            sx={{
              display: loading ? 'hidden' : 'block',
              cursor: 'pointer',
            }}
            image={
              element.product?.defaultImagePath
                ? `${import.meta.env.VITE_MEDIA}/product/${element?.product?.defaultImagePath}`
                : `${logo}`
            }
            alt={element.product.title}
            onLoad={handleImageLoad}
          />
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">
            {element?.minimumQuantity}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">
            {element?.bonusProduct?.sku}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">
            {element?.bonusProduct?.title}
          </Typography>
        </TableCell>
        <TableCell>
          <CardMedia
            component="img"
            height={!loading ? 150 : 0}
            sx={{
              display: loading ? 'hidden' : 'block',
              cursor: 'pointer',
            }}
            image={
              element.bonusProduct?.defaultImagePath
                ? `${import.meta.env.VITE_MEDIA}/product/${element?.bonusProduct?.defaultImagePath}`
                : `${logo}`
            }
            alt={element.bonusProduct.title}
            onLoad={handleImageLoad}
          />
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">{element?.bonusQuantity}</Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default Card
