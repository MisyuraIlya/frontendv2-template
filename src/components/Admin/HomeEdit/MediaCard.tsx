import {
  IconButton,
  ImageListItem,
  ImageListItemBar,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import React, { FC, useCallback, useEffect, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import useHomeMeida from '../../../hooks/admin/useAdminHomeMedia'
import logo from '../../../assets/images/logo.png'

interface MediaCardProps {
  item: IHomeMedia
  element: IHomeEdit
}

const MediaCard: FC<MediaCardProps> = ({ item, element }) => {
  const mediaSrc = `${import.meta.env.VITE_MEDIA}${item?.mediaObject?.contentUrl}`
  const isVideo = item?.mediaObject?.filePath.endsWith('.mp4')
  const { updateHandler } = useHomeMeida()

  const checkIsExistMedia = useCallback(() => {
    return element?.homeMedia?.some((el) => el.id === item.id)
  }, [element.homeMedia, item.id])

  const [active, setActive] = useState<boolean>(false)
  const [device, setDevice] = useState<'desktop' | 'mobile'>(item.device)

  const handleImage = (mediaItem: IHomeMedia) => {
    if (checkIsExistMedia()) {
      updateHandler({ id: mediaItem.id, home: null })
      setActive(false)
    } else {
      updateHandler({ id: mediaItem.id, home: { id: element.id } })
      setActive(true)
    }
  }

  const handleDeviceChange = (
    _event: React.MouseEvent<HTMLElement>,
    newDevice: 'desktop' | 'mobile' | null
  ) => {
    if (newDevice) {
      setDevice(newDevice)
      updateHandler({ id: item.id, device: newDevice })
    }
  }

  // Run whenever element.homeMedia or item.id changes
  useEffect(() => {
    setActive(checkIsExistMedia())
  }, [checkIsExistMedia])

  const mediaStyle = {
    width: '100%',
    height: device === 'desktop' ? '300px' : '200px',
  }

  return (
    <ImageListItem key={item.id} sx={{ position: 'relative' }}>
      <ToggleButtonGroup
        value={device}
        exclusive
        onChange={handleDeviceChange}
        sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}
      >
        <ToggleButton value="desktop">מסך מחשב</ToggleButton>
        <ToggleButton value="mobile">נייד</ToggleButton>
      </ToggleButtonGroup>

      {isVideo ? (
        <video src={mediaSrc} controls style={mediaStyle}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <track
            kind="captions"
            srcLang="en"
            label="English captions"
            src={`${mediaSrc}.vtt`}
            default
          />
        </video>
      ) : (
        <img
          src={mediaSrc}
          srcSet={mediaSrc}
          alt="Home media"
          loading="lazy"
          style={mediaStyle}
          onError={(e) =>
            ((e.target as HTMLImageElement).src =
              `${logo}`)
          }
        />
      )}

      <ImageListItemBar
        actionPosition="right"
        actionIcon={
          <IconButton sx={{ color: 'white' }} onClick={() => handleImage(item)}>
            {active ? <TaskAltIcon /> : <PanoramaFishEyeIcon />}
          </IconButton>
        }
      />
    </ImageListItem>
  )
}

export default MediaCard
