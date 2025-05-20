import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import CollectionsIcon from '@mui/icons-material/Collections'
import AddIcon from '@mui/icons-material/Add'
import Modals from '../../Modals'
import useHomeMeida from '../../../hooks/admin/useAdminHomeMedia'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  onAsk,
  onErrorAlert,
  onSuccessAlert,
} from '../../../utils/MySweetAlert'
import Utils from '../../../utils'
import { base64ToFile } from '../../../helpers/base64ToFile'
import { MediaObjectService } from '../../../services/admin/AdminMediaObject.service'
import { AdminHomeMediaService } from '../../../services/admin/AdminHomeMedia.service'
import Loader from '../../../utils/Loader'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import useHomeEdit from '../../../hooks/admin/useAdminHomeEdit'
import useDirection from '../../../hooks/useDirection'
import logo from '../../../assets/images/logo.png'

const Options = () => {
  const [active, setActive] = useState(false)
  const [loadingUpload, setLodingUpload] = useState(false)
  const { data, deleteHandler } = useHomeMeida()
  const { handleCreate } = useHomeEdit()
  const dir = useDirection()

  const handleDelete = async (id: number) => {
    const ask = await onAsk('בטוח שתרצה למחוק?', '', dir)
    if (ask) {
      deleteHandler(id)
    }
  }

  const uploadImg = async (
    img: string,
    fileName: string,
    isVideo = false,
    file?: File
  ) => {
    setLodingUpload(true)
    if (!isVideo) {
      const convertFile = base64ToFile(img, fileName)
      const res = await MediaObjectService.uploadImage(convertFile, 'homemedia')
      const res2 = await AdminHomeMediaService.createHomeMedia({
        mediaObject: {
          id: res.id,
        },
      })
      if (res2) {
        onSuccessAlert('תמונה עלתה בהצלחה', '')
      }
    } else {
      if (file) {
        const maxFileSizeMB = 10
        const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024
        if (file.size > maxFileSizeBytes) {
          onErrorAlert('ערך מקסימלי לסרטון 10MB', '')
          setLodingUpload(false)
          return
        }

        const res = await MediaObjectService.uploadImage(file, 'homemedia')
        const res2 = await AdminHomeMediaService.createHomeMedia({
          mediaObject: {
            id: res.id,
          },
        })
        if (res2) {
          onSuccessAlert('סרטון עלה בהצלחה', '')
        }
      } else {
        console.error('No video file provided.')
      }
    }
    setLodingUpload(false)
  }

  const addLine = async () => {
    const obj = {
      type: '',
      orden: 99,
      isVideo: false,
      isBanner: false,
      isActive: false,
      count: 1,
      countMobile: 1,
      isPopUp: false,
      isDeletable: true,
    } as IHomeEdit
    handleCreate(obj)
  }

  return (
    <>
      {loadingUpload && <Loader />}
      <Box sx={{ display: 'flex', gap: '110px', alignItems: 'center' }}>
        <Utils.MyCropper
          aspectRatio={1920 / 730}
          uploadImg={uploadImg}
          itemImage={''}
          customClick={
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              sx={{ height: '50px', width: '150px', mt: '12px' }}
            >
              הוספת מדייה
            </Button>
          }
        />
        <Utils.MyCropper
          aspectRatio={12 / 16}
          uploadImg={uploadImg}
          itemImage={''}
          customClick={
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              sx={{ height: '50px', width: '150px', mt: '12px' }}
            >
              מדיה למובייל
            </Button>
          }
        />
        <Button
          onClick={() => setActive(true)}
          variant="contained"
          endIcon={<CollectionsIcon />}
          sx={{ marginTop: '12px' }}
        >
          צפייה בכל המדייה
        </Button>
        <Button
          onClick={() => addLine()}
          variant="contained"
          endIcon={<AddCircleIcon />}
          sx={{ marginTop: '12px' }}
        >
          הוספת שורה
        </Button>
      </Box>

      <Modals.ModalWrapper
        active={active}
        setActive={setActive}
        height={'80%'}
        width={60}
        component={
          <Box>
            <Typography variant="h6">מדיה</Typography>
          </Box>
        }
      >
        <ImageList cols={4}>
          {(data ?? []).map((item) => {
            const mediaSrc = `${import.meta.env.VITE_MEDIA}${item?.mediaObject?.contentUrl}`
            const isVideo = item?.mediaObject?.filePath.endsWith('.mp4')
            return (
              <ImageListItem key={item.id}>
                {isVideo ? (
                  <video
                    src={mediaSrc}
                    controls
                    style={{ width: '100%', height: '300px' }}
                  >
                    <track kind="captions" src="" />
                  </video>
                ) : (
                  <img
                    src={mediaSrc}
                    alt={mediaSrc}
                    loading="lazy"
                    style={{ width: '100%', height: '300px', objectFit:'contain' }}
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        `${logo}`)
                    }
                  />
                )}
                <ImageListItemBar
                  actionIcon={
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon style={{ color: 'white' }} />
                    </IconButton>
                  }
                  actionPosition="right"
                />
              </ImageListItem>
            )
          })}
        </ImageList>
      </Modals.ModalWrapper>
    </>
  )
}

export default Options
