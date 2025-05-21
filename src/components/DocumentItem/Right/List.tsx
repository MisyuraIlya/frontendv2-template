import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Skeleton,
} from '@mui/material'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { useModals } from '../../../provider/ModalProvider'
import hooks from '../../../hooks'
import { useDocumentStore } from '../../../store/document.store'
import useDirection from '../../../hooks/useDirection'
import { useTranslation } from 'react-i18next'
import logo from '../../../assets/images/logo.png'

const List = () => {
  const { t } = useTranslation()
  const { selectProduct } = useModals()
  const { searchProducts } = useDocumentStore()
  const { data, isLoading } = hooks.useDataDocumentsItem()
  const direction = useDirection()

  const filteredProducts = data?.products?.filter(
    (element) =>
      element?.title?.toLowerCase().includes(searchProducts.toLowerCase()) ||
      element?.sku?.toLowerCase().includes(searchProducts.toLowerCase())
  )

  return (
    <Box sx={{ marginTop: '30px' }}>
      {isLoading &&
        Array.from({ length: 24 }).map((_, index) => (
          <Skeleton
            variant="rounded"
            key={index}
            height={70}
            sx={{ margin: '5px 20px' }}
          />
        ))}
      <TableContainer component={Paper} elevation={0} sx={{ height: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Product image column – no translation needed */}
              <TableCell>{t('DocumentItem.product')}</TableCell>
              {/* You can use this empty cell for additional details if needed */}
              <TableCell sx={{ minWidth: '150px' }}></TableCell>
              <TableCell>{t('DocumentItem.quantity')}</TableCell>
              <TableCell>{t('DocumentItem.unitPrice')}</TableCell>
              <TableCell>{t('DocumentItem.discount')}</TableCell>
              <TableCell>{t('DocumentItem.total')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts?.map((element) => (
              <TableRow
                key={element.id}
                onClick={() => selectProduct(element?.product)}
              >
                <TableCell>
                  <img
                    style={{ height: '70px' }}
                    src={
                      element?.product?.defaultImagePath
                        ? import.meta.env.VITE_MEDIA +
                          '/product/' +
                          element?.product?.defaultImagePath
                        : logo
                    }
                    alt={t('DocumentItem.product')}
                  />
                </TableCell>
                <TableCell>
                  <Typography>{'#' + element?.sku}</Typography>
                  <Typography>
                    {direction === 'rtl'
                      ? element?.title
                      : element?.product?.titleEnglish}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element?.quantity}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>₪{element?.priceByOne}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element?.discount?.toFixed(1) + '%'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700}>
                    ₪{numberWithCommas(element?.total?.toFixed(1))}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        {filteredProducts?.length === 0 && !isLoading && (
          <Typography variant="h6">{t('DocumentItem.noItemsFound')}</Typography>
        )}
      </Box>
    </Box>
  )
}

export default List
