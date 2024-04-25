import { toast } from '@/components/ui/use-toast';
import { bo } from '@/wailsjs/go/models';
import {
  CreateDatastore,
  DeleteDatastore,
  GetDatastore,
  SearchDatastoreList,
  UpdateDatastore,
} from '@/wailsjs/go/service/Datastore';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface DataStoreState {
  ds: bo.Datastore[];
  get: (id: number) => Promise<bo.Datastore | undefined>;
  add: (req: bo.CreateDatastoreReq) => Promise<void>;
  update: (req: bo.UpdateDatastoreReq) => Promise<void>;
  delete: (id: number) => Promise<void>;
  search: (key: string) => Promise<void>;
}

export const useDataStore = create<DataStoreState>()(
  immer((set, get) => ({
    ds: [],
    get: async (id: number) => {
      const cm = get().ds.find((cm) => cm.id === id);
      if (cm) {
        return Promise.resolve(cm);
      }

      const resp = await GetDatastore(id);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }
      return resp.datastore;
    },
    add: async (req: bo.CreateDatastoreReq) => {
      const resp = await CreateDatastore(req);
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
      search('');
    },
    update: async (req: bo.UpdateDatastoreReq) => {
      const resp = await UpdateDatastore(req);
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
      search('');
    },
    delete: async (id: number) => {
      const resp = await DeleteDatastore(id);
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
      search('');
    },
    search: async (key: string) => {
      const req: bo.SearchDatastoreReq = {
        page: {
          num: 1,
          size: 1000,
        },
        id: 0,
        name: key,
      };
      const resp = await SearchDatastoreList(req);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }

      set((state) => {
        state.ds = resp.list ?? [];
      });
    },
  }))
);
