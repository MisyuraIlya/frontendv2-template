import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import hooks from '../../../hooks'
import { useMobile } from '../../../provider/MobileProvider'
import { handleErp } from '../../../helpers/handleErpDocuments'
import { useOffline } from '../../../provider/OfflineProvider'
import { useTranslation } from 'react-i18next'
import useDirection from '../../../hooks/useDirection'
const Filter = () => {
  const { documentType, dateFrom, dateTo } = useParams()
  const { isMobile } = useMobile()
  const navigate = useNavigate()
  const { isOnline } = useOffline()
  const { t } = useTranslation()
  const dir = useDirection()

  const handleDateFrom = (e: moment.Moment | null) => {
    if (e) {
      const updatedPathname = `/documentPage/${documentType}/${e.format('YYYY-MM-DD')}/${dateTo}?page=1`
      navigate(updatedPathname)
    }
  }

  const handleDateTo = (e: moment.Moment | null) => {
    if (e) {
      const updatedPathname = `/documentPage/${documentType}/${dateFrom}/${e.format('YYYY-MM-DD')}?page=1`
      navigate(updatedPathname)
    }
  }

  const handleSelect = (parameter: IDocumentTypes) => {
    navigate(`/documentPage/${parameter}/${dateFrom}/${dateTo}?page=1`)
  }

  const { mutate } = hooks.useDataDocuments()

  return (
    <Paper
      elevation={4}
      sx={{
        display: { md: 'flex', sm: 'block', xs: 'block' },
        justifyContent: 'space-between',
        padding: { md: '15px 20px', sm: '12px', xs: '12px' },
      }}
    >
      {isMobile && (
        <FormControl fullWidth sx={{ width: '100%', marginTop: '12px' }}>
          <InputLabel id="demo-simple-select-label">
            {t('documents.document')}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={documentType}
            sx={{ height: '40px' }}
            label={t('documents.document')}
            onChange={(e) => handleSelect(e.target.value as IDocumentTypes)}
          >
            {handleErp()?.map((ele, ind) => {
              return (
                <MenuItem value={ele.value} key={ind}>
                  {dir === 'rtl' ? ele.label : ele?.englishLabel}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      )}
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
        {!isMobile && (
          <Button
            variant="contained"
            onClick={() => mutate()}
            sx={{ mt: '8px' }}
          >
            {t('documents.search')}
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: { sm: 'flex', xs: 'block' },
          gap: '20px',
          alignItems: 'center',
          pt: '8px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '20px' }}>
          {!isMobile && (
            <FormControl fullWidth sx={{ width: '300px' }}>
              <InputLabel id="demo-simple-select-label">
                {t('documents.document')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={documentType}
                sx={{ height: '40px' }}
                label={t('documents.document')}
                onChange={(e) => handleSelect(e.target.value as IDocumentTypes)}
              >
                {handleErp()?.map((ele, ind) => {
                  if (!isOnline) {
                    if (ele.value === 'offline') {
                      return (
                        <MenuItem value={ele.value} key={ind}>
                          {dir === 'rtl' ? ele.label : ele?.englishLabel}
                        </MenuItem>
                      )
                    }
                  } else {
                    return (
                      <MenuItem value={ele.value} key={ind}>
                        {dir === 'rtl' ? ele.label : ele?.englishLabel}
                      </MenuItem>
                    )
                  }
                })}
              </Select>
            </FormControl>
          )}
        </Box>
        {isMobile && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => mutate()}
            sx={{ height: '43px', mt: '8px' }}
          >
            חפש
          </Button>
        )}
      </Box>
    </Paper>
  )
}

export default Filter
