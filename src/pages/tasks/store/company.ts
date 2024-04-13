import { toast } from '@/components/ui/use-toast'
import { bo } from '@/wailsjs/go/models'
import { CreateCompany, DeleteCompany, SearchCompanyList, UpdateCompany } from '@/wailsjs/go/service/Company'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface CompanyListState {
  cms: bo.Company[]
  add: (name: string, desc: string) => Promise<void>
  update: (id: number, name: string, desc: string) => Promise<void>
  delete: (id: number) => Promise<void>
  search: (key: string) => Promise<void>
}

export const useCompanyStore = create<CompanyListState>()(immer((set, get) => ({
  cms: [],
  add: async (name: string, desc: string) => {
    const resp = await CreateCompany(name, desc)
    if (resp.error) {
      toast({
        title: '提示',
        description: `出错了, 错误内容：${resp.error}`,
      })
      return
    }

    toast({
      title: "提示",
      description: '添加成功'
    })

    // 重新检索数据
    const search = get().search;
    search('');
  },
  update: async (id: number, name: string, desc: string) => {
    const resp = await UpdateCompany(id, name, desc)
    if (resp.error) {
      toast({
        title: '提示',
        description: `出错了, 错误内容：${resp.error}`,
      })
      return
    }
    toast({
      title: "提示",
      description: '更新成功'
    })
    // 重新检索数据
    const search = get().search;
    search('');
  },
  delete: async (id: number) => {
    const resp = await DeleteCompany(id)
    if (resp.error) {
      toast({
        title: '提示',
        description: `出错了, 错误内容：${resp.error}`,
      })
      return
    }
    toast({
      title: "提示",
      description: '删除成功'
    })
  },
  search: async (key: string) => {
    const req: bo.SearchCompanyReq = {
      page: {
        num: 1,
        size: 1000
      },
      id: 0,
      name: key,
    }
    const resp = await SearchCompanyList(req)
    if (resp.error) {
      toast({
        title: '提示',
        description: `出错了, 错误内容：${resp.error}`,
      })
      return
    }
    toast({
      title: "提示",
      description: '删除成功'
    })
  },
})))
