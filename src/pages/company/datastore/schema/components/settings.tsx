import type { FC } from 'react';
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
    default:
      break;
  }
  return (
    <div className='flex h-5/6 items-center justify-center rounded border'>
      什么都没有
    </div>
  );
};

export default Settings;
