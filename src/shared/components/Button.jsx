const ButtonStyle = {
  Fill: 'fill',
  Outline: 'outline',
  Text: 'text',
  Cancel: 'cancel',
  Submit: 'submit',
}

export default function ButtonComponent({
  onClick,
  label,
  disabled = false,
  icon: Icon,
  variant = ButtonStyle.Fill,
  isSubmit = false,
}) {
  const baseStyles =
    'flex items-center disabled:cursor-not-allowed rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
  const variants = {
    [ButtonStyle.Fill]:
      'bg-primary text-white hover:bg-secondary focus-visible:outline-primary',
    [ButtonStyle.Outline]:
      'bg-white text-primary border border-primary hover:bg-backgroundLight focus-visible:outline-primary',
    [ButtonStyle.Text]:
      'text-primary hover:bg-backgroundLight focus-visible:outline-primary',
    [ButtonStyle.Cancel]:
      'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600',
    [ButtonStyle.Submit]:
      'bg-blue-700 text-white hover:bg-blue-600 focus-visible:outline-blue-700',
  }

  const type = isSubmit ? 'submit' : 'button'

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]}`}>
      {Icon && <Icon className='h-5 w-5 mr-2' aria-hidden='true' />}
      {label}
    </button>
  )
}

export { ButtonStyle }
