import React, { FC } from 'react'

interface ImageModalProps {
  active: boolean
  setActive: (value: boolean) => void
  src: string
  alt?: string
}

const ImageModal: FC<ImageModalProps> = ({
  active,
  setActive,
  src,
  alt = '',
}) => {
  if (!active) return null

  return (
    <div
      className="modal-image animated"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <button
        type="button"
        className="close"
        onClick={() => setActive(false)}
        aria-label="Close image modal"
      >
        <span className="material-symbols-outlined">close</span>
      </button>

      <div className="img-wrapper">
        <img src={src} alt={alt} />
      </div>
    </div>
  )
}

export default ImageModal
