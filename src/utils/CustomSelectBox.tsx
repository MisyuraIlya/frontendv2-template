import { Box, MenuItem, Select, Typography } from '@mui/material'
import React, { FC } from 'react'
import useDirection from '../hooks/useDirection'

interface CustomSelectBox {
  label: string
  value: string
  onChange: (value: string) => void
  options: selectObject[]
}

const CustomSelectBox: FC<CustomSelectBox> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const dir = useDirection()
  return (
    <Select
      sx={{
        minWidth: '150px',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E0E0E0',
        },
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      renderValue={(selected) => {
        const find = options?.find((x) => x.value === selected)
        return (
          <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <Typography fontWeight={600} lineHeight={'12px'}>
              {label}:
            </Typography>
            <Typography>
              {' '}
              {dir === 'rtl' ? find?.label : find?.englishLabel}
            </Typography>
          </Box>
        )
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.label}>
          {dir === 'rtl' ? option.label : option?.englishLabel}
        </MenuItem>
      ))}
    </Select>
  )
}

export default CustomSelectBox
