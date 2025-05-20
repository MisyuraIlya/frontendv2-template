import React, { useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {
  Badge,
  Box,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { themeColors } from '../../../styles/mui'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'
import NotificationCard from './NotificationCard'
import hooks from '../../../hooks'
import { useMobile } from '../../../provider/MobileProvider'
import { useTranslation } from 'react-i18next'
import useDirection from '../../../hooks/useDirection'

const NotificationButton = () => {
  const [openDrawver, setOpenDrawver] = useState(false)
  const { data } = hooks.useDataNotificationUser()
  const { isMobile } = useMobile()
  const { t } = useTranslation()
  const dir = useDirection()
  return (
    <>
      <Badge badgeContent={data?.length ?? 0}>
        <IconButton
          onClick={() => setOpenDrawver(true)}
          sx={{
            height: '50px',
            width: '50px',
            border: isMobile ? 'none' : '1px solid #E0E0E0',
          }}
        >
          <Tooltip title={t('notification.notification')}>
            <NotificationsIcon />
          </Tooltip>
        </IconButton>
      </Badge>
      <Drawer
        anchor={dir === 'rtl' ? 'right' : 'right'}
        SlideProps={{
          direction: dir === 'rtl' ? 'right' : 'left',
        }}
        open={openDrawver}
        onClose={() => setOpenDrawver(false)}
      >
        <Box sx={{ width: '300px' }} className="centered">
          <Box sx={{ width: '90%' }}>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: themeColors.primary,
                marginTop: '20px',
              }}
            >
              {t('notification.notification')}
            </Typography>
            <Box sx={{ width: '100%' }}>
              {data?.map((item) => (
                <Box key={item.id}>
                  <NotificationCard element={item} />
                </Box>
              ))}
              <Box>
                {data?.length === 0 && (
                  <Box
                    className="centered"
                    sx={{ marginTop: '100px', gap: '10px' }}
                  >
                    <NotificationsOffIcon />
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: 'center',
                        color: themeColors.primary,
                      }}
                    >
                      {t('notification.noNotification')}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default NotificationButton
