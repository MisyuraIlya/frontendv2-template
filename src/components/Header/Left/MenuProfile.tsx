import { FC } from 'react'
import {
  Box,
  Chip,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { useCart } from '../../../store/cart.store'
import { useAuth } from '../../../store/auth.store'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import { URLS } from '../../../enums/urls'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom'
import { onAsk } from '../../../utils/MySweetAlert'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useMobile } from '../../../provider/MobileProvider'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import PriceChangeIcon from '@mui/icons-material/PriceChange'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { useOffline } from '../../../provider/OfflineProvider'
import OfflineBlur from '../../common/OfflineBlur'
import { useTranslation } from 'react-i18next'
import useDirection from '../../../hooks/useDirection'

const clientURL = {
  PROFILE: {
    LINK: URLS.PROFILE.LINK,
    LABEL: 'urls.profile.label',
    ICON: <PersonIcon sx={{ width: '22px' }} />,
  },
  DOCUMENTS: {
    LINK: URLS.DOCUMENTS.LINK,
    LABEL: 'urls.documents.label',
    ICON: <AssignmentIcon sx={{ width: '22px' }} />,
  },
  CARTESSET: {
    LINK: URLS.DYNAMIC_TABLE_CARTESSET.LINK,
    LABEL: 'urls.cartesset.label',
    ICON: <PriceChangeIcon sx={{ width: '20px' }} />,
  },
  DEBIT: {
    LINK: URLS.DYNAMIC_TABLE_DEBIT.LINK,
    LABEL: 'urls.giulHovot.label',
    ICON: <CurrencyExchangeIcon sx={{ width: '20px' }} />,
  },
  PRODUCTS_IM_BUY: {
    LINK: '/client/imBuy/0/0/0?page=1',
    LABEL: 'profile.productsImBuy',
    ICON: <ShoppingBasketIcon sx={{ width: '20px' }} />,
  },
  PRODUCTS_IM_NOT_BUY: {
    LINK: '/client/notBuy/0/0/0?page=1',
    LABEL: 'profile.productsImNotBuy',
    ICON: <RemoveShoppingCartIcon sx={{ width: '20px' }} />,
  },
}

interface MenuProfileProps {
  handleClose?: () => void
}

const MenuProfile: FC<MenuProfileProps> = ({ handleClose }) => {
  const { t } = useTranslation()
  const { modes, selectedMode, setSelectedMode, cart, setCart } = useCart()
  const { isMobile } = useMobile()
  const { user, coreUser, logOut, agent, setUser } = useAuth()
  const { isOnline } = useOffline()
  const dir = useDirection()
  const navigate = useNavigate()

  const handleNaviagte = (link: string) => {
    if (link) {
      navigate(link)
      if (handleClose) {
        handleClose()
      }
    }
  }

  const handleLogOut = async () => {
    const ask = await onAsk(
      t('profile.logoutConfirmTitle'),
      t('profile.logoutConfirmMessage'),
      dir
    )
    if (ask) {
      logOut()
      if (handleClose) {
        handleClose()
      }
    }
  }

  const handleChange = async (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value
    const selectedItem = modes.find((item) => item.value === selectedValue)
    if (selectedItem) {
      if (selectedItem.value !== selectedMode.value && cart.length > 0) {
        const ask = await onAsk(
          t('profile.changeModeTitle'),
          t('profile.changeModeMessage', { mode: t(selectedItem.label) }),
          dir
        )
        if (ask) {
          setCart([])
          setSelectedMode(selectedItem)
        }
      } else {
        setSelectedMode(selectedItem)
      }
    }
  }

  const handleOutClinet = async () => {
    if (cart.length > 0) {
      const ask = await onAsk(
        t('profile.logoutClientConfirmTitle'),
        t('profile.logoutClientConfirmMessage'),
        dir
      )
      if (ask) {
        setCart([])
        setUser(coreUser)
        if (agent) {
          navigate(`${URLS.AGENT_CLIENTS.LINK}/${agent.id!}`)
        }
        if (handleClose) {
          handleClose()
        }
      }
    } else {
      setUser(coreUser)
      if (agent) {
        navigate(`${URLS.AGENT_CLIENTS.LINK}/${agent.id!}`)
      }
      if (handleClose) {
        handleClose()
      }
    }
  }

  return (
    <Box sx={{ padding: '12px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant={isMobile ? 'h6' : 'h5'}>{user?.name}</Typography>
          {user?.role === 'ROLE_USER' && (
            <Typography variant="caption">{user.extId}</Typography>
          )}
        </Box>
        {user?.role === 'ROLE_USER' ? (
          <Chip label={t('profile.client')} variant="outlined" color="info" />
        ) : (
          <Chip label={t('profile.agent')} variant="outlined" color="info" />
        )}
      </Box>
      {user?.role === 'ROLE_USER' && (
        <Select
          fullWidth
          value={selectedMode.value}
          sx={{ marginTop: '12px' }}
          onChange={handleChange}
        >
          {modes?.map((item, index) => {
            if (!item.isOnlyAgent || user?.id === agent?.id) {
              return (
                <MenuItem value={item.value} key={index}>
                  {dir == 'rtl' ? item?.label : item?.englishLabel}
                </MenuItem>
              )
            }
            return null
          })}
        </Select>
      )}
      {user?.id !== agent?.id && user?.role === 'ROLE_USER' && (
        <MenuItem sx={{ marginTop: '8px' }} onClick={() => handleOutClinet()}>
          <ListItemIcon>
            <TransferWithinAStationIcon color="error" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="h6" color="error">
              {t('profile.logoutFromClient')}
            </Typography>
          </ListItemText>
        </MenuItem>
      )}
      <Box sx={{ padding: '16px 0' }}>
        <Divider />
      </Box>
      <Box sx={{ position: 'relative' }}>
        {!isOnline && <OfflineBlur />}
        {Object.entries(clientURL).map(([key, value]) => {
          if (user?.role === 'ROLE_USER') {
            return (
              <MenuItem key={key} onClick={() => handleNaviagte(value.LINK)}>
                <ListItemIcon sx={{ width: '16px' }}>{value.ICON}</ListItemIcon>
                <ListItemText>
                  <Typography variant="h6">{t(value.LABEL)}</Typography>
                </ListItemText>
              </MenuItem>
            )
          }
          return null
        })}
      </Box>
      {user?.role === 'ROLE_USER' && (
        <Box sx={{ padding: '16px 0' }}>
          <Divider />
        </Box>
      )}
      <MenuItem onClick={() => handleLogOut()}>
        <ListItemIcon>
          <ExitToAppIcon color="error" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="h6" color="error">
            {t('profile.logout')}
          </Typography>
        </ListItemText>
      </MenuItem>
    </Box>
  )
}

export default MenuProfile
