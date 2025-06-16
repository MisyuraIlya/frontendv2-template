import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import useSWR, { mutate } from 'swr';
import { AdminCronManager } from '../../services/admin/AdminCronManager.service';

const fetcher = () => AdminCronManager.getCronSettings();

const Options: React.FC = () => {
  const { data, error, isLoading } = useSWR<ICronSettings>(
    'cronSettings',
    fetcher
  );

  const [selectedTime, setSelectedTime] = useState<Moment | null>(
    moment().second(0)
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCronRunning, setIsCronRunning] = useState<boolean>(false);

  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState<string>('');
  const [snackSeverity, setSnackSeverity] = useState<'error' | 'success'>(
    'error'
  );

  useEffect(() => {
    if (!data) return;
    const [secStr, minStr, hourStr] = data.cronTime.split(' ');
    const m = moment()
      .hour(Number(hourStr))
      .minute(Number(minStr))
      .second(Number(secStr));
    setSelectedTime(m);
    setIsActive(data.isActive);
  }, [data]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { status } = await AdminCronManager.statusCron();
        setIsCronRunning(status);
      } catch (err) {
        console.error('Failed to fetch cron status', err);
      }
    };
    fetchStatus();
  }, []);

  const handleTimeChange = (newVal: Moment | null) => {
    setSelectedTime(newVal);
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(e.target.checked);
  };

  const handleSave = async () => {
    if (!selectedTime) return;
    const sec = selectedTime.second().toString();
    const mm = selectedTime.minute().toString().padStart(2, '0');
    const hh = selectedTime.hour().toString().padStart(2, '0');
    const cronTime = `${sec} ${mm} ${hh} * * *`;

    try {
      await AdminCronManager.changeCronSettings({ cronTime, isActive });
      mutate('cronSettings');
      const { status } = await AdminCronManager.statusCron();
      setIsCronRunning(status);
      setSnackSeverity('success');
      setSnackMessage('Cron settings saved successfully.');
      setSnackOpen(true);
    } catch (err) {
      console.error('Failed to save cron settings', err);
      setSnackSeverity('error');
      setSnackMessage('Failed to save cron settings.');
      setSnackOpen(true);
    }
  };

  const executeCron = async () => {
    try {
      const { status, message } = await AdminCronManager.runAll();
      setIsCronRunning(status);
      if (!status) {
        setSnackSeverity('error');
        setSnackMessage(message);
        setSnackOpen(true);
      } else {
        setSnackSeverity('success');
        setSnackMessage('Cron executed successfully.');
        setSnackOpen(true);
      }
    } catch (err) {
      console.error('Failed to execute cron', err);
      setSnackSeverity('error');
      setSnackMessage('Unexpected error executing cron.');
      setSnackOpen(true);
    }
  };

  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  };

  if (isLoading) return <Box>Loading…</Box>;
  if (error) return <Box>Error loading cron settings.</Box>;

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth={300}
        mx="auto"
        p={2}
      >
        <TimePicker
          label="Cron Time"
          value={selectedTime}
          onChange={handleTimeChange}
          enableAccessibleFieldDOMStructure={false}
          slots={{ textField: TextField }}
          slotProps={{ textField: { fullWidth: true, size: 'small' } }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={handleToggle}
              color="primary"
            />
          }
          label="Active"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!selectedTime}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={executeCron}
          disabled={isCronRunning}
        >
          Execute Cron
        </Button>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snackSeverity}
          sx={{ width: '100%' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Options;
