import React, { useState } from 'react'
import { Box, Container, Fab, Grid } from '@mui/material'
import { Tab, Tabs } from '../utils/tabs'
import Utils from '../utils'
import Agent from '../components/Agent'
import AddIcon from '@mui/icons-material/Add'
import Modals from '../components/Modals'
import { useAuth } from '../store/auth.store'
import { useTranslation } from 'react-i18next'

const AgentDashboard = () => {
  const [openVisitModal, setOpenVisiModal] = useState(false)
  const [openMission, setOpenMission] = useState(false)
  const { isSuperAgent, coreUser } = useAuth()
  const { t } = useTranslation()

  const components = [
    {
      title: t('agentDashBoard.tabs.dashboard'),
      component: (
        <>
          <Agent.Dashboard.MainInfo />
          <Agent.Dashboard.Daily />
          <Agent.Dashboard.Tasks />
          <Agent.Dashboard.Targets />
        </>
      ),
    },
    {
      title: t('agentDashBoard.tabs.missions'),
      component: (
        <>
          <Agent.Missions.Filter />
          <Agent.Missions.Schedule />
          {isSuperAgent && (
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                position: 'fixed',
                right: '50px',
                bottom: '50px',
                borderRadius: '5px',
                width: '80px',
                height: '80px',
              }}
              onClick={() => setOpenMission(true)}
            >
              <AddIcon style={{ fontSize: '50px' }} />
            </Fab>
          )}
        </>
      ),
    },
    {
      title: t('agentDashBoard.tabs.visitTemplates'),
      component: (
        <>
          <Agent.Visits.List />
          {isSuperAgent && (
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                position: 'fixed',
                right: '50px',
                bottom: '50px',
                borderRadius: '5px',
                width: '80px',
                height: '80px',
              }}
              onClick={() => setOpenVisiModal(true)}
            >
              <AddIcon style={{ fontSize: '50px' }} />
            </Fab>
          )}
        </>
      ),
    },
    {
      title: t('agentDashBoard.tabs.targets'),
      component: (
        <>
          <Agent.Targets.List />
        </>
      ),
    },
  ]

  return (
    <Container maxWidth="xl">
      <Utils.BreadCrumbsUtil array={[]} />
      <Grid container spacing={2}>
        {coreUser?.role === 'ROLE_SUPER_AGENT' && (
          <Grid size={{ md: 3, sm: 12, xs: 12 }}>
            <Agent.SideBar />
          </Grid>
        )}

        <Grid
          size={{
            md: coreUser?.role === 'ROLE_SUPER_AGENT' ? 9 : 12,
            sm: 12,
            xs: 12,
          }}
        >
          <Tabs
            baseRoute="/agentDashboard"
            params={['tab', 'id', 'dateFrom', 'dateTo']}
          >
            {components?.map((tab, index) => (
              <Tab key={index} label={tab.title}>
                <Box sx={{ margin: '20px 0' }}>{tab.component}</Box>
              </Tab>
            ))}
          </Tabs>
        </Grid>
      </Grid>
      <Modals.Agent.Visit.Handler
        open={openVisitModal}
        setOpen={setOpenVisiModal}
      />
      <Modals.Agent.Mission.Create
        open={openMission}
        setOpen={setOpenMission}
      />
    </Container>
  )
}

export default AgentDashboard
