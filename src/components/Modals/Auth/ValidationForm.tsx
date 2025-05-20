// ValidationForm.tsx
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { useAuth } from '../../../store/auth.store'
import { useTranslation } from 'react-i18next'

type ValidationFormData = {
  userExtId: string
  phone: string
}

const ValidationForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ValidationFormData>()
  const { validation, loading } = useAuth()
  const { t } = useTranslation()

  const handleValidation = async (data: ValidationFormData) => {
    await validation(data.userExtId, data.phone)
  }

  return (
    <form onSubmit={handleSubmit(handleValidation)} style={{ margin: '0 8px' }}>
      <Box sx={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
        <PersonIcon sx={{ fontSize: '50px' }} />
        <Typography variant="h4">
          {t('auth.validationTitle', 'Customer Validation')}
        </Typography>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="userExtId"
            control={control}
            defaultValue=""
            rules={{
              required: t(
                'forms.requiredClientNumber',
                'Client number is required'
              ),
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label={`${t('clientInfo.clientNumber', 'Client Number')}*`}
                placeholder={t(
                  'validation.userExtIdPlaceholder',
                  'Enter your client number'
                )}
                type="text"
                error={!!errors.userExtId}
                helperText={errors.userExtId?.message}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: t('forms.requiredPhone', 'Phone is required'),
              minLength: {
                value: 10,
                message: t(
                  'forms.phoneMinLength',
                  'Phone must be at least 10 digits'
                ),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label={`${t('clientInfo.phone', 'Phone')}*`}
                placeholder="0000000000"
                type="tel"
                error={!!errors.phone}
                helperText={errors.phone?.message}
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
            {!loading && t('auth.validate', 'Validate')}
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

export default ValidationForm
