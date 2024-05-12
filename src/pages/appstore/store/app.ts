import { toast } from '@/components/ui/use-toast';
import { bo } from '@/wailsjs/go/models';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Install, SearchApps } from '@/wailsjs/go/service/AppStore';

interface AppState {
  list: bo.App[]; // 列表数据
  selected: bo.App | undefined; // 选中的应用
  installed: bo.App[]; // 安装的应用列表
  select: (id: string) => void;
  install: (id: string) => void;
  search: (key: string) => Promise<void>;
}

export const useApp = create<AppState>()(
  immer((set, get) => ({
    list: [],
    selected: undefined,
    installed: [],
    select: (id: string) => {
      const list = get().list;
      const selected = list.find((item) => item.id === id);
      if (selected) {
        set((state) => {
          state.selected = selected;
        });
      }
    },
    install: async (id: string) => {
      const resp = await Install(id);
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
    search: async (key: string) => {
      const req: bo.AppFilter = {
        page: 1,
        page_size: 10,
        key: key,
      };
      const resp = await SearchApps(req);
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
