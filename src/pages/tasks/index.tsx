import { Button } from '@/components/custom/button'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import { IconPlus } from '@tabler/icons-react'
import { CompanyCard } from './components/company-card'
import { myConpanyList } from './data/company'

export default function Tasks() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>供应商</h2>
            <p className='text-muted-foreground'>
              当前共有 108 个供应商，建议使用过滤器
            </p>
          </div>
          <div>
            <Button>
              <IconPlus className='mr-2 w-5' /> 添加
            </Button>
          </div>
        </div>
        <Separator className='my-4' />
        <div className='relative'>
          <ScrollArea>
            <div className='flex space-x-4 pb-4'>
              {myConpanyList.map((cm) => (
                <CompanyCard
                  key={cm.name}
                  company={cm}
                  className='w-[150px]'
                  aspectRatio='square'
                  width={150}
                  height={150}
                />
              ))}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      </LayoutBody>
    </Layout>
  )
}
