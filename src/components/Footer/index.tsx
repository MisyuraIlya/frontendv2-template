import React, { useState } from 'react'
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  CircularProgress,
} from '@mui/material'
import { themeColors, colors } from '../../styles/mui'
import { useForm, Controller } from 'react-hook-form'
import { useMobile } from '../../provider/MobileProvider'
import { useAuthProvider } from '../../provider/AuthProvider'
import { SupportService } from '../../services/support.service'
import { onErrorAlert, onSuccessAlert } from '../../utils/MySweetAlert'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ISupportDto>()
  const { t } = useTranslation()
  const { isAuthrized } = useAuthProvider()
  const { isMobile } = useMobile()
  const [loading, setLoading] = useState(false)

  const onSubmit = (data: ISupportDto) => {
    setLoading(true)
    SupportService.sendSupport(data).then((res) => {
      setLoading(false)
      if (res.status === 'success') {
        reset()
        onSuccessAlert(t('footer.successTitle'), '')
      } else {
        onErrorAlert(t('footer.errorTitle'), '')
      }
    })
  }

  return (
    <Box
      sx={{
        backgroundColor: themeColors.primary,
        paddingBottom: isAuthrized ? '20px' : '0px',
        marginTop: isAuthrized ? '50px' : '0px',
        position: 'relative',
        zIndex: 10,
      }}
      component="footer"
    >
      <Container maxWidth="xl" component="footer">
        <Box sx={{ minHeight: '400px' }}>
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  color: 'white',
                  bgcolor: colors.alpha.white[5],
                  paddingBottom: isMobile ? '20px' : '0px',
                  mb: '0px',
                }}
              >
                <Box sx={{ padding: '24px' }}>
                  <Typography variant="h5">{t('footer.title')}</Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', gap: '24px' }}>
                      <FormControl fullWidth margin="normal">
                        <Controller
                          name="name"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="standard"
                              label={t('footer.form.name')}
                              placeholder={t('footer.form.namePlaceholder')}
                              type="text"
                              error={!!errors.name}
                              helperText={errors.name?.message}
                              sx={{
                                color: 'white',
                                '& .MuiInput-underline:before': {
                                  borderBottomColor: 'white',
                                },
                                '& .MuiInput-underline:hover:before': {
                                  borderBottomColor: 'white',
                                },
                                '& .MuiInputBase-input': {
                                  color: 'white',
                                },
                              }}
                              InputLabelProps={{ style: { color: 'white' } }}
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
                            required: t('footer.form.phoneRequired'),
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: t('footer.form.phoneInvalid'),
                            },
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="standard"
                              label={t('footer.form.phone')}
                              placeholder={t('footer.form.phonePlaceholder')}
                              type="text"
                              error={!!errors.phone}
                              helperText={errors.phone?.message}
                              sx={{
                                color: 'white',
                                '& .MuiInput-underline:before': {
                                  borderBottomColor: 'white',
                                },
                                '& .MuiInput-underline:hover:before': {
                                  borderBottomColor: 'white',
                                },
                                '& .MuiInputBase-input': {
                                  color: 'white',
                                },
                              }}
                              InputLabelProps={{ style: { color: 'white' } }}
                            />
                          )}
                        />
                      </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '24px' }}>
                      <FormControl fullWidth margin="normal">
                        <Controller
                          name="email"
                          control={control}
                          defaultValue=""
                          rules={{
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: t('footer.form.emailInvalid'),
                            },
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="standard"
                              label={t('footer.form.email')}
                              placeholder={t('footer.form.emailPlaceholder')}
                              type="text"
                              error={!!errors.email}
                              helperText={errors.email?.message}
                              sx={{
                                color: 'white',
                                '& .MuiInput-underline:before': {
                                  borderBottomColor: 'white',
                                },
                                '& .MuiInput-underline:hover:before': {
                                  borderBottomColor: 'white',
                                },
                                '& .MuiInputBase-input': {
                                  color: 'white',
                                },
                              }}
                              InputLabelProps={{ style: { color: 'white' } }}
                            />
                          )}
                        />
                      </FormControl>
                      <FormControl fullWidth margin="normal">
                        <Controller
                          name="userExtId"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="standard"
                              label={t('footer.form.userExtId')}
                              placeholder={t(
                                'footer.form.userExtIdPlaceholder'
                              )}
                              type="text"
                              error={!!errors.userExtId}
                              helperText={errors.userExtId?.message}
                              sx={{
                                color: 'white',
                                '& .MuiInput-underline:before': {
                                  borderBottomColor: 'white',
                                },
                                '& .MuiInput-underline:hover:before': {
                                  borderBottomColor: 'white',
                                },
                                '& .MuiInputBase-input': {
                                  color: 'white',
                                },
                              }}
                              InputLabelProps={{ style: { color: 'white' } }}
                            />
                          )}
                        />
                      </FormControl>
                    </Box>
                    <FormControl fullWidth margin="normal">
                      <Controller
                        name="bussnies"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            variant="standard"
                            label={t('footer.form.business')}
                            placeholder={t('footer.form.businessPlaceholder')}
                            type="text"
                            error={!!errors.bussnies}
                            helperText={errors.bussnies?.message}
                            sx={{
                              color: 'white',
                              '& .MuiInput-underline:before': {
                                borderBottomColor: 'white',
                              },
                              '& .MuiInput-underline:hover:before': {
                                borderBottomColor: 'white',
                              },
                              '& .MuiInputBase-input': {
                                color: 'white',
                              },
                            }}
                            InputLabelProps={{ style: { color: 'white' } }}
                          />
                        )}
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <Controller
                        name="message"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            variant="standard"
                            label={t('footer.form.message')}
                            placeholder={t('footer.form.messagePlaceholder')}
                            multiline
                            rows={2}
                            type="text"
                            error={!!errors.message}
                            helperText={errors.message?.message}
                            sx={{
                              color: 'white',
                              '& .MuiInput-underline:before': {
                                borderBottomColor: 'white',
                              },
                              '& .MuiInput-underline:hover:before': {
                                borderBottomColor: 'white',
                              },
                              '& .MuiInputBase-input': {
                                color: 'white',
                              },
                            }}
                            InputLabelProps={{ style: { color: 'white' } }}
                          />
                        )}
                      />
                    </FormControl>
                    {loading ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignContent: 'center',
                          padding: '10px',
                        }}
                      >
                        <CircularProgress color="info" />
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{
                          bgcolor: 'white',
                          width: '150px',
                          color: themeColors.primary,
                          mt: '24px',
                          '&:hover': {
                            bgcolor: '#eeeeee',
                          },
                        }}
                      >
                        {t('footer.form.send')}
                      </Button>
                    )}
                  </form>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <img
                src={`${import.meta.env.VITE_MEDIA}/logoSecond.png`}
                alt=""
                style={{ width: '120px' }}
              />
              <Box sx={{ paddingTop: '40px' }}>
                <Typography
                  variant="body2"
                  color="#FFFFFF99"
                  sx={{ paddingTop: '10px', letterSpacing: '1.5px' }}
                >
                  {t('footer.description1')}
                </Typography>
                <Typography
                  variant="body2"
                  color="#FFFFFF99"
                  sx={{ paddingTop: '10px', letterSpacing: '1.5px' }}
                >
                  {t('footer.description2')}
                </Typography>
                <Typography
                  variant="body2"
                  color="#FFFFFF99"
                  sx={{ paddingTop: '10px', letterSpacing: '1.5px' }}
                >
                  {t('footer.description3')}
                </Typography>
              </Box>
              <Grid
                container
                sx={{ maxWidth: '70%', paddingTop: '24px' }}
                spacing="8px"
              >
                <Grid size={{ xs: isMobile ? 2 : 1 }}>
                  <Typography variant="body2" color="#FFFFFF99">
                    {t('footer.addressLabel')}
                  </Typography>
                </Grid>
                <Grid size={{ xs: isMobile ? 10 : 11 }}>
                  <Typography variant="body2" color="white">
                    {t('footer.address')}
                  </Typography>
                </Grid>
                <Grid size={{ xs: isMobile ? 2 : 1 }}>
                  <Typography variant="body2" color="#FFFFFF99">
                    {t('footer.phoneLabel')}
                  </Typography>
                </Grid>
                <Grid size={{ xs: isMobile ? 10 : 11 }}>
                  <Typography variant="body2" color="white">
                    {t('footer.phone')}
                  </Typography>
                </Grid>
                <Grid size={{ xs: isMobile ? 2 : 1 }}>
                  <Typography variant="body2" color="#FFFFFF99">
                    {t('footer.emailLabel')}
                  </Typography>
                </Grid>
                <Grid size={{ xs: isMobile ? 10 : 11 }}>
                  <Typography variant="body2" color="white">
                    {t('footer.email')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'white',
            paddingTop: '40px',
            marginBottom: isMobile ? '100px' : '0px',
          }}
        >
          <Box sx={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
            <a
              href={`${import.meta.env.VITE_MEDIA}/negishut.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: 'white',
                }}
              >
                {t('footer.accessibility')}
              </Typography>
            </a>
            <a
              href={`${import.meta.env.VITE_MEDIA}/policy.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: 'white',
                }}
              >
                {t('footer.terms')}
              </Typography>
            </a>
          </Box>
          <a
            href="https://digi-trade.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`${import.meta.env.VITE_MEDIA}/company.png`}
              alt="Company Logo"
            />
          </a>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
