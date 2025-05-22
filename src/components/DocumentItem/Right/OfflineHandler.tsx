import { Button } from '@mui/material'
import React, { FC } from 'react'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import { HistoryDetailedRepository, HistoryRepository } from '../../../db'
import { useNavigate, useParams } from 'react-router-dom'
import { OfflineService } from '../../../services/offline.service'
import { useCart } from '../../../store/cart.store'
import moment from 'moment'
import { useAuth } from '../../../store/auth.store'

interface OfflineHandlerProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const OfflineHandler: FC<OfflineHandlerProps> = ({ setLoading }) => {
  const { id } = useParams()
  const { setCart, setComment, setDeliveryAt} = useCart()
  const navigate = useNavigate()
  const { user } = useAuth()

  const handlePricesOffline = async () => {
    try {
      setLoading(true)
      if (id) {
        const history = await HistoryRepository.findHistoryById(+id)
        if (history) {
          const historyDetailed = await HistoryDetailedRepository.findHistoryDetailedByHistoryId(id)
          const response = await OfflineService.handleOfflinePrices(history,historyDetailed,user!)
          if (response) {
            setCart(response)
            navigate('/cart')
            setComment(history.comment)
            setDeliveryAt(moment(history.deliveryAt))
          }
        }
      }
    } catch (e) {
      console.log('[ERROR]', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        sx={{ height: '40px', whiteSpace: 'nowrap' }}
        variant="contained"
        startIcon={<CurrencyExchangeIcon sx={{ fontSize: '30px' }} />}
        onClick={() => handlePricesOffline()}
      >
        עדכון מחירים
      </Button>
    </>
  )
}

export default OfflineHandler
