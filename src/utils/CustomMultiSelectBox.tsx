import React, { FC } from 'react'
import {
  Box,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
} from '@mui/material'

type Option = {
  value: string
  label: string
  count?: number
}

interface CustomMultiSelectBoxProps {
  label: string
  values: string[]
  onChange: (values: string[]) => void
  options: Option[]
}

const CustomMultiSelectBox: FC<CustomMultiSelectBoxProps> = ({
  label,
  values,
  onChange,
  options,
}) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    onChange(typeof value === 'string' ? value.split(',') : value)
  }

  const selectedLabels = options
    .filter((option) => values.includes(option.value))
    .map((option) => option.label)

  return (
    <Select
      multiple
      displayEmpty
      sx={{
        height: '44px',
        minWidth: '200px',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E0E0E0',
        },
      }}
      value={values}
      onChange={handleChange}
      renderValue={() => (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
            alignItems: 'center',
          }}
        >
          <Typography fontWeight={600} lineHeight={'12px'}>
            {label}:
          </Typography>
          <Typography>
            {selectedLabels.length > 0 ? (
              selectedLabels.join(', ')
            ) : (
              <span>בחירה</span>
            )}
          </Typography>
        </Box>
      )}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Checkbox checked={values.indexOf(option.value) > -1} />
          <ListItemText primary={`${option.label} (${option?.count})`} />
        </MenuItem>
      ))}
    </Select>
  )
}

export default CustomMultiSelectBox
