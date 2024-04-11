import { Input } from '@/components/ui/input'
import {
  IconBuildingStore,
  IconDatabaseLeak,
  IconServerBolt,
  IconSettings,
} from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command'

export function Search() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <div>
      <Input
        type='search'
        placeholder='按⌘+S进行全局搜索'
        onClick={() => setOpen(true)}
        className='md:w-[100px] lg:w-[300px]'
      />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='全局搜索...' />
        <CommandList>
          <CommandEmpty>没有找到数据</CommandEmpty>
          <CommandGroup heading='经常使用'>
            <CommandItem>
              <IconDatabaseLeak className='mr-2 h-4 w-4' />
              <span>直连天下</span>
            </CommandItem>
            <CommandItem>
              <IconDatabaseLeak className='mr-2 h-4 w-4' />
              <span>蓝色兄弟</span>
            </CommandItem>
            <CommandItem>
              <IconDatabaseLeak className='mr-2 h-4 w-4' />
              <span>爱奇艺</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='功能模块'>
            <CommandItem>
              <IconServerBolt className='mr-2 h-4 w-4' />
              <span>供应商管理</span>
            </CommandItem>
            <CommandItem>
              <IconBuildingStore className='mr-2 h-4 w-4' />
              <span>店铺管理</span>
            </CommandItem>
            <CommandItem>
              <IconSettings className='mr-2 h-4 w-4' />
              <span>系统设置</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
