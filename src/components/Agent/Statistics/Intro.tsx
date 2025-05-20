import { CardMedia, Typography, Card } from '@mui/material'
import React from 'react'

const Intro = () => {
  return (
    <Card sx={{ minWidth: '250px', padding: '20px', height: '100%' }}>
      <Typography variant="h5">שלום,</Typography>
      <Typography variant="h5">{settings?.title}</Typography>
      <CardMedia
        component="img"
        image="https://bazar-react.vercel.app/assets/images/illustrations/dashboard/welcome.svg"
        alt="Paella dish"
        sx={{ width: '150px', padding: '10px' }}
      />
    </Card>
  )
}

export default Intro
