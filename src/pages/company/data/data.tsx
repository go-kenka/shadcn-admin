import {
  RocketIcon,
  StopIcon,
  SymbolIcon,
  TableIcon,
} from '@radix-ui/react-icons';

interface Selecter {
  value: number;
  label: string;
  icon: typeof RocketIcon;
}

export const adapters: Selecter[] = [
  {
    value: 1,
    label: '适配器01',
    icon: RocketIcon,
  },
  {
    value: 2,
    label: '适配器02',
    icon: StopIcon,
  },
  {
    value: 3,
    label: '适配器03',
    icon: SymbolIcon,
  },
];

export const modes: Selecter[] = [
  {
    value: 0,
    label: '电子表格',
    icon: TableIcon,
  },
  {
    value: 1,
    label: '智能表格',
    icon: TableIcon,
  },
];
