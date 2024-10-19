import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline'
import { AiOutlineStock } from 'react-icons/ai'
import { RiMedicineBottleLine } from 'react-icons/ri'
import { TbLogs } from 'react-icons/tb'
import { BiCategory } from 'react-icons/bi'
import { MdOutlineGeneratingTokens } from 'react-icons/md'

export const routeNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  {
    name: 'Gestión de Usuarios',
    icon: UsersIcon,
    current: false,
    children: [
      { name: 'Administradores', href: '/gestion-usuarios/administradores' },
      { name: 'Clientes', href: '/gestion-usuarios/clientes' },
    ],
  },
  {
    name: 'Gestión de Categorias',
    href: '/gestion-categorias',
    icon: BiCategory,
    current: false,
  },
  {
    name: 'Gestión de Marcas',
    href: '/gestion-marcas',
    icon: MdOutlineGeneratingTokens,
    current: false,
  },
  {
    name: 'Gestión de Inventario',
    href: '/gestion-inventario',
    icon: RiMedicineBottleLine,
    current: false,
  },
  {
    name: 'Ventas',
    href: '/ventas',
    icon: AiOutlineStock,
    current: false,
  },
  {
    name: 'Registro de Actividades',
    href: '/registro-actividades',
    icon: TbLogs,
    current: false,
  },
]

export function findTitleByPath(path) {
  for (const item of routeNavigation) {
    if (item.href && path.startsWith(item.href)) {
      return item.name
    }
    if (item.children) {
      for (const child of item.children) {
        if (path.startsWith(child.href)) {
          return `${item.name} - ${child.name}`
        }
      }
    }
  }
  return 'Error en ruta'
}
