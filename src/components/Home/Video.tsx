/* eslint-disable import/no-unresolved, react/no-unknown-property */
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, Paper, Box } from '@mui/material'
import { useAuthProvider } from '../../provider/AuthProvider'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import useDirection from '../../hooks/useDirection'
import { useCart } from '../../store/cart.store'

interface VideoProps {
  isVideo: boolean
  src: string | string[]
  isMobile?: boolean
  settings?: {
    title?: string
    description?: string
  }
}

const Video: FC<VideoProps> = ({ isVideo, src, settings }) => {
  const currentDir = useDirection()
  const styles = {
    videoContainer: {
      position: 'relative',
      width: '100%',
      height: '600px',
      overflow: 'hidden',
      background: '#fff',
    } as React.CSSProperties,
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: '0',
      left: '0',
      filter: 'brightness(50%)',
    } as React.CSSProperties,
    media: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    } as React.CSSProperties,
    showcase: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: '#fff',
    } as React.CSSProperties,
    title: {} as React.CSSProperties,
  }

  const { isAuthrized } = useAuthProvider()
  const { selectedMode } = useCart()
  return (
    <Box style={styles.videoContainer} dir={currentDir}>
      <Paper elevation={0} dir={currentDir}>
        {isVideo ? (
          <video
            style={styles.video}
            preload="auto"
            loop
            muted
            autoPlay
            playsInline
            webkit-playsInline
            x-webkit-airplay="allow"
          >
            <source
              src={`${import.meta.env.VITE_MEDIA}${src}`}
              type="video/mp4"
            />
          </video>
        ) : Array.isArray(src) ? (
          <Box dir={currentDir}>
            <Swiper
              key={currentDir}
              modules={[Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              loop={true}
              autoplay={{ delay: 4000 }}
            >
              {src.map((_, index) => (
                <SwiperSlide key={index}>
                  <Box sx={{ width: '100%', height: '100%' }}>
                    <img
                      src={`${import.meta.env.VITE_MEDIA}${src}`}
                      style={styles.media}
                      alt={`slide-${index}`}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        ) : (
          <img
            src={`${import.meta.env.VITE_MEDIA}${src}`}
            style={styles.video}
            alt="media"
          />
        )}
      </Paper>
      <Box style={styles.showcase}>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', mb: '120px' }}>
          <Box>
            <Typography
              variant="h3"
              style={styles.title}
              sx={{
                width: { xs: '100%', md: '100%' },
                fontSize: { xs: '25px', md: '42px' },
              }}
            >
              {settings?.title}
            </Typography>
            <Typography
              variant="h3"
              style={styles.title}
              sx={{
                width: { xs: '100%', md: '100%' },
                fontSize: { xs: '25px', md: '42px' },
              }}
            >
              {settings?.description}
            </Typography>
          </Box>
        </Box>
        {isAuthrized && (
          <Link to={`/client/catalog/${selectedMode?.value}/0/0/0?page=1`}>
            <Button
              variant="contained"
              sx={{ padding: '12px 20px' }}
              color="secondary"
            >
              לקטלוג המלא
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  )
}

export default Video
