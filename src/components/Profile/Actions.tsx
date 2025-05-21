import { useAuth } from '../../store/auth.store'
import { useCart } from '../../store/cart.store'
import { useNavigate } from 'react-router-dom'
import { Card, Grid, Typography } from '@mui/material'
import ListAltIcon from '@mui/icons-material/ListAlt'
import RestorePageIcon from '@mui/icons-material/RestorePage'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import { useTranslation } from 'react-i18next'

interface Action {
  title: string
  englishLabel: string
  mode: IDocumentType
  link: string
  img: any
  isAgentOnly: boolean
}

const Actions = () => {
  const { isAgent } = useAuth()
  const { setSelectedMode } = useCart()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const actions: Action[] = [
    {
      title: t('profile.orderLabel'),
      englishLabel: t('profile.orderLabel'),
      mode: 'order',
      link: '/CatalogView',
      img: <ListAltIcon sx={{ fontSize: '40px' }} />,
      isAgentOnly: false,
    },
    {
      title: t('profile.returnLabel'),
      englishLabel: t('profile.returnLabel'),
      mode: 'return',
      link: '/CatalogView',
      img: <RestorePageIcon sx={{ fontSize: '40px' }} color="info" />,
      isAgentOnly: true,
    },
    {
      title: t('profile.priceOfferLabel'),
      englishLabel: t('profile.priceOfferLabel'),
      mode: 'quote',
      link: '/CatalogView',
      img: <RequestQuoteIcon sx={{ fontSize: '40px' }} />,
      isAgentOnly: true,
    },
  ]

  return (
    <>
      <Typography variant="h4" sx={{ marginTop: '50px', marginBottom: '20px' }}>
        {t('profile.actions', 'פעולות')}
      </Typography>
      <Grid container sx={{ marginBottom: '50px' }}>
        {actions
          .filter((item) => !item.isAgentOnly || (item.isAgentOnly && isAgent))
          .map((item, key) => (
            <Grid
              key={key}
              size={{ sm: 4, xs: 12 }}
              onClick={() => {
                setSelectedMode({
                  value: item.mode,
                  label: item.title,
                  englishLabel: item.englishLabel,
                  isOnlyAgent: true,
                })
                navigate(item.link)
              }}
            >
              <Card
                elevation={2}
                sx={{
                  padding: '30px 50px',
                  gap: '20px',
                  cursor: 'pointer',
                  margin: '20px 10px',
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6">{item.title}</Typography>
                {item.img}
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  )
}

export default Actions
