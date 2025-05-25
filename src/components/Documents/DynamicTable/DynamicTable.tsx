import { FC } from 'react'
import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import useDirection from '../../../hooks/useDirection'
import moment from 'moment'
import emptyDoc from '../../../assets/images/empyDocument.svg'

interface DynamicTableProps {
  data: IDynamicTables | undefined
  isLoading: boolean
}

const DynamicTable: FC<DynamicTableProps> = ({ data, isLoading }) => {
  const dir = useDirection()
  const cols = dir === 'rtl' ? data?.columns : data?.columnsEnglish

  return (
    <Box sx={{ margin: '50px 0px' }}>
      {data?.lines?.length === 0 && !isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={emptyDoc}
            alt="Empty Document"
          />
        </Box>
      ) : null}

      {isLoading &&
        Array.from({ length: 12 }).map((_, index) => (
          <Skeleton
            variant="rounded"
            key={index}
            height={50}
            sx={{ margin: '5px 0' }}
          />
        ))}

      {(data?.lines ?? []).length > 0 ? (
        <TableContainer component={Paper}>
          <Table className="lines-sub-cont">
            <TableHead>
              <TableRow className="heading">
                {cols?.map((column, columnIndex) => (
                  <TableCell
                    key={columnIndex}
                    className={`col-cont ${columnIndex < 2 ? 'sticky-col' : ''}`}
                    sx={{ minWidth: '80px' }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.lines?.map((row, rowIndex) => {
                const cells = Object.values(row)
                return (
                  <TableRow key={rowIndex}>
                    {cells.map((cell, cellIndex) => {
                      const isDate = cellIndex === 3 || cellIndex === 10
                      return (
                        <TableCell key={cellIndex}>
                          <Typography variant="body2">
                            {cell == null
                              ? '-'
                              : isDate
                                ? moment(cell).format('DD-MM-YYYY')
                                : `${cell}`}
                          </Typography>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Box>
  )
}

export default DynamicTable
