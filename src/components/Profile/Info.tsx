import { useAuth } from '../../store/auth.store'
import { Paper, Typography, Grid, Button, Box, IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import BusinessIcon from '@mui/icons-material/Business'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useTranslation } from 'react-i18next'
import { themeColors } from '../../styles/mui'

const Info = () => {
  const { t } = useTranslation()
  const { user, logOut } = useAuth()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">
          {t('profile.personalArea', 'אזור אישי')}
        </Typography>
        <Button
          variant="outlined"
          color="error"
          sx={{ fontSize: '14px', height: '36px' }}
          onClick={() => logOut()}
          startIcon={<LogoutIcon sx={{ width: '16px' }} />}
        >
          {t('profile.logout', 'התנתק')}
        </Button>
      </Box>
      <Paper sx={{ padding: '24px 40px', marginTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid size={{ md: 2, sm: 12, xs: 12 }}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <PersonIcon sx={{ color: themeColors.asphalt }} />
              <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
                {t('profile.name', 'שם')}
              </Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ pt: '8px' }}>
              {user?.name ?? '-'}
            </Typography>
          </Grid>
          <Grid size={{ md: 2, sm: 12, xs: 12 }}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <EmailIcon sx={{ color: themeColors.asphalt }} />
              <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
                {t('profile.email', 'מייל')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <Typography variant="subtitle2" sx={{ pt: '8px' }}>
                {user?.email ?? '-'}
              </Typography>
              <IconButton onClick={() => copyToClipboard(user?.email || '')}>
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid size={{ md: 2, sm: 12, xs: 12 }}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <LocalPhoneIcon sx={{ color: themeColors.asphalt }} />
              <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
                {t('profile.phone', 'טלפון')}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Typography variant="subtitle2" sx={{ pt: '8px' }}>
                {user?.phone ? (
                  <Typography style={{ color: themeColors.asphalt }}>
                    {user.phone}
                  </Typography>
                ) : (
                  '-'
                )}
              </Typography>
              <a
                href={`https://wa.me/${user?.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: 'absolute', paddingRight: '100px' }}
              >
                <img
                  src="https://foodappeal-b2b.com/src/img/icons/whatsup.png"
                  alt="whatsup"
                />
              </a>
            </Box>
          </Grid>
          <Grid size={{ md: 2, sm: 12, xs: 12 }}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <HomeRepairServiceIcon sx={{ color: themeColors.asphalt }} />
              <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
                {t('profile.taxNumber', 'ח.פ/ע.מ')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <Typography variant="subtitle2" sx={{ pt: '8px' }}>
                {user?.hp ? (
                  <Typography style={{ color: themeColors.asphalt }}>
                    {user.hp}
                  </Typography>
                ) : (
                  '-'
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ md: 2, sm: 12, xs: 12 }}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <LocationCityIcon sx={{ color: themeColors.asphalt }} />
              <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
                {t('profile.city', 'עיר')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <Typography variant="subtitle2" sx={{ pt: '8px' }}>
                {user?.city ?? '-'}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ md: 2, sm: 12, xs: 12 }}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <BusinessIcon sx={{ color: themeColors.asphalt }} />
              <Typography variant="body1" sx={{ color: themeColors.asphalt }}>
                {t('profile.address', 'כתובת')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <Typography variant="subtitle2" sx={{ pt: '8px' }}>
                {user?.address ?? '-'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default Info
