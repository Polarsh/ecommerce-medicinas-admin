import { COMPANY_LOGO, COMPANY_NAME } from '../../utils/constant'

export default function LogoComponent({ size = 'h-8' }) {
  return (
    <div>
      <span className='sr-only'>{COMPANY_NAME}</span>
      <img
        className={`mx-auto w-auto ${size}`}
        src={COMPANY_LOGO}
        alt={COMPANY_NAME}
      />
    </div>
  )
}
