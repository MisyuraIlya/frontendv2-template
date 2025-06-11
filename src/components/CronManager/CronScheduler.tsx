import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { Box, Typography, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdminCronManager } from '../../services/admin/AdminCronManager.service';

interface CronSchedulerProps {
  id: number;
  jobName: string;
  label: string;
}

const CronScheduler: React.FC<CronSchedulerProps> = ({ id, jobName, label }) => {
  const [value, setValue] = useState<Moment | null>(moment().second(0));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminCronManager.getSetting(id)
      .then((data: ICron) => {
        const [, mm, hh] = data.cronTime.split(' ');
        setValue(moment().hour(+hh).minute(+mm).second(0));
      })
      .catch((err) => console.error(`Failed to load ${label}:`, err))
      .finally(() => setLoading(false));
  }, [id, label]);

  const handleChange = (newVal: Moment | null) => {
    if (!newVal) return;
    setValue(newVal);

    const hh = newVal.hour().toString().padStart(2, '0');
    const mm = newVal.minute().toString().padStart(2, '0');
    const cronTime = `0 ${mm} ${hh} * * *`;

    AdminCronManager.update(id, { cronTime })
      .then(() => console.log(`Updated ${label} → ${cronTime}`))
      .catch((err) => console.error(`Failed to update ${label}:`, err));
  };

  if (loading) return <Typography>טוען לוח זמנים…</Typography>;

  return (
    <Box sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
      <Typography variant="subtitle2" gutterBottom>
        לוח זמנים של “{label}”
      </Typography>

      <TimePicker
        label="הפעל בשעה"
        value={value}
        onChange={handleChange}
        enableAccessibleFieldDOMStructure={false}
        slots={{ textField: TextField }}
        slotProps={{ textField: { size: 'small' } }}
      />
    </Box>
  );
};

export default CronScheduler;