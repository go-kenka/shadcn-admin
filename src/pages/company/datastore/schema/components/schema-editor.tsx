import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState, type FC } from 'react';
import GridLayout from './grid-layout';
import ArrayInput from './toolbox/array';
import BooleanInput from './toolbox/boolean';
import ImageInput from './toolbox/image';
import JsonInput from './toolbox/json';
import NumberInput from './toolbox/number';
import TextInput from './toolbox/text';
import TextareaInput from './toolbox/textarea';
import Inputs from './inputs';

interface SchemaEditorProps {}

const SchemaEditor: FC<SchemaEditorProps> = ({}) => {
  const [items, setItems] = useState([{ id: 'item-1' }, { id: 'item-2' }]);
  return (
    <>
      <Card>
        <CardHeader className='m-2 ml-6 mr-6 rounded border p-2'>
          这里是toolbar
        </CardHeader>
        <CardContent className='flex h-[calc(100vh-200px)] flex-row space-x-2'>
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
          <div className='w-full overflow-auto rounded border p-2'>
            <GridLayout />
          </div>
          <div className='w-[300px] rounded border p-2'>属性栏</div>
        </CardContent>
      </Card>
    </>
  );
};

export default SchemaEditor;
