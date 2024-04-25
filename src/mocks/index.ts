import {
  CreateAdapter,
  DeleteAdapter,
  GetAdapter,
  SearchAdapters,
  UpdateAdapter,
} from './adapter';
import {
  CreateCategory,
  DeleteCategory,
  GetCategory,
  SearchCategoryList,
  UpdateCategory,
} from './category';
import {
  GetCityList,
  GetMenuItems,
  OpenFileDialog,
  ToJsonSchema,
} from './common';
import {
  CreateCompany,
  DeleteCompany,
  GetCompany,
  SearchCompanyList,
  UpdateCompany,
} from './company';
import {
  CreateData,
  CreateDatastore,
  CreateMapping,
  DeleteDatastore,
  GetData,
  GetDatastore,
  GetMapping,
  ImportData,
  MergeData,
  SearchData,
  SearchDatastoreList,
  SearchMapping,
  Sync,
  UpdateData,
  UpdateDatastore,
  UpdateDatastoreSchema,
  UpdateMapping,
} from './datastore';
import {
  CreateProduct,
  DiscontinuedConfirm,
  DiscontinuedProduct,
  GetProductDetail,
  LaunchProduct,
  LaunchedConfirm,
  SearchProductList,
  UpdateProduct,
} from './product';
import {
  CreateStore,
  DeleteStore,
  GetStore,
  SearchStoreList,
  UpdateStore,
} from './store';

export function mockData() {
  console.log('mock');
  window['go'] = {
    service: {
      Adapter: {
        CreateAdapter,
        DeleteAdapter,
        GetAdapter,
        SearchAdapters,
        UpdateAdapter,
      },
      Category: {
        CreateCategory,
        DeleteCategory,
        GetCategory,
        SearchCategoryList,
        UpdateCategory,
      },
      Utils: {
        GetCityList,
        GetMenuItems,
        OpenFileDialog,
        ToJsonSchema,
      },
      Company: {
        SearchCompanyList,
        CreateCompany,
        UpdateCompany,
        DeleteCompany,
        GetCompany,
      },
      Datastore: {
        CreateData,
        CreateDatastore,
        CreateMapping,
        DeleteDatastore,
        GetData,
        GetDatastore,
        GetMapping,
        ImportData,
        MergeData,
        SearchData,
        SearchDatastoreList,
        SearchMapping,
        Sync,
        UpdateData,
        UpdateDatastore,
        UpdateDatastoreSchema,
        UpdateMapping,
      },
      Product: {
        CreateProduct,
        DiscontinuedConfirm,
        DiscontinuedProduct,
        GetProductDetail,
        LaunchProduct,
        LaunchedConfirm,
        SearchProductList,
        UpdateProduct,
      },
      Store: {
        CreateStore,
        DeleteStore,
        GetStore,
        SearchStoreList,
        UpdateStore,
      },
    },
  };
}
