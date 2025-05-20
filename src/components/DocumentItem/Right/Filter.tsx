import React, { useState } from 'react'
import { useModals } from '../../../provider/ModalProvider'
import { useAuth } from '../../../store/auth.store'
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ArticleIcon from '@mui/icons-material/Article'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { ExcelGeneratorIDocuments } from '../../../helpers/ExcelGenerator'
import hooks from '../../../hooks'
import { useMobile } from '../../../provider/MobileProvider'
import Utils from '../../../utils'
import { useDocumentStore } from '../../../store/document.store'
import { onErrorAlert, onSuccessAlert } from '../../../utils/MySweetAlert'
import { useNavigate, useParams } from 'react-router-dom'
import { DocumentsService } from '../../../services/document.service'
import Loader from '../../../utils/Loader'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import OfflineHandler from './OfflineHandler'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../../store/cart.store'

const Filter = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { user, agent, isAdmin, isAgent, isSuperAgent } = useAuth()
  const { searchProducts, setSearchProducts } = useDocumentStore()
  const { isMobile } = useMobile()
  const { setCart } = useCart()
  const { handlePdfViwer } = useModals()
  const { data } = hooks.useDataDocumentsItem()
  const { documentItemType, id } = useParams()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleRestoreCart = async () => {
    // guard against missing params instead of using non-null assertions
    if (!documentItemType || !user?.id || !id) return

    try {
      setLoading(true)
      const res = await DocumentsService.RestoreCart(
        documentItemType,
        user.id,
        id
      )
      console.log('res', res)
      if (res) {
        setCart(res)
        navigate('/cart')
      }
      onSuccessAlert(
        t('DocumentItem.restoreSuccessTitle'),
        t('DocumentItem.restoreSuccessDesc')
      )
    } catch (error) {
      console.error('[RestoreCart ERROR]', error)
      onErrorAlert(
        t('DocumentItem.restoreErrorTitle'),
        t('DocumentItem.restoreErrorDesc')
      )
    } finally {
      setLoading(false)
    }
  }

  const handleApproveOrder = async () => {
    try {
      setLoading(true)
      if (agent?.id && id) {
        const response = await DocumentsService.ApproveOrder(+id, agent.id)
        if (response.status) {
          onSuccessAlert(t('DocumentItem.approveOrderSuccess'), '')
        } else {
          onErrorAlert(t('DocumentItem.approveOrderError'), '')
        }
      }
    } catch (e) {
      console.error('[ApproveOrder ERROR]', e)
    } finally {
      setLoading(false)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      {loading && <Loader />}
      <Box
        sx={{
          display: { sm: 'flex', xs: 'block' },
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '12px' : '0 20px',
          margin: isMobile ? '0 16px' : '0px',
        }}
      >
        {!isMobile && (
          <Typography variant="h5" fontWeight={600}>
            {t('DocumentItem.documentsProducts')}
          </Typography>
        )}

        <Box sx={{ display: isMobile ? 'block' : 'flex', gap: '10px' }}>
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {data && (
              <Button
                id="basic-button"
                sx={{ height: '40px' }}
                variant="outlined"
                startIcon={<ArticleIcon sx={{ fontSize: '30px' }} />}
                onClick={() => ExcelGeneratorIDocuments(data)}
              >
                {t('DocumentItem.generateExcel')}
              </Button>
            )}
            {data?.files && data?.files.length > 0 && (
              <Button
                sx={{ height: '40px' }}
                variant="outlined"
                startIcon={<ArticleIcon sx={{ fontSize: '30px' }} />}
                onClick={handleClick}
              >
                {t('DocumentItem.generatePdf')}
              </Button>
            )}
            {user?.role === 'ROLE_USER' && (
              <Button
                sx={{ height: '40px', whiteSpace: 'nowrap' }}
                variant="contained"
                startIcon={
                  <ShoppingCartCheckoutIcon sx={{ fontSize: '30px' }} />
                }
                onClick={handleRestoreCart}
              >
                {t('DocumentItem.restoreOrder')}
              </Button>
            )}
            {documentItemType === 'offline' && (
              <OfflineHandler setLoading={setLoading} />
            )}

            {(isAgent || isAdmin || isSuperAgent) &&
              data?.documentType === 'approve' && (
                <Button
                  sx={{ height: '40px', whiteSpace: 'nowrap' }}
                  variant="outlined"
                  startIcon={<DoneAllIcon sx={{ fontSize: '30px' }} />}
                  onClick={handleApproveOrder}
                >
                  {t('DocumentItem.approveOrder')}
                </Button>
              )}
          </Box>
          <Utils.SearchInput
            placeholder={t('DocumentItem.searchPlaceholder')}
            value={searchProducts}
            setValue={setSearchProducts}
            sx={{ margin: '10px 0', '& input': { padding: '0px 15px' } }}
          />
        </Box>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {data?.files &&
          data?.files?.map((file, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                handlePdfViwer(file.base64)
                setAnchorEl(null)
              }}
            >
              <ListItemIcon>
                <PictureAsPdfIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{file.name}</ListItemText>
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}

export default Filter
