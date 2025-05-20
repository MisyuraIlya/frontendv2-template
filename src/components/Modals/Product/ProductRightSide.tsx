import React from 'react'
import { useSelectedProduct } from '../../../store/selecterdProduct.store'
import AdditionalImages from './AdditionalImages'
import { useModals } from '../../../provider/ModalProvider'
import { Box, ButtonBase } from '@mui/material'
import { useMobile } from '../../../provider/MobileProvider'
import logo from '../../../assets/images/logo.png'

const ProductRightSide: React.FC = () => {
  const { selectedProd } = useSelectedProduct()
  const { handleImageModal } = useModals()
  const { isMobile } = useMobile()

  const imageUrl = selectedProd.defaultImagePath
    ? `${import.meta.env.VITE_MEDIA}${selectedProd.defaultImagePath}`
    : `${logo}`

  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {selectedProd.defaultImagePath ? (
          <ButtonBase
            onClick={() => handleImageModal(imageUrl)}
            focusRipple
            aria-label={selectedProd.title || 'Open product'}
          >
            <img
              src={imageUrl}
              alt={selectedProd.title || ''}
              style={{
                width: isMobile ? 'auto' : '100%',
                maxHeight: isMobile ? '100px' : '400px',
                objectFit: 'cover',
              }}
            />
          </ButtonBase>
        ) : (
          <img
            src={imageUrl}
            alt=""
            style={{
              width: isMobile ? 'auto' : '100%',
              maxHeight: isMobile ? '100px' : '400px',
              objectFit: 'cover',
            }}
          />
        )}
      </Box>
      <Box>
        {selectedProd?.productImages?.length > 1 && <AdditionalImages />}
      </Box>
    </>
  )
}

export default ProductRightSide
