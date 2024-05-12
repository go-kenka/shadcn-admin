// @ts-nocheck
import { bo } from '@/wailsjs/go/models';

// 模拟数据存储
const datastores: bo.Datastore[] = [
  {
    id: 1,
    c_id: 1,
    aid: 1,
    default_mapping: 1,
    name: 'test',
    address: 'test',
    desc: 'test',
    schema: {},
    fields: [
      {
        name: 'id',
        type: 'int',
        widget: 'text',
        key: 'id',
        pk: true,
        width: 100,
        order: 1,
      },
      {
        name: 'name',
        type: 'string',
        widget: 'text',
        key: 'name',
        pk: false,
        width: 100,
        order: 2,
      },
      {
        name: 'age',
        type: 'int',
        widget: 'text',
        key: 'age',
        pk: false,
        width: 100,
        order: 3,
      },
    ],
    primary_key: 'id',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

// 模拟映射
const mappings: bo.Mapping[] = [
  {
    id: 1,
    d_id: 1,
    is_default: true,
    name: 'test',
    desc: 'test',
    mappings: [
      { title: 'id', type: 'int', from_key: 'id', to_key: 'id' },
      { title: 'name', type: 'string', from_key: 'name', to_key: 'name' },
    ],
    created_at: new Date(),
    updated_at: new Date(),
  },
];

// 模拟数据行
const dataRows: bo.Row[] = [
  {
    id: 1,
    data: { id: 1, name: 'test', age: 18 },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    data: { id: 2, name: 'test2', age: 19 },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    data: { id: 3, name: 'test3', age: 20 },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    data: { id: 4, name: 'test4', age: 21 },
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const CreateData = (
  arg1: number,
  arg2: { [key: string]: any }
): Promise<bo.SimpleResp> => {
  // 实现创建数据的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

export const CreateDatastore = (
  arg1: bo.CreateDatastoreReq
): Promise<bo.SimpleResp> => {
  // 实现创建数据存储的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

export const CreateMapping = (
  arg1: bo.CreateMappingReq
): Promise<bo.SimpleResp> => {
  // 实现创建映射的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

export const DeleteDatastore = (arg1: number): Promise<bo.SimpleResp> => {
  // 实现删除数据存储的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

export const GetData = (arg1: number, arg2: number): Promise<bo.Row> => {
  // 实现获取数据的逻辑
  return Promise.resolve({ id: 1, data: { id: 1, name: 'test', age: 18 } });
};

export const GetDatastore = (arg1: number): Promise<bo.GetDatastoreResp> => {
  // 实现获取数据存储的逻辑
  return Promise.resolve({ data: datastores[0], error: undefined });
};

export const GetMapping = (arg1: number): Promise<bo.GetMappingResp> => {
  // 实现获取映射的逻辑
  return Promise.resolve({ data: mappings[0], error: undefined });
};

export const ImportData = (
  arg1: number,
  arg2: string,
  arg3: string,
  arg4: string
): Promise<bo.SimpleResp> => {
  // 实现导入数据的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

export const MergeData = (
  arg1: number,
  arg2: number,
  arg3: number
): Promise<{ [key: string]: any }> => {
  // 实现合并数据的逻辑
  return Promise.resolve({ id: 1, name: 'test', age: 18 });
};

// 	export interface SearchDataResp {
//     page?: PageResp;
//     data?: Usage[];
//     fields?: Field[];
//     error?: string;
//   }
export const SearchData = (
  arg1: bo.SearchDataReq
): Promise<bo.SearchDataResp> => {
  // 实现搜索数据的逻辑
  return Promise.resolve({
    page: { total: dataRows.length, num: 1, size: 10 },
    data: dataRows,
    fields: datastores[0].fields,
    error: undefined,
  });
};

export const SearchDatastoreList = (
  arg1: bo.SearchDatastoreReq
): Promise<bo.SearchDatastoreResp> => {
  // 实现搜索数据存储列表的逻辑
  return Promise.resolve({
    page: { total: datastores.length, num: 1, size: 10 },
    data: datastores,
    error: undefined,
  });
};

export const SearchMapping = (arg1: number): Promise<bo.SearchMappingResp> => {
  // 实现搜索映射的逻辑
  return Promise.resolve({
    page: { total: mappings.length, num: 1, size: 10 },
    data: mappings,
    error: undefined,
  });
};

export const Sync = (
  arg1: number,
  arg2: string,
  arg3: { [key: string]: string }
): Promise<bo.SimpleResp> => {
  // 实现同步的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

export const UpdateData = (
  arg1: number,
  arg2: number,
  arg3: { [key: string]: any }
): Promise<bo.SimpleResp> => {
  // 实现更新数据的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

export const UpdateDatastore = (
  arg1: bo.UpdateDatastoreReq
): Promise<bo.SimpleResp> => {
  // 实现更新数据存储的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

export const UpdateDatastoreSchema = (
  arg1: bo.UpdateDatastoreSchemaReq
): Promise<bo.SimpleResp> => {
  // 实现更新数据存储schema的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

export const UpdateMapping = (
  arg1: bo.UpdateMappingReq
): Promise<bo.SimpleResp> => {
  // 实现更新映射的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};
