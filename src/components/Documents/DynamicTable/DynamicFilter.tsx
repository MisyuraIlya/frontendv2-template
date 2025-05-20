import React, { FC } from 'react'
import { Box, Button, Paper } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { useMobile } from '../../../provider/MobileProvider'
import { useTranslation } from 'react-i18next'
import ArticleIcon from '@mui/icons-material/Article'
import { ExcelGeneratorDynamicTables } from '../../../helpers/ExcelGenerator'

interface DynamicFilterProps {
  data: IDynamicTables | undefined
}

const DynamicFilter: FC<DynamicFilterProps> = ({ data }) => {
  const navigate = useNavigate()
  const { dateFrom, dateTo } = useParams()
  const { isMobile } = useMobile()
  const { t } = useTranslation()

  const handleDateFrom = (e: moment.Moment | null) => {
    if (e) {
      const updatedPathname = `/hovot/${e.format('YYYY-MM-DD')}/${dateTo}?page=1`
      navigate(updatedPathname)
    }
  }

  const handleDateTo = (e: moment.Moment | null) => {
    if (e) {
      const updatedPathname = `/hovot/${dateFrom}/${e.format('YYYY-MM-DD')}?page=1`
      navigate(updatedPathname)
    }
  }

  return (
    <Paper
      elevation={4}
      sx={{
        display: { sm: 'flex', xs: 'block' },
        justifyContent: 'space-between',
        padding: '15px 20px',
      }}
    >
      <Box
        sx={{
          display: { sm: 'flex', xs: 'block' },
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label={t(`documents.fromDate`)}
            value={moment(dateFrom)}
            onChange={(e) => handleDateFrom(e)}
          />
        </DemoContainer>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label={t(`documents.toDate`)}
            value={moment(dateTo)}
            onChange={(e) => handleDateTo(e)}
          />
        </DemoContainer>
        <Button
          fullWidth={isMobile}
          variant="contained"
          sx={{ height: '43px', mt: isMobile ? '15px' : '8px' }}
        >
          חפש
        </Button>
      </Box>
      <Box
        sx={{
          display: { sm: 'flex', xs: 'block' },
          gap: '20px',
          alignItems: 'center',
          pt: '8px',
        }}
      >
        {data && (
          <Button
            sx={{ height: '40px' }}
            variant="outlined"
            startIcon={<ArticleIcon sx={{ fontSize: '30px' }} />}
            onClick={() => ExcelGeneratorDynamicTables(data)}
          >
            XL
          </Button>
        )}
      </Box>
    </Paper>
  )
}

export default DynamicFilter
