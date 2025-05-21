import moment from 'moment'
import { useMyScheduleCalendar } from '../../../store/ScheduleCalendar.store'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
const Filter = () => {
  const {
    switchCalendarBackWeek,
    switchCalendarForwardWeek,
    weekFrom,
    weekTo,
  } = useMyScheduleCalendar()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      <IconButton onClick={() => switchCalendarBackWeek()}>
        <ArrowForwardIcon />
      </IconButton>
      <Typography variant="h6">
        {moment(weekFrom).format('DD-MM-YYYY')} -{' '}
        {moment(weekTo).format('DD-MM-YYYY')}{' '}
      </Typography>
      <IconButton onClick={() => switchCalendarForwardWeek()}>
        <ArrowBackIcon />
      </IconButton>
    </Box>
  )
}

export default Filter
