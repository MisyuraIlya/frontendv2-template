import React from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useCart } from '../../../store/cart.store'
import { onAsk } from '../../../utils/MySweetAlert'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../store/auth.store'
import { URLS } from '../../../enums/urls'
import Card from './Card'
import { useOffline } from '../../../provider/OfflineProvider'
import useDataAgentClients from '../../../hooks/agent/useAgentDataClients'
import { useTranslation } from 'react-i18next'
import useDirection from '../../../hooks/useDirection'

const List = () => {
  const { data, isLoading } = useDataAgentClients()
  const { setUser } = useAuth()
  const { cart, setCart } = useCart()
  const navigate = useNavigate()
  const { isOnline } = useOffline()
  const { t } = useTranslation()
  const dir = useDirection()

  const handleUser = async (user: IUser) => {
    if (cart.length > 0) {
      const ask = await onAsk(
        t('agentClients.cartWarningTitle'),
        t('agentClients.cartWarningText'),
        dir
      )
      if (ask) {
        setCart([])
        setUser(user)
        navigate(URLS.PROFILE.LINK)
      }
    } else {
      setUser(user)
      navigate(URLS.PROFILE.LINK)
    }
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table className="lines-sub-cont">
          <TableHead>
            <TableRow className="heading">
              <TableCell
                className="col-cont sticky-col"
                sx={{ minWidth: '80px' }}
              >
                {t('agentClients.clientName')}
              </TableCell>
              <TableCell className="col-cont sticky-col">
                {t('agentClients.clientNumber')}
              </TableCell>
              <TableCell className="col-cont sticky-col">
                {t('agentClients.phone')}
              </TableCell>
              <TableCell className="col-cont">
                {t('agentClients.taxNumber')}
              </TableCell>
              <TableCell className="col-cont">
                {t('agentClients.obligo')}
              </TableCell>
              <TableCell className="col-cont">
                {t('agentClients.debtBalance')}
              </TableCell>
              <TableCell className="col-cont">
                {t('agentClients.address')}
              </TableCell>
              <TableCell className="col-cont">
                {t('agentClients.city')}
              </TableCell>
              <TableCell className="col-cont">
                {t('agentClients.status')}
              </TableCell>
              {isOnline && (
                <TableCell className="col-cont">
                  {t('agentClients.turnover')}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              data?.data?.map((element) => (
                <TableRow
                  key={element.id}
                  className="item"
                  onClick={() => handleUser(element)}
                >
                  <Card element={element} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data?.total === 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: '100px',
            mb: '90px',
          }}
        >
          <Typography
            sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 500 }}
          >
            {t('agentClients.emptyClient')}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default List
