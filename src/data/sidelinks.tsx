import {
  IconBrandAppgallery,
  IconBuildingStore,
  IconLayoutDashboard,
  IconServerBolt,
} from '@tabler/icons-react';

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
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
    label: '',
    href: '/company',
    icon: <IconServerBolt size={18} />,
  },
  {
    title: '店铺管理',
    label: '',
    href: '/store',
    icon: <IconBuildingStore size={18} />,
  },
  {
    title: '插件商店',
    label: '',
    href: '/plugin',
    icon: <IconBrandAppgallery size={18} />,
  },
];
