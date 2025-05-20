import React, { FC, useEffect } from 'react'
import { Box, IconButton, TextField, SxProps, Theme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import MicIcon from '@mui/icons-material/Mic'
import { useDebounce } from 'use-debounce'
import { themeSettings } from '../../styles/mui'

type ListComponentType = React.ReactNode

interface SearchInputProps {
  placeholder: string
  value: string
  setValue: (value: string) => void
  handleFunction?: (value: string) => void
  ListComponent?: ListComponentType
  sx?: SxProps<Theme>
  microphone?: boolean
  handleClose?: () => void
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  setValue,
  placeholder,
  handleFunction,
  ListComponent,
  sx,
  microphone = false,
  handleClose,
}) => {
  const [valueDebounced] = useDebounce(value, 1000)

  const handleMicClick = () => {
    try {
      const SpeechRecognitionConstructor =
        window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognitionConstructor) {
        console.error('Speech recognition not supported in this browser')
        return
      }
      const recognition = new SpeechRecognitionConstructor()
      recognition.lang = 'he-IL'
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setValue(transcript)
      }
      recognition.start()
    } catch (error) {
      console.error('Speech recognition error:', error)
    }
  }

  const handleCloseClick = () => {
    setValue('')
    handleClose?.()
  }

  useEffect(() => {
    if (handleFunction) {
      handleFunction(valueDebounced)
    }
  }, [valueDebounced])

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        value={value}
        sx={{
          backgroundColor: '#f3f5f9',
          borderRadius: themeSettings.borderRadius,
          '& input': { height: '10px', fontWeight: 700 },
          border: 'none',
          '& .MuiOutlinedInput-root': {
            '& fieldset': { border: 'none' },
          },
          ...sx,
        }}
        InputProps={{
          startAdornment: microphone ? (
            <IconButton sx={{ mr: 2 }} onClick={handleMicClick}>
              <MicIcon color="primary" />
            </IconButton>
          ) : undefined,
          endAdornment: (
            <IconButton onClick={value ? handleCloseClick : undefined}>
              {value ? (
                <CloseIcon sx={{ color: 'gray' }} />
              ) : (
                <SearchIcon sx={{ color: 'gray' }} />
              )}
            </IconButton>
          ),
        }}
      />
      {value && ListComponent}
    </Box>
  )
}

export default SearchInput
