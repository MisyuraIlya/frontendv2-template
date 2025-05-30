import { I18nextProvider, useTranslation } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import DynamicDirectionProvider from './provider/DynamicDirectionProvider'
import AppRoutes from './RouterApp'
import i18n from './i18n'
import { ThemeProvider } from '@mui/material'
import theme from './styles/mui'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { AuthProvider } from './provider/AuthProvider'
import { MobileProvider } from './provider/MobileProvider'
import { OfflineProvider } from './provider/OfflineProvider'
import { ModalsProvider } from './provider/ModalProvider'
import { NotificationsProvider } from './provider/PushNotification'
import { PushProvider } from './provider/PushNotificationProvider'

const supportedLangs = ['he', 'en'] as const
const defaultLng = 'he'
type Lang = (typeof supportedLangs)[number]

function AppWithRouter() {
  const { i18n } = useTranslation()

  const fullPath =
    window.location.pathname + window.location.search + window.location.hash
  const segs = window.location.pathname.split('/')
  const first = segs[1] as string
  const lang: Lang = supportedLangs.includes(first as Lang)
    ? (first as Lang)
    : defaultLng

  if (!supportedLangs.includes(first as Lang)) {
    const tail = fullPath.replace(/^\/+/, '')
    window.location.replace(`/${defaultLng}/${tail}`)
    return null
  }

  if (i18n.language !== lang) {
    i18n.changeLanguage(lang)
  }

  return (
    <BrowserRouter basename={`/${lang}`} key={lang}>
      <DynamicDirectionProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider
            dateAdapter={AdapterMoment}
            adapterLocale={lang}
          >
            <AuthProvider>
              <MobileProvider>
                <OfflineProvider>
                  <ModalsProvider>
                    <PushProvider>
                      <NotificationsProvider>
                        <AppRoutes />
                      </NotificationsProvider>
                    </PushProvider>
                  </ModalsProvider>
                </OfflineProvider>
              </MobileProvider>
            </AuthProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </DynamicDirectionProvider>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AppWithRouter />
    </I18nextProvider>
  )
}
