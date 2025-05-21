import { useState } from 'react'
import { Box, Button, Modal, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import moment from 'moment'
import { DatePicker } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import SearchUserList from '../../../utils/SearchInput/SearchUserList'
import useBonuses from '../../../hooks/admin/useBonuses'
import { nanoid } from 'nanoid'

const Filter = () => {
  const [open, setOpen] = useState(false)
  const { control, handleSubmit, reset, setValue } = useForm()
  const { createBonus } = useBonuses()
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const onSubmit = (data: any) => {
    const obj = {
      extId: nanoid(),
      title: data.bonusName,
      expiredAt: moment(data.expiredAt).format('YYYY-MM-DD'),
      userExtId: data.selectedUser?.extId,
    }
    createBonus(obj)
    handleClose()
  }

  const onClickHandle = (user: IUser) => {
    setValue('selectedUser', user)
  }

  return (
    <Box>
      <Button color="primary" variant="contained" onClick={handleOpen}>
        הוספת בונוס
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2 id="modal-title">הוספת בונוס</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="selectedUser"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <SearchUserList
                  onClick={(user: IUser) => {
                    field.onChange(user)
                    onClickHandle(user)
                  }}
                />
              )}
            />
            <Controller
              name="bonusName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="שם הבונוס"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="expiredAt"
              control={control}
              defaultValue={null}
              render={({ field: { onChange, value } }) => (
                <DemoContainer
                  components={['DatePicker']}
                  sx={{
                    width: '100%',
                    pt: '10px',
                    '& .MuiOutlinedInput-input': { padding: '10px 16px' },
                    '& .MuiInputLabel-root': { top: '-7px' },
                  }}
                >
                  <DatePicker
                    sx={{ width: '100%' }}
                    label="תאריך תפוגה"
                    value={value ? moment(value) : null}
                    onChange={(date) => onChange(date)}
                  />
                </DemoContainer>
              )}
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button color="primary" variant="contained" type="submit">
                שמירה
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleClose}
              >
                ביטול
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  )
}

export default Filter
