// @ts-nocheck
import { bo } from '@/wailsjs/go/models';

const categoryData: bo.Category[] = [
  {
    id: 1,
    aid: 1,
    name: 'Category 1',
    is_adapt: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    aid: 2,
    name: 'Category 2',
    is_adapt: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const CreateCategory = (
  arg1: bo.CreateCategoryReq
): Promise<bo.SimpleResp> => {
  const newCategory = {
    id: categoryData.length + 1,
    aid: arg1.aid,
    name: arg1.name,
    is_adapt: arg1.is_adapt || false,
    created_at: new Date(),
    updated_at: new Date(),
  };
  categoryData.push(newCategory);
  return Promise.resolve({
    data: 'Category created successfully',
    error: undefined,
  });
};

export const DeleteCategory = (arg1: number): Promise<bo.SimpleResp> => {
  const index = categoryData.findIndex((category) => category.id === arg1);
  if (index !== -1) {
    categoryData.splice(index, 1);
    return Promise.resolve({
      data: 'Category deleted successfully',
      error: undefined,
    });
  } else {
    return Promise.resolve({ data: undefined, error: 'Category not found' });
  }
};

export const GetCategory = (arg1: number): Promise<bo.GetCategoryResp> => {
  const category = categoryData.find((category) => category.id === arg1);
  if (category) {
    return Promise.resolve({ category, error: undefined });
  } else {
    return Promise.resolve({
      category: undefined,
      error: 'Category not found',
    });
  }
};

export const SearchCategoryList = (
  arg1: bo.SearchCategoryReq
): Promise<bo.SearchCategoryResp> => {
  const { tree } = arg1;
  if (tree) {
    // 构建树形结构的逻辑
    const result: bo.Category[] = [];
    return Promise.resolve({ list: result, error: undefined });
  } else {
    return Promise.resolve({ list: categoryData, error: undefined });
  }
};

export const UpdateCategory = (
  arg1: bo.UpdateCategoryReq
): Promise<bo.SimpleResp> => {
  const index = categoryData.findIndex((category) => category.id === arg1.id);
  if (index !== -1) {
    categoryData[index].aid = arg1.aid || categoryData[index].aid;
    categoryData[index].name = arg1.name || categoryData[index].name;
    categoryData[index].is_adapt =
      arg1.is_adapt || categoryData[index].is_adapt;
    categoryData[index].updated_at = new Date();
    return Promise.resolve({
      data: 'Category updated successfully',
      error: undefined,
    });
  } else {
    return Promise.resolve({ data: undefined, error: 'Category not found' });
  }
};
