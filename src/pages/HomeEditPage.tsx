import { Box, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'
import BreadCrumbsUtil from '../utils/BreadCrumbsUtil'
import Admin from '../components/Admin'

const HomeEditPage = () => {
  const { t } = useTranslation()
  return (
    <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
      <BreadCrumbsUtil
        array={[
          {
            title: t('homeEditPage.title'),
            link: '',
          },
        ]}
      />
      <Admin.HomeEdit.Options />
      <Box sx={{ paddingTop: '16px' }}>
        <Admin.HomeEdit.List />
      </Box>
    </Container>
  )
}

export default HomeEditPage
