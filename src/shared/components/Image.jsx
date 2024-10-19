import { useState } from 'react'
import ImageModal from './Modals/ImageModal'

export default function ImageComponent({
  image,
  imageAlt,
  objectFit = 'object-contain',
}) {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className='w-full h-full'>
      <div className='relative w-full h-full overflow-hidden rounded hover:cursor-pointer'>
        <img
          src={image}
          alt={imageAlt}
          onClick={() => setSelectedImage(image)}
          className={`absolute top-0 left-0 w-full h-full ${objectFit}`}
          style={{ maxHeight: '100%', maxWidth: '100%' }}
        />
      </div>
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          alt={imageAlt}
          onCloseModal={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}
