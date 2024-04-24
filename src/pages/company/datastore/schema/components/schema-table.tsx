import { Button } from '@/components/custom/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import useWidgetStore from './store/inputs';
import './styles.css';

export const ReactGridLayout = WidthProvider(RGL);

export interface SchemaTableProps {
  className?: string;
  defaultWidth?: number;
}

export const SchemaTable: React.FC<SchemaTableProps> = ({
  className = 'layout1',
  defaultWidth = 120,
}) => {
  const widgets = useWidgetStore.use.panelComponents();
  const [components, setComponents] = useState(cloneDeep(widgets));

  useEffect(() => {
    setComponents(cloneDeep(widgets));
  }, [widgets]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default'>保存</Button>
      </DialogTrigger>
      <DialogContent className='flex max-w-[800px] flex-col gap-4'>
        <DialogHeader>
          <DialogTitle>表格预览设置（宽度与顺序）</DialogTitle>
        </DialogHeader>
        <Table className={`${className} flex-1`}>
          <TableCaption>
            表格数据的显示效果与现在设置的宽度、顺序有关。
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>排序</TableHead>
              <TableHead>字段名</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>标题</TableHead>
              <TableHead className='text-right'>宽度</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {components.map((cm, i) => (
              <TableRow key={cm.i}>
                <TableCell className='font-medium'>{i + 1}</TableCell>
                <TableCell>{cm.extra?.name}</TableCell>
                <TableCell>{cm.extra?.widget}</TableCell>
                <TableCell>{cm.extra?.title}</TableCell>
                <TableCell className='text-right'>
                  <Input
                    type='number'
                    min={60}
                    max={500}
                    value={cm.extra?.width ?? defaultWidth}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'secondary'}>取消</Button>
          </DialogClose>
          <Button variant={'default'}>提交</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SchemaTable;
