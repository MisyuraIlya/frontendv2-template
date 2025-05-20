import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../enums/urls'
import logo from '../../../assets/images/logo.png'

const Logo = () => {
  const navigate = useNavigate()

  return (
    <Box>
      <img
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(URLS.HOME.LINK)}
        src={logo}
        alt="Company logo"
        width={100}
      />
    </Box>
  )
}

export default Logo
