/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
// import ReactApexChart from 'react-apexcharts'
import { Box, Card, Grid, Typography } from '@mui/material'
import Utils from '../../../utils'
import moment from 'moment'
import useDataAgentDashboard from '../../../hooks/agent/useAgentDataDashboard'
import { useTranslation } from 'react-i18next'

const Daily = () => {
  const { t } = useTranslation()

  const { data } = useDataAgentDashboard(
    moment().format('YYYY-MM-DD'),
    moment().format('YYYY-MM-DD')
  )
  console.log('data', data)
  const visits = data?.data?.filter((item) => item.objectiveType === 'visit')
  const tasks = data?.data?.filter((item) => item.objectiveType === 'task')

  const totalVisits = visits?.length
  const completedVisits = visits?.filter((item) => item.completedAt).length
  const precentVisits =
    completedVisits && totalVisits ? (completedVisits / totalVisits) * 100 : 0

  const totalTasks = tasks?.length
  const completedTasks = tasks?.filter((item) => item.completedAt).length
  const precentObj =
    totalTasks && completedTasks ? (completedTasks / totalTasks) * 100 : 0

  const series2 = [precentVisits.toFixed(2)]
  const options2 = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
      },
    },
    labels: [t('agentDashBoard.daily.visits.chartLabel')],
    colors: ['#24426b'],
  }

  const series1 = [precentObj.toFixed(2)]
  const options1 = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
      },
    },
    labels: [t('agentDashBoard.daily.tasks.chartLabel')],
    colors: ['#24426b'],
  }

  return (
    <Card sx={{ padding: '0 50px', marginTop: '50px' }}>
      <Grid container spacing={2}>
        <Grid
          size={{ md: 6, sm: 12, xs: 12 }}
          sx={{ display: { sm: 'flex', xs: 'block' }, gap: '20px' }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Box>
              <Typography
                variant="h6"
                sx={{ width: '100%', textAlign: { sm: 'left', xs: 'center' } }}
              >
                {t('agentDashBoard.daily.visits.title')}
              </Typography>
              <Grid container spacing={2}>
                <Grid
                  size={{ md: 6, sm: 12, xs: 12 }}
                  sx={{
                    display: 'flex',
                    justifyContent: { sm: 'left', xs: 'center' },
                  }}
                >
                  <Typography variant="h6">
                    {t('agentDashBoard.daily.completed')}
                  </Typography>
                </Grid>
                <Grid size={{ md: 6, sm: 12, xs: 12 }}>
                  <Utils.MyCheapButton>{completedVisits}</Utils.MyCheapButton>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                <Grid
                  size={{ md: 6, sm: 12, xs: 12 }}
                  sx={{
                    display: 'flex',
                    justifyContent: { sm: 'left', xs: 'center' },
                  }}
                >
                  <Typography variant="h6">
                    {t('agentDashBoard.daily.pending')}
                  </Typography>
                </Grid>
                <Grid size={{ md: 6, sm: 12, xs: 12 }}>
                  <Utils.MyCheapButton>{totalVisits}</Utils.MyCheapButton>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* <ReactApexChart
            // @ts-ignore
            options={options2}
            // @ts-ignore
            series={series2}
            type="radialBar"
            height={250}
          /> */}
        </Grid>
        <Grid
          size={{ md: 6, sm: 12, xs: 12 }}
          sx={{ display: { sm: 'flex', xs: 'block' }, gap: '20px' }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Box>
              <Typography
                variant="h6"
                sx={{ width: '100%', textAlign: { sm: 'left', xs: 'center' } }}
              >
                {t('agentDashBoard.daily.tasks.title')}
              </Typography>
              <Grid container spacing={2}>
                <Grid
                  size={{ sm: 6, xs: 12 }}
                  sx={{
                    display: 'flex',
                    justifyContent: { sm: 'left', xs: 'center' },
                  }}
                >
                  <Typography variant="h6">
                    {t('agentDashBoard.daily.completed')}
                  </Typography>
                </Grid>
                <Grid size={{ sm: 6, xs: 12 }}>
                  <Utils.MyCheapButton>{completedTasks}</Utils.MyCheapButton>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                <Grid
                  size={{ sm: 6, xs: 12 }}
                  sx={{
                    display: 'flex',
                    justifyContent: { sm: 'left', xs: 'center' },
                  }}
                >
                  <Typography variant="h6">
                    {t('agentDashBoard.daily.pending')}
                  </Typography>
                </Grid>
                <Grid size={{ sm: 6, xs: 12 }}>
                  <Utils.MyCheapButton>{totalTasks}</Utils.MyCheapButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
{/* 
          <ReactApexChart
            // @ts-ignore
            options={options1}
            // @ts-ignore
            series={series1}
            type="radialBar"
            height={250}
          /> */}
        </Grid>
      </Grid>
    </Card>
  )
}

export default Daily
