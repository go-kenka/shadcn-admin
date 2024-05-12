import { toast } from '@/components/ui/use-toast';
import { bo } from '@/wailsjs/go/models';
import {
  CreateStore,
  DeleteStore,
  GetStore,
  SearchStoreList,
  UpdateStore,
} from '@/wailsjs/go/service/Store';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface StoreState {
  list: any[];
  get: (id: number) => Promise<bo.Store | undefined>;
  add: (name: string, desc: string) => Promise<void>;
  update: (id: number, name: string, desc: string) => Promise<void>;
  delete: (id: number) => Promise<void>;
  search: (id: number, key: string) => Promise<void>;
}

export const useStore = create<StoreState>()(
  immer((set, get) => ({
    list: [],
    get: async (id: number) => {
      const s = get().list.find((s) => s.id === id);
      if (s) {
        return Promise.resolve(s);
      }

      const resp = await GetStore(id);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }
      return resp.store;
    },
    add: async (name: string, desc: string) => {
      const resp = await CreateStore(name, desc);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }

      toast({
        title: '提示',
        description: '添加成功',
      });

      // 重新检索数据
      const search = get().search;
      search(0, '');
    },
    update: async (id: number, name: string, desc: string) => {
      const resp = await UpdateStore(id, name, desc);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }
      toast({
        title: '提示',
        description: '更新成功',
      });
      // 重新检索数据
      const search = get().search;
      search(0, '');
    },
    delete: async (id: number) => {
      const resp = await DeleteStore(id);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }
      toast({
        title: '提示',
        description: '删除成功',
      });
      // 重新检索数据
      const search = get().search;
      search(0, '');
    },
    search: async (id: number, key: string) => {
      const req: bo.SearchStoreReq = {
        page: {
          num: 1,
          size: 1000,
        },
        id: id,
        name: key,
      };
      const resp = await SearchStoreList(req);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }

      set((state) => {
        state.list = resp.list || [];
      });
    },
  }))
);
