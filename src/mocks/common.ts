import { bo } from '@/wailsjs/go/models';

const cities: bo.City[] = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  // 更多城市数据...
];

const menuItems: bo.MenuItem = {
  id: 'root',
  name: '根菜单',
  path: '/',
  icon: 'home',
  routes: [
    {
      id: 'adapter',
      name: '适配器管理',
      path: '/adapter',
      icon: 'adapter',
      routes: [],
    },
    {
      id: 'category',
      name: '类别管理',
      path: '/category',
      icon: 'category',
      routes: [],
    },
    // 更多菜单项...
  ],
};

const GetCityList = (): Promise<Array<bo.City>> => {
  return Promise.resolve(cities);
};

const GetMenuItems = (): Promise<bo.MenuItem> => {
  return Promise.resolve(menuItems);
};

const OpenFileDialog = (): Promise<bo.SimpleResp> => {
  // 模拟打开文件对话框的逻辑
  return Promise.resolve({
    data: 'File selected successfully',
    error: undefined,
  });
};

const ToJsonSchema = (arg1: { [key: string]: any }): Promise<bo.SimpleResp> => {
  // 模拟将对象转换为 JSON Schema 的逻辑
  const jsonSchema = {
    /* 生成的 JSON Schema 对象 */
  };
  return Promise.resolve({
    data: JSON.stringify(jsonSchema),
    error: undefined,
  });
};

export const initUtils = () => {
  window['go'] = {
    service: {
      Utils: {
        GetCityList,
        GetMenuItems,
        OpenFileDialog,
        ToJsonSchema,
      },
    },
  };
};
