import React from 'react'
import Loader from '../../../utils/Loader'
import { useAuth } from '../../../store/auth.store'
import { Box, Card as MuiCard, Grid, Typography } from '@mui/material'
import { MONTH_HEBREW_1 } from '../../../helpers/arrayOfMonths'
import Card from './Card'
import { useAgentStore } from '../../../store/agent.store'
import useDataAgentTargets from '../../../hooks/agent/useAgentDataTargets'
import useDataAgentProfile from '../../../hooks/agent/useAgentDataProfile'
import { useTranslation } from 'react-i18next'

const List = () => {
  const { t } = useTranslation()
  const { user, isSuperAgent } = useAuth()
  const { year } = useAgentStore()
  const { data, isLoading } = useDataAgentTargets(year)
  const { findTarget } = useDataAgentProfile()

  const targets = MONTH_HEBREW_1.map((item, key) => {
    const matchingData = data?.find((res) => item.name === res.month)
    return {
      id: matchingData ? matchingData.id : null,
      agent: user,
      month: item.name,
      year: year,
      currentValue: findTarget(key + 1),
      targetValue: matchingData ? matchingData.targetValue : 0,
      isCompleted: matchingData ? matchingData.isCompleted : false,
    }
  })

  return (
    <MuiCard sx={{ marginTop: '50px' }}>
      <Grid container spacing={2} sx={{ margin: '5px', padding: '10px 20px' }}>
        <Grid size={{ xs: 2 }}>
          <Typography variant="body1" fontWeight={700}>
            {t('agentDashBoard.list.date')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Typography variant="body1" fontWeight={700}>
            {t('agentDashBoard.list.turnover')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Typography variant="body1" fontWeight={700}>
            {t('agentDashBoard.list.target')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Typography variant="body1" fontWeight={700}>
            {t('agentDashBoard.list.turnover')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Typography variant="body1" fontWeight={700}>
            {t('agentDashBoard.list.status')}
          </Typography>
        </Grid>
        {isSuperAgent && (
          <Grid size={{ xs: 1 }}>
            <Typography variant="body1" fontWeight={700}>
              {t('agentDashBoard.list.actions')}
            </Typography>
          </Grid>
        )}
      </Grid>
      {isLoading ? (
        <Box className="centered">
          <Loader />
        </Box>
      ) : (
        <Box>
          {targets?.map((item) => (
            <Card item={item} index={item.id!} key={item.id} />
          ))}
        </Box>
      )}
    </MuiCard>
  )
}

export default List
