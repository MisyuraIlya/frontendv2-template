import { Box, Card, Grid, Typography } from '@mui/material';
import { PieChart, DefaultizedPieValueType } from '@mui/x-charts';
import {
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
  GaugeValueText,
} from '@mui/x-charts/Gauge';
import moment from 'moment';
import useDataAgentDashboard from '../../../hooks/agent/useAgentDataDashboard';
import { useTranslation } from 'react-i18next';
import Utils from '../../../utils';

const Daily = () => {
  const { t } = useTranslation();
  const today = moment().format('YYYY-MM-DD');
  const { data } = useDataAgentDashboard(today, today);

  const visits = data?.data?.filter(item => item.objectiveType === 'visit') || [];
  const tasks = data?.data?.filter(item => item.objectiveType === 'task') || [];

  const totalVisits = visits.length;
  const completedVisits = visits.filter(item => item.completedAt).length;
  const percentVisits = totalVisits ? (completedVisits / totalVisits) * 100 : 0;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(item => item.completedAt).length;
  const percentTasks = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card sx={{ p: 3, mt: 4 }}>
      <Grid container spacing={4} justifyContent="center">

        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
          <Typography variant="h6" align="center" gutterBottom>
            {t('agentDashBoard.daily.visits.title')}
          </Typography>
          <Box sx={{display:'flex', gap:'10px'}}>

            <Box sx={{display:'flex', gap:'30px'}}>
              <Box sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ width: '100%', textAlign: { sm: 'left', xs: 'center' } }}
                  >
                    {t('agentDashBoard.daily.visits.title')}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid
                      size={{ md: 6, sm: 12, xs: 12 }}
                      sx={{
                        display: 'flex',
                        justifyContent: { sm: 'left', xs: 'center' },
                      }}
                    >
                      <Typography variant="h6">
                        {t('agentDashBoard.daily.completed')}
                      </Typography>
                    </Grid>
                    <Grid size={{ md: 6, sm: 12, xs: 12 }}>
                      <Utils.MyCheapButton>{completedVisits}</Utils.MyCheapButton>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Grid
                      size={{ md: 6, sm: 12, xs: 12 }}
                      sx={{
                        display: 'flex',
                        justifyContent: { sm: 'left', xs: 'center' },
                      }}
                    >
                      <Typography variant="h6">
                        {t('agentDashBoard.daily.pending')}
                      </Typography>
                    </Grid>
                    <Grid size={{ md: 6, sm: 12, xs: 12 }}>
                      <Utils.MyCheapButton>{totalVisits}</Utils.MyCheapButton>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center">
                  <GaugeContainer
                    width={200}
                    height={200}
                    startAngle={-90}
                    endAngle={90}
                    value={percentVisits}
                    valueMin={0}
                    valueMax={100}
                  >
                    <GaugeReferenceArc />
                    <GaugeValueArc />
                    <GaugeValueText style={{ fontSize: 20, fontWeight: 500 }}>
                      {`${percentVisits.toFixed(0)}%`}
                    </GaugeValueText>
                  </GaugeContainer>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
          <Typography variant="h6" align="center" gutterBottom>
            {t('agentDashBoard.daily.tasks.title')}
          </Typography>
          <Box sx={{display:'flex', gap:'30px'}}>
            <Box sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ width: '100%', textAlign: { sm: 'left', xs: 'center' } }}
                >
                  {t('agentDashBoard.daily.tasks.title')}
                </Typography>
                <Grid container spacing={2}>
                  <Grid
                    size={{ md: 6, sm: 12, xs: 12 }}
                    sx={{
                      display: 'flex',
                      justifyContent: { sm: 'left', xs: 'center' },
                    }}
                  >
                    <Typography variant="h6">
                      {t('agentDashBoard.daily.completed')}
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6, sm: 12, xs: 12 }}>
                    <Utils.MyCheapButton>{completedTasks}</Utils.MyCheapButton>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                  <Grid
                    size={{ md: 6, sm: 12, xs: 12 }}
                    sx={{
                      display: 'flex',
                      justifyContent: { sm: 'left', xs: 'center' },
                    }}
                  >
                    <Typography variant="h6">
                      {t('agentDashBoard.daily.pending')}
                    </Typography>
                  </Grid>
                  <Grid size={{ md: 6, sm: 12, xs: 12 }}>
                    <Utils.MyCheapButton>{totalTasks}</Utils.MyCheapButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center">
              <GaugeContainer
                width={200}
                height={200}
                startAngle={-90}
                endAngle={90}
                value={percentTasks}
                valueMin={0}
                valueMax={100}
              >
                <GaugeReferenceArc />
                <GaugeValueArc />
                <GaugeValueText style={{ fontSize: 20, fontWeight: 500 }}>
                  {`${percentTasks.toFixed(0)}%`}
                </GaugeValueText>
              </GaugeContainer>
            </Box>
          </Box>
        </Grid>

      </Grid>
    </Card>
  );
};

export default Daily;