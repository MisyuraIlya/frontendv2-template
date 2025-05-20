import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import CountryFlag from 'react-country-flag'

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const currentLang = i18n.language || 'en'
  const flagCode = currentLang === 'he' ? 'IL' : 'US'

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const switchLanguage = (lng: 'en' | 'he') => {
    const { pathname, search, hash } = window.location
    const parts = pathname.split('/')
    parts[1] = lng
    const newPath = parts.join('/') + search + hash
    i18n.changeLanguage(lng)
    window.location.replace(newPath)
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <CountryFlag
          countryCode={flagCode}
          svg
          style={{ width: '1.5em', height: '1.5em' }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={() => switchLanguage('en')}>
          <ListItemIcon>
            <CountryFlag
              countryCode="US"
              svg
              style={{ width: '1.5em', height: '1.5em' }}
            />
          </ListItemIcon>
          <ListItemText>English</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => switchLanguage('he')}>
          <ListItemIcon>
            <CountryFlag
              countryCode="IL"
              svg
              style={{ width: '1.5em', height: '1.5em' }}
            />
          </ListItemIcon>
          <ListItemText>עברית</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default LanguageSwitcher
