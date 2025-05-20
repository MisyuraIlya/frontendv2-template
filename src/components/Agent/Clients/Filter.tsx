import { useState } from 'react'
import Utils from '../../../utils'
import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import hooks from '../../../hooks'
import { useTranslation } from 'react-i18next'

const Filter = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string>('')
  const navigate = useNavigate()
  const { agentId } = useParams()
  const { data } = hooks.agent.useDataAgentClients()
  const { t } = useTranslation()

  const handleDebounce = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    urlSearchParams.set('search', value)
    if (status) {
      urlSearchParams.set('status', status)
    }
    const url = urlSearchParams.toString()
    navigate(`/agentClients/${agentId}?${url}`)
  }

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value
    setStatus(newStatus)
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    urlSearchParams.set('status', newStatus)
    const url = urlSearchParams.toString()
    navigate(`/agentClients/${agentId}?${url}`)
  }

  const totalCount = data?.total ?? 0

  return (
    <Box
      sx={{
        marginBottom: '20px',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: 'space-between',
        gap: { xs: '16px', md: 0 },
      }}
    >
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
        <Utils.SearchInput
          handleFunction={handleDebounce}
          value={search}
          setValue={setSearch}
          placeholder={t('agentClients.searchPlaceholder')}
        />
      </Box>
      <Box sx={{ width: { xs: '100%', md: '25%' } }}>
        <Select
          value={status}
          onChange={handleStatusChange}
          displayEmpty
          fullWidth
          sx={{ height: '40px' }}
        >
          <MenuItem value="">{t('agentClients.activeInactiveOption')}</MenuItem>
          <MenuItem value="active">{t('agentClients.activeOption')}</MenuItem>
          <MenuItem value="inactive">
            {t('agentClients.inactiveOption')}
          </MenuItem>
        </Select>
      </Box>
      <Box sx={{ textAlign: { xs: 'left', md: 'center' } }}>
        <Typography variant="body1">
          {t('agentClients.totalClients', { count: totalCount })}
        </Typography>
      </Box>
    </Box>
  )
}

export default Filter
