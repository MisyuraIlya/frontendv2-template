import { FC } from 'react'
import { Box, Breadcrumbs, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { themeColors } from '../styles/mui'
import { useTranslation } from 'react-i18next'
import useDirection from '../hooks/useDirection'

interface BreadCrumbsArr {
  title: string
  link: string
}

interface BreadCrumbsProps {
  array: BreadCrumbsArr[]
}

const BreadCrumbsUtil: FC<BreadCrumbsProps> = ({ array }) => {
  const navigate = useNavigate()
  const dir = useDirection()
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
      }}
    >
      <Breadcrumbs sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
        <Typography
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
          color={themeColors.primary}
          fontSize="14px"
        >
          {t('breadcrumbs.home')}
        </Typography>
        {array?.map((element, index) => {
          if (element.title) {
            return (
              <Typography
                key={index}
                fontSize="14px"
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(element.link)}
                color={themeColors.primary}
              >
                {element.title}
              </Typography>
            )
          }
          return null
        })}
      </Breadcrumbs>
      <Button
        endIcon={dir === 'rtl' && <ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
        startIcon={dir === 'ltr' && <ArrowBackIcon />}
      >
        {t('breadcrumbs.goBack')}
      </Button>
    </Box>
  )
}

export default BreadCrumbsUtil
