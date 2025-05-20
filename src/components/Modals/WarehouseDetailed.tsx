import React, { FC, useState } from 'react'
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
  Tabs,
  Tab,
} from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import { ExcelGeneratorWarehouseDetailed } from '../../helpers/ExcelGenerator'
import { useMobile } from '../../provider/MobileProvider'
import hooks from '../../hooks'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/images/logo.png'

type TablePopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const WarehouseDetailed: FC<TablePopUpProps> = ({ active, setActive }) => {
  const { selectedProd } = useSelectedProduct()

  const { data, isLoading } = hooks.useDataWarehouseDetailed(selectedProd.id)
  const { data: purchaseDeliveryData, isLoading: loadPurchase } =
    hooks.useDataPurchaseDelivery(selectedProd.id)
  const { isMobile } = useMobile()

  const { t } = useTranslation()

  const [currentTab, setCurrentTab] = useState(0)
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

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
              style={{ width: '90px', height: '90px', objectFit: 'contain' }}
              alt="product"
            />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800}>
              {t('purchaseOrders.description')}
            </Typography>
            <Typography variant="h6">{selectedProd?.title}</Typography>
            <Typography variant="h6">
              {t('catalog.productCard.sku')} {selectedProd?.sku}
            </Typography>
          </Box>
        </Box>
      }
    >
      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label={t('productCardTabs.warehouse')} />
          <Tab label={t('productCardTabs.purchaseHistory')} />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      {/* 1) WAREHOUSE DETAILED DATA */}
      {currentTab === 0 && (
        <Box sx={{ mt: 2 }}>
          {data && (
            <Button
              sx={{ height: '40px', margin: '10px 0' }}
              variant="outlined"
              startIcon={<ArticleIcon sx={{ fontSize: '30px' }} />}
              onClick={() => ExcelGeneratorWarehouseDetailed(data)}
            >
              XL
            </Button>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('warehouse.warehouseCode')}</TableCell>
                  <TableCell sx={{ minWidth: '150px' }}>
                    {t('warehouse.warehouseName')}
                  </TableCell>
                  <TableCell>{t('warehouse.city')}</TableCell>
                  <TableCell>{t('warehouse.address')}</TableCell>
                  <TableCell>{t('warehouse.stock')}</TableCell>
                  <TableCell>{t('warehouse.commited')}</TableCell>
                  <TableCell>{t('warehouse.ordered')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading &&
                  data?.map((element, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography>{element?.warehouseCode ?? '-'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {element?.warehouseTilte ?? '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.city ?? '-'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.address ?? '-'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.stock ?? '-'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.committed ?? '-'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.ordered ?? '-'}</Typography>
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
                src={`${import.meta.env.VITE_MEDIA}/empyDocument.svg`}
                alt="no data"
              />
            </Box>
          )}
        </Box>
      )}

      {/* 2) PURCHASE & DELIVERY DATA */}
      {currentTab === 1 && (
        <Box sx={{ mt: 2 }}>
          {purchaseDeliveryData && (
            <Button
              sx={{ height: '40px', margin: '10px 0' }}
              variant="outlined"
              startIcon={<ArticleIcon sx={{ fontSize: '30px' }} />}
              // onClick={() => ExcelGeneratorIHistoryPurchse(purchaseDeliveryData)}
            >
              XL
            </Button>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('purchaseOrders.document')}</TableCell>
                  <TableCell>{t('purchaseOrders.quantity')}</TableCell>
                  <TableCell>{t('purchaseOrders.date')}</TableCell>
                  <TableCell>{t('purchaseOrders.warehouse')}</TableCell>
                  <TableCell>{t('purchaseOrders.status')}</TableCell>
                  <TableCell>{t('purchaseOrders.address')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loadPurchase &&
                  purchaseDeliveryData?.lines?.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Typography>{item.docNumber}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{item.quantity}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {moment(item.ShipDate).format('DD/MM/YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{item.warehouse}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{item.status}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{item.address}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {loadPurchase && (
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
          {purchaseDeliveryData?.lines?.length === 0 && !loadPurchase && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '50px',
              }}
            >
              <img
                src={`${import.meta.env.VITE_MEDIA}/empyDocument.svg`}
                alt="no data"
              />
            </Box>
          )}
        </Box>
      )}
    </ModalWrapper>
  )
}

export default WarehouseDetailed
