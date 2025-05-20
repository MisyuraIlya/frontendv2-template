import React, {
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
  | 'attribute_main'
  | 'attribute_sub'
  | 'product_attribute'

const ModalContext = createContext<ModalContextType | null>(null)

const useOffline = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Can not run without "OfflineContext Provider"')
  }
  return context
}

interface OfflineProviderProps {
  children: ReactNode
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

      const { data } = await response.data

      if (Array.isArray(data)) {
        if (type === 'user') {
          await db.users.bulkPut(data)
        } else if (type === 'product') {
          await db.products.bulkPut(data)
        } else if (type === 'category') {
          await db.categories.bulkPut(data)
        } else if (type === 'attribute_main') {
          await db.attributeMain.bulkPut(data)
        } else if (type === 'attribute_sub') {
          await db.attributeSub.bulkPut(data)
        } else if (type === 'product_attribute') {
          await db.productAttribute.bulkPut(data)
        } else {
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
    if (isAgent) {
      const today = new Date().toISOString().split('T')[0]
      const lastUpdated = localStorage.getItem('updatedAt')

      const updateData = async () => {
        setLoading(true)
        try {
          if (lastUpdated !== today) {
            console.log('Updating data since it has not been updated today.')
            await db.delete()
            await fetchDatabaseFile(
              `${import.meta.env.VITE_API}/apiv2/export/user`,
              'user'
            )
            await fetchDatabaseFile(
              `${import.meta.env.VITE_API}/apiv2/export/category`,
              'category'
            )
            await fetchDatabaseFile(
              `${import.meta.env.VITE_API}/apiv2/export/product`,
              'product'
            )
            await fetchDatabaseFile(
              `${import.meta.env.VITE_API}/apiv2/export/attribute_main`,
              'attribute_main'
            )
            await fetchDatabaseFile(
              `${import.meta.env.VITE_API}/apiv2/export/attribute_sub`,
              'attribute_sub'
            )
            await fetchDatabaseFile(
              `${import.meta.env.VITE_API}/apiv2/export/product_attribute`,
              'product_attribute'
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
    }
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

  const value = {
    isOnline,
  }

  return (
    <ModalContext.Provider value={value}>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
          <Typography sx={{ fontWeight: 600, fontSize: '20px', mt: '20px' }}>
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
            width: isMobile ? '30px' : '60px',
            height: isMobile ? '30px' : '60px',
            bgcolor: loading ? 'grey' : themeColors.primary,
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <SignalWifiBadIcon sx={{ fontSize: isMobile ? '20px' : '40px' }} />
        </Box>
      )}

      {children}
    </ModalContext.Provider>
  )
}

export { useOffline, OfflineProvider }
