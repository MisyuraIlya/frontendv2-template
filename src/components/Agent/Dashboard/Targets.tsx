import React, { useState } from 'react';
import moment from 'moment';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { MONTH_HEBREW_1 } from '../../../helpers/arrayOfMonths';
import useDataAgentTargets from '../../../hooks/agent/useAgentDataTargets';
import useDataAgentProfile from '../../../hooks/agent/useAgentDataProfile';

export interface IDataPoint {
  id: number;
  month: string;
  year: string;
  currentValue: number;
  targetValue: number;
  isCompleted: boolean;
}

const Targets: React.FC = () => {
  const [year] = useState(moment().year().toString());
  const { t } = useTranslation();
  const salesLabel = t('agentDashBoard.targets.sales');       
  const salesTargetLabel = t('agentDashBoard.targets.salesTarget'); 
  const titleText = t('agentDashBoard.targets.title');        

  const { data } = useDataAgentTargets(year);

  const { findTarget } = useDataAgentProfile();

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  const xLabels = MONTH_HEBREW_1.map((m) => m.name);
  const actualValues = MONTH_HEBREW_1.map((_, idx) =>
    findTarget(idx + 1) ?? 0
  );
  const targetValues = MONTH_HEBREW_1.map((m) =>
    data.find((d) => d.month === m.name)?.targetValue ?? 0
  );

  return (
    <Card sx={{ margin: '50px 0', padding: '0 50px' }}>
      <Typography variant="h6">{titleText}</Typography>

      <BarChart
        height={350}
        series={[
          { data: actualValues, label: salesLabel, stack: 'salesStack' },
          { data: targetValues, label: salesTargetLabel },
        ]}
        xAxis={[{ data: xLabels }]}
        yAxis={[{ width: 50 }]}
      />
    </Card>
  );
};

export default Targets;
