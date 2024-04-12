import { toast } from '@/components/ui/use-toast'
import { bo } from '@/wailsjs/go/models'
import { CreateCompany } from '@/wailsjs/go/service/Company'
import { create } from 'zustand'

interface CompanyListState {
  cms: bo.Company[]
  add: (name: string, desc: string) => Promise<void>
  update: (id: number, name: string, desc: string) => Promise<void>
  delete: (id: number) => Promise<void>
  getList: (key: string) => Promise<void>
}

export const useCompanyStore = create<CompanyListState>((set) => ({
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
  },
  update: async (id: number, name: string, desc: string) => {},
  delete: async (id: number) => {},
  getList: async (key: string) => {},
}))
