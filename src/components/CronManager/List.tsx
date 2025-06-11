import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import CronScheduler from './CronScheduler';
import CronJobCard from './Card';

const cronJobs = [
  { id: 1, name: 'AGENTS_SYNC', displayName: 'Agents' },
];

const List: React.FC = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>
      Cron Manager
    </Typography>
    <Grid container spacing={4}>
      {cronJobs.map((job) => (
        <Grid size={{xs:12,md:6}}  key={job.id}>
          <CronScheduler id={job.id} jobName={job.name} label={job.displayName} />
          <CronJobCard displayName={job.displayName} jobName={job.name} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default List;
