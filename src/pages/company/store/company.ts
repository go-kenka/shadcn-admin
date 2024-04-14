import { toast } from '@/components/ui/use-toast';
import { bo } from '@/wailsjs/go/models';
import {
  CreateCompany,
  DeleteCompany,
  GetCompany,
  SearchCompanyList,
  UpdateCompany,
} from '@/wailsjs/go/service/Company';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface CompanyListState {
  cms: bo.Company[];
  get: (id: number) => Promise<bo.Company | undefined>;
  add: (name: string, desc: string) => Promise<void>;
  update: (id: number, name: string, desc: string) => Promise<void>;
  delete: (id: number) => Promise<void>;
  search: (key: string) => Promise<void>;
}

export const useCompanyStore = create<CompanyListState>()(
  immer((set, get) => ({
    cms: [],
    get: async (id: number) => {
      const cm = get().cms.find((cm) => cm.id === id);
      if (cm) {
        return Promise.resolve(cm);
      }

      const resp = await GetCompany(id);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }
      return resp.company;
    },
    add: async (name: string, desc: string) => {
      const resp = await CreateCompany(name, desc);
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
    update: async (id: number, name: string, desc: string) => {
      const resp = await UpdateCompany(id, name, desc);
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
      const resp = await DeleteCompany(id);
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
      const req: bo.SearchCompanyReq = {
        page: {
          num: 1,
          size: 1000,
        },
        id: 0,
        name: key,
      };
      const resp = await SearchCompanyList(req);
      if (resp.error) {
        toast({
          title: '提示',
          description: `出错了, 错误内容：${resp.error}`,
        });
        return;
      }

      set((state) => {
        state.cms = resp.list ?? [];
      });
    },
  }))
);
