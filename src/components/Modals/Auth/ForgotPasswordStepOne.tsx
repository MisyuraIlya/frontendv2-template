import { useForm, Controller } from 'react-hook-form'
import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { useAuth } from '../../../store/auth.store'
import { useTranslation } from 'react-i18next'

type ForgotPasswordStepOneData = {
  phone: string
}

const ForgotPasswordStepOne = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ForgotPasswordStepOneData>()
  const { restorePasswordStepOne } = useAuth()
  const { t } = useTranslation()

  const handleForgotPassword = (data: ForgotPasswordStepOneData) => {
    restorePasswordStepOne(data.phone)
  }

  return (
    <form
      onSubmit={handleSubmit(handleForgotPassword)}
      style={{ margin: '0 8px' }}
    >
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <PersonIcon sx={{ fontSize: '40px' }} />
        <Typography variant="h4">
          {t('auth.forgotPassword', 'Forgot Password')}
        </Typography>
      </Box>
      <Box sx={{ marginTop: '40px' }}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: t('forms.requiredPhone', 'Phone is required'),
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label={`${t('forms.phone', 'Phone')}*`}
                placeholder="0000000000"
                type="tel"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
        </FormControl>
        <Button
          sx={{ marginTop: '30px', height: '44px' }}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          {t('auth.sendSecretCode', 'Send Secret Code')}
        </Button>
      </Box>
    </form>
  )
}

export default ForgotPasswordStepOne
