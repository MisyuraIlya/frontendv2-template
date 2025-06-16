import React from 'react';
import useSWR, { mutate } from 'swr';
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { AdminCronManager } from '../../services/admin/AdminCronManager.service';
import CronCard from './CronCard';

const fetchCrons = () => AdminCronManager.getAll();
const fetchStatus = () => AdminCronManager.statusCron();

const List: React.FC = () => {
  const {
    data: cronJobs,
    error: jobsError,
    isLoading: jobsLoading,
  } = useSWR<ICron[]>('cronJobs', fetchCrons);

  const {
    data: statusData,
    error: statusError,
  } = useSWR<{ status: boolean }>(
    'cronStatus',
    fetchStatus,
    { refreshInterval: 10000 }
  );

  if (jobsLoading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }
  if (jobsError || statusError) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">טעינת משימות הקרון נכשלה.</Typography>
      </Box>
    );
  }

  const isCronRunning = statusData?.status ?? false;

  const handleRun = async (jobName: string) => {
    await AdminCronManager.run(jobName);
    mutate('cronStatus');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        מנהל משימות הקרון
      </Typography>
      <Grid container spacing={4}>
        {cronJobs && cronJobs.length > 0 ? (
          cronJobs.map((job) => (
            <Grid size={{xs:12,md:6}} key={job.id}>
              <CronCard
                job={job}
                isCronRunning={isCronRunning}
                onRun={handleRun}
              />
            </Grid>
          ))
        ) : (
          <Grid size={{xs:12,md:6}}>
            <Typography>לא נמצאו עבודות קרון.</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default List;