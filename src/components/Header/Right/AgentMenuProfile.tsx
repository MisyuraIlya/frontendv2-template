import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from '@mui/material'
import React, { FC } from 'react'
import { URLS } from '../../../enums/urls'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined'
import { useAuth } from '../../../store/auth.store'
import { useNavigate } from 'react-router-dom'
import AssessmentIcon from '@mui/icons-material/Assessment'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import moment from 'moment'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import { useOffline } from '../../../provider/OfflineProvider'
import OfflineBlur from '../../common/OfflineBlur'
import { useTranslation } from 'react-i18next'

const agentURL = {
  // DOCUMENT_APPROCE: {
  //   LINK: URLS.AGNET_DASHBOARD.LINK,
  //   LABEL: URLS.AGNET_DASHBOARD.LABEL,
  //   ICON: <ChecklistRtlIcon sx={{ fontSize: '25px' }} />,
  // },
  // HISTORY_AGENT: {
  //   LINK: URLS.HISTORY.LINK,
  //   LABEL: URLS.HISTORY.LABEL,
  //   ICON: <ArticleOutlinedIcon sx={{ fontSize: '25px' }} />,
  // },
  AGENT_DASHBOARD: {
    LINK: URLS.AGENT_DASHBOARD.LINK,
    LABEL: URLS.AGENT_DASHBOARD.LABEL,
    ICON: <AssignmentIndIcon sx={{ fontSize: '25px' }} />,
    AGENT: true,
  },
  ORDER_TO_VERIFY: {
    LINK: URLS.APPROVE.LINK,
    LABEL: URLS.APPROVE.LABEL,
    ICON: <ChecklistRtlIcon sx={{ fontSize: '25px' }} />,
    AGENT: false,
  },
  ORDER_AGENT: {
    LINK: URLS.DOCUMENTS.LINK,
    LABEL: URLS.DOCUMENTS.LABEL,
    ICON: <StickyNote2OutlinedIcon sx={{ fontSize: '25px' }} />,
    AGENT: true,
  },
  AGENT_STATISTICS: {
    LINK: URLS.AGENT_STATISTICS.LINK,
    LABEL: URLS.AGENT_STATISTICS.LABEL,
    ICON: <AssessmentIcon sx={{ fontSize: '25px' }} />,
    AGENT: false,
  },
}

interface AgentMenuProfileProps {
  handleClose?: () => void
}
const AgentMenuProfile: FC<AgentMenuProfileProps> = ({ handleClose }) => {
  const { agent, user, setAgent, coreUser } = useAuth()
  const navigate = useNavigate()
  const { isOnline } = useOffline()
  const { t } = useTranslation()
  const handleClick = (link: string) => {
    if (link.includes('agentDashboard')) {
      const dateTo = moment().format('YYYY-MM-DD')
      const fromYear = moment().startOf('year').format('YYYY-MM-DD')
      navigate(`/agentDashboard/0/${user?.id}/${fromYear}/${dateTo}`)
      return
    }
    if (handleClose) {
      handleClose()
    }
    navigate(link)
  }

  const handeOutAgent = () => {
    setAgent(coreUser)
    navigate(URLS.AGENT_DASHBOARD.LINK)
  }

  return (
    <Box>
      <Box>
        <Typography variant="h5">{agent?.name ?? coreUser?.name}</Typography>
      </Box>
      {coreUser?.id !== agent?.id &&
        coreUser?.role === 'ROLE_SUPER_AGENT' &&
        agent?.role === 'ROLE_AGENT' && (
          <MenuItem sx={{ marginTop: '8px' }} onClick={() => handeOutAgent()}>
            <ListItemIcon>
              <TransferWithinAStationIcon color="error" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6" color={'error'}>
                {'התנתק מהסוכן'}
              </Typography>
            </ListItemText>
          </MenuItem>
        )}
      <Box sx={{ padding: '16px 0' }}>
        <Divider />
      </Box>
      <Box sx={{ position: 'relative' }}>
        {!isOnline && <OfflineBlur />}
        {Object.entries(agentURL).map(([key, value]) => {
          if (user?.role === 'ROLE_AGENT') {
            if (value.AGENT) {
              return (
                <MenuItem key={key} onClick={() => handleClick(value.LINK)}>
                  <ListItemIcon>{value.ICON}</ListItemIcon>
                  <ListItemText>
                    <Typography variant="h6">{t(`${value.LABEL}`)}</Typography>
                  </ListItemText>
                </MenuItem>
              )
            }
          } else {
            return (
              <MenuItem key={key} onClick={() => handleClick(value.LINK)}>
                <ListItemIcon>{value.ICON}</ListItemIcon>
                <ListItemText>
                  <Typography variant="h6">{t(`${value.LABEL}`)}</Typography>
                </ListItemText>
              </MenuItem>
            )
          }
        })}
      </Box>
      <MenuItem onClick={() => handleClick(URLS.AGENT_DOCUMENT_OFFLINE.LINK)}>
        <ListItemIcon>
          <WifiOffIcon sx={{ fontSize: '25px' }} />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="h6">
            {t(`${URLS.AGENT_DOCUMENT_OFFLINE.LABEL}`)}
          </Typography>
        </ListItemText>
      </MenuItem>
    </Box>
  )
}

export default AgentMenuProfile
