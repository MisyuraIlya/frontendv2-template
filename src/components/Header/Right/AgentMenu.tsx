import { Box, IconButton, Menu } from '@mui/material'
import { useState } from 'react'
import AgentMenuProfile from './AgentMenuProfile'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'

const AgentMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  return (
    <Box>
      <IconButton
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{
          height: '50px',
          width: '50px',
          border: '1px solid #E0E0E0',
        }}
      >
        <AssignmentIndIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ borderRadius: '8px' }}
      >
        <Box sx={{ padding: '4px 12px', minWidth: '312px' }}>
          <AgentMenuProfile handleClose={() => setAnchorEl(null)} />
        </Box>
      </Menu>
    </Box>
  )
}
export default AgentMenu
