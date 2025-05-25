import { FC } from 'react'
import ModalWrapper from './ModalWrapper'
import { useSelectedProduct } from '../../store/selecterdProduct.store'
import moment from 'moment'
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import hooks from '../../hooks'
import ArticleIcon from '@mui/icons-material/Article'
import { ExcelGeneratorIHistoryPurchse } from '../../helpers/ExcelGenerator'
import { useMobile } from '../../provider/MobileProvider'
import { useTranslation } from 'react-i18next'
import useDirection from '../../hooks/useDirection'
import logo from '../../assets/images/logo.png'
import empyDocument from '../../assets/images/empyDocument.svg'

type TablePopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const HistoryPurchse: FC<TablePopUpProps> = ({ active, setActive }) => {
  const { selectedProd } = useSelectedProduct()
  const { data, isLoading } = hooks.useDataPurchesHistory(selectedProd.id)
  const { isMobile } = useMobile()
  const { t } = useTranslation()
  const dir = useDirection()

  return (
    <ModalWrapper
      width={70}
      height={'80%'}
      active={active}
      setActive={setActive}
      component={
        <Box sx={{ display: isMobile ? 'block' : 'flex', gap: '20px' }}>
          <Box>
            <img
              src={
                selectedProd.defaultImagePath
                  ? `${import.meta.env.VITE_MEDIA}/product/${selectedProd.defaultImagePath}`
                  : `${logo}`
              }
              alt={selectedProd.titleEnglish || selectedProd.title || ''}
              style={{ width: '90px', height: '90px', objectFit: 'contain' }}
            />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800}>
              {t('purchaseHistory.description')}
            </Typography>
            <Typography variant="h6">
              {dir === 'rtl' ? selectedProd.title : selectedProd.titleEnglish}
            </Typography>
            <Typography variant="h6">
              {t('catalog.productCard.sku')} {selectedProd.sku}
            </Typography>
          </Box>
        </Box>
      }
    >
      <Box>
        {data && (
          <Button
            sx={{ height: '40px', margin: '10px 0' }}
            variant="outlined"
            startIcon={<ArticleIcon sx={{ fontSize: '30px' }} />}
            onClick={() => ExcelGeneratorIHistoryPurchse(data)}
          >
            XL
          </Button>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('purchaseHistory.document')}</TableCell>
                <TableCell sx={{ minWidth: '150px' }}>
                  {t('purchaseHistory.date')}
                </TableCell>
                <TableCell>{t('purchaseHistory.quatity')}</TableCell>
                <TableCell>{t('purchaseHistory.price')}</TableCell>
                <TableCell>{t('purchaseHistory.priceAfterTax')}</TableCell>
                <TableCell>{t('purchaseHistory.discount')}</TableCell>
                <TableCell>{t('purchaseHistory.totalInCount')}</TableCell>
                <TableCell>
                  {t('purchaseHistory.totalInCountAfterTax')}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {!isLoading &&
                data?.map((element, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography>{element.documentNumber}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {moment(element.date).format('DD-MM-YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{element.quantity}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{element.price}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{element.vatPrice}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{element.discount}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{element.totalPrice}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{element.vatTotal}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {data?.length === 0 && !isLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '50px',
            }}
          >
            <img
              src={empyDocument}
              alt={t('purchaseHistory.noRecords') || ''}
            />
          </Box>
        )}
      </Box>
    </ModalWrapper>
  )
}

export default HistoryPurchse
