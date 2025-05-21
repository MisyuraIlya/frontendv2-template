import { Box, Card, CircularProgress, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import useDataAgentsStatistics from '../../../hooks/agent/useDataAgentsStatistics'
const MainInfo = () => {
  const { dateFrom, dateTo } = useParams()
  const { data, isLoading } = useDataAgentsStatistics(dateFrom!, dateTo!)
  return (
    <Card
      sx={{
        minWidth: '250px',
        padding: '20px',
        position: 'relative',
        height: '100%',
      }}
    >
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
      <Typography variant="h6">{numberWithCommas(data?.total)} ₪</Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <StackedLineChartIcon sx={{ fontSize: '16px' }} />
        <Typography variant="body2">מחזור</Typography>
      </Box>

      <Typography variant="h6">
        {numberWithCommas(data?.averageTotal)} ₪
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <LeaderboardIcon sx={{ fontSize: '16px' }} />
        <Typography variant="body2">ממוצע להזמנה</Typography>
      </Box>

      <Typography variant="h6">
        {numberWithCommas(data?.totalOrders)}
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <DataUsageIcon sx={{ fontSize: '16px' }} />
        <Typography variant="body2">כמות הזמנות</Typography>
      </Box>
    </Card>
  )
}

export default MainInfo
