// LoginForm.tsx
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { themeColors } from '../../../styles/mui'
import { useAuth } from '../../../store/auth.store'
import { useTranslation } from 'react-i18next'

type LoginFormData = {
  email: string
  password: string
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { login, setAction, loading } = useAuth()
  const { t } = useTranslation()

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormData>()

  const handleLogin = (data: LoginFormData) => {
    login(data.email, data.password)
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} style={{ margin: '0 8px' }}>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <PersonIcon sx={{ fontSize: '40px' }} />
        <Typography variant="h4">{t('auth.loginTitle', 'Login')}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          marginTop: '16px',
          marginLeft: '5px',
        }}
      >
        {settings?.allowRegistration && (
          <>
            <Typography variant="subtitle1" color="primary" fontWeight={600}>
              {t('auth.notRegistered', 'Not registered yet?')}
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{
                cursor: 'pointer',
                textDecoration: 'underline',
                color: themeColors.info,
              }}
              onClick={() => setAction('validation')}
            >
              {t('auth.registerNow', 'Click here to register')}
            </Typography>
          </>
        )}
      </Box>
      <Box>
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
                placeholder={t('auth.emailPlaceholder', 'Your email')}
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
                placeholder={t('auth.passwordPlaceholder', 'Your password')}
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
        <Box sx={{ position: 'relative', marginTop: '40px' }}>
          <Button
            sx={{ height: '44px' }}
            variant="contained"
            type={!loading ? 'submit' : 'button'}
            fullWidth
          >
            {!loading && t('auth.login', 'Login')}
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

        <Box sx={{ marginTop: '30px' }}>
          <Typography
            fontWeight={600}
            onClick={() => setAction('forgotPassordStepOne')}
            variant="subtitle1"
            sx={{
              cursor: 'pointer',
              textDecoration: 'underline',
              color: themeColors.info,
            }}
            color="primary"
          >
            {t('auth.forgotPassword', 'Forgot Password?')}
          </Typography>
        </Box>
      </Box>
    </form>
  )
}

export default LoginForm
