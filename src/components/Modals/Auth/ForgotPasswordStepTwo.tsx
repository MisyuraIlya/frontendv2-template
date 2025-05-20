// ForgotPasswordStepTwo.tsx
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { useAuth } from '../../../store/auth.store'
import { useTranslation } from 'react-i18next'

type ForgotPasswordStepTwoData = {
  token: string
  password: string
  confirmPassword: string
}

const ForgotPasswordStepTwo = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const { t } = useTranslation()
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ForgotPasswordStepTwoData>()
  const { restorePasswordStepTwo, username } = useAuth()

  const handleResetPassword = (data: ForgotPasswordStepTwoData) => {
    restorePasswordStepTwo(username, data.token, data.password)
  }

  return (
    <form
      onSubmit={handleSubmit(handleResetPassword)}
      style={{ margin: '0 8px' }}
    >
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <PersonIcon sx={{ fontSize: '40px' }} />
        <Typography variant="h4">
          {t('auth.resetPassword', 'Reset Password')}
        </Typography>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
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
                label={`${t('forms.password', 'Password')}`}
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
                label={`${t('forms.confirmPassword', 'Confirm Password')}`}
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
          sx={{ marginTop: '30px' }}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          {t('auth.changePassword', 'Change Password')}
        </Button>
      </Box>
    </form>
  )
}

export default ForgotPasswordStepTwo
