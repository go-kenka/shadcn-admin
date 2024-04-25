// @ts-nocheck
import { bo } from '@/wailsjs/go/models';

const adapterData: bo.Adapter[] = [
  {
    id: 1,
    name: 'Adapter 1',
    plugin: 'plugin-1',
    config: { key1: 'value1' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    name: 'Adapter 2',
    plugin: 'plugin-2',
    config: { key2: 'value2' },
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const CreateAdapter = (
  arg1: bo.CreateAdapterReq
): Promise<bo.SimpleResp> => {
  const newAdapter = {
    id: adapterData.length + 1,
    name: arg1.name,
    plugin: arg1.plugin,
    config: arg1.config || {},
    created_at: new Date(),
    updated_at: new Date(),
  };
  adapterData.push(newAdapter);
  return Promise.resolve({
    data: 'Adapter created successfully',
    error: undefined,
  });
};

export const DeleteAdapter = (arg1: number): Promise<bo.SimpleResp> => {
  const index = adapterData.findIndex((adapter) => adapter.id === arg1);
  if (index !== -1) {
    adapterData.splice(index, 1);
    return Promise.resolve({
      data: 'Adapter deleted successfully',
      error: undefined,
    });
  } else {
    return Promise.resolve({ data: undefined, error: 'Adapter not found' });
  }
};

export const GetAdapter = (arg1: number): Promise<bo.GetAdapterResp> => {
  const adapter = adapterData.find((adapter) => adapter.id === arg1);
  if (adapter) {
    return Promise.resolve({ adapter, error: undefined });
  } else {
    return Promise.resolve({ adapter: undefined, error: 'Adapter not found' });
  }
};

export const SearchAdapters = (
  arg1: bo.SearchAdapterReq
): Promise<bo.SearchAdapterResp> => {
  const { page, id, name } = arg1;
  const filteredData = adapterData.filter((adapter) => {
    const idMatch = id ? adapter.id === id : true;
    const nameMatch = name ? adapter.name?.includes(name) : true;
    return idMatch && nameMatch;
  });

  const totalCount = filteredData.length;
  const startIndex = (page?.num || 1) * (page?.size || 10) - (page?.size || 10);
  const endIndex = startIndex + (page?.size || 10);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return Promise.resolve({
    page: { size: page?.size || 10, num: page?.num || 1, total: totalCount },
    list: paginatedData,
    error: undefined,
  });
};

export const UpdateAdapter = (
  arg1: bo.UpdateAdapterReq
): Promise<bo.SimpleResp> => {
  const index = adapterData.findIndex((adapter) => adapter.id === arg1.id);
  if (index !== -1) {
    adapterData[index].name = arg1.name || adapterData[index].name;
    adapterData[index].plugin = arg1.plugin || adapterData[index].plugin;
    adapterData[index].config = arg1.config || adapterData[index].config;
    adapterData[index].updated_at = new Date();
    return Promise.resolve({
      data: 'Adapter updated successfully',
      error: undefined,
    });
  } else {
    return Promise.resolve({ data: undefined, error: 'Adapter not found' });
  }
};
