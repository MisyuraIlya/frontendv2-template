import React, { FC, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { themeColors } from '../../../styles/mui'
import SettingsIcon from '@mui/icons-material/Settings'
import { UserStatus } from '../../../enums/status'
import moment from 'moment'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled'
import {
  onAsk,
  onErrorAlert,
  onSuccessAlert,
} from '../../../utils/MySweetAlert'
import { useForm, Controller } from 'react-hook-form'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { AdminClinetsService } from '../../../services/admin/AdminClients.service'
import { useParams } from 'react-router-dom'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import Modals from '../../Modals'
import { useTranslation } from 'react-i18next'
import useDirection from '../../../hooks/useDirection'

interface ClientItemProps {
  element: IUser
  index: number
}

type RegistrationForm = {
  email: string
  password: string
  confirmPassword: string
}

type RouteParams = {
  userRole: ROLE_TYPES
}

const Card: FC<ClientItemProps> = ({ element }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const { userRole } = useParams<RouteParams>()
  const isUser = userRole === 'ROLE_USER'
  const isAgent = userRole === 'ROLE_AGENT'
  const [openInfo, setOpenInfo] = useState(false)
  const [isMaster, setIsMaster] = useState(element.role === 'ROLE_SUPER_AGENT')
  const [openSettings, setOpenSettings] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { t } = useTranslation()
  const dir = useDirection()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationForm>()

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleBlock = async (value: boolean) => {
    if (value) {
      const ask = await onAsk(
        t('confirmations.confirmBlock'),
        t('confirmations.blockDescription', { name: element.name }),
        dir
      )
      if (ask) {
        element.isBlocked = value
        const response = await AdminClinetsService.updateClient(element)
        if (response.status) {
          onSuccessAlert(t('alerts.userBlockedSuccessfuly'), '')
        } else {
          onErrorAlert(t('alerts.notUpdated'), response.message)
        }
      }
    } else {
      element.isBlocked = value
      const response = await AdminClinetsService.updateClient(element)
      if (response.status) {
        onSuccessAlert(t('alerts.userOpenSuccessfuly'), '')
      } else {
        onErrorAlert(t('alerts.notUpdated'), response.message)
      }
    }
    setAnchorEl(null)
  }

  const handleReset = async () => {
    const ask = await onAsk(
      t('confirmations.confirmReset'),
      t('confirmations.resetDescription', { name: element.name }),
      dir
    )
    if (ask) {
      element.isRegistered = false
      element.email = null
      const response = await AdminClinetsService.updateClient(element)
      if (response.status) {
        onSuccessAlert(
          isUser ? t('actions.resetCustomer') : t('actions.resetAgent'),
          ''
        )
      } else {
        onErrorAlert(t('alerts.notUpdated'), response.message)
      }
    }
    setAnchorEl(null)
  }

  const handleUpdate = async (data: RegistrationForm) => {
    element.email = data.email
    element.isRegistered = true
    element.role = userRole as ROLE_TYPES
    const response = await AdminClinetsService.updateClient(element)
    if (response.status) {
      onSuccessAlert(
        isUser
          ? t('alerts.customerCreatedSuccessfully')
          : t('alerts.agentCreatedSuccessfully'),
        ''
      )
    } else {
      onErrorAlert(t('alerts.notUpdated'), response.message)
    }
    setOpenSettings(false)
    setAnchorEl(null)
  }

  const handleMaster = () => {
    setIsMaster(!isMaster)
    if (!isMaster) {
      element.role = 'ROLE_SUPER_AGENT'
    } else {
      element.role = 'ROLE_AGENT'
    }
    AdminClinetsService.updateClient(element)
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setOpenInfo(true)}>
            <InfoIcon color="info" />
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">{element?.extId}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{element?.name}</Typography>
        </TableCell>
        <TableCell>{UserStatus(element, dir)}</TableCell>
        <TableCell>
          <IconButton onClick={handleOpenMenu}>
            <SettingsIcon />
          </IconButton>
        </TableCell>
        {isAgent && (
          <TableCell>
            <Switch
              checked={isMaster}
              onChange={handleMaster}
              color="success"
            />
          </TableCell>
        )}
      </TableRow>

      {/* INFO MODAL */}
      <Modals.ModalWrapper
        active={openInfo}
        setActive={setOpenInfo}
        height={'40%'}
        width={40}
        component={
          <Typography variant="h6" sx={{ margin: '10px 0' }}>
            {isUser ? t('clientInfo.clientTitle') : t('clientInfo.agentTitle')}
          </Typography>
        }
      >
        <Divider sx={{ mb: '20px' }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 2 }}>
            <Typography variant="body1" fontWeight={800}>
              {isUser ? t('clientInfo.clientName') : t('clientInfo.agentName')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 10 }}>
            <Typography variant="body1">{element?.name ?? '-'}</Typography>
          </Grid>
          <Grid size={{ xs: 2 }}>
            <Typography variant="body1" fontWeight={800}>
              {t('clientInfo.phone')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 10 }}>
            <Typography variant="body1">{element?.phone ?? '-'}</Typography>
          </Grid>
          <Grid size={{ xs: 2 }}>
            <Typography variant="body1" fontWeight={800}>
              {isUser
                ? t('clientInfo.clientNumber')
                : t('clientInfo.agentNumber')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 10 }}>
            <Typography variant="body1">{element?.extId ?? '-'}</Typography>
          </Grid>
          <Grid size={{ xs: 2 }}>
            <Typography variant="body1" fontWeight={800}>
              {t('clientInfo.username')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 10 }}>
            <Typography variant="body1">{element?.email ?? '-'}</Typography>
          </Grid>
          <Grid size={{ xs: 2 }}>
            <Typography variant="body1" fontWeight={800}>
              {t('clientInfo.password')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 10 }}>
            <Typography variant="body1">{element?.password ?? '-'}</Typography>
          </Grid>
          <Grid size={{ xs: 2 }}>
            <Typography variant="body1" fontWeight={800}>
              {t('clientInfo.lastUpdated')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 10 }}>
            <Typography variant="body1">
              {moment(element?.updatedAt).format('DD-MM-YYYY HH:mm:ss') ?? '-'}
            </Typography>
          </Grid>
        </Grid>
      </Modals.ModalWrapper>

      {/* MENU */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => setOpenSettings(true)}>
          <ListItemIcon>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">
            {isUser ? t('actions.createCustomer') : t('actions.createAgent')}
          </Typography>
        </MenuItem>
        {element?.isBlocked ? (
          <MenuItem onClick={() => handleBlock(false)}>
            <ListItemIcon>
              <PersonAddAltIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">
              {isUser
                ? t('actions.activateCustomer')
                : t('actions.activateAgent')}
            </Typography>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleBlock(true)}>
            <ListItemIcon>
              <PersonOffIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">
              {isUser ? t('actions.blockCustomer') : t('actions.blockAgent')}
            </Typography>
          </MenuItem>
        )}
        <MenuItem onClick={handleReset}>
          <ListItemIcon>
            <PersonAddDisabledIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">
            {isUser ? t('actions.resetCustomer') : t('actions.resetAgent')}
          </Typography>
        </MenuItem>
      </Menu>

      {/* SETTINGS MODAL */}
      <Modals.ModalWrapper
        active={openSettings}
        setActive={setOpenSettings}
        height={'55%'}
        width={40}
        component={
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <PersonAddIcon sx={{ fontSize: '40px' }} />
            <Typography
              variant="h4"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {t('settingsModal.title')}
            </Typography>
          </Box>
        }
      >
        <Box>
          <Divider />
          <Grid container spacing={0}>
            <Grid size={{ xs: 2 }}>
              <Typography
                variant="body1"
                sx={{ margin: '10px 0', color: themeColors.asphalt }}
              >
                {isUser
                  ? t('settingsModal.clientNumber')
                  : t('settingsModal.agentNumber')}
              </Typography>
            </Grid>
            <Grid size={{ xs: 10 }}>
              <Typography
                variant="body1"
                sx={{ margin: '10px 0', color: themeColors.asphalt }}
              >
                {element?.extId ?? '-'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 2 }}>
              <Typography
                variant="body1"
                sx={{ margin: '10px 0', color: themeColors.asphalt }}
              >
                {isUser ? t('settingsModal.client') : t('settingsModal.agent')}
              </Typography>
            </Grid>
            <Grid size={{ xs: 10 }}>
              <Typography
                variant="body1"
                sx={{ margin: '10px 0', color: themeColors.asphalt }}
              >
                {element?.name ?? '-'}
              </Typography>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit(handleUpdate)} autoComplete="off">
            <FormControl fullWidth margin="normal">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: t('forms.requiredEmail'),
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: t('forms.invalidEmail'),
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label={t('forms.email')}
                    type="mail"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: t('forms.requiredPassword'),
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label={t('forms.password')}
                    type={showPassword ? 'text' : 'password'}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon color="primary" />
                          ) : (
                            <RemoveRedEyeOutlinedIcon color="primary" />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: t('forms.requiredPassword'),
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label={t('forms.confirmPassword')}
                    type={showPassword2 ? 'text' : 'password'}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword2(!showPassword2)}
                          edge="end"
                        >
                          {showPassword2 ? (
                            <VisibilityOffOutlinedIcon color="primary" />
                          ) : (
                            <RemoveRedEyeOutlinedIcon color="primary" />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
            </FormControl>
            <Button
              sx={{ padding: '11px 0', mt: '20px' }}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              {isUser ? t('actions.createCustomer') : t('actions.createAgent')}
            </Button>
          </form>
        </Box>
      </Modals.ModalWrapper>
    </>
  )
}

export default Card
