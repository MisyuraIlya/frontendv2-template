import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { AdminCronManager } from '../../services/admin/AdminCronManager.service';

interface CronJobCardProps {
  displayName: string;
  jobName: string;
}

const CronJobCard: React.FC<CronJobCardProps> = ({ displayName, jobName }) => {
  const [loading, setLoading] = useState(false);
  const [cron, setCron] = useState<ICron | null>(null);
  const [toggling, setToggling] = useState(false);

  const loadStatus = async () => {
    try {
      const data = await AdminCronManager.getStatus(jobName);
      setCron(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadStatus();
    let iv: NodeJS.Timeout;
    if (cron?.running) {
      iv = setInterval(loadStatus, 5000);
    }
    return () => iv && clearInterval(iv);
  }, [cron?.running]);

  const handleRun = async () => {
    if (!cron?.isActive) return;
    setLoading(true);
    try {
      await AdminCronManager.run(jobName);
    } catch (err: any) {
      console.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
      loadStatus();
    }
  };

  const handleToggleActive = async () => {
    if (!cron) return;
    setToggling(true);
    try {
      await AdminCronManager.update(cron.id, { isActive: !cron.isActive });
      await loadStatus();
    } catch (err) {
      console.error('Failed to toggle active state', err);
    } finally {
      setToggling(false);
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6">{displayName}</Typography>
        {cron && (
          <>
            <FormControlLabel
              control={
                <Switch
                  checked={cron.isActive}
                  onChange={handleToggleActive}
                  disabled={toggling}
                />
              }
              label={cron.isActive ? 'Active' : 'Inactive'}
            />

            <Typography variant="body2">
              Last run: {cron.lastFetchTime ? new Date(cron.lastFetchTime).toLocaleString() : '—'}
            </Typography>
            <Typography variant="body2">
              Duration: {cron.duration != null ? `${cron.duration} ms` : '—'}
            </Typography>
            <Typography variant="body2">
              Status: {cron.status ? 'Error' : 'Success'}
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              {cron.running ? 'Running…' : 'Idle'}
            </Typography>
          </>
        )}
      </CardContent>

      <Divider />

      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={handleRun}
          disabled={loading || !cron?.isActive || cron?.running}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {cron?.running ? 'Running' : 'Run Now'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CronJobCard;
