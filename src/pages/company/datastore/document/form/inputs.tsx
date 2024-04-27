import Empty from '@/components/custom/empty';
import ArrayInput from '@/components/inputs/array';
import BooleanInput from '@/components/inputs/boolean';
import ImageInput from '@/components/inputs/image';
import JsonInput from '@/components/inputs/json';
import NumberInput from '@/components/inputs/number';
import TextInput from '@/components/inputs/text';
import TextAreaInput from '@/components/inputs/textarea';
import { Component } from '@/data/scheam';

export const generateDOM = (components: Component[]) => {
  if (components.length === 0)
    return (
      <Empty
        key={'empty'}
        data-grid={{ w: 12, h: 24, x: 0, y: 0, i: 'empty' }}
      />
    );

  return components.map((l: Component, i: number) => {
    const w = l.extra?.widget;
    if (w === 'json') {
      return (
        <div key={l.i} data-grid={{ ...l }} className='h-full p-2'>
          {<JsonInput extra={l.extra ?? { name: 'json' }} className='border' />}
        </div>
      );
    }
    if (w === 'array') {
      return (
        <div key={l.i} data-grid={{ ...l }} className='p-2'>
          {<ArrayInput extra={l.extra ?? { name: 'array' }} />}
        </div>
      );
    }
    if (w === 'number') {
      return (
        <div key={l.i} data-grid={{ ...l }} className='p-2'>
          {<NumberInput extra={l.extra ?? { name: 'number' }} />}
        </div>
      );
    }
    if (w === 'boolean') {
      return (
        <div key={l.i} data-grid={{ ...l }} className='p-2'>
          {<BooleanInput extra={l.extra ?? { name: 'boolean' }} />}
        </div>
      );
    }
    if (w === 'image') {
      return (
        <div key={l.i} data-grid={{ ...l }} className='p-2'>
          {<ImageInput extra={l.extra ?? { name: 'image' }} />}
        </div>
      );
    }
    if (w === 'textarea') {
      return (
        <div key={l.i} data-grid={{ ...l }} className='p-2'>
          {<TextAreaInput extra={l.extra ?? { name: 'textarea' }} />}
        </div>
      );
    }

    return (
      <div key={i} data-grid={{ ...l }} className='p-2'>
        {<TextInput extra={l.extra ?? { name: 'text' }} />}
      </div>
    );
  });
};
