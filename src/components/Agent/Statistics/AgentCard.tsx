import { Box, TableCell, TableRow } from '@mui/material'
import { FC } from 'react'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { themeColors } from '../../../styles/mui'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

interface AgentCardProps {
  row: IAgentProfile
  key: number
}

const AgentCard: FC<AgentCardProps> = ({ row, key }) => {
  return (
    <TableRow key={key}>
      <TableCell
        sx={{
          fontSize: '15px',
          position: 'sticky',
          left: '0px',
          bgcolor: 'white',
        }}
      >
        {row.agentName}
      </TableCell>
      <TableCell sx={{ fontSize: '15px' }}>
        {numberWithCommas(row.total.toFixed(2))}
      </TableCell>
      <TableCell sx={{ fontSize: '15px' }}>
        {numberWithCommas(row.totalOrders.toFixed(2))}
      </TableCell>
      <TableCell sx={{ fontSize: '15px' }}>
        {numberWithCommas(row.averageBasket.toFixed(2))}
      </TableCell>
      <TableCell sx={{ fontSize: '15px' }}>
        {numberWithCommas(row.totalClients)}
      </TableCell>
      {row?.monthlyTotals?.map((item, key) => (
        <TableCell
          key={key}
          sx={{
            fontSize: '15px',
            color:
              item?.succeed !== null
                ? item?.succeed
                  ? themeColors.success
                  : themeColors.error
                : 'inherit',
          }}
        >
          <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {numberWithCommas(item.total.toFixed(2))}/
            {numberWithCommas(item?.target?.toFixed(2))}
            {item?.succeed !== null ? (
              item?.succeed ? (
                <TrendingUpIcon />
              ) : (
                <TrendingDownIcon />
              )
            ) : null}
          </Box>
        </TableCell>
      ))}
    </TableRow>
  )
}

export default AgentCard
