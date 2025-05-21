import React from 'react'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { Box, Card, CircularProgress, Grid, Typography } from '@mui/material'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import LegendToggleIcon from '@mui/icons-material/LegendToggle'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import Utils from '../../../utils'
import useDataAgentProfile from '../../../hooks/agent/useAgentDataProfile'
import { useTranslation } from 'react-i18next'

const MainInfo = () => {
  const { data, isLoading } = useDataAgentProfile()
  const { t } = useTranslation()

  return (
    <Card sx={{ padding: '10px', position: 'relative' }}>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      <Grid container spacing={10}>
        <Grid size={{ md: 7, sm: 12, xs: 12 }}>
          <Grid container spacing={2} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Grid size={{ md: 4, sm: 6, xs: 6 }} sx={{ gap: '5px' }}>
              <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', gap: '10px'}}>
                <SupportAgentIcon />
                <Box sx={{ marginTop: '5px' }}>
                  <Typography>{data?.agentName}</Typography>
                  <Typography>{data?.agentExtId}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ md: 4, sm: 6, xs: 6 }} sx={{ gap: '5px' }}>
              <Grid container spacing={0} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Grid size={{ xs: 2 }}>
                  <LegendToggleIcon />
                </Grid>
                <Grid size={{ xs: 5 }}>
                  <Typography variant="body2">
                    {t('agentDashBoard.mainInfo.totalPriceMonth')}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 5 }}>
                  <Utils.MyCheapButton>
                    {numberWithCommas(data?.totalPriceMonth)}
                  </Utils.MyCheapButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ md: 4, sm: 6, xs: 6 }} sx={{ gap: '5px' }}>
              <Grid container spacing={0} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Grid size={{ xs: 2 }}>
                  <LegendToggleIcon />
                </Grid>
                <Grid size={{ xs: 5 }}>
                  <Typography variant="body2">
                    {t('agentDashBoard.mainInfo.total')}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 5 }}>
                  <Utils.MyCheapButton>
                    {numberWithCommas(data?.total)}
                  </Utils.MyCheapButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ md: 4, sm: 6, xs: 6 }} sx={{ gap: '5px' }}>
              <Grid container spacing={0} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Grid size={{ xs: 2 }}>
                  <AnalyticsIcon />
                </Grid>
                <Grid size={{ xs: 5 }}>
                  <Typography variant="body2">
                    {t('agentDashBoard.mainInfo.averageBasket')}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 5 }}>
                  <Utils.MyCheapButton>
                    {numberWithCommas(data?.averageBasket)}
                  </Utils.MyCheapButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ md: 5, sm: 12, xs: 12 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign="center">
                {t('agentDashBoard.mainInfo.totalPriceDay')}
              </Typography>
              <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', marginTop: '5px'}}>
                <Utils.MyCheapButton>
                  {numberWithCommas(data?.totalPriceDay)}
                </Utils.MyCheapButton>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign="center">
                {t('agentDashBoard.mainInfo.totalDayCount')}
              </Typography>
              <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',  marginTop: '5px'}} >
                <Utils.MyCheapButton>
                  {numberWithCommas(data?.totalDayCount)}
                </Utils.MyCheapButton>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign="center">
                {t('agentDashBoard.mainInfo.totalMonthCount')}
              </Typography>
              <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', marginTop: '5px'}}>
                <Utils.MyCheapButton>
                  {numberWithCommas(data?.totalMonthCount)}
                </Utils.MyCheapButton>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign="center">
                {t('agentDashBoard.mainInfo.targetPrecent')}
              </Typography>
              <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', marginTop: '5px'}}>
                <Utils.MyCheapButton>
                  {numberWithCommas(data?.targetPrecent)}
                </Utils.MyCheapButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default MainInfo
