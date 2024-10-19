import { useRef } from 'react'

import { PhotoIcon } from '@heroicons/react/24/solid'
import { XCircleIcon } from '@heroicons/react/24/outline'

import { MdPhotoCamera } from 'react-icons/md' // Importa el ícono deseado
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { toast } from 'sonner'

import ImageComponent from '../../../shared/components/Image'
import ButtonComponent, { ButtonStyle } from '../../../shared/components/Button'

export default function ImagesForm({ images, setImages, errors }) {
  const fileInputRef = useRef(null) // Ref para el input de archivo

  const handleImageChange = async e => {
    const files = Array.from(e.target.files)
    const totalImages = [...images, ...files]

    if (totalImages.length > 4) {
      toast.error('Solo puedes subir hasta 4 imágenes.')
      return
    }

    setImages(totalImages)
  }

  const removeImage = indexToRemove => {
    if (images.length === 1) {
      toast.error('Debe haber al menos una imagen')
      return
    }
    setImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove)
    )
  }

  const onDragEnd = result => {
    const { destination, source } = result

    if (!destination) return

    const reorderedImages = Array.from(images)
    const [removed] = reorderedImages.splice(source.index, 1)
    reorderedImages.splice(destination.index, 0, removed)

    setImages(reorderedImages)
  }

  const handleClick = () => {
    fileInputRef.current.click() // Simula el clic en el input de archivo
  }

  return (
    <div>
      <div className='flex justify-between'>
        <h3 className='text-base font-semibold leading-7 text-gray-900'>
          Subir imágenes
        </h3>
        {/* Input de archivo oculto */}
        <input
          type='file'
          accept='image/*'
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          className='hidden' // Oculta el input
          disabled={images.length >= 4} // Desactiva si ya hay 4 imágenes
        />

        {/* Botón personalizado */}
        <ButtonComponent
          onClick={handleClick}
          icon={MdPhotoCamera}
          disabled={images.length >= 4}
          label={'Seleccionar imagen'}
          variant={ButtonStyle.Outline}
        />
      </div>
      {errors && <p className='text-xs text-red-500'>{errors.message}</p>}

      <div className='space-y-6 mt-6'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='images-droppable' direction='horizontal'>
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {images.map((image, index) => (
                  <Draggable
                    key={index}
                    draggableId={index.toString()}
                    index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='relative h-48 border-gray-400 border-2 bg-white'>
                        <ImageComponent
                          image={
                            typeof image === 'string'
                              ? image
                              : URL.createObjectURL(image)
                          }
                          imageAlt={`Preview Imagen ${index + 1}`}
                        />

                        <XCircleIcon
                          aria-hidden='true'
                          onClick={() => removeImage(index)}
                          className='mx-auto h-10 w-10 text-gray-700 absolute top-0 right-0 p-1 hover:cursor-pointer bg-transparent hover:text-red-600 rounded'
                        />
                      </div>
                    )}
                  </Draggable>
                ))}

                {/* Agregar espacios vacíos para las imágenes faltantes */}
                {[...Array(4 - images.length)].map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className='relative h-48 border-gray-400 border-2 bg-gray-200 flex items-center justify-center'>
                    {/* Aquí podrías mostrar una imagen genérica o un ícono */}
                    <PhotoIcon
                      aria-hidden='true'
                      className='mx-auto h-12 w-12 text-gray-300'
                    />
                  </div>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}
