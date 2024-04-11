import { Card } from '@/components/ui/card'

const words = [
  '你只管努力，剩下的交给时间。',
  '不需要尽职尽责，需要尽心尽力',
  '企业发展，人人有责。愿你在新的一年里，与勤奋携手，让业绩攀升。',
  '一份耕耘，一份收获',
  '立足新的起点，迈上新的征程，开创新的辉煌。',
  '拼搏与努力，奠定了不错的业绩；奋斗与汗水，成就了事业的辉煌',
  '财源广进，蒸蒸日上。',
  '团结协力共铸辉煌，展望未来蓝图宏伟',
  '风生水起，财源广进',
  '龙马精神，生龙活虎',
]

export function Welcome() {
  const index = () => {
    return Math.floor(Math.random() * words.length)
  }

  return (
    <Card
      className='flex h-[600px] w-full flex-col items-start justify-center pl-4'
      style={{
        backgroundImage: `url('./bg/bg${index()}.svg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '400px',
        backgroundPosition: 'right bottom',
      }}
    >
      {/* <Panda height={300} width={'100%'} /> */}
      <span className='pl-8 text-2xl text-primary'>{words[index()]}</span>
    </Card>
  )
}
