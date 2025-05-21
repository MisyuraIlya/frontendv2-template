import { Container, Grid } from '@mui/material'
import BreadCrumbsUtil from '../utils/BreadCrumbsUtil'
import Admin from '../components/Admin'
import { useTranslation } from 'react-i18next'
const NotificationPage = () => {
  const { t } = useTranslation()
  return (
    <Container maxWidth="lg" sx={{ paddingTop: '30px' }}>
      <BreadCrumbsUtil
        array={[
          {
            title: t('breadCrumbs.notifications'),
            link: '/admin/notification',
          },
        ]}
      />
      <Grid container spacing={2}>
        <Grid size={{ xs: 8 }}>
          <Admin.Notification.List />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Admin.Notification.Edit />
        </Grid>
      </Grid>
    </Container>
  )
}

export default NotificationPage
