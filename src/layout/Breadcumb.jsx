import { Link, useLocation } from 'react-router-dom'
import { routeNavigation } from '../routes/Routes'
import { HomeIcon } from '@heroicons/react/20/solid'

const findRoute = (routes, path) => {
  for (const route of routes) {
    if (route.href === path) return [route]
    if (route.children) {
      const childRoute = findRoute(route.children, path)
      if (childRoute) return [route, ...childRoute]
    }
  }
  return null
}

const Breadcrumbs = () => {
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(part => part)
  let currentPath = ''
  let breadcrumbRoutes = []

  for (const part of pathParts) {
    currentPath += `/${part}`
    const matchedRoute = findRoute(routeNavigation, currentPath)
    if (matchedRoute) breadcrumbRoutes = matchedRoute
  }

  return (
    <nav
      aria-label='Breadcrumb'
      className='flex border-b border-gray-200 bg-white'>
      <ol
        role='list'
        className='mx-auto flex w-full space-x-4 px-4 sm:px-6 lg:px-8'>
        <li className='flex'>
          <div className='flex items-center'>
            <Link to='/' className='text-gray-400 hover:text-gray-500'>
              <HomeIcon aria-hidden='true' className='h-5 w-5 flex-shrink-0' />
              <span className='sr-only'>Home</span>
            </Link>
          </div>
        </li>
        {breadcrumbRoutes.map((route, index) => (
          <li key={index} className='flex'>
            <div className='flex items-center'>
              <svg
                fill='currentColor'
                viewBox='0 0 24 44'
                preserveAspectRatio='none'
                aria-hidden='true'
                className='h-full w-6 flex-shrink-0 text-gray-200'>
                <path d='M.293 0l22 22-22 22h1.414l22-22-22-22H.293z' />
              </svg>

              <Link
                to={route.href}
                aria-current={
                  index === breadcrumbRoutes.length - 1 ? 'page' : undefined
                }
                className='ml-4 text-sm font-medium text-gray-500 hover:text-gray-700'>
                {route.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
