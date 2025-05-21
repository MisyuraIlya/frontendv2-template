import NotificationCard from './Header/Left/NotificationCard'
import { Box, Typography } from '@mui/material'
import { themeColors } from '../styles/mui'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'
import useDataNotificationUser from '../hooks/useDataNotificationUser'

const NotificationContainer = () => {
  const { data } = useDataNotificationUser()

  return (
    <Box sx={{ width: '100%' }}>
      {data?.map((item) => (
        <Box key={item.id}>
          <NotificationCard element={item} />
        </Box>
      ))}
      <Box>
        {data?.length === 0 && (
          <Box  
            sx={{ 
              marginTop: '100px',
              gap: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <NotificationsOffIcon />
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: themeColors.primary,
              }}
            >
              אין הודעות
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default NotificationContainer
