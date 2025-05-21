import React, { FC, ReactNode, CSSProperties } from 'react'
import { Box, Typography } from '@mui/material'
import { themeColors } from '../styles/mui'

interface MyCheapButtonProps {
  children: ReactNode
  sx?: CSSProperties
}

const MyCheapButton: FC<MyCheapButtonProps> = ({ children, sx }) => {
  return (
    <Box
      sx={{
        ...sx,
        borderRadius: '5px',
        minWidth: '50px',
        backgroundColor: '#f7f9fc',
        padding: '5px 15px',
        '&:hover': { backgroundColor: '#ecf1f8' },
      }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="body1"
        style={{ color: themeColors.primary }}
        fontWeight={800}
      >
        {children}
      </Typography>
    </Box>
  )
}

export default MyCheapButton
