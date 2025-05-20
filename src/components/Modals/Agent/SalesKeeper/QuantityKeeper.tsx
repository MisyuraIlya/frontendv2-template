import React, { useState } from 'react'
import useDataQuantityKeeper from '../../../../hooks/agent/useDataQuantityKeeper'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
} from '@mui/material'
import moment from 'moment'
import { numberWithCommas } from '../../../../helpers/numberWithCommas'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'

const QuantityKeeper = ({ userId }: { userId: number }) => {
  const { data } = useDataQuantityKeeper(userId)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { t } = useTranslation()

  const filteredData = data?.filter(
    (row) =>
      String(row.sku)?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      String(row.productDescription)
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase())
  )

  return (
    <>
      <Box sx={{ margin: '20px 0' }}>
        <TextField
          placeholder={t('quantityKeeper.searchBySkuOrName')}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon sx={{ color: 'gray' }} />,
          }}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{ overflow: 'auto', height: '350px' }}
      >
        <Table>
          <TableHead
            sx={{ position: 'sticky', top: 0, backgroundColor: 'white' }}
          >
            <TableRow>
              <TableCell
                align="left"
                sx={{ fontSize: '20px', fontWeight: 700 }}
              >
                {t('quantityKeeper.sku')}
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: '20px', fontWeight: 700 }}
              >
                {t('quantityKeeper.name')}
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: '20px', fontWeight: 700 }}
              >
                {t('quantityKeeper.month')} -{' '}
                {moment().subtract(1, 'month').format('MM/YYYY')}
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: '20px', fontWeight: 700 }}
              >
                {t('quantityKeeper.average3Month')}
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: '20px', fontWeight: 700 }}
              >
                {t('quantityKeeper.name')} -{' '}
                {moment()
                  .subtract(1, 'months')
                  .subtract(1, 'years')
                  .format('MM/YYYY')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((row) => (
              <TableRow key={row.sku}>
                <TableCell align="left">{row.sku}</TableCell>
                <TableCell align="left">{row.productDescription}</TableCell>
                <TableCell align="left">
                  {numberWithCommas(row.sumPreviousMonthCurrentYear)}
                </TableCell>
                <TableCell align="left">
                  {numberWithCommas(row.averageLastThreeMonths)}
                </TableCell>
                <TableCell align="left">
                  {numberWithCommas(row.sumPreviousMonthPreviousYear)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default QuantityKeeper
