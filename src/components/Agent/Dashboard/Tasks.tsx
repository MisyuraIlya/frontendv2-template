import { useState } from 'react'
import moment from 'moment'
import { Box, Card, Grid, IconButton, Typography } from '@mui/material'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import { themeColors } from '../../../styles/mui'
import Modals from '../../Modals'
import { onSuccessAlert } from '../../../utils/MySweetAlert'
import useDataAgentDashboard from '../../../hooks/agent/useAgentDataDashboard'
import { useTranslation } from 'react-i18next'

const Tasks = () => {
  const [open, setOpen] = useState(false)
  const [choosedObject, setChoosedObject] = useState<IAgentObjective | null>(
    null
  )

  const { t } = useTranslation()
  const { data, updateObjective } = useDataAgentDashboard(
    moment().format('YYYY-MM-DD'),
    moment().format('YYYY-MM-DD')
  )

  const handleUpdate = (obj: IAgentObjective, isDone: boolean) => {
    const completedAt = moment().format('YYYY-MM-DD HH:mm')
    const object = {
      id: obj.id,
      isComleted: isDone,
      completedAt: isDone ? completedAt : null,
    }
    updateObjective(object)
    setOpen(false)
    onSuccessAlert(t('agentDashBoard.tasks.updatedSuccessfully'), '')
  }

  const handleClick = (obj: IAgentObjective) => {
    setChoosedObject(obj as IAgentObjective)
    setOpen(true)
  }

  const notCompleted = data?.data?.filter((item) => !item.completedAt)

  return (
    <>
      <Card sx={{ marginTop: '50px' }}>
        <Typography variant="h6" sx={{ margin: '20px 40px' }}>
          {t('agentDashBoard.tasks.openToday')}
        </Typography>
        {notCompleted?.map((item) => (
          <Card
            elevation={4}
            key={item.id}
            sx={{
              margin: '20px 40px',
              padding: '10px 20px',
              borderRadius: '5px',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                size={{ xs: 1 }}
                sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
                onClick={() => handleClick(item)}
              >
                {item?.objectiveType === 'task' ? (
                  <AssignmentLateOutlinedIcon />
                ) : (
                  <FmdGoodOutlinedIcon />
                )}
              </Grid>
              <Grid
                size={{ xs: 1 }}
                sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
                onClick={() => handleClick(item)}
              >
                {item?.objectiveType === 'task'
                  ? t('agentDashBoard.tasks.task')
                  : t('agentDashBoard.tasks.visit')}
              </Grid>
              <Grid
                sx={{ display: 'flex', alignItems: 'center' }}
                size={{ xs: 5 }}
                onClick={() => handleClick(item)}
              >
                {item?.objectiveType === 'task' ? (
                  <Typography variant="body1">{item.title}</Typography>
                ) : (
                  <Typography variant="body1">
                    {(item?.client as IUser)?.name}
                  </Typography>
                )}
              </Grid>
              <Grid
                size={{ xs: 1 }}
                sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
                onClick={() => handleClick(item)}
              >
                <Typography variant="body1">{item.hourFrom}</Typography>
              </Grid>
              <Grid
                size={{ xs: 1 }}
                sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
                onClick={() => handleClick(item)}
              >
                <Typography variant="body1">{item.hourTo}</Typography>
              </Grid>
              <Grid size={{ xs: 2 }} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',gap: '30px'}}>
                  <IconButton
                    sx={{
                      borderRadius: '5px',
                      backgroundColor: '#f3f5f9',
                      '&:hover': { background: '#d1d9e8' },
                    }}
                    onClick={() => handleUpdate(item, true)}
                  >
                    <TaskAltIcon
                      sx={{ color: themeColors.primary, fontSize: '25px' }}
                    />
                  </IconButton>
                  <IconButton
                    sx={{
                      borderRadius: '5px',
                      backgroundColor: '#f3f5f9',
                      '&:hover': { background: '#d1d9e8' },
                    }}
                    onClick={() => handleUpdate(item, false)}
                  >
                    <NotInterestedIcon
                      sx={{ color: themeColors.primary, fontSize: '25px' }}
                    />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Card>
        ))}
        {notCompleted?.length === 0 && (
          <Box
            sx={{ minHeight: '100px', display: 'flex', gap: '5px' }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">
              {t('agentDashBoard.tasks.noOpenTasks')}
            </Typography>
            <EventAvailableOutlinedIcon sx={{ fontSize: '30px' }} />
          </Box>
        )}
      </Card>
      {choosedObject && (
        <Modals.Agent.Mission.Update
          item={choosedObject}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  )
}

export default Tasks
