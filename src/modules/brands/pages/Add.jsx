import CardComponent from '../../../shared/components/Cards/Card'
import Title from '../../../shared/components/Title'

import BrandForm from '../components/BrandForm' // Asegúrate de tener un BrandForm configurado

export default function BrandAddPage() {
  const initialData = {
    name: '',
  }

  return (
    <div className='space-y-6'>
      <Title
        title={'Crear Marca'}
        description={'Aquí podrás crear el detalle de la marca'}
      />

      <CardComponent>
        <BrandForm initialData={initialData} />
      </CardComponent>
    </div>
  )
}
