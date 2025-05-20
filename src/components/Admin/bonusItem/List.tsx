import React from 'react'
import useBonuseItem from '../../../hooks/admin/useAdminBonusItem'
import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material'
import Loader from '../../../utils/Loader'
import Card from './Card'
import moment from 'moment'

const List = () => {
  const { data, isLoading } = useBonuseItem()
  return (
    <TableContainer component={Paper}>
      {isLoading && <Loader />}
      <Box sx={{ marginTop: '10px' }}>
        <Typography fontSize={20} fontWeight="500">
          שם: {data?.title}
        </Typography>
        <Typography fontSize={20} fontWeight="500">
          תוקף עד: {moment(data?.expiredAt).format('DD-MM-YYYY')}
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableCell>מק&apos;ט</TableCell>
          <TableCell>שם פריט</TableCell>
          <TableCell>תמונה</TableCell>
          <TableCell>מינימום לבונוס</TableCell>
          <TableCell>מק&apos;ט בונוס</TableCell>
          <TableCell>שם פריט בונוס</TableCell>
          <TableCell>תמונה פריט בונוס</TableCell>
          <TableCell>כמות בונוס</TableCell>
        </TableHead>
        {data &&
          data?.bonusDetaileds?.map((element) => {
            return <Card element={element} key={element.id} />
          })}
      </Table>
    </TableContainer>
  )
}

export default List
