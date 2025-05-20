/* eslint-disable import/no-unresolved, react/no-unknown-property */
import React, { FC, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { themeColors, themeSettings } from '../../styles/mui'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ProductCard from '../common/ProductCard'
import { useMobile } from '../../provider/MobileProvider'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface ProductSectionProps {
  title: string
  array: IProduct[]
  toShow: number
  toShowInMobile: number
  column: number
  loading: boolean
  link: string
}

const Products: FC<ProductSectionProps> = ({
  title,
  array,
  link,
  toShow,
  toShowInMobile,
}) => {
  const { t } = useTranslation()
  const swiperRef = useRef<SwiperClass | null>(null)
  const { isMobile } = useMobile()
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
        slidesPerColumn: 2,
      },
      1000: {
        slidesPerView: toShow,
        slidesPerColumn: 1,
      },
      600: {
        slidesPerView: toShowInMobile,
        slidesPerColumn: 1,
      },
      0: {
        slidesPerView: toShowInMobile,
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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'block' : 'column',
              height: '100%',
              gap: '15px',
            }}
          >
            {isMobile && (
              <Box sx={{ marginTop: 'auto', display: 'flex', gap: '15px' }}>
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
              </Box>
            )}

            <Box
              sx={{
                display: isMobile ? 'flex' : 'block',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Typography variant="h5">{title}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: '3px',
                }}
              >
                <Typography
                  sx={{ color: themeColors.info, cursor: 'pointer' }}
                  variant="body1"
                  onClick={() => navigate(link)}
                >
                  {t('homePage.allProducts')}
                </Typography>
                <ArrowBackIosNewIcon
                  sx={{ color: themeColors.info, fontSize: '15px' }}
                />
              </Box>
            </Box>

            {!isMobile && (
              <Box sx={{ marginTop: 'auto', display: 'flex', gap: '15px' }}>
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
              </Box>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <Swiper
            {...settings}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
          >
            {array?.map((element) => (
              <SwiperSlide key={element.id}>
                <ProductCard product={element} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Products
