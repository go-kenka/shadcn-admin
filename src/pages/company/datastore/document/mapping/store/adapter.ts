import { toast } from '@/components/ui/use-toast';
import { bo } from '@/wailsjs/go/models';
import {
  DelBinding,
  GetBindingData,
  SearchBindingAdapters,
  SetBinding,
} from '@/wailsjs/go/service/Datastore';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface AdapterState {
  list: bo.Adapter[];
  getBinding: (aid: number, mid: number) => Promise<any>;
  binding: (aid: number, mid: number, config: any) => Promise<void>;
  delete: (aid: number, mid: number) => Promise<void>;
  search: (mid: number) => Promise<void>;
}

export const useBindingAdapter = create<AdapterState>()(
  immer((set, get) => ({
    list: [],
    getBinding: async (aid: number, mid: number) => {
      const resp = await GetBindingData(aid, mid);
      if (resp.error) {
        console.log(`出错了, 错误内容：${resp.error}`);
        return {};
      }
      return resp.data;
    },
    binding: async (aid: number, mid: number, config: any) => {
      const resp = await SetBinding(aid, mid, config);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }

      toast({
        title: '提示',
        description: '设置成功',
      });
      get().search(mid);
    },
    delete: async (aid: number, mid: number) => {
      const resp = await DelBinding(aid, mid);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }
      toast({
        title: '提示',
        description: '删除绑定成功',
      });
      get().search(mid);
    },
    search: async (mid: number) => {
      const resp = await SearchBindingAdapters(mid);
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
