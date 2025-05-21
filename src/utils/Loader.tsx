import { Backdrop, CircularProgress } from '@mui/material'

const Loader = ({}) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      onClick={() => console.log()}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loader
