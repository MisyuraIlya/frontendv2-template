import { Chip } from '@mui/material'

export const UserStatus = (user: IUser, dir: 'rtl' | 'ltr') => {
  if (user.isRegistered) {
    if (user.isBlocked) {
      return (
        <Chip
          variant="outlined"
          sx={{ minWidth: '100px' }}
          label={dir === 'rtl' ? 'לקוח חסום' : 'Blocked customer'}
          color="error"
        />
      )
    } else {
      return (
        <Chip
          variant="outlined"
          sx={{ minWidth: '100px' }}
          label={dir === 'rtl' ? 'לקוח פעיל' : 'Active customer'}
          color="success"
        />
      )
    }
  } else {
    return (
      <Chip
        variant="outlined"
        sx={{ minWidth: '100px' }}
        label={dir === 'rtl' ? 'לקוח לא פעיל' : 'Inactive customer'}
        color="info"
      />
    )
  }
}

export const DocumentsStatus = () => {}
