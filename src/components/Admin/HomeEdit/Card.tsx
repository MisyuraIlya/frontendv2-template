import {
  Box,
  Button,
  Checkbox,
  IconButton,
  ImageList,
  TableCell,
  TextField,
  Typography,
} from '@mui/material'
import React, { FC, useState } from 'react'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { themeColors } from '../../../styles/mui'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import Modals from '../../Modals'
import useHomeMeida from '../../../hooks/admin/useAdminHomeMedia'
import DeleteIcon from '@mui/icons-material/Delete'
import MediaCard from './MediaCard'
import { onAsk } from '../../../utils/MySweetAlert'
import useHomeEdit from '../../../hooks/admin/useAdminHomeEdit'
import useDirection from '../../../hooks/useDirection'

interface CardProps {
  element: IHomeEdit
}

const Card: FC<CardProps> = ({ element }) => {
  const [active, setActive] = useState(false)
  const { handleUpdate, handleDelete } = useHomeEdit()
  const [checkedActive, setChekedActive] = useState(element.isActive)
  const [checkedVideo, setChekedVideo] = useState(element.isVideo)
  const [checkedBanner, setChekedBanner] = useState(element.isBanner)
  const [count, setCount] = useState(element.count)
  const [countMobile, setCountMobile] = useState(element.countMobile)
  const { data } = useHomeMeida()
  const dir = useDirection()

  const handleVideo = async () => {
    setChekedVideo(!checkedVideo)
    handleUpdate({
      id: element.id,
      isVideo: !checkedVideo,
    })
  }

  const handleBanner = async () => {
    setChekedBanner(!checkedBanner)
    handleUpdate({
      id: element.id,
      isBanner: !checkedBanner,
    })
  }

  const handleActive = async () => {
    setChekedActive(!checkedActive)
    handleUpdate({
      id: element.id,
      isActive: !checkedActive,
    })
  }

  const updateCount = async (number: number) => {
    setCount(number)
    handleUpdate({
      id: element.id,
      count: number,
    })
  }

  const updateCountMobile = async (number: number) => {
    setCountMobile(number)
    handleUpdate({
      id: element.id,
      countMobile: number,
    })
  }

  const deleteAsk = async () => {
    const ask = await onAsk('בטוח שתרצה למחוק?', '', dir)
    if (ask) {
      handleDelete(element.id)
    }
  }

  return (
    <>
      <TableCell>
        <Typography variant="body1">{element.type}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{element.orden}</Typography>
      </TableCell>
      <TableCell>
        <Checkbox
          checked={checkedVideo}
          onChange={() => handleVideo()}
          sx={{ color: themeColors.primary, cursor: 'pointer' }}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={checkedBanner}
          onChange={() => handleBanner()}
          sx={{ color: themeColors.primary, cursor: 'pointer' }}
        />
      </TableCell>
      {/* <TableCell>
        <Checkbox
          checked={checkedPopUp}
          onChange={() => handlePopUp()}
          sx={{ color: themeColors.primary, cursor: 'pointer' }}
        />
      </TableCell> */}
      <TableCell>
        <Checkbox
          checked={checkedActive}
          onChange={() => handleActive()}
          sx={{ color: themeColors.primary, cursor: 'pointer' }}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          value={count}
          onChange={(e) => setCount(+e.target.value)}
          onBlur={(e) => updateCount(+e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          value={countMobile}
          onChange={(e) => setCountMobile(+e.target.value)}
          onBlur={(e) => updateCountMobile(+e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          endIcon={<AddPhotoAlternateIcon />}
          onClick={() => setActive(true)}
        >
          שיוך מדייה
        </Button>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <IconButton>
            <DragIndicatorIcon sx={{ fontSize: '35px' }} />
          </IconButton>
          {element.isDeletable && (
            <IconButton onClick={() => deleteAsk()}>
              <DeleteIcon color="error" />
            </IconButton>
          )}
        </Box>
      </TableCell>

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
            return <MediaCard item={item} key={item.id} element={element} />
          })}
        </ImageList>
      </Modals.ModalWrapper>
    </>
  )
}

export default Card
