import { useState } from 'react'
import { Box, Button, Modal, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import SearchProductList from '../../../utils/SearchInput/SearchProductList'
import useBonuseItem from '../../../hooks/admin/useAdminBonusItem'

const Filter = () => {
  const [open, setOpen] = useState(false)
  const { control, handleSubmit, reset, setValue } = useForm()
  const { createBonus, data: BonusData } = useBonuseItem()
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const onSubmit = (data: any) => {
    const obj = {
      bonus: {
        id: BonusData?.id,
      },
      product: {
        id: data?.selectedProduct?.id,
      },
      minimumQuantity: +data?.minimumQuantity,
      bonusProduct: {
        id: data?.selectedBonusProduct?.id,
      },
      bonusQuantity: +data.bonusQuantity,
    }
    createBonus(obj)
    handleClose()
  }

  const onClickHandle = (product: IProduct) => {
    setValue('selectedProduct', product)
  }

  const onClickSecondHandle = (product: IProduct) => {
    setValue('selectedBonusProduct', product)
  }

  return (
    <Box>
      <Button color="primary" variant="contained" onClick={handleOpen}>
        הוספת פריט
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
          <h2 id="modal-title">הוספת פריט</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="selectedUser"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <SearchProductList
                  onClick={(product: IProduct) => {
                    field.onChange(product)
                    onClickHandle(product)
                  }}
                />
              )}
            />
            <Controller
              name="minimumQuantity"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="מינימום לבונוס"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="selectedUser"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <SearchProductList
                  onClick={(product: IProduct) => {
                    field.onChange(product)
                    onClickSecondHandle(product)
                  }}
                />
              )}
            />
            <Controller
              name="bonusQuantity"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="כמות בונוס"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
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
