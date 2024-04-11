import { Button } from '@/components/custom/button'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserNav } from '@/components/user-nav'
import Panel from './components/panel'
import { Welcome } from './components/welcome'

export default function Dashboard() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      {/* ===== Main ===== */}
      <LayoutBody className='space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            欢迎您，「管理员」
          </h1>
          <div className='flex items-center space-x-2'>
            <Button>分享</Button>
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='welcome'
          className='space-y-4'
        >
          <div className='w-full pb-2'>
            <TabsList>
              <TabsTrigger value='welcome'>欢迎使用</TabsTrigger>
              <TabsTrigger value='dashboard'>仪表板</TabsTrigger>
              <TabsTrigger value='reports'>报表</TabsTrigger>
              <TabsTrigger value='notifications'>通知中心</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='welcome' className='space-y-4'>
            <div className='h-full w-full items-center justify-center'>
              <Welcome />
            </div>
          </TabsContent>
          <TabsContent value='dashboard' className='space-y-4'>
            <Panel />
          </TabsContent>
          <TabsContent value='reports' className='space-y-4'>
            报表处理
          </TabsContent>
          <TabsContent value='notifications' className='space-y-4'>
            通知中心
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  )
}

const topNav = [
  {
    title: '欢迎使用',
    href: 'dashboard/overview',
    isActive: true,
  },
  {
    title: '供应商',
    href: 'dashboard/overview',
    isActive: false,
  },
  {
    title: '店铺',
    href: 'dashboard/customers',
    isActive: false,
  },
  {
    title: '适配器',
    href: 'dashboard/products',
    isActive: false,
  },
]
