// utils/CustomSelectBox.tsx

import { Box, MenuItem, Select, Typography } from '@mui/material'
import useDirection from '../hooks/useDirection'
import { FC } from 'react'

interface CustomSelectBoxProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: selectObject[]
}

const CustomSelectBox: FC<CustomSelectBoxProps> = ({
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
      onChange={(e) => onChange(e.target.value as string)}
      renderValue={(selected) => {
        const find = options.find((x) => x.value === selected)
        return (
          <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <Typography fontWeight={600} lineHeight={'12px'}>
              {label}:
            </Typography>
            <Typography>
              {dir === 'rtl' ? find?.label : find?.englishLabel}
            </Typography>
          </Box>
        )
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {dir === 'rtl' ? option.label : option.englishLabel}
        </MenuItem>
      ))}
    </Select>
  )
}

export default CustomSelectBox
