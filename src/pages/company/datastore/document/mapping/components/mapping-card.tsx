import { Button } from '@/components/custom/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { DialogClose } from '@/components/ui/dialog';
import { useFieldArray, useFormContext } from 'react-hook-form';
import BindingItem from './binding-input';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

interface MappingCardProps {
  setCurrentTab: (tab: string) => void;
}

function MappingCard({ setCurrentTab }: MappingCardProps) {
  const { control } = useFormContext();
  const { fields } = useFieldArray({ control, name: 'mappings' });
  return (
    <Card className={''}>
      <CardHeader>
        <CardTitle>配置映射关系</CardTitle>
        <CardDescription>
          左边是固定列[A-Z]，可根据需要选择类型，右边是可选列，点击右边的列名可以选择该列作为映射目标。
        </CardDescription>
      </CardHeader>
      <CardContent className='pb-2 pt-2'>
        <ScrollArea className='h-[400px]'>
          {fields.map((field, index) => (
            <BindingItem index={index} key={field.id} />
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className={'mt-2 justify-end space-x-2'}>
        <Button
          type={'button'}
          variant='secondary'
          onClick={() => setCurrentTab('base')}
        >
          上一步
        </Button>
        <DialogClose>
          <Button type={'submit'}>提交</Button>
        </DialogClose>
      </CardFooter>
    </Card>
  );
}

export default MappingCard;
