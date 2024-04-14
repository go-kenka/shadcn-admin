import {
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

export const statuses = [
  {
    value: 0,
    label: '待配置',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 1,
    label: '正常',
    icon: CircleIcon,
  },
  {
    value: 2,
    label: '停用',
    icon: StopwatchIcon,
  },
];
