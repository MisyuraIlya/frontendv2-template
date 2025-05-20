import {
  Box,
  CircularProgress,
  IconButton,
  TableCell,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { FC, useState } from 'react'
import { UserStatus } from '../../../enums/status'
import useDataSalesKeeper from '../../../hooks/agent/useDataSalesKeeper'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import SalesKeeper from '../../Modals/Agent/SalesKeeper'
import { useOffline } from '../../../provider/OfflineProvider'
import { useTranslation } from 'react-i18next'
import useDirection from '../../../hooks/useDirection'

interface ICardProps {
  element: IUser
}

const Card: FC<ICardProps> = ({ element }) => {
  const { t } = useTranslation()
  const { data: sales } = useDataSalesKeeper(element.id)
  const [open, setOpen] = useState(false)
  const { isOnline } = useOffline()
  const dir = useDirection()
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setOpen(true)
  }

  const handleSales = () => {
    if (sales) {
      if (
        sales?.sumPreviousMonthCurrentYear > sales?.sumPreviousMonthPreviousYear
      ) {
        return (
          <Tooltip title={t('agentClines.salesIncrease')}>
            <IconButton onClick={handleClick}>
              <TrendingUpIcon color="success" />
            </IconButton>
          </Tooltip>
        )
      } else if (
        sales?.sumPreviousMonthCurrentYear === 0 &&
        sales?.sumPreviousMonthPreviousYear === 0
      ) {
        return (
          <Tooltip title={t('agentClines.inactiveCustomer')}>
            <IconButton onClick={handleClick}>
              <TrendingFlatIcon color="info" />
            </IconButton>
          </Tooltip>
        )
      } else {
        return (
          <Tooltip title={t('agentClines.salesDecrease')}>
            <IconButton onClick={handleClick}>
              <TrendingDownIcon color="error" />
            </IconButton>
          </Tooltip>
        )
      }
    } else {
      return (
        <Box>
          <CircularProgress size="20px" color="info" />
        </Box>
      )
    }
  }

  return (
    <>
      <TableCell>
        <Typography variant="body2">{element?.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{element?.extId}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{element?.phone}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{element?.hp}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{element?.maxObligo}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{element?.maxCredit}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{element?.address}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{element?.city}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{UserStatus(element, dir)}</Typography>
      </TableCell>
      {isOnline && (
        <>
          <TableCell
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {handleSales()}
          </TableCell>
          <SalesKeeper active={open} setActive={setOpen} user={element} />
        </>
      )}
    </>
  )
}

export default Card
