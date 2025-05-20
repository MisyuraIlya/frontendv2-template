import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import BreadCrumbsUtil from '../utils/BreadCrumbsUtil'
import hooks from '../hooks'
import { useCart } from '../store/cart.store'
import logo from '../assets/images/logo.png'

const CatalogView = () => {
  const { selectedMode } = useCart()
  const { t } = useTranslation()
  const { data } = hooks.useDataCategories()
  const { lvl1 } = useParams()
  const navigate = useNavigate()
  return (
    <Container maxWidth="lg" sx={{ marginBottom: '200px' }}>
      <BreadCrumbsUtil
        array={[{ title: t('catalogView.categories'), link: '' }]}
      />
      <Grid container spacing={2}>
        {data?.map((element: ICategory) => {
          if (element?.parent?.id == lvl1) {
            return (
              <Grid size={{ sm: 3, xs: 6 }} key={element.id}>
                <Card
                  elevation={0}
                  sx={{ cursor: 'pointer' }}
                  onClick={() =>
                    navigate(
                      `/client/catalog/${selectedMode?.value}/${element.id}/0/0?page=1`
                    )
                  }
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                    src={
                      element?.mediaObject?.contentUrl
                        ? `${import.meta.env.VITE_MEDIA}${element?.mediaObject?.contentUrl}`
                        : `${logo}`
                    }
                  />
                  <CardContent
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h5">{element?.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          }
        })}
      </Grid>
    </Container>
  )
}

export default CatalogView
