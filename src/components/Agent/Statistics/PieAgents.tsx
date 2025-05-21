/* eslint-disable */
import { Box, Card, CircularProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
// import ReactApexChart from 'react-apexcharts'
// import chroma from 'chroma-js'
import { useParams } from 'react-router-dom'
// import { ApexOptions } from 'apexcharts'
import useDataAgentsStatistics from '../../../hooks/agent/useDataAgentsStatistics'

const PieAgents = () => {
  const [titles, setTitles] = useState<string[]>([])
  const [prices, setPrices] = useState<number[]>([])
  const { dateFrom, dateTo } = useParams<{ dateFrom: string; dateTo: string }>()
  const { data, isLoading } = useDataAgentsStatistics(dateFrom!, dateTo!)

  const numDataPoints = titles.length
  console.log('numDataPoints', numDataPoints)
  // eslint-disable-next-line import/no-named-as-default-member
  // const colorScale = chroma.scale('Set1').colors(numDataPoints)

  // const options: ApexOptions = {
  //   chart: {
  //     width: 380,
  //     type: 'donut',
  //   },
  //   colors: colorScale,
  //   labels: titles,
  //   dataLabels: {
  //     enabled: true,
  //   },
  //   responsive: [
  //     {
  //       breakpoint: 680,
  //       options: {
  //         chart: {
  //           height: 950,
  //         },
  //         legend: {
  //           show: true,
  //           position: 'bottom',
  //         },
  //       },
  //     },
  //   ],
  //   legend: {
  //     show: true,
  //     position: 'right',
  //     offsetY: 0,
  //   },
  //   yaxis: {
  //     labels: {
  //       formatter: (value: number) =>
  //         value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  //     },
  //   },
  // }

  const series = prices
  console.log('series',series)
  useEffect(() => {
    if (data) {
      setTitles(data.lines.map((item) => item.agentName))
      setPrices(data.lines.map((item) => item.total))
    }
  }, [data])

  return (
    <Card
      sx={{
        padding: '20px',
        position: 'relative',
        minHeight: '300px',
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
            zIndex: 9999,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      <Typography variant="h5">מכירות לפי סוכן</Typography>
      {/* <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height={950}
      /> */}
    </Card>
  )
}

export default PieAgents
