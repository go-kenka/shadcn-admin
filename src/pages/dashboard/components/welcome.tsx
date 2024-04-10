import { Card } from '@/components/ui/card'
// @ts-ignore
import Cat from './cat.svg?react'

const words = [
  '你只管努力，剩下的交给时间。',
  '不需要尽职尽责，需要尽心尽力',
  '企业发展，人人有责。愿你在新的一年里，与勤奋携手，让业绩攀升。',
  '一份耕耘，一份收获',
  '高山上的人总比平原上的人先看到日出。您高瞻远瞩，您的事业必然前景辉煌。祝您鹏程万里！',
  '立足新的起点，迈上新的征程，开创新的辉煌。',
  '拼搏与努力，奠定了不错的业绩；奋斗与汗水，成就了事业的辉煌',
  '财源广进，蒸蒸日上。',
  '团结协力共铸辉煌，展望未来蓝图宏伟',
  '风生水起，财源广进',
]

export function Welcome() {
  const index = () => {
    return Math.floor(Math.random() * words.length)
  }

  return (
    <Card className='flex h-[600px] w-full flex-col items-center justify-center p-4'>
      <Cat height={300} width={'100%'} />
      <span className='text-2xl text-primary'>{words[index()]}</span>
    </Card>
  )
}
