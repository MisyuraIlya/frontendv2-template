import { Box, MenuItem, Select } from '@mui/material'
import React from 'react'
import { datesHandler } from '../../../enums/dateHandler'
import { useAgentStore } from '../../../store/agent.store'

const Filter = () => {
  const { year, setYear } = useAgentStore()
  return (
    <Box>
      <Select
        value={year}
        sx={{ height: '40px', minWidth: '150px' }}
        onChange={(e) => setYear(e.target.value)}
      >
        {datesHandler?.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default Filter
