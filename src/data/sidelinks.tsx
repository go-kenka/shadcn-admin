import {
  IconBuildingStore,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconLayoutDashboard,
  IconServerBolt,
  IconSettings
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: '欢迎',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: '供应商',
    label: '3',
    href: '/tasks',
    icon: <IconServerBolt size={18} />,
  },
  {
    title: '店铺管理',
    label: '9',
    href: '/chats',
    icon: <IconBuildingStore size={18} />,
  },
  {
    title: '系统设置',
    label: '',
    href: '',
    icon: <IconSettings size={18} />,
    sub: [
      {
        title: '商品分类',
        label: '',
        href: '/sign-in',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: '适配器',
        label: '',
        href: '/sign-in-2',
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
  },
]
