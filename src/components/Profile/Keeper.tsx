import { Box, Button, CircularProgress, Tooltip } from '@mui/material'
import { useState } from 'react'
import useDataSalesKeeper from '../../hooks/agent/useDataSalesKeeper'
import { useAuth } from '../../store/auth.store'
import ErrorIcon from '@mui/icons-material/Error'
import SalesKeeper from '../Modals/Agent/SalesKeeper'
import { useTranslation } from 'react-i18next'

const Keeper = () => {
  const { user } = useAuth()
  const { data: sales } = useDataSalesKeeper(user?.id)
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  const handleClick = () => {
    setOpen(true)
  }

  const handleSales = () => {
    if (sales) {
      if (
        sales?.sumPreviousMonthCurrentYear > sales?.sumPreviousMonthPreviousYear
      ) {
        return (
          <Tooltip title={t('profile.salesIncrease', 'עלייה במחזור מחירות')}>
            <Button
              endIcon={<ErrorIcon color="success" />}
              onClick={handleClick}
              variant="outlined"
              color="success"
            >
              {t('profile.viewSales', 'צפייה במחזור')}
            </Button>
          </Tooltip>
        )
      } else if (
        sales?.sumPreviousMonthCurrentYear === 0 &&
        sales?.sumPreviousMonthPreviousYear === 0
      ) {
        return (
          <Tooltip
            title={t('profile.salesInactive', 'לקוח לא פעיל / מחזור 0 מחירות')}
          >
            <Button
              endIcon={<ErrorIcon color="info" />}
              onClick={handleClick}
              variant="outlined"
              color="info"
            >
              {t('profile.viewSales', 'צפייה במחזור')}
            </Button>
          </Tooltip>
        )
      } else {
        return (
          <Tooltip title={t('profile.salesDecrease', 'ירידה במחזור מחירות')}>
            <Button
              endIcon={<ErrorIcon color="error" />}
              onClick={handleClick}
              variant="outlined"
              color="error"
            >
              {t('profile.viewSales', 'צפייה במחזור')}
            </Button>
          </Tooltip>
        )
      }
    } else {
      return (
        <Box>
          <CircularProgress size="20px" color="info" />
        </Box>
      )
    }
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>{handleSales()}</Box>
      <SalesKeeper active={open} setActive={setOpen} user={user!} />
    </>
  )
}

export default Keeper
