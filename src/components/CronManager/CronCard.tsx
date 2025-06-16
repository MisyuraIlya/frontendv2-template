import React, { useState, useEffect } from 'react';
import moment from 'moment';
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
  Box,
  Tooltip,
} from '@mui/material';
import { AdminCronManager } from '../../services/admin/AdminCronManager.service';

interface CronCardProps {
  job: ICron;
  isCronRunning: boolean;
  onRun: (jobName: string) => Promise<void>;
}

const CronCard: React.FC<CronCardProps> = ({
  job,
  isCronRunning,
  onRun,
}) => {
  const [cron, setCron] = useState<ICron | null>(null);
  const [loadingRun, setLoadingRun] = useState(false);
  const [toggling, setToggling] = useState(false);

  const loadStatus = async () => {
    try {
      const data = await AdminCronManager.getStatus(job.jobName);
      setCron(data);
    } catch (err) {
      console.error('Failed to load cron status', err);
    }
  };

  useEffect(() => {
    loadStatus();
    let iv: NodeJS.Timeout;
    if (cron?.running) iv = setInterval(loadStatus, 5000);
    return () => iv && clearInterval(iv);
  }, [cron?.running, job.jobName]);

  const handleRunClick = async () => {
    if (!cron?.isActive) return;
    setLoadingRun(true);
    try {
      await onRun(job.jobName);
      await loadStatus();
    } catch (err) {
      console.error('Error running cron:', err);
    } finally {
      setLoadingRun(false);
    }
  };

  const handleToggleActive = async () => {
    if (!cron) return;
    setToggling(true);
    try {
      await AdminCronManager.update(cron.id, {
        isActive: !cron.isActive,
      });
      await loadStatus();
    } catch (err) {
      console.error('Failed to toggle active state', err);
    } finally {
      setToggling(false);
    }
  };

  const durationStr =
    cron?.duration != null
      ? moment.utc(cron.duration).format('m [דקות] s [שניות]')
      : '—';

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6">{job.label}</Typography>
        {cron && (
          <>
            <Box mt={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={cron.isActive}
                    onChange={handleToggleActive}
                    disabled={toggling}
                  />
                }
                label={cron.isActive ? 'פעיל' : 'לא פעיל'}
              />
            </Box>

            <Typography variant="body2">
              הריצה האחרונה:{' '}
              {cron.lastFetchTime
                ? new Date(cron.lastFetchTime).toLocaleString('he-IL')
                : '—'}
            </Typography>
            <Typography variant="body2">
              משך זמן: {durationStr}
            </Typography>

            <Tooltip title={cron.error || ''} arrow>
              <Typography
                variant="body2"
                color={cron.status ? 'error' : 'textPrimary'}
              >
                סטטוס: {cron.status ? 'שגיאה' : 'הצלחה'}
              </Typography>
            </Tooltip>

            <Typography
              variant="body2"
              sx={{ fontStyle: 'italic' }}
            >
              {cron.running ? 'בריצה…' : ''}
            </Typography>
          </>
        )}
      </CardContent>

      <Divider />

      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={handleRunClick}
          disabled={
            loadingRun ||
            !cron?.isActive ||
            isCronRunning
          }
          startIcon={
            loadingRun ? <CircularProgress size={16} /> : null
          }
        >
          {isCronRunning ? 'מריץ…' : 'הפעל כעת'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CronCard;
