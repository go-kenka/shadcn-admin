import { toast } from '@/components/ui/use-toast';
import { bo } from '@/wailsjs/go/models';
import {
  CreateData,
  DeleteDatastore,
  GetDatastore,
  SearchData,
  UpdateData,
} from '@/wailsjs/go/service/Datastore';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// 定义数据模型
export interface Row {
  [key: string]: any;
}

interface DocumentStoreState {
  loading: boolean;
  datastore: bo.Datastore | undefined;
  rows: bo.Row[];
  fields: bo.Field[];
  show: () => void;
  hide: () => void;
  init: (did: number) => Promise<void>;
  get: (id: number) => Promise<bo.Row | undefined>;
  add: (did: number, data: Row) => Promise<void>;
  update: (did: number, id: number, data: Row) => Promise<void>;
  delete: (did: number, id: number) => Promise<void>;
  search: (req: bo.SearchDataReq) => Promise<void>;
}

export const useDocumentStore = create<DocumentStoreState>()(
  immer((set, get) => ({
    loading: false,
    datastore: undefined,
    rows: [],
    fields: [],
    show: () => {
      set((state) => {
        state.loading = true;
      });
    },
    hide: () => {
      set((state) => {
        state.loading = false;
      });
    },
    get: async (id: number) => {
      get().show();
      const cm = get().rows.find((cm) => cm.id === id);
      if (cm) {
        get().hide();
        return Promise.resolve(cm);
      }

      const resp = await GetDatastore(id);
      get().hide();
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }

      return resp.datastore;
    },
    add: async (did: number, data: Row) => {
      get().show();
      const resp = await CreateData(did, data);
      get().hide();
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
      search({
        did: did,
        filters: [],
        sorts: [],
      });
    },
    update: async (did: number, id: number, data: Row) => {
      get().show();
      const resp = await UpdateData(did, id, data);
      get().hide();
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
      search({
        did: did,
        filters: [],
        sorts: [],
      });
    },
    delete: async (did: number, id: number) => {
      get().show();
      const resp = await DeleteDatastore(id);
      get().hide();
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
      search({
        did: did,
        filters: [],
        sorts: [],
      });
    },
    init: async (did: number) => {
      get().show();
      const resp = await GetDatastore(did);
      get().hide();
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }
      set((state) => {
        state.datastore = resp.datastore;
        state.fields = resp.datastore?.fields || [];
      });

      // 重新检索数据
      const search = get().search;
      search({
        did: did,
        filters: [],
        sorts: [],
      });
    },
    search: async (req: bo.SearchDataReq) => {
      get().show();
      const resp = await SearchData(req);
      get().hide();
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }

      set((state) => {
        state.rows = resp.data || [];
        state.fields = resp.fields || [];
      });
    },
  }))
);
