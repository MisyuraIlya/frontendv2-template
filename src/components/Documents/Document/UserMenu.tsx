import React, { useState, FC } from 'react'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Grid,
  ListItemIcon,
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { useCart } from '../../../store/cart.store'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/auth.store'
import { onAsk } from '../../../utils/MySweetAlert'
import { URLS } from '../../../enums/urls'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { useTranslation } from 'react-i18next'
import useDirection from '../../../hooks/useDirection'

interface ProfileProps {
  document: IDocument
}

const UserMenu: FC<ProfileProps> = ({ document }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { cart, setCart } = useCart()
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const { t } = useTranslation()
  const dir = useDirection()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event: any) => {
    if (event) {
      event.stopPropagation()
    }
    setAnchorEl(null)
  }

  const user = document.user

  const handleUser = async (event: any) => {
    if (event) {
      event.stopPropagation()
    }
    if (cart.length > 0) {
      const ask = await onAsk('קיימים פריטים בסל', 'כל הפריטים ימחקו', dir)
      if (ask) {
        setCart([])
        setUser(user)
        navigate(URLS.PROFILE.LINK)
      }
    } else {
      setUser(user)
      navigate(URLS.PROFILE.LINK)
    }
  }

  return (
    <Box>
      {user && (
        <Typography
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="body1"
          color="info"
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {user.name}
        </Typography>
      )}
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {user && (
          <Box>
            <List sx={{ width: '200px' }}>
              <ListItem alignItems="flex-start">
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" color="text.primary">
                      {t('documents.userMenu.clientExtId')}: {user?.extId}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" color="text.primary">
                      {t('documents.userMenu.name')}: {user?.name}
                    </Typography>
                  </Grid>
                  {user?.phone && (
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="subtitle1" color="text.primary">
                        {t('documents.userMenu.phone')}: {user?.phone}
                      </Typography>
                    </Grid>
                  )}
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" color="text.primary">
                      {t('documents.userMenu.bussniesId')} : {user?.hp}
                    </Typography>
                  </Grid>
                  {user?.city && (
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="subtitle1" color="text.primary">
                        {t('documents.userMenu.city')}: {user?.city}
                      </Typography>
                    </Grid>
                  )}
                  {user?.address && (
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="subtitle1" color="text.primary">
                        {t('documents.userMenu.address')}: {user?.address}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </ListItem>
            </List>
            <Divider />
            {user?.phone && (
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LocalPhoneIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <a
                    href={`tel:${user?.phone}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {t('documents.userMenu.contact')}
                  </a>
                </ListItemText>
              </MenuItem>
            )}

            <MenuItem onClick={handleUser}>
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{t('documents.userMenu.enterClient')}</ListItemText>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  )
}

export default UserMenu
