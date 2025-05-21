import React, { useState } from 'react'
import { useAuth } from '../../../../store/auth.store'
import ModalWrapper from '../../ModalWrapper'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import {
  HEBREW_DAYS,
  ReactSelectOptionsOfFullHour,
} from '../../../../helpers/arrayOfMonths'
import moment from 'moment'
import SearchUserList from '../../../../utils/SearchInput/SearchUserList'
import { onAsk, onSuccessAlert } from '../../../../utils/MySweetAlert'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import hooks from '../../../../hooks'
import { useTranslation } from 'react-i18next'
import useDirection from '../../../../hooks/useDirection'

type EditAndCreateVisitForm = {
  week1: boolean
  week2: boolean
  week3: boolean
  week4: boolean
  day: string
  hourFrom: string
  hourTo: string
}

const Handler = ({
  item,
  open,
  setOpen,
}: {
  item?: IAgentObjective
  open: boolean
  setOpen: (bool: boolean) => void
}) => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const dir = useDirection()

  const { createVisit, updateVisit, deleteVisit } =
    hooks.agent.useDataAgentObjectives('visit')
  const { register, handleSubmit, control } = useForm<EditAndCreateVisitForm>({
    defaultValues: {
      week1: item?.week1 || false,
      week2: item?.week2 || false,
      week3: item?.week3 || false,
      week4: item?.week4 || false,
      day: item?.choosedDay || '',
      hourFrom: item?.hourFrom || '',
      hourTo: item?.hourTo || '',
    },
  })

  const handleClick = (data: EditAndCreateVisitForm) => {
    if (item?.client?.name) {
      item.week1 = data.week1 ?? item.week1
      item.week2 = data.week2 ?? item.week2
      item.week3 = data.week3 ?? item.week3
      item.week4 = data.week4 ?? item.week4
      item.choosedDay = data.day ?? item.choosedDay
      item.hourFrom = data.hourFrom ?? item.hourFrom
      item.hourTo = data.hourTo ?? item.hourTo
      updateVisit(item)
      onSuccessAlert(t('visitCreate.updateTitle'), '')
    } else {
      if (selectedUser && user) {
        const obj: IAgentObjective = {
          agent: user,
          client: selectedUser,
          isCompleted: false,
          completedAt: null,
          title: '',
          description: '',
          week1: data.week1,
          week2: data.week2,
          week3: data.week3,
          week4: data.week4,
          hourFrom: data.hourFrom,
          hourTo: data.hourTo,
          choosedDay: data.day,
          date: moment().format('YYYY-MM-DD'),
          objectiveType: 'visit',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
          subTusk: [],
        }
        onSuccessAlert(t('visitCreate.createTitle'), '')
        createVisit(obj)
      }
    }
    setOpen(false)
  }

  const handleDelete = async () => {
    const ask = await onAsk(t('visitCreate.deleteButton'), '', dir)
    if (ask && item?.id) {
      deleteVisit(item.id)
      setOpen(false)
      onSuccessAlert(t('visitCreate.deleteButton'), '')
    }
  }

  const onClickHandle = (user: IUser) => {
    setSelectedUser(user)
  }

  const isMobile = useMediaQuery('(max-width:800px)')
  const weekFields = ['week1', 'week2', 'week3', 'week4'] as const
  return (
    <ModalWrapper
      active={open}
      setActive={setOpen}
      width={isMobile ? 80 : 20}
      height={isMobile ? '70%' : '65%'}
    >
      <form style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }} onSubmit={handleSubmit(handleClick)}>
        <Box>
          <Typography variant="h5" sx={{ padding: '20px 0' }}>
            {item?.id
              ? t('visitCreate.updateTitle')
              : t('visitCreate.createTitle')}
          </Typography>
          {item?.id ? (
            <Box
              sx={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                margin: '10px 0',
              }}
            >
              <PersonOutlineIcon />
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontSize: '18px' }}
              >
                #{(item.client as IUser).extId} — {(item.client as IUser).name}
              </Typography>
            </Box>
          ) : (
            <SearchUserList onClick={onClickHandle} />
          )}

          <Typography variant="h5" textAlign="center">
            {t('visitCreate.selectDay')}
          </Typography>
          <Box style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px'
          }} sx={{ gap: '20px' }}>
            {weekFields.map((field, idx) => (
              <Box key={field}>
                <Typography textAlign="center">{idx + 1}</Typography>
                <Switch
                  defaultChecked={item ? item[field] : false}
                  {...register(field)}
                />
              </Box>
            ))}
          </Box>

          <FormControl fullWidth sx={{ marginTop: '20px' }}>
            <InputLabel id="day-select-label">
              {t('visitCreate.selectDay')}
            </InputLabel>
            <Controller
              name="day"
              control={control}
              rules={{ required: t('visitCreate.selectDay') }}
              render={({ field }) => (
                <Select {...field} label={t('visitCreate.selectDay')}>
                  {HEBREW_DAYS.map((d) => (
                    <MenuItem value={d.value} key={d.value}>
                      {d.value}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <Box sx={{ gap: '20px', marginTop: '20px' }} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {['hourFrom', 'hourTo'].map((name) => (
              <FormControl fullWidth key={name}>
                <InputLabel id={`${name}-select-label`}>
                  {t(
                    `visitCreate.select${name.charAt(0).toUpperCase() + name.slice(1)}`
                  )}
                </InputLabel>
                <Controller
                  name={name as 'hourFrom' | 'hourTo'}
                  control={control}
                  rules={{
                    required: t(
                      `visitCreate.select${name.charAt(0).toUpperCase() + name.slice(1)}`
                    ),
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label={t(
                        `visitCreate.select${name.charAt(0).toUpperCase() + name.slice(1)}`
                      )}
                    >
                      {ReactSelectOptionsOfFullHour.map((opt) => (
                        <MenuItem value={opt.value} key={opt.value}>
                          {opt.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            ))}
          </Box>

          <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: '18px',
              position: 'absolute',
              bottom: '30px',
              right: '60px',
              borderRadius: '8px',
            }}
          >
            {item?.id
              ? t('visitCreate.updateTitle')
              : t('visitCreate.createButton')}
          </Button>

          {item?.id && (
            <Button
              onClick={handleDelete}
              variant="outlined"
              color="error"
              type="button"
              sx={{
                fontSize: '18px',
                position: 'absolute',
                bottom: '30px',
                left: '60px',
                borderRadius: '8px',
              }}
            >
              {t('visitCreate.deleteButton')}
            </Button>
          )}
        </Box>
      </form>
    </ModalWrapper>
  )
}

export default Handler
