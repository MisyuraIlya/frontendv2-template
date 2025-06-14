import { FC, useState } from 'react'
import { Card as MuiCard, Grid, IconButton, Typography } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'

import Modals from '../../Modals'
interface VisitItem {
  item: IAgentObjective
  index: number
}

const Card: FC<VisitItem> = ({ item, index }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <MuiCard
        key={index}
        sx={{
          padding: '20px',
          margin: '10px',
          borderRadius: '5px',
          boxShadow: '0 2px 40px rgba(132,147,168,.15)',
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 4 }} sx={{ display: 'flex', alignItems: 'center' }}>
            {item?.client && (
              <Typography>
                {(item?.client as IUser)?.extId} -{' '}
                {(item?.client as IUser)?.name}
              </Typography>
            )}
          </Grid>
          <Grid size={{ xs: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{(item?.client as IUser)?.address}</Typography>
          </Grid>
          <Grid
            size={{ xs: 2 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>{(item?.client as IUser)?.phone}</Typography>
          </Grid>
          <Grid
            size={{ xs: 2 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item.hourFrom && item.hourTo ? (
              <Typography>
                {item.hourFrom} - {item.hourTo}
              </Typography>
            ) : (
              <Typography>אין תאריכים</Typography>
            )}
          </Grid>
          <Grid
            size={{ xs: 1 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>{item.choosedDay}</Typography>
          </Grid>
          <Grid size={{ xs: 1 }}>
            <IconButton
              onClick={() => setOpen(!open)}
              sx={{
                borderRadius: '5px',
                backgroundColor: '#f7f9fc',
                minWidth: '80px',
              }}
            >
              <ModeEditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </MuiCard>
      <Modals.Agent.Visit.Handler open={open} setOpen={setOpen} item={item} />
    </>
  )
}

export default Card
