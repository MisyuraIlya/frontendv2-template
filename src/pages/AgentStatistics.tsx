// src/pages/AgentStatistics.tsx
import { Container, Grid, Box } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Tabs, Tab } from '../utils/tabs'
import Agent from '../components/Agent'
import moment from 'moment'
import { useMobile } from '../provider/MobileProvider'

const AgentStatistics = () => {
  const { t } = useTranslation()
  const { isMobile } = useMobile()
  const tabDatable = [
    {
      tabIndex: 0,
      dateFrom: moment().format('YYYY-MM-DD'),
      dateTo: moment().format('YYYY-MM-DD'),
    },
    {
      tabIndex: 1,
      dateFrom: moment().startOf('month').format('YYYY-MM-DD'),
      dateTo: moment().format('YYYY-MM-DD'),
    },
    {
      tabIndex: 2,
      dateFrom: moment().startOf('year').format('YYYY-MM-DD'),
      dateTo: moment().format('YYYY-MM-DD'),
    },
  ]

  const renderContent = () => (
    <Box
      sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Grid container spacing={isMobile ? 10 : 4} sx={{ flex: 1 }}>
        <Grid
          size={{ xs: 12, sm: 12, md: 4 }}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Box sx={{ flex: 1 }}>
            <Agent.Statistics.Intro />
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 12, md: 4 }}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Box sx={{ flex: 1 }}>
            <Agent.Statistics.MainInfo />
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 12, md: 4 }}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Box sx={{ flex: 1 }}>
            <Agent.Statistics.PieAgents />
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12 }}
          sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}
        >
          <Box sx={{ flex: 1, height: '100%', width: '100%' }}>
            <Agent.Statistics.AgentsList />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )

  const components = [
    { title: t('agentStatistics.daily'), component: renderContent() },
    { title: t('agentStatistics.monthly'), component: renderContent() },
    { title: t('agentStatistics.yearly'), component: renderContent() },
  ]

  return (
    <Container
      maxWidth="lg"
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Tabs
        baseRoute="/agentStatistics"
        params={['tab', 'date']}
        isDatable
        tabDatable={tabDatable}
      >
        {components.map((tab, index) => (
          <Tab key={index} label={tab.title}>
            <Box
              sx={{
                flex: 1,
                margin: '20px 0',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {tab.component}
            </Box>
          </Tab>
        ))}
      </Tabs>
    </Container>
  )
}

export default AgentStatistics
