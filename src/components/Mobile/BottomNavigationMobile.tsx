import React, { useState } from 'react'
import { BottomNavigation, Box, Drawer, Paper } from '@mui/material'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useAuth } from '../../store/auth.store'
import { useNavigate } from 'react-router-dom'
import { useModals } from '../../provider/ModalProvider'
import { useMobile } from '../../provider/MobileProvider'
import MenuProfile from '../Header/Left/MenuProfile'
import AgentMenuProfile from '../Header/Right/AgentMenuProfile'
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'

const BottomNavigationMobile = () => {
  const [value, setValue] = useState('')
  const { user, agent, isAgent } = useAuth()
  const { setOpenAuthModal } = useModals()
  const [openDrawver, setOpenDrawver] = useState(false)
  const [openDrawverAgent, setOpenDrawverAgent] = useState(false)
  const { isMobile } = useMobile()
  const navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log('event',event)
    if (newValue === '2') {
      if (!user) {
        setOpenAuthModal(true)
        return
      }
      if (openDrawver) {
        setOpenDrawver(false)
        setValue('')
      } else {
        setOpenDrawver(true)
        setOpenDrawverAgent(false)
        setValue('2')
      }
      return
    }

    if (newValue === '1') {
      if (openDrawverAgent) {
        setOpenDrawverAgent(false)
        setValue('')
      } else {
        setOpenDrawverAgent(true)
        setOpenDrawver(false)
        setValue('1')
      }
      return
    }

    if (newValue === '3') {
      navigate('/cart')
      setValue('3')
    } else if (newValue === '5') {
      navigate(`/agentClients/${agent?.id}?page=1`)
      setValue('5')
    }
  }

  return (
    <>
      {isMobile && (
        <>
          <Paper
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 999,
            }}
            elevation={10}
          >
            <BottomNavigation value={value} onChange={handleChange}>
              {agent && (
                <BottomNavigationAction
                  label="סוכן"
                  value="1"
                  icon={<AssignmentIndIcon />}
                />
              )}

              <BottomNavigationAction
                label="פרופיל"
                value="2"
                icon={<PersonIcon />}
              />

              {isAgent && (
                <BottomNavigationAction
                  label="לקוחות"
                  value="5"
                  icon={<GroupIcon />}
                />
              )}

              {user && (
                <BottomNavigationAction
                  label="עגלה"
                  value="3"
                  icon={<ShoppingCartIcon />}
                />
              )}
            </BottomNavigation>
          </Paper>

          <Drawer
            anchor="bottom"
            open={openDrawver}
            onClose={() => {
              setOpenDrawver(false)
              setValue('')
            }}
            sx={{ zIndex: 998 }}
          >
            <Box sx={{ minHeight: '650px', padding: '12px 16px' }}>
              <MenuProfile
                handleClose={() => {
                  setOpenDrawver(false)
                  setValue('')
                }}
              />
            </Box>
          </Drawer>

          <Drawer
            anchor="bottom"
            open={openDrawverAgent}
            onClose={() => {
              setOpenDrawverAgent(false)
              setValue('')
            }}
            sx={{ zIndex: 998 }}
          >
            <Box sx={{ minHeight: '380px', padding: '12px 16px' }}>
              <AgentMenuProfile
                handleClose={() => {
                  setOpenDrawverAgent(false)
                  setValue('')
                }}
              />
            </Box>
          </Drawer>
        </>
      )}
    </>
  )
}

export default BottomNavigationMobile
