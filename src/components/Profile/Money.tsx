import React from 'react'
import { Paper, Typography, Grid, Box, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useUserProfileData from '../../hooks/useUserProfileData'
import useDirection from '../../hooks/useDirection'
import { numberWithCommas } from '../../helpers/numberWithCommas'
import Keeper from './Keeper'

const Money = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useUserProfileData()
  const dir = useDirection()
  const columnData = dir === 'rtl' ? data?.columns : data?.columnsEnglish
  const lineData = data?.lines

  return (
    <>
      <Typography variant="h4" sx={{ mt: 5 }}>
        {t('profile.money', 'כספים')}
      </Typography>
      <Paper sx={{ p: 3, mt: 2, position: 'relative' }}>
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        )}

        <Grid container spacing={2}>
          {columnData?.map((colName, idx) => {
            const value = lineData?.[idx]
            const isNegative = typeof value === 'number' && value < 0

            return (
              <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={idx}>
                <Box textAlign="left">
                  <Typography variant="subtitle2" color="textSecondary">
                    {colName}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      direction: dir,
                      color: isNegative ? 'error.main' : 'text.primary',
                    }}
                  >
                    {value !== '' && value != null
                      ? numberWithCommas(value)
                      : '—'}
                  </Typography>
                </Box>
              </Grid>
            )
          })}
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <Keeper />
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default Money
