import * as React from 'react';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useParams } from 'react-router-dom';
import useDataAgentsStatistics from '../../../hooks/agent/useDataAgentsStatistics';

const COLORS = ['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236', '#166a8f', '#00a950', '#58595b', '#8549ba'];

const PieAgentsMui: React.FC = () => {
  const { dateFrom, dateTo } = useParams<{ dateFrom: string; dateTo: string }>();
  const { data, isLoading } = useDataAgentsStatistics(dateFrom!, dateTo!);

  const chartData = React.useMemo(
    () =>
      data?.lines.map((item, index) => ({
        id: index,
        value: item.total,
        label: item.agentName || 'לא ידוע',
      })) || [],
    [data]
  );


  const colors = React.useMemo(
    () => chartData.map((_, index) => COLORS[index % COLORS.length]),
    [chartData]
  );

  return (
    <Card
      sx={{
        padding: 2,
        position: 'relative',
        minHeight: 300,
        width: '100%',
        height: '100%',
      }}
    >
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      <Typography variant="h5" gutterBottom>
        מכירות לפי סוכן
      </Typography>
      <PieChart
        series={[
          {
            data: chartData,
          },
        ]}
        colors={colors}
        width={400}
        height={400}
        // Hide legend
        hideLegend
      />
    </Card>
  );
};

export default PieAgentsMui;
