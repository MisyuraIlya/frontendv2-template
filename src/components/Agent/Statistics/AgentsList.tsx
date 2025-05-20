import {
  Box,
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React from 'react'
import AgentCard from './AgentCard'
import { useParams } from 'react-router-dom'
import useDataAgentsStatistics from '../../../hooks/agent/useDataAgentsStatistics'

const AgentsList = () => {
  const { dateFrom, dateTo } = useParams()
  const { data, isLoading } = useDataAgentsStatistics(dateFrom!, dateTo!)
  const hebrewMonths = [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ]

  return (
    <Card
      sx={{
        padding: '20px',
        position: 'relative',
        minHeight: '400px',
        height: '100%',
        width: '100%',
      }}
    >
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}

      <Typography variant="h5">פירוט ביצועי סוכנים</Typography>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: '15px',
                  minWidth: '100px',
                  position: 'sticky',
                  left: '0px',
                  bgcolor: 'white',
                }}
              >
                סוכן
              </TableCell>
              <TableCell sx={{ fontSize: '15px', minWidth: '100px' }}>
                מחזור
              </TableCell>
              <TableCell sx={{ fontSize: '15px', minWidth: '100px' }}>
                מס&apos; הזמנות
              </TableCell>
              <TableCell sx={{ fontSize: '15px', minWidth: '100px' }}>
                ממוצע עגלה
              </TableCell>
              <TableCell sx={{ fontSize: '15px', minWidth: '100px' }}>
                סה&quot;כ לקוחות
              </TableCell>
              {hebrewMonths.map((item, index) => (
                <TableCell key={index} sx={{ fontSize: '15px' }}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.lines?.map((row, key) => <AgentCard row={row} key={key} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default AgentsList
