import React from 'react';
import useSWR from 'swr';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import CronScheduler from './CronScheduler';
import CronJobCard from './Card';
import { AdminCronManager } from '../../services/admin/AdminCronManager.service';

const fetcher = () => AdminCronManager.getAll();

const List: React.FC = () => {
  const { data: cronJobs, error, isLoading } = useSWR<ICron[]>('cronJobs', fetcher);

  if (isLoading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">טעינת משימות הקרון נכשלה.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        מנהל משימות הקרון
      </Typography>
      <Grid container spacing={4}>
        {cronJobs && cronJobs.length > 0 ? (
          cronJobs.map((job) => (
            <Grid size={{xs:12,md:6}} key={job.id}>
              <CronScheduler
                id={job.id}
                jobName={job.jobName}
                label={job.label}
              />
              <CronJobCard
                displayName={job.label}
                jobName={job.jobName}
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