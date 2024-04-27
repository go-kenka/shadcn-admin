import Empty from '@/components/custom/empty';
import type { FC } from 'react';
import ArrayInputSetting from './setting/array';
import BooleanInputSetting from './setting/boolean';
import ImageInputSetting from './setting/image';
import JsonInputSetting from './setting/json';
import NumberInputSetting from './setting/number';
import TextInputSetting from './setting/text';
import TextAreaInputSetting from './setting/textarea';
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
  return <Empty />;
};

export default Settings;
