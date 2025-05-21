// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react'
import { useRef } from 'react'
import { useSelectedProduct } from '../../../store/selecterdProduct.store'
import { Box, ImageListItem } from '@mui/material'

const AdditionalImages = () => {
  const { selectedProd, changeDefaultImage } = useSelectedProduct()
  const swiperRef = useRef<null>(null)

  const params = {
    spaceBetween: 20,
    slidesPerColumnFill: 'row',
    breakpoints: {
      1400: {
        slidesPerView: 6,
        slidesPerColumn: 1,
      },
      1000: {
        slidesPerView: 4,
        slidesPerColumn: 1,
      },
      600: {
        slidesPerView: 4,
        slidesPerColumn: 1,
      },
      0: {
        slidesPerView: 4,
        slidesPerColumn: 1,
      },
    },
  }

  return (
    <Box>
      <Swiper {...params} ref={swiperRef}>
        {selectedProd?.productImages?.map((element) => {
          return (
            <SwiperSlide key={element.id}>
              <ImageListItem
                onClick={() =>
                  changeDefaultImage(element?.mediaObject?.contentUrl)
                }
              >
                <img
                  style={{
                    border: '1px solid #e8e8e8',
                    padding: '8px 4px',
                    cursor: 'pointer',
                  }}
                  srcSet={
                    import.meta.env.VITE_MEDIA +
                    element?.mediaObject?.contentUrl
                  }
                  src={
                    import.meta.env.VITE_MEDIA +
                    element?.mediaObject?.contentUrl
                  }
                  alt={'img'}
                  loading="lazy"
                />
              </ImageListItem>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}

export default AdditionalImages
