import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { bo } from '@/wailsjs/go/models';
import { useNavigate } from 'react-router-dom';

interface CompanyProps extends React.HTMLAttributes<HTMLDivElement> {
  company: bo.Company;
  aspectRatio?: 'portrait' | 'square';
  width?: number;
  height?: number;
}

export function CompanyCard({
  company: cm,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  ...props
}: CompanyProps) {
  // 导航器
  const nav = useNavigate();

  // 跳转到详细画面
  const toInfo = (id: number | undefined) => {
    if (id) {
      nav(`/company/${id}`);
    }
  };

  return (
    <Card className={cn('space-y-3', className)} {...props}>
      <CardContent className='p-1'>
        <img
          src={`https://bing.img.run/rand_1366x768.php?ts=${performance.now().toString()}`}
          alt={cm.name}
          className='rounded-tl-lg rounded-tr-lg'
          width={width}
          height={height}
        />
      </CardContent>
      <CardHeader className='p-2' onClick={() => toInfo(cm.id)}>
        <CardTitle>{cm.name}</CardTitle>
        <CardDescription className='line-clamp-3'>{cm.desc}</CardDescription>
      </CardHeader>
    </Card>
  );
}
