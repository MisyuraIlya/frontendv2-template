/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from 'react'
// import ReactApexChart from 'react-apexcharts'
import { Card, Typography } from '@mui/material'
import moment from 'moment'
import { MONTH_HEBREW_1 } from '../../../helpers/arrayOfMonths'
import { themeColors } from '../../../styles/mui'
import useDataAgentTargets from '../../../hooks/agent/useAgentDataTargets'
import useDataAgentProfile from '../../../hooks/agent/useAgentDataProfile'
import { useTranslation } from 'react-i18next'

const Targets = () => {
  const [year] = useState(moment().year().toString())
  const { t } = useTranslation()

  const { data } = useDataAgentTargets(year)
  const { findTarget } = useDataAgentProfile()
  const salesLabel = t('agentDashBoard.targets.sales') // "מכירות"
  const targetLabel = t('agentDashBoard.targets.target') // "יעד"
  const titleText = t('agentDashBoard.targets.title') // "עמידה ביעדים"
  const salesTargetLabel = t('agentDashBoard.targets.salesTarget') // "יעד מכירות"

  const sales: IMonthAgenthSale[] = MONTH_HEBREW_1.map((item, key) => {
    const matchingData = data?.find((res) => item.name === res.month)
    return {
      y: findTarget(key + 1),
      x: matchingData ? matchingData.month : '',
      goals: [
        {
          name: salesTargetLabel,
          value: matchingData ? (matchingData.targetValue ?? 0) : 0,
          strokeColor: themeColors.primary,
        },
      ],
    }
  })

  const seriesDesktop = [
    {
      name: salesLabel,
      data: sales,
    },
  ]

  const optionsMob = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    colors: ['#FFAD0D'],
    dataLabels: {
      formatter: function (val: any, opt: any) {
        const goals =
          opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals
        if (goals && goals.length) {
          return `${val} / ${goals[0].value}`
        }
        return val
      },
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: [salesLabel, targetLabel],
      markers: {
        fillColors: ['#FFAD0D', themeColors.primary],
      },
      fill: {
        colors: ['#FFAD0D', themeColors.primary],
      },
    },
  }

  const optionsDesktop = {
    chart: {
      height: 350,
      width: 600,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
      },
    },
    colors: ['#FFAD0D'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: [salesLabel, targetLabel],
      markers: {
        fillColors: ['#FFAD0D', themeColors.primary],
      },
    },
    fill: {
      colors: ['#FFAD0D', themeColors.primary],
    },
    yaxis: {
      labels: {
        offsetX: -40,
        style: {
          fontSize: '12px',
        },
      },
    },
  }

  return (
    <Card sx={{ margin: '50px 0', padding: '0 50px' }}>
      <Typography variant="h6">{titleText}</Typography>

      {/* <Select
        value={year}
        sx={{ height: '40px', minWidth: '150px' }}
        onChange={(e) => setYear(e.target.value)}
      >
        {dates.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            {item.value}
          </MenuItem>
        ))}
      </Select> */}

      {window.innerWidth > 1050 ? (
        <>
          {/* <ReactApexChart
            // @ts-expect-error
            options={optionsDesktop}
            series={seriesDesktop}
            type="bar"
            height={350}
          /> */}
        </>
      ) : (
        <>
          {/* <ReactApexChart
            // @ts-expect-error
            options={optionsMob}
            series={seriesDesktop}
            type="bar"
            height={550}
          /> */}
        </>
      )}
    </Card>
  )
}

export default Targets
