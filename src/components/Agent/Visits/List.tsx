import React from 'react'
import { Box, Card as MuiCard, Grid, Typography } from '@mui/material'
import Loader from '../../../utils/Loader'
import Card from './Card'
import useDataAgentObjectives from '../../../hooks/agent/useAgentDataObjectives'
import { useTranslation } from 'react-i18next'

const List = () => {
  const { isLoading, data } = useDataAgentObjectives('visit')
  const { t } = useTranslation()

  return (
    <MuiCard sx={{ marginTop: '50px' }}>
      <Grid
        container
        spacing={2}
        className="head"
        sx={{ borderRadius: '5px', padding: '30px', margin: '10px' }}
      >
        <Grid size={{ xs: 2 }}>
          <Typography variant="body1" fontWeight={700}>
            {t('visits.client')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Typography variant="body1" fontWeight={700}>
            {t('visits.address')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Typography variant="body1" fontWeight={700}>
            {t('visits.phone')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Typography variant="body1" fontWeight={700}>
            {t('visits.hours')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 1 }}>
          <Typography variant="body1" fontWeight={700}>
            {t('visits.day')}
          </Typography>
        </Grid>
        <Grid size={{ xs: 1 }}>
          <Typography variant="body1" fontWeight={700}>
            {t('visits.actions')}
          </Typography>
        </Grid>
      </Grid>

      {isLoading ? (
        <Loader />
      ) : (
        data?.data?.map((item) => (
          <Card item={item} index={item.id!} key={item.id} />
        ))
      )}

      {data?.total === 0 && (
        <Box style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100px'
        }}>
          <Typography variant="body1" fontWeight={700}>
            {t('visits.noResults')}
          </Typography>
        </Box>
      )}
    </MuiCard>
  )
}

export default List
