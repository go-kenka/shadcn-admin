import { bo } from '@/wailsjs/go/models';
import dayjs from 'dayjs';

export const datastores: bo.Datastore[] = [
  {
    id: 8782,
    name: '饿了么黄金会员3',
    desc: '饿了么黄金会员仓库',
    aid: 1,
    created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    id: 7878,
    name: '饿了么黄金会员2',
    desc: '饿了么黄金会员仓库',
    aid: 2,
    created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    id: 7839,
    name: '饿了么黄金会员1',
    desc: '饿了么黄金会员仓库',
    aid: 3,
    created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
];
