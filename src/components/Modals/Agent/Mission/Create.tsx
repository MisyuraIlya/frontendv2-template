import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import moment, { Moment } from 'moment'
import { useMyScheduleCalendar } from '../../../../store/ScheduleCalendar.store'
import { onSuccessAlert } from '../../../../utils/MySweetAlert'
import ModalWrapper from '../../../../components/Modals/ModalWrapper'
import hooks from '../../../../hooks'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { TimePicker } from '@mui/x-date-pickers'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Create = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (value: boolean) => void
}) => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [comment, setComment] = useState('')
  const { weekFrom, weekTo } = useMyScheduleCalendar()
  const { createObjective } = hooks.agent.useDataAgentMissions(weekFrom, weekTo)
  const [date, setDate] = useState<Moment | null>(moment())
  const [hourFrom, setHourFrom] = useState(moment())
  const [hourTo, setHourTo] = useState(moment())

  const handleCreate = () => {
    const obj: IAgentObjective = {
      agent: { id: +id! } as IUser,
      client: null,
      isCompleted: false,
      completedAt: null,
      title: '',
      description: '',
      week1: false,
      week2: false,
      week3: false,
      week4: false,
      hourFrom: moment(hourFrom).format('HH:mm'),
      hourTo: moment(hourTo).format('HH:mm'),
      choosedDay: moment().locale('he').format('dddd'),
      date: moment(date).format('YYYY-MM-DD'),
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
      objectiveType: 'task',
      subTusk: [],
    }
    createObjective(obj)
    onSuccessAlert(t('agentMissions.create.successMessage'), '')
  }

  return (
    <>
      <ModalWrapper active={open} setActive={setOpen} width={25} height={'50%'}>
        <Box>
          <Typography variant="h6">
            {t('agentMissions.create.title')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
            }}
          >
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label={t('agentMissions.create.datePickerLabel')}
                value={date}
                onChange={(value) => value && setDate(value)}
              />
            </DemoContainer>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '15px',
              margin: '20px 0',
            }}
          >
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label={t('agentMissions.create.fromTime')}
                value={hourFrom}
                onChange={(value) => {
                  if (value) {
                    setHourFrom(value)
                  }
                }}
              />
            </DemoContainer>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label={t('agentMissions.create.toTime')}
                value={hourTo}
                onChange={(value) => {
                  if (value) {
                    setHourTo(value)
                  }
                }}
              />
            </DemoContainer>
          </Box>
          <TextField
            label={t('agentMissions.create.taskDetails')}
            placeholder={t('agentMissions.create.taskDetails')}
            rows={4}
            fullWidth
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: '20px' }}>
            <Button variant="contained" onClick={() => handleCreate()}>
              {t('agentMissions.create.saveButton')}
            </Button>
          </Box>
        </Box>
      </ModalWrapper>
    </>
  )
}

export default Create
