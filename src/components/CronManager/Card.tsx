import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';

interface CronJobCardProps {
  displayName: string;
  fetcher: () => Promise<IResponse<{}>>;
  statusFetcher: () => Promise<{ isSyncing: boolean }>;
}

const Card: React.FC<CronJobCardProps> = ({ displayName, fetcher, statusFetcher }) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadStatus = useCallback(async () => {
    try {
      const { isSyncing } = await statusFetcher();
      setIsSyncing(isSyncing);
    } catch {
      setIsSyncing(false);
    }
  }, [statusFetcher]);

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 5000);
    return () => clearInterval(interval);
  }, [loadStatus]);

  const handleFetch = async () => {
    setMessage(null);
    try {
      const { message } = await fetcher();
      setMessage(message);
      setIsSyncing(true);
    } catch {
      setMessage('Failed to start sync');
    }
  };

  return (
    <Box sx={{ p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        {displayName}
      </Typography>

      <Button variant="contained" onClick={handleFetch} disabled={isSyncing}>
        {isSyncing ? `${displayName} Syncing…` : `Fetch ${displayName}`}
      </Button>

      {message && (
        <Box mt={1}>
          <Alert severity={isSyncing ? 'info' : 'success'}>
            {message}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default Card;
