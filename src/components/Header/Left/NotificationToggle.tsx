import { FC } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { usePush } from '../../../provider/PushNotificationProvider';

export const NotificationToggle: FC = () => {
  const { isSubscribed, subscribeToPush, unsubscribeFromPush } = usePush();

  const handleChange = async (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      await subscribeToPush();
    } else {
      await unsubscribeFromPush();
    }
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isSubscribed}
          onChange={handleChange}
          name="notificationToggle"
        />
      }
      label="נוטפיקציות"
    />
  );
};