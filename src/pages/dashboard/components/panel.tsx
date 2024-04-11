import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  IconBellExclamation,
  IconServerBolt,
  IconTrolley,
  IconUsersGroup,
} from '@tabler/icons-react'
import { Overview } from './overview'
import { RecentSales } from './recent-sales'

export default function Panel() {
  return (
    <>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>供应商数据</CardTitle>
            <IconServerBolt className='font-thin text-gray-400' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>45,045</div>
            <p className='text-xs text-muted-foreground'>
              目前比较常用供应商 5+
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>店铺商品</CardTitle>
            <IconTrolley className='font-thin text-gray-400' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+30</div>
            <p className='text-xs text-muted-foreground'>较上月新增 40%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>团队人员</CardTitle>
            <IconUsersGroup className='font-thin text-gray-400' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-xs text-muted-foreground'>团队相对稳定</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>未读通知</CardTitle>
            <IconBellExclamation className='font-thin text-gray-400' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>10+</div>
            <p className='text-xs text-muted-foreground'>
              当前未读较多，请及时查收
            </p>
          </CardContent>
        </Card>
      </div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        <Card className='col-span-1 lg:col-span-4'>
          <CardHeader>
            <CardTitle>商品上架记录</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <Overview />
          </CardContent>
        </Card>
        <Card className='col-span-1 lg:col-span-3'>
          <CardHeader>
            <CardTitle>最新上架商品</CardTitle>
            <CardDescription>最近上架商品前 5 条</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
