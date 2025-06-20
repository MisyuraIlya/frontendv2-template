import { useState } from 'react'
import { Box, Card, Divider, IconButton, Typography } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import moment from 'moment'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { themeColors } from '../../../../styles/mui'
import { useMyScheduleCalendar } from '../../../../store/ScheduleCalendar.store'
import { onSuccessAlert } from '../../../../utils/MySweetAlert'
import ModalWrapper from '../../../../components/Modals/ModalWrapper'
import hooks from '../../../../hooks'

const Update = ({
  open,
  setOpen,
  item,
}: {
  open: boolean
  setOpen: (value: boolean) => void
  item: IAgentObjective
}) => {
  const { weekFrom, weekTo } = useMyScheduleCalendar()
  const { updateObjective } = hooks.agent.useDataAgentMissions(weekFrom, weekTo)
  const [choosed, setChoosed] = useState<IAgentObjective | null>()

  const handleStatusFunc = (value: boolean) => {
    const completedAt = moment().format('YYYY-MM-DD HH:mm')
    const obj = {
      id: item.id,
      isComleted: value,
      completedAt: value ? completedAt : null,
    }
    updateObjective(obj)
    setOpen(false)
    onSuccessAlert('עודכן בהצלחה', '')
  }

  const handleChoose = (obj: IAgentObjective) => {
    setChoosed(obj)
  }

  return (
    <>
      <ModalWrapper active={open} setActive={setOpen} width={25} height={'45%'}>
        {item?.subTusk?.length ? (
          <Box>
            <Typography
              sx={{ textAlign: 'center' }}
              variant="h6"
              color={themeColors.primary}
            >
              {`בחר משימה בין שהשעות ${item.hourFrom} - ${item.hourTo}`}
            </Typography>
            <Box sx={{ overflow: 'auto', maxHeight: '350px' }}>
              {item?.subTusk?.map((obj) => (
                <Card
                  onClick={() => handleChoose(obj)}
                  key={obj.id!}
                  elevation={2}
                  sx={{
                    display:'flex', 
                    justifyContent:'center', 
                    alignItems:'center',
                    margin: '20px 10px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    boxShadow: '0 2px 40px rgba(132,147,168,.15)',
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      color={themeColors.primary}
                      sx={{ padding: '10px 0', display:'flex', justifyContent:'center', alignItems:'center' }}
                    >
                      {item?.objectiveType == 'task' ? 'משימה' : 'ביקור'}
                    </Typography>
                    <Typography
                      variant="body1"
                      color={themeColors.primary}
                      sx={{ padding: '10px 0', display:'flex', justifyContent:'center', alignItems:'center' }}
                    >
                      {`${obj.hourFrom} - ${obj.hourTo}`}
                    </Typography>
                    {obj?.description ? (
                      <Typography
                        variant="body1"
                        color={themeColors.primary}
                        sx={{ padding: '10px 0', display:'flex', justifyContent:'center', alignItems:'center' }}
                      >
                        {`${(item.client as IUser)?.name}`}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body1"
                        color={themeColors.primary}
                        sx={{ padding: '10px 0', display:'flex', justifyContent:'center', alignItems:'center' }}
                      >
                        {`${obj?.isCompleted ? 'הושלמה' : 'לא הושלמה'} `}
                      </Typography>
                    )}
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" fontWeight={800} textAlign={'center'}>
              {item?.objectiveType == 'task' ? 'משימה' : 'ביקור'}
            </Typography>
            <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <CalendarMonthOutlinedIcon />
              <Typography variant="body1">
                תאריך {moment(item?.date).format('DD-MM-YYYY')}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '40px',
              }}
            >
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <AccessTimeOutlinedIcon />
                <Typography variant="body1">משעה {item?.hourFrom}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <AccessTimeOutlinedIcon />
                <Typography variant="body1">עד שעה {item?.hourTo}</Typography>
              </Box>
            </Box>
            <Divider sx={{ display: 'flex', gap: '20px', marginTop: '20px' }} />
            <Box sx={{ display: 'flex', marginTop: '20px', gap: '10px' }}>
              <FeaturedPlayListOutlinedIcon />
              <Typography variant="body1">
                {(item.client as IUser)?.name}
              </Typography>
              <Typography variant="body1">
                {(item.client as IUser)?.city} -{' '}
                {(item.client as IUser)?.address}
              </Typography>
            </Box>
            {item.completedAt ? (
              <>
                {item.isCompleted ? (
                  <Typography
                    variant="h6"
                    fontWeight={800}
                    textAlign={'center'}
                    sx={{ marginTop: '20px' }}
                  >
                    {'המשימה הושלמה'}
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    fontWeight={800}
                    textAlign={'center'}
                    sx={{ marginTop: '20px' }}
                  >
                    {'המשימה לא הושלמה'}
                  </Typography>
                )}
              </>
            ) : (
              <>
                <Typography
                  variant="h6"
                  fontWeight={800}
                  textAlign={'center'}
                  sx={{ marginTop: '20px' }}
                >
                  {'המשימה הושלמה?'}
                </Typography>
                <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                  <Box sx={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
                    <IconButton
                      sx={{
                        borderRadius: '5px',
                        backgroundColor: '#f3f5f9',
                        '&:hover': { background: '#d1d9e8' },
                      }}
                      onClick={() => handleStatusFunc(true)}
                    >
                      <TaskAltIcon
                        sx={{ color: themeColors.primary, fontSize: '35px' }}
                      />
                    </IconButton>
                    <IconButton
                      sx={{
                        borderRadius: '5px',
                        backgroundColor: '#f3f5f9',
                        '&:hover': { background: '#d1d9e8' },
                      }}
                      onClick={() => handleStatusFunc(false)}
                    >
                      <NotInterestedIcon
                        sx={{ color: themeColors.primary, fontSize: '35px' }}
                      />
                    </IconButton>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        )}
      </ModalWrapper>
      {choosed && (
        <>
          {/* <MissionModal open={secondOpen} setOpen={handleClose} item={choosed} /> */}
        </>
      )}
    </>
  )
}

export default Update
