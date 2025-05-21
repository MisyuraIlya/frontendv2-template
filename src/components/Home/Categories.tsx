/* eslint-disable import/no-unresolved, react/no-unknown-property */
import { FC, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'
// import 'swiper/css/scrollbar'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material'
import { themeSettings } from '../../styles/mui'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import hooks from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { URLS } from '../../enums/urls'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/images/logo.png'

interface CategoriesProps {
  toShow: number
  toShowMobile: number
}

const Categories: FC<CategoriesProps> = ({ toShow, toShowMobile }) => {
  const { data } = hooks.useDataCategories()
  const { t } = useTranslation()
  const swiperRef = useRef<SwiperClass | null>(null)
  const navigate = useNavigate()

  const settings = {
    slidesPerView: 4,
    loop: true,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1400: {
        slidesPerView: toShow,
        slidesPerColumn: 1,
      },
      1000: {
        slidesPerView: toShow,
        slidesPerColumn: 1,
      },
      600: {
        slidesPerView: toShowMobile,
        slidesPerColumn: 1,
      },
      0: {
        slidesPerView: toShowMobile,
        slidesPerColumn: 1,
      },
    },
  }

  const goToNextSlide = () => {
    swiperRef.current?.slideNext()
  }

  const goToPrevSlide = () => {
    swiperRef.current?.slidePrev()
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <IconButton
          sx={{
            bgcolor: '#F6F6F6',
            borderRadius: themeSettings.borderRadius,
            color: 'black',
          }}
          onClick={goToPrevSlide}
        >
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{
            bgcolor: '#F6F6F6',
            borderRadius: themeSettings.borderRadius,
            color: 'black',
          }}
          onClick={goToNextSlide}
        >
          <ArrowBackIosNewOutlinedIcon />
        </IconButton>
        <Typography variant="h4">{t('categories')}</Typography>
        <IconButton onClick={() => navigate(URLS.CATALOG_VIEW.LINK)}>
          <ArrowBackOutlinedIcon sx={{ fontSize: '30px', color: 'black' }} />
        </IconButton>
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        <Swiper
          {...settings}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
        >
          {data?.map((element) => {
            const baseURL = import.meta.env.VITE_MEDIA
            const encodedURL = element?.mediaObject?.contentUrl
              ? `${baseURL}${encodeURIComponent(
                  element.mediaObject.contentUrl
                )}`
              : `${logo}`

            return (
              <SwiperSlide key={element.id}>
                <Card
                  onClick={() =>
                    navigate(`/client/catalog/${element.id}/0/0?page=1`)
                  }
                >
                  <CardActionArea>
                    <CardContent
                      sx={{
                        height: '250px',
                        padding: '16px',
                        borderRadius: '20px',
                        backgroundImage: `
                          linear-gradient(180deg, rgba(0, 162, 253, 0) 22.35%, rgba(0, 162, 253, 0.5) 70.2%), 
                          linear-gradient(0deg, rgba(0, 162, 253, 0.2) 0%, rgba(0, 162, 253, 0.2) 100%), 
                          url(${encodedURL})
                        `,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'normal, color, normal',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Typography gutterBottom variant="h6">
                        {element.title}
                      </Typography>
                      <Button
                        component="span"
                        endIcon={<ArrowBackOutlinedIcon />}
                        sx={{ color: 'white' }}
                      >
                        לקטלוג
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
    </Box>
  )
}

export default Categories
