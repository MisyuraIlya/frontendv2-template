/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import { useState, useRef, FC, ChangeEvent, ReactNode } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Box, Button, Grid } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { themeColors } from '../styles/mui'
import styled from 'styled-components'
import Modals from '../components/Modals'

interface MyCropperProps {
  aspectRatio: number
  uploadImg: (
    base64: string,
    fileName: string,
    isVideo: boolean,
    file?: File
  ) => void
  itemImage: string | null
  customClick?: ReactNode
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const MyCropper: FC<MyCropperProps> = ({
  aspectRatio,
  uploadImg,
  customClick,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const [isCropped, setIsCropped] = useState(true)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [cropData, setCropData] = useState('')
  const [fileName, setFileName] = useState('')
  const cropperRef = useRef<ReactCropperElement>(null)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const getCropData = () => {
    const cropper = cropperRef.current?.cropper
    if (cropper) {
      setCropData(cropper.getCroppedCanvas().toDataURL())
      setIsCropped(false)
    }
  }

  const handleSave = () => {
    uploadImg(cropData, fileName, false)
    setOpenModal(false)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.length) {
      const selectedFile = files[0]
      setFileName(selectedFile.name)

      if (selectedFile.type === 'video/mp4') {
        uploadImg('', selectedFile.name, true, selectedFile)
      } else {
        setPreviewUrl(URL.createObjectURL(selectedFile))
        setOpenModal(true)
      }
    }
  }

  const cancel = () => {
    setOpenModal(false)
  }

  const handleCustomClick = () => {
    inputFileRef.current?.click()
  }

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
        }}
      >
        <Box
          component="label"
          role={undefined}
          tabIndex={-1}
          onClick={handleCustomClick}
        >
          {customClick ?? (
            <ControlPointIcon
              sx={{
                fontSize: '40px',
                color: themeColors.primary,
                opacity: 0.5,
              }}
            />
          )}
          <VisuallyHiddenInput
            type="file"
            accept="image/*,video/mp4"
            onChange={handleFileChange}
            ref={inputFileRef}
          />
        </Box>
      </Box>

      <Modals.ModalWrapper
        active={openModal}
        setActive={setOpenModal}
        width={40}
        height="55%"
      >
        <Grid container spacing={1}>
          <Grid size={{ xs: 6 }}>
            <Box sx={{ height: '80%' }}>
              <img
                src={cropData || previewUrl!}
                alt="Preview"
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
            <Box
              sx={{ gap: 1, height: '20%', display:'flex', justifyContent:'center', alignItems:'center' }}
            >
              <Button
                variant="outlined"
                color="error"
                sx={{ width: 100 }}
                onClick={cancel}
              >
                בטל
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: 100 }}
                onClick={getCropData}
              >
                גזור
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: 100 }}
                onClick={handleSave}
                disabled={isCropped}
              >
                שמור
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Cropper
              src={previewUrl!}
              aspectRatio={aspectRatio}
              guides={false}
              checkCrossOrigin={false}
              ref={cropperRef}
            />
          </Grid>
        </Grid>
      </Modals.ModalWrapper>
    </>
  )
}

export default MyCropper
