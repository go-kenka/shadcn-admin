import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentSales() {
  return (
    <div className='space-y-8'>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>HG</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>沸炉重庆老火锅</p>
          <p className='text-sm text-muted-foreground'>
            沸炉重庆老火锅丨2店适用
          </p>
        </div>
        <div className='ml-auto font-medium'>¥128.00</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='flex h-9 w-9 items-center justify-center space-y-0 border'>
          <AvatarImage src='/avatars/02.png' alt='Avatar' />
          <AvatarFallback>MT</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Magnet磁食</p>
          <p className='text-sm text-muted-foreground'>
            Magnet磁食丨全国16店适用
          </p>
        </div>
        <div className='ml-auto font-medium'>¥328.00</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/03.png' alt='Avatar' />
          <AvatarFallback>HY</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>耗儿鱼</p>
          <p className='text-sm text-muted-foreground'>
            美味耗儿鱼，加量不加价
          </p>
        </div>
        <div className='ml-auto font-medium'>¥98.00</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/04.png' alt='Avatar' />
          <AvatarFallback>DJ</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>新疆大扒鸡</p>
          <p className='text-sm text-muted-foreground'>纯正新疆大盘鸡</p>
        </div>
        <div className='ml-auto font-medium'>¥68.00</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/05.png' alt='Avatar' />
          <AvatarFallback>BG</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>乐山钵钵鸡</p>
          <p className='text-sm text-muted-foreground'>美味价廉，值得拥有</p>
        </div>
        <div className='ml-auto font-medium'>¥48.00</div>
      </div>
    </div>
  )
}
