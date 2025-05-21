import { Box, Typography } from '@mui/material'
import SignalWifiBadIcon from '@mui/icons-material/SignalWifiBad'
const OfflineBlur = () => {
  return (
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
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SignalWifiBadIcon sx={{ fontSize: '40px' }} />
          </Box>
          <Typography fontWeight={600}>אופליין מוד לא ניתן לגשת</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default OfflineBlur
