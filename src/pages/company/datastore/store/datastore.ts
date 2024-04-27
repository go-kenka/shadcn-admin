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
  search: (cid: number, key: string) => Promise<void>;
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
      search(req.c_id || 0, '');
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
      set((state) => {
        state.ds = state.ds.map((cm) => {
          if (cm.id === req.id) {
            cm.aid = req.aid;
            cm.name = req.name;
            cm.desc = req.desc;
          }
          return cm;
        });
      });
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
      set((state) => {
        state.ds = state.ds.filter((cm) => cm.id !== id);
      });
    },
    search: async (id: number, key: string) => {
      const req: bo.SearchDatastoreReq = {
        page: {
          num: 1,
          size: 1000,
        },
        id: id,
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
        state.ds = resp.list || [];
      });
    },
  }))
);
