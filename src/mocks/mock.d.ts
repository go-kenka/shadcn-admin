declare interface Window {
  go: {
    service: {
      Company?: {
        CreateCompany?: (arg1: string, arg2: string) => Promise<bo.SimpleResp>;
        DeleteCompany?: (arg1: number) => Promise<bo.SimpleResp>;
        GetCompany?: (arg1: number) => Promise<bo.GetCompanyResp>;
        SearchCompanyList?: (
          arg1: bo.SearchCompanyReq
        ) => Promise<bo.SearchCompanyResp>;
        UpdateCompany?: (
          arg1: number,
          arg2: string,
          arg3: string
        ) => Promise<bo.SimpleResp>;
      };
      Adapter?: {
        CreateAdapter?: (arg1: bo.CreateAdapterReq) => Promise<bo.SimpleResp>;
        DeleteAdapter?: (arg1: number) => Promise<bo.SimpleResp>;
        GetAdapter?: (arg1: number) => Promise<bo.GetAdapterResp>;
        SearchAdapters?: (
          arg1: bo.SearchAdapterReq
        ) => Promise<bo.SearchAdapterResp>;
        UpdateAdapter?: (arg1: bo.UpdateAdapterReq) => Promise<bo.SimpleResp>;
      };
      Category?: {
        CreateCategory?: (arg1: bo.CreateCategoryReq) => Promise<bo.SimpleResp>;
        DeleteCategory?: (arg1: number) => Promise<bo.SimpleResp>;
        GetCategory?: (arg1: number) => Promise<bo.GetCategoryResp>;
        SearchCategoryList?: (
          arg1: bo.SearchCategoryReq
        ) => Promise<bo.SearchCategoryResp>;
        UpdateCategory?: (arg1: bo.UpdateCategoryReq) => Promise<bo.SimpleResp>;
      };
      Datastore?: {
        CreateData?: (
          arg1: number,
          arg2: { [key: string]: any }
        ) => Promise<bo.SimpleResp>;
        CreateDatastore?: (
          arg1: bo.CreateDatastoreReq
        ) => Promise<bo.SimpleResp>;
        CreateMapping?: (arg1: bo.CreateMappingReq) => Promise<bo.SimpleResp>;
        DeleteDatastore?: (arg1: number) => Promise<bo.SimpleResp>;
        GetData?: (arg1: number, arg2: number) => Promise<bo.Row>;
        GetDatastore?: (arg1: number) => Promise<bo.GetDatastoreResp>;
        GetMapping?: (arg1: number) => Promise<bo.GetMappingResp>;
        ImportData?: (
          arg1: number,
          arg2: string,
          arg3: string,
          arg4: string
        ) => Promise<bo.SimpleResp>;
        MergeData?: (
          arg1: number,
          arg2: number,
          arg3: number
        ) => Promise<{ [key: string]: any }>;
        SearchData?: (arg1: bo.SearchDataReq) => Promise<bo.SearchDataResp>;
        SearchDatastoreList?: (
          arg1: bo.SearchDatastoreReq
        ) => Promise<bo.SearchDatastoreResp>;
        SearchMapping?: (arg1: number) => Promise<bo.SearchMappingResp>;
        Sync?: (
          arg1: number,
          arg2: string,
          arg3: { [key: string]: string }
        ) => Promise<bo.SimpleResp>;
        UpdateData?: (
          arg1: number,
          arg2: number,
          arg3: { [key: string]: any }
        ) => Promise<bo.SimpleResp>;
        UpdateDatastore?: (
          arg1: bo.UpdateDatastoreReq
        ) => Promise<bo.SimpleResp>;
        UpdateDatastoreSchema?: (
          arg1: bo.UpdateDatastoreSchemaReq
        ) => Promise<bo.SimpleResp>;
        UpdateMapping?: (arg1: bo.UpdateMappingReq) => Promise<bo.SimpleResp>;
      };
      Product?: {
        CreateProduct?: (arg1: bo.CreateProductReq) => Promise<bo.SimpleResp>;
        DiscontinuedConfirm?: (arg1: number) => Promise<bo.SimpleResp>;
        DiscontinuedProduct?: (
          arg1: number,
          arg2: number
        ) => Promise<bo.SimpleResp>;
        GetProductDetail?: (arg1: number) => Promise<bo.GetDetailResp>;
        LaunchProduct?: (arg1: number, arg2: number) => Promise<bo.SimpleResp>;
        LaunchedConfirm?: (
          arg1: number,
          arg2: string
        ) => Promise<bo.SimpleResp>;
        SearchProductList?: (
          arg1: bo.SearchProductReq
        ) => Promise<bo.SearchProductResp>;
        UpdateProduct?: (arg1: number, arg2: number) => Promise<bo.SimpleResp>;
      };
      Store?: {
        CreateStore?: (arg1: string, arg2: string) => Promise<bo.SimpleResp>;
        DeleteStore?: (arg1: number) => Promise<bo.SimpleResp>;
        GetStore?: (arg1: number) => Promise<bo.GetStoreResp>;
        SearchStoreList?: (
          arg1: bo.SearchStoreReq
        ) => Promise<bo.SearchStoreResp>;
        UpdateStore?: (
          arg1: number,
          arg2: string,
          arg3: string
        ) => Promise<bo.SimpleResp>;
      };
      Utils?: {
        GetCityList?: () => Promise<Array<bo.City>>;
        GetMenuItems?: () => Promise<bo.MenuItem>;
        OpenFileDialog?: () => Promise<bo.SimpleResp>;
        ToJsonSchema?: (arg1: { [key: string]: any }) => Promise<bo.SimpleResp>;
      };
    };
  };
}
