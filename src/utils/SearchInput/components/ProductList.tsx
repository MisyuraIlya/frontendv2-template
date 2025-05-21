import { FC } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/auth.store'
import AddToCart from '../../../components/common/AddToCart'
import { useTranslation } from 'react-i18next'
import emptySearch from '../../../assets/images/emptySearch.svg'

interface ProductListProps {
  array: Array<IProduct>
  onClick: (product: IProduct) => void
  totalFound: number
  loading: boolean
  searchValue: string
  setSearchValue: (value: string) => void
}

const ProductList: FC<ProductListProps> = ({
  array,
  onClick,
  totalFound,
  loading,
  searchValue,
  setSearchValue,
}) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { t } = useTranslation()

  return (
    <Paper
      elevation={2}
      sx={{
        height: '300px',
        overflow: 'auto',
        position: 'absolute',
        padding: '40px 0px',
        width: '100%',
      }}
    >
      <Box sx={{ height: '80%', overflow: 'auto' }}>
        {!loading && array.length === 0 && (
          <Box style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80%'
          }} sx={{ height: '80%' }}>
            <img
              src={`${emptySearch}`}
              alt="Empty search"
            />
          </Box>
        )}

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '100px',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {array.map((element, index) => {
              if (index < 20) {
                return (
                  <ListItem key={element.id} sx={{ background: 'white' }}>
                    <ListItemButton
                      sx={{ display: 'flex', gap: '20px' }}
                      onClick={() => onClick(element)}
                    >
                      {!element?.defaultImagePath ? (
                        <img
                          src={import.meta.env.VITE_MEDIA + '/placeholder.jpg'}
                          alt={`placeholder`}
                          style={{ maxWidth: '50px', maxHeight: '50px' }}
                        />
                      ) : (
                        <img
                          src={
                            import.meta.env.VITE_MEDIA +
                            element?.defaultImagePath
                          }
                          alt={`Product: ${element.title}`}
                          style={{ maxWidth: '50px', maxHeight: '50px' }}
                        />
                      )}

                      <ListItemText
                        primary={element.title}
                        secondary={
                          user?.role === 'ROLE_USER' && (
                            <Typography variant="body2" color="text.secondary">
                              מחיר: ₪{element.finalPrice}
                            </Typography>
                          )
                        }
                      />
                      <Box onClick={(e) => e.stopPropagation()}>
                        <AddToCart item={element} />
                      </Box>
                    </ListItemButton>
                  </ListItem>
                )
              }
              return null
            })}
            <ListItem
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            ></ListItem>
          </List>
        )}
      </Box>

      <Box sx={{ height: '10%', marginTop: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => {
            navigate(`/client/catalog/0/0/0?page=1&search=${searchValue}`)
            setSearchValue('')
          }}
        >
          {`${t('header.goTo')} ( ${totalFound} ) ${t('header.results')}`}
        </Button>
      </Box>
    </Paper>
  )
}

export default ProductList
