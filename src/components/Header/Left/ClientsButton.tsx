import { IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../../enums/urls'
import { useAuth } from '../../../store/auth.store'
import GroupIcon from '@mui/icons-material/Group'
import { useTranslation } from 'react-i18next'
const ClientsButton = () => {
  const navigate = useNavigate()
  const { agent } = useAuth()
  const { t } = useTranslation()
  return (
    <IconButton
      onClick={() => navigate(`${URLS.AGENT_CLIENTS.LINK}/${agent?.id}?page=1`)}
      sx={{
        height: '50px',
        width: '50px',
        border: '1px solid #E0E0E0',
      }}
    >
      <Tooltip title={t('breadCrumbs.clients')}>
        <GroupIcon />
      </Tooltip>
    </IconButton>
  )
}

export default ClientsButton
