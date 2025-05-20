import React from 'react'
import useDataSalesKeeper from '../../../../hooks/agent/useDataSalesKeeper'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const SalesKeeperAverage = ({ userId }: { userId: number }) => {
  const { data } = useDataSalesKeeper(userId)
  const { t } = useTranslation()
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontSize: '20px', fontWeight: 700 }}>
              {t('salesKeper.month')} -{' '}
              {moment().subtract(1, 'month').format('MM/YYYY')}
            </TableCell>
            <TableCell align="left" sx={{ fontSize: '20px', fontWeight: 700 }}>
              {t('salesKeper.average3Month')}
            </TableCell>
            <TableCell align="left" sx={{ fontSize: '20px', fontWeight: 700 }}>
              {t('salesKeper.month')} -{' '}
              {moment()
                .subtract(1, 'months')
                .subtract(1, 'years')
                .format('MM/YYYY')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left" sx={{ fontSize: '18px', fontWeight: 400 }}>
              {data?.sumPreviousMonthCurrentYear.toFixed(2)}₪
            </TableCell>
            <TableCell align="left" sx={{ fontSize: '18px', fontWeight: 400 }}>
              {data?.averageLastThreeMonths.toFixed(2)}₪
            </TableCell>
            <TableCell align="left" sx={{ fontSize: '18px', fontWeight: 400 }}>
              {data?.sumPreviousMonthPreviousYear.toFixed(2)}₪
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SalesKeeperAverage
