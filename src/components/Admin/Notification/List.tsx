import React from 'react'
import { Box } from '@mui/material'
import Card from './Card'
import useDataNotification from '../../../hooks/admin/useAdminDataNotification'

const List = () => {
  const { data } = useDataNotification()
  return (
    <Box>
      {data?.map((element) => {
        return <Card element={element} index={element.id!} key={element.id} />
      })}
    </Box>
  )
}

export default List
