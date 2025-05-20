import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from '@mui/material'
import Loader from '../../../utils/Loader'
import { useParams } from 'react-router-dom'
import Card from './Card'
import useDataUsers from '../../../hooks/admin/useAdminDataUsers'
type RouteParams = {
  userRole: ROLE_TYPES
}

const List = () => {
  const { userRole } = useParams<RouteParams>()
  const { data, isLoading } = useDataUsers()
  const isUser = userRole === 'ROLE_USER'
  const isAgent = userRole === 'ROLE_AGENT'

  return (
    <TableContainer component={Paper}>
      {isLoading && <Loader />}
      <Table>
        <TableHead>
          <TableCell></TableCell>
          <TableCell>מס&apos;</TableCell>
          <TableCell>{isUser ? 'לקוח' : 'סוכן'}</TableCell>
          <TableCell>סטאטוס</TableCell>
          <TableCell></TableCell>
          {isAgent && <TableCell>מאסטר</TableCell>}
        </TableHead>
        {data?.data?.map((element) => {
          return (
            <TableBody key={element.id}>
              <Card element={element} index={element.id!} />
            </TableBody>
          )
        })}
      </Table>
    </TableContainer>
  )
}

export default List
