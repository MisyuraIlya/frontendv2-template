import { Button } from '@mui/material'
import React, { FC } from 'react'
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import hooks from '../../../hooks'
import { HistoryDetailedRepository, HistoryRepository } from '../../../db'
import { useParams } from 'react-router-dom'
import { OfflineService } from '../../../services/offline.service'

interface OfflineHandlerProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const OfflineHandler: FC<OfflineHandlerProps> = ({ setLoading }) => {
  const { id } = useParams()
  const { data, mutate } = hooks.useDataDocumentsItem()

  const handlePricesOffline = async () => {
    try {
      setLoading(true)
      if (id) {
        const history = await HistoryRepository.findHistoryById(+id)
        if (history) {
          const historyDetailed =
            await HistoryDetailedRepository.findHistoryDetailedByHistoryId(id)
          const response = await OfflineService.handleOfflinePrices(
            history,
            historyDetailed
          )

          if (response.history && response.historyDetailed) {
            await HistoryRepository.updateHistoryById(+id, {
              ...response.history,
              tax: response.tax,
            })

            for (const item of response.historyDetailed) {
              const res2 =
                await HistoryDetailedRepository.updateHistoryDetailedById(
                  item.id!,
                  {
                    ...item,
                    tax: response.tax,
                  }
                )
              mutate()
              if (!res2) {
                console.error(
                  `Failed to update historyDetailed with ID: ${item.id}`
                )
              }
            }
          }
          console.log('Response:', response)
        }
      }
    } catch (e) {
      console.log('[ERROR]', e)
    } finally {
      setLoading(false)
    }
  }

  const handleSendOfflineOrder = async () => {
    try {
      if (id) {
        const history = await HistoryRepository.findHistoryById(+id)
        if (history) {
          const historyDetailed =
            await HistoryDetailedRepository.findHistoryDetailedByHistoryId(id)
          const response = await OfflineService.sendOfflineOrder(
            history,
            historyDetailed
          )
          if (response) {
          }

          console.log('Response:', response)
        }
      }
    } catch (e) {
      console.log('[ERROR]', e)
    }
  }

  return (
    <>
      <Button
        sx={{ height: '40px', whiteSpace: 'nowrap' }}
        variant="contained"
        startIcon={<SendAndArchiveIcon sx={{ fontSize: '30px' }} />}
        onClick={() => handleSendOfflineOrder()}
        disabled={data?.totalPriceAfterTax === 0}
      >
        שדר הזמנה
      </Button>
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
