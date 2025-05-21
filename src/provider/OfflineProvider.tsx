import {
  FC,
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import db from '../db'
import SignalWifiBadIcon from '@mui/icons-material/SignalWifiBad'
import { Backdrop, Box, Typography, Snackbar, Alert } from '@mui/material'
import { themeColors } from '../styles/mui'
import { useMobile } from './MobileProvider'
import CircularProgress from '@mui/material/CircularProgress'
import { useAuth } from '../store/auth.store'
import apiInterceptor from '../api/api.interceptor'

interface ModalContextType {
  isOnline: boolean
}

type dbTypes =
  | 'user'
  | 'category'
  | 'product'
  | 'attribute-main'
  | 'attribute-sub'
  | 'product-attribute'

const ModalContext = createContext<ModalContextType | null>(null)
export const useOffline = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Can not run without "OfflineContext Provider"')
  }
  return context
}

interface OfflineProviderProps {
  children: ReactNode
}

async function clearAllTables() {
  await db.transaction('rw', db.tables, async () => {
    for (const table of db.tables) {
      await table.clear()
    }
  })
}

const OfflineProvider: FC<OfflineProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [loading, setLoading] = useState(false)
  const { isAgent } = useAuth()
  const { isMobile } = useMobile()
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info'
  >('info')
  const handleAlertClose = () => setAlertOpen(false)

  async function fetchDatabaseFile(url: string, type: dbTypes) {
    try {
      const response = await apiInterceptor.get(url)
      const { data } = await response

      if (Array.isArray(data)) {
        switch (type) {
          case 'user':
            await db.users.bulkPut(data)
            break
          case 'product':
            await db.products.bulkPut(data)
            break
          case 'category':
            await db.categories.bulkPut(data)
            break
          case 'attribute-main':
            await db.attributeMain.bulkPut(data)
            break
          case 'attribute-sub':
            await db.attributeSub.bulkPut(data)
            break
          case 'product-attribute':
            await db.productAttribute.bulkPut(data)
            break
          default:
            console.error('UNCORRECT DATA TYPE')
        }
        console.log(
          'Data has been successfully updated in Dexie using bulkPut.'
        )
      } else {
        console.error('Invalid data format. Expected an array.')
      }
    } catch (error) {
      console.error('Error in fetchDatabaseFile:', error)
    }
  }

  useEffect(() => {
    if (!isAgent) return
    const today = new Date().toISOString().split('T')[0]

    const lastUpdated = localStorage.getItem('updatedAt')
    console.log('lastUpdated',lastUpdated)
    const updateData = async () => {
      setLoading(true)
      try {
        if (lastUpdated !== today) {
          console.log('Clearing out old data…')
          await clearAllTables()

          await fetchDatabaseFile(
            `${import.meta.env.VITE_API}/offline/export/user`,
            'user'
          )
          await fetchDatabaseFile(
            `${import.meta.env.VITE_API}/offline/export/category`,
            'category'
          )
          await fetchDatabaseFile(
            `${import.meta.env.VITE_API}/offline/export/product`,
            'product'
          )
          await fetchDatabaseFile(
            `${import.meta.env.VITE_API}/offline/export/attribute-main`,
            'attribute-main'
          )
          await fetchDatabaseFile(
            `${import.meta.env.VITE_API}/offline/export/attribute-sub`,
            'attribute-sub'
          )
          await fetchDatabaseFile(
            `${import.meta.env.VITE_API}/offline/export/product-attribute`,
            'product-attribute'
          )

          localStorage.setItem('updatedAt', today)
        } else {
          console.log('Data is already updated today. Skipping update.')
        }
      } catch (error) {
        console.error('Error updating data:', error)
      } finally {
        setLoading(false)
      }
    }

    updateData()
  }, [])

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setAlertMessage('חזרה הקליטה')
      setAlertSeverity('success')
      setAlertOpen(true)
    }
    const handleOffline = () => {
      setIsOnline(false)
      setAlertMessage('נכנסת למוד אופליין, ללא קליטה')
      setAlertSeverity('error')
      setAlertOpen(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <ModalContext.Provider value={{ isOnline }}>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography sx={{ fontWeight: 600, fontSize: '20px', mt: 2 }}>
            טעינת נתונים
          </Typography>
        </Box>
      </Backdrop>

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      {!isOnline && (
        <Box
          sx={{
            position: 'fixed',
            bottom: isMobile ? 70 : 70,
            right: isMobile ? 20 : 70,
            width: isMobile ? 30 : 60,
            height: isMobile ? 30 : 60,
            bgcolor: loading ? 'grey' : themeColors.primary,
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <SignalWifiBadIcon
            sx={{ fontSize: isMobile ? 20 : 40 }}
          />
        </Box>
      )}

      {children}
    </ModalContext.Provider>
  )
}

export { OfflineProvider }
