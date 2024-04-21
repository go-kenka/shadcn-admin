import type { FC } from 'react';
import ArrayInputSetting from './inputs/ArrayInput/setting';
import BooleanInputSetting from './inputs/BooleanInput/setting';
import ImageInputSetting from './inputs/ImageInput/setting';
import JsonInputSetting from './inputs/JsonInput/setting';
import NumberInputSetting from './inputs/NumberInput/setting';
import TextAreaInputSetting from './inputs/TextAreaInput/setting';
import TextInputSetting from './inputs/TextInput/setting';
import useWidgetStore from './store/inputs';

interface SettingsProps {}

const Settings: FC<SettingsProps> = ({}) => {
  const current = useWidgetStore.use.selectedComponent();

  switch (current?.extra?.widget) {
    case 'text':
      return (
        <TextInputSetting
          extra={{
            name: current?.extra?.name,
            title: current?.extra?.title,
            desc: current?.extra?.desc,
            placeholder: current?.extra?.placeholder,
          }}
        ></TextInputSetting>
      );
    case 'textarea':
      return (
        <TextAreaInputSetting
          extra={{
            name: current?.extra?.name,
            title: current?.extra?.title,
            desc: current?.extra?.desc,
            placeholder: current?.extra?.placeholder,
          }}
        ></TextAreaInputSetting>
      );
    case 'image':
      return (
        <ImageInputSetting
          extra={{
            name: current?.extra?.name,
            title: current?.extra?.title,
            desc: current?.extra?.desc,
            placeholder: current?.extra?.placeholder,
          }}
        ></ImageInputSetting>
      );
    case 'number':
      return (
        <NumberInputSetting
          extra={{
            name: current?.extra?.name,
            title: current?.extra?.title,
            desc: current?.extra?.desc,
            placeholder: current?.extra?.placeholder,
          }}
        ></NumberInputSetting>
      );
    case 'boolean':
      return (
        <BooleanInputSetting
          extra={{
            name: current?.extra?.name,
            title: current?.extra?.title,
            desc: current?.extra?.desc,
            placeholder: current?.extra?.placeholder,
          }}
        ></BooleanInputSetting>
      );
    case 'json':
      return (
        <JsonInputSetting
          extra={{
            name: current?.extra?.name,
            title: current?.extra?.title,
            desc: current?.extra?.desc,
            placeholder: current?.extra?.placeholder,
          }}
        ></JsonInputSetting>
      );
    case 'array':
      return (
        <ArrayInputSetting
          extra={{
            name: current?.extra?.name,
            title: current?.extra?.title,
            desc: current?.extra?.desc,
            placeholder: current?.extra?.placeholder,
          }}
        ></ArrayInputSetting>
      );
    default:
      break;
  }
  return (
    <div className='flex h-auto items-center justify-center rounded border p-2'>
      什么都没有
    </div>
  );
};

export default Settings;
