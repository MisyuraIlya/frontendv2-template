import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import hooks from '../../hooks'
import { Box, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useDirection from '../../hooks/useDirection'
import { useCart } from '../../store/cart.store'
import logo from '../../assets/images/logo.png'


const AllCategories = () => {
  const { data } = hooks.useDataCategories()
  const dir = useDirection()
  const navigate = useNavigate()
  const { selectedMode } = useCart()

  if (!data) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '100px 0',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  const categories = data || []
  const baseURL = import.meta.env.VITE_MEDIA

  return (
    <Grid container spacing={2}>
      {categories.map((category) => {
        console.log(category)
        console.log(`${baseURL}${encodeURIComponent(category.mediaObject.contentUrl)}`)
        return (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={category.id}>
            <Card sx={{ overflow: 'hidden' }}>
              <CardMedia
                component="img"
                height="140"
                image={category?.mediaObject?.contentUrl ? `${baseURL}${category.mediaObject.contentUrl}` : logo}
                alt={dir === 'rtl' ? category.title : category.englishTitle}
                onClick={() =>
                  navigate(
                    `/client/catalog/${selectedMode?.value}/${category?.id}/0/0?page=1`
                  )
                }
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              />
              <CardContent>
                <Typography variant="h6" textAlign="center">
                  {dir === 'rtl' ? category.title : category.englishTitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default AllCategories
