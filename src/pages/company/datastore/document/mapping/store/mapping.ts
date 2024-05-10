import { toast } from '@/components/ui/use-toast';
import { bo } from '@/wailsjs/go/models';
import {
  CreateMapping,
  GetMapping,
  SearchMapping,
  UpdateMapping,
} from '@/wailsjs/go/service/Datastore';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface MappingState {
  list: bo.Mapping[];
  get: (id: number) => Promise<bo.Mapping | undefined>;
  add: (req: bo.CreateMappingReq) => Promise<void>;
  update: (req: bo.UpdateMappingReq) => Promise<void>;
  delete: (id: number) => Promise<void>;
  search: (did: number) => Promise<void>;
}

export const useMapping = create<MappingState>()(
  immer((set, get) => ({
    list: [],
    get: async (id: number) => {
      const cm = get().list.find((cm) => cm.id === id);
      if (cm) {
        return Promise.resolve(cm);
      }

      const resp = await GetMapping(id);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }
      return resp.mapping;
    },
    add: async (req: bo.CreateMappingReq) => {
      const resp = await CreateMapping(req);
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
      search(req.d_id || 0);
    },
    update: async (req: bo.UpdateMappingReq) => {
      const resp = await UpdateMapping(req);
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
        state.list = state.list.map((cm) => {
          if (cm.id === req.id) {
            cm.name = req.name;
            cm.desc = req.desc;
            cm.is_default = req.is_default ?? false;
            cm.mappings = req.mappings;
          }
          return cm;
        });
      });
    },
    delete: async (_id: number) => {
      // todo: 待实现
    },
    search: async (did: number) => {
      const resp = await SearchMapping(did);
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
