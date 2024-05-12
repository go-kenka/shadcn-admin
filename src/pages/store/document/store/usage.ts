import { toast } from '@/components/ui/use-toast';
import { bo } from '@/wailsjs/go/models';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {GetUsageDetail, SearchUsageList} from "@/wailsjs/go/service/Usage";

interface UsageStoreState {
  list: bo.Usage[];
  get: (id: number) => Promise<bo.Usage | undefined>;
  delete: (id: number) => Promise<void>;
  search: (req: bo.SearchUsageReq) => Promise<void>;
}

export const useUsageStore = create<UsageStoreState>()(
  immer((set, get) => ({
    list: [],
    get: async (id: number) => {
      const cm = get().list.find((cm) => cm.id === id);
      if (cm) {
        return Promise.resolve(cm);
      }

      const resp = await GetUsageDetail(id);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }

      return resp.doc;
    },
    delete: async (_id: number) => {
      // todo: delete usage
    },
    search: async (req: bo.SearchUsageReq) => {
      const resp = await SearchUsageList(req);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }

      set((state) => {
        state.list = resp.products || [];
      });
    },
  }))
);
