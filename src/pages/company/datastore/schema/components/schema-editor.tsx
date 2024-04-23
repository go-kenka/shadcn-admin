import { Button } from '@/components/custom/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { IconCube } from '@tabler/icons-react';
import { useState, type FC } from 'react';
import Inputs from './inputs';
import SchemaBuilder from './schema-builder';
import SchemaPreview from './schema-preview';
import Settings from './settings';
import ArrayInput from './toolbox/array';
import BooleanInput from './toolbox/boolean';
import ImageInput from './toolbox/image';
import JsonInput from './toolbox/json';
import NumberInput from './toolbox/number';
import TextInput from './toolbox/text';
import TextareaInput from './toolbox/textarea';

interface SchemaEditorProps {}

const SchemaEditor: FC<SchemaEditorProps> = ({}) => {
  const [pre, setPre] = useState(false);
  const [col, setCol] = useState<number>(2);

  const editor = () => {
    return (
      <>
        <div className='w-[310px] rounded border p-2'>
          组件栏
          <Inputs
            items={[
              <TextInput key={'text'} />,
              <NumberInput key={'number'} />,
              <TextareaInput key={'area'} />,
              <BooleanInput key={'bool'} />,
              <ImageInput key={'image'} />,
              <ArrayInput key={'array'} />,
              <JsonInput key={'json'} />,
            ]}
          />
        </div>
        <div className='w-full rounded border p-2'>
          <SchemaBuilder cols={col} />
        </div>
        <div className='w-[400px] rounded border p-2'>
          <div>属性栏</div>
          <Settings />
        </div>
      </>
    );
  };

  return (
    <>
      <Card>
        <CardHeader className='m-4 ml-6 mr-6 flex flex-row items-center justify-between rounded border p-2'>
          <div className='flex flex-1 items-center gap-2'>
            <IconCube className='h-6 w-6 animate-spin text-primary' />
            <h2 className='text-primary'>万能表单</h2>
          </div>
          <div className='flex gap-2'>
            <Input
              type='number'
              className='w-24'
              step={1}
              min={1}
              max={12}
              value={col}
              onChange={(e) => setCol(Number(e.target.value))}
            />
            <SchemaPreview cols={col} />
            <Button>保存</Button>
          </div>
        </CardHeader>
        <CardContent className='flex h-[calc(100vh-210px)] flex-row space-x-2'>
          {editor()}
        </CardContent>
      </Card>
    </>
  );
};

export default SchemaEditor;
