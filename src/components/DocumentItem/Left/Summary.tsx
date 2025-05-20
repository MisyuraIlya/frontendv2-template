import React from 'react'
import { Typography, List, ListItem, Box } from '@mui/material'
import { themeColors } from '../../../styles/mui'
import hooks from '../../../hooks'
import { useMobile } from '../../../provider/MobileProvider'
import { useTranslation } from 'react-i18next'

const Summary = () => {
  const { isMobile } = useMobile()
  const { data } = hooks.useDataDocumentsItem()
  const { t } = useTranslation()

  const totalTax = data?.totalTax ?? 0
  const totalPriceAfterTax = data?.totalPriceAfterTax ?? 0
  const totalAfterDiscount = data?.totalAfterDiscount ?? 0
  const totalPrecent = data?.totalPrecent ?? 0
  const itemsLength = data?.products.length ?? 0

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        margin: isMobile ? '20px 20px 100px 20px' : '0 20px 100px 0',
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: '0 40px',
        }}
      >
        <Typography
          sx={{ paddingLeft: '15px', textAlign: 'left' }}
          fontWeight={800}
          variant="h5"
        >
          {t('DocumentItem.summaryTitle')}
        </Typography>
        <List sx={{ paddingTop: '28px' }}>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color={themeColors.asphalt}>
              {t('DocumentItem.lineCount')}
            </Typography>
            <Typography color={themeColors.primary}>{itemsLength}</Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color={themeColors.asphalt}>
              {t('DocumentItem.total')}
            </Typography>
            <Typography color={themeColors.primary}>
              {totalPriceAfterTax?.toFixed(2) ?? '0'} ₪
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color={themeColors.asphalt}>
              {t('DocumentItem.generalDiscount')}
            </Typography>
            <Typography color={themeColors.primary}>
              {totalPrecent !== undefined ? totalPrecent + '%' : ''}
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color={themeColors.asphalt}>
              {t('DocumentItem.afterDiscount')}
            </Typography>
            <Typography color={themeColors.primary}>
              {totalAfterDiscount?.toFixed(2) ?? '0'} ₪
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color={themeColors.asphalt}>
              {t('DocumentItem.tax')}
            </Typography>
            <Typography color={themeColors.primary}>
              {totalTax?.toFixed(2) ?? '0'} ₪
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              color={themeColors.primary}
              variant="subtitle2"
              fontSize={16}
              fontWeight={600}
            >
              {t('DocumentItem.amountToPay')}
            </Typography>
            <Typography color={themeColors.primary}>
              {(totalPriceAfterTax + totalTax)?.toFixed(2) ?? '0'} ₪
            </Typography>
          </ListItem>

          {data?.document?.deliveryAt && (
            <ListItem
              sx={{
                mt: '10px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                color={themeColors.primary}
                variant="subtitle2"
                fontSize={16}
                fontWeight={600}
              >
                {t('DocumentItem.deliveryDate')}
              </Typography>
              <Typography color={themeColors.primary}>
                {data?.document?.deliveryAt}
              </Typography>
            </ListItem>
          )}

          {data?.document?.orderComment && (
            <ListItem>
              <Box>
                <Typography
                  color={themeColors.primary}
                  variant="subtitle2"
                  fontSize={16}
                  fontWeight={600}
                >
                  {t('DocumentItem.commentTitle')}
                </Typography>
                <Typography color={themeColors.asphalt}>
                  {data?.document?.orderComment}
                </Typography>
              </Box>
            </ListItem>
          )}
        </List>
      </Box>
    </Box>
  )
}

export default Summary
