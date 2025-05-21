import { FC, useState } from 'react'
import {
  Box,
  Button,
  Card as MuiCard,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import Modals from '../../Modals'
import { useAuth } from '../../../store/auth.store'
import DateRangeIcon from '@mui/icons-material/DateRange'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import { themeColors } from '../../../styles/mui'
import { onSuccessAlert } from '../../../utils/MySweetAlert'
import useDataAgentTargets from '../../../hooks/agent/useAgentDataTargets'
import { useTranslation } from 'react-i18next'

interface TargetItemProps {
  item: IAgentTaget
  index: number
}

const Card: FC<TargetItemProps> = ({ item, index }) => {
  const [open, setOpen] = useState(false)
  const [number, setNumber] = useState(item.targetValue)
  const { isSuperAgent } = useAuth()
  const { t } = useTranslation()
  const { createTarget, updateTarget } = useDataAgentTargets(item.year!)

  const completedType = (item: IAgentTaget) => {
    let answer = ''
    let bg = '#f7f9fc'
    if (!item.targetValue || !item.currentValue) {
      bg = '#f7f9fc'
      answer = t('agentDashBoard.cardTarget.targetStatus.waiting')
    } else {
      if (item.currentValue > item.targetValue) {
        bg = '#41dc934d'
        answer = t('agentDashBoard.cardTarget.targetStatus.achieved')
      } else {
        bg = '#d2335c33'
        answer = t('agentDashBoard.cardTarget.targetStatus.notAchieved')
      }
    }
    return (
      <Box
        sx={{
          backgroundColor: bg,
          color: themeColors.primary,
          padding: '5px 10px',
          borderRadius: '5px',
        }}
      >
        {answer}
      </Box>
    )
  }

  const handle = () => {
    if (item.id) {
      item.targetValue = number
      item.currentValue = 0
      updateTarget(item)
    } else {
      item.targetValue = number
      item.currentValue = 0
      createTarget(item)
    }
    onSuccessAlert(t('agentDashBoard.cardTarget.targetUpdatedSuccess'), '')
    setOpen(false)
  }

  return (
    <>
      <MuiCard
        key={index}
        sx={{
          margin: '20px',
          padding: '10px 20px',
          borderRadius: '5px',
          boxShadow: '0 2px 40px rgba(132,147,168,.15)',
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">{item.month}</Typography>
          </Grid>
          <Grid size={{ xs: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">
              {t('agentDashBoard.cardTarget.monthLabel', 'חודשי')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">
              {numberWithCommas(item.targetValue)}
            </Typography>
          </Grid>
          <Grid size={{ xs: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">
              {numberWithCommas(item.currentValue)}
            </Typography>
          </Grid>
          <Grid size={{ xs: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body1"
              sx={{ minWidth: '80px', textAlign: 'center' }}
            >
              {completedType(item)}
            </Typography>
          </Grid>
          {isSuperAgent && (
            <Grid
              size={{ xs: 1 }}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <IconButton
                onClick={() => setOpen(!open)}
                sx={{
                  borderRadius: '5px',
                  backgroundColor: '#f7f9fc',
                  minWidth: '80px',
                }}
              >
                <ModeEditIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </MuiCard>

      <Modals.ModalWrapper
        active={open}
        setActive={setOpen}
        width={28}
        height={'30%'}
      >
        <Box sx={{ padding: '0 20px' }}>
          <Typography variant="h5" sx={{ mb: '20px' }}>
            {t('agentDashBoard.cardTarget.updateTarget')}
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <TextField
              variant="outlined"
              value={item.month + ' ' + item.year}
              disabled
              InputProps={{
                startAdornment: (
                  <Box sx={{ padding: '0 10px' }}>
                    <DateRangeIcon />
                  </Box>
                ),
              }}
            />
            <TextField
              variant="outlined"
              type="number"
              placeholder={t(
                'agentDashBoard.cardTarget.targetPlaceholder',
                'יעד'
              )}
              value={number}
              onChange={(e) => setNumber(+e.target.value)}
              InputProps={{
                startAdornment: (
                  <Box sx={{ padding: '0 10px' }}>
                    <CurrencyExchangeIcon />
                  </Box>
                ),
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: '40px' }}>
            <Button variant="contained" onClick={handle}>
              {t('agentDashBoard.cardTarget.updateTarget')}
            </Button>
          </Box>
        </Box>
      </Modals.ModalWrapper>
    </>
  )
}

export default Card
