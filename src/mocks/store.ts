import { bo } from '@/wailsjs/go/models';

// 模拟商店数据
const stores: bo.Store[] = [
  {
    id: 1,
    name: '商店1',
    desc: '商店1的描述',
  },
  {
    id: 2,
    name: '商店2',
    desc: '商店2的描述',
  },
];

export const CreateStore = (
  arg1: string,
  arg2: string
): Promise<bo.SimpleResp> => {
  // 实现创建商店的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

export const DeleteStore = (arg1: number): Promise<bo.SimpleResp> => {
  // 实现删除商店的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

export const GetStore = (arg1: number): Promise<bo.GetStoreResp> => {
  // 实现获取商店详情的逻辑
  return Promise.resolve({ data: stores[0], error: undefined });
};

export const SearchStoreList = (
  arg1: bo.SearchStoreReq
): Promise<bo.SearchStoreResp> => {
  // 实现搜索商店列表的逻辑r
  return Promise.resolve({ list: stores, error: undefined });
};

export const UpdateStore = (
  arg1: number,
  arg2: string,
  arg3: string
): Promise<bo.SimpleResp> => {
  // 实现更新商店的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};
