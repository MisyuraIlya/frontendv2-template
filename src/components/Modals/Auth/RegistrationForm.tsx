// RegistrationForm.tsx
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
  Checkbox,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { themeColors } from '../../../styles/mui'
import { useAuth } from '../../../store/auth.store'
import { useTranslation } from 'react-i18next'

type RegistrationFormData = {
  email: string
  password: string
  confirmPassword: string
  token: string
  privacy: boolean
}

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const { t } = useTranslation()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationFormData>()
  const { registration, userExtId, phone, setAction, loading } = useAuth()

  const handleRegistration = (data: RegistrationFormData) => {
    registration(userExtId, data.email, data.password, phone, data.token)
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegistration)}
      style={{ margin: '0 8px' }}
    >
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <PersonIcon sx={{ fontSize: '40px' }} />
        <Typography variant="h4">
          {t('auth.registrationTitle', 'Registration')}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          marginTop: '16px',
          marginLeft: '5px',
        }}
      >
        <Typography variant="subtitle1" color="primary" fontWeight={600}>
          {t('auth.alreadyRegistered', 'Already have an account?')}
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            cursor: 'pointer',
            textDecoration: 'underline',
            color: themeColors.info,
          }}
          onClick={() => setAction('login')}
        >
          {t('auth.loginNow', 'Login')}
        </Typography>
      </Box>
      <Box sx={{ marginTop: '10px' }}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: t('forms.requiredEmail', 'Email is required'),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t('forms.invalidEmail', 'Invalid email'),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label={`${t('forms.email', 'Email')}*`}
                type="email"
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
              required: t('forms.requiredPassword', 'Password is required'),
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label={`${t('forms.password', 'Password')}*`}
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
              required: t('forms.requiredPassword', 'Password is required'),
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label={`${t('forms.confirmPassword', 'Confirm Password')}*`}
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
        <FormControl fullWidth margin="normal">
          <Controller
            name="token"
            control={control}
            defaultValue=""
            rules={{
              required: t('forms.requiredToken', 'Token is required'),
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label={`${t('auth.secretToken', 'Secret Token')}*`}
                type="text"
                error={!!errors.token}
                helperText={errors.token?.message}
              />
            )}
          />
        </FormControl>
        <FormControlLabel
          sx={{ marginTop: '10px' }}
          control={
            <Controller
              name="privacy"
              control={control}
              defaultValue={false}
              render={({ field }) => <Checkbox {...field} color="primary" />}
            />
          }
          label={t(
            'auth.acceptPrivacy',
            'Please read and accept the Terms of Service'
          )}
        />
        <Box sx={{ position: 'relative', marginTop: '40px' }}>
          <Button
            sx={{ height: '44px' }}
            variant="contained"
            type={!loading ? 'submit' : 'button'}
            fullWidth
          >
            {!loading && t('auth.register', 'Register')}
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Box>
    </form>
  )
}

export default RegistrationForm
