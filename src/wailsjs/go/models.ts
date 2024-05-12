export namespace bo {
	
	export interface Menu {
	    name: string;
	    icon: string;
	    method: string;
	    children: Menu[];
	}
	export interface Manifest {
	    id: string;
	    name: string;
	    version: string;
	    desc: string;
	    icon: string;
	    cmd: string;
	    secret: string;
	    platform: string;
	    main: string;
	    menu: Menu[];
	}
	export interface Adapter {
	    id?: number;
	    plugin?: string;
	    manifest?: Manifest;
	    config: {[key: string]: any};
	    // Go type: time
	    created_at?: any;
	    // Go type: time
	    updated_at?: any;
	}
	export interface Category {
	    id?: number;
	    aid?: number;
	    name?: string;
	    is_adapt?: boolean;
	    // Go type: time
	    created_at?: any;
	    // Go type: time
	    updated_at?: any;
	}
	export interface City {
	    label: string;
	    value: string;
	}
	export interface Company {
	    id?: number;
	    name?: string;
	    desc?: string;
	    // Go type: time
	    created_at?: any;
	    // Go type: time
	    updated_at?: any;
	}
	export interface CreateAdapterReq {
	    path?: string;
	    config?: {[key: string]: any};
	}
	export interface CreateCategoryReq {
	    aid?: number;
	    name?: string;
	    is_adapt?: boolean;
	}
	export interface CreateDatastoreReq {
	    c_id?: number;
	    name?: string;
	    desc?: string;
	    aid?: number;
	    mode?: string;
	}
	export interface MappingSet {
	    title?: string;
	    type?: string;
	    from_key?: string;
	    to_key?: string;
	}
	export interface CreateMappingReq {
	    d_id?: number;
	    name?: string;
	    is_default?: boolean;
	    desc?: string;
	    mappings?: MappingSet[];
	}
	export interface Field {
	    name: string;
	    type: string;
	    widget: string;
	    key: string;
	    pk: boolean;
	    width: number;
	    order: number;
	}
	export interface Datastore {
	    id?: number;
	    c_id?: number;
	    aid?: number;
	    default_mapping?: number;
	    name?: string;
	    mode?: number;
	    desc?: string;
	    schema?: {[key: string]: any};
	    fields?: Field[];
	    primary_key?: string;
	    // Go type: time
	    created_at?: any;
	    // Go type: time
	    updated_at?: any;
	}
	export interface Filter {
	    key: string;
	    operator: string;
	    value: string;
	}
	export interface GetAdapterResp {
	    adapter?: Adapter;
	    error?: string;
	}
	export interface GetCategoryResp {
	    category?: Category;
	    error?: string;
	}
	export interface GetCompanyResp {
	    company?: Company;
	    error?: string;
	}
	export interface GetDatastoreResp {
	    datastore?: Datastore;
	    error?: string;
	}
	export interface Usage {
	    id?: number;
	    sid?: number;
	    batch_id?: string;
	    item_id?: number;
	    f1?: string;
	    f2?: string;
	    f3?: string;
	    f4?: string;
	    f5?: string;
	    f6?: string;
	    f7?: string;
	    f8?: string;
	    f9?: string;
	    f10?: string;
	    f11?: string;
	    f12?: string;
	    f13?: string;
	    f14?: string;
	    f15?: string;
	    f16?: string;
	    f17?: string;
	    f18?: string;
	    f19?: string;
	    f20?: string;
	    f21?: string;
	    f22?: string;
	    f23?: string;
	    f24?: string;
	    f25?: string;
	    f26?: string;
	    f27?: string;
	    f28?: string;
	    f29?: string;
	    f30?: string;
	    raw_data?: {[key: string]: any};
	    // Go type: time
	    created_at?: any;
	    // Go type: time
	    updated_at?: any;
	}
	export interface GetDetailResp {
	    doc?: Usage;
	    error: string;
	}
	export interface Mapping {
	    id?: number;
	    d_id?: number;
	    is_default: boolean;
	    name?: string;
	    desc?: string;
	    mappings?: MappingSet[];
	    // Go type: time
	    created_at?: any;
	    // Go type: time
	    updated_at?: any;
	}
	export interface GetMappingResp {
	    mapping?: Mapping;
	    error?: string;
	}
	export interface Store {
	    id?: number;
	    name?: string;
	    desc?: string;
	    // Go type: time
	    created_at?: any;
	    // Go type: time
	    updated_at?: any;
	}
	export interface GetStoreResp {
	    store?: Store;
	    error?: string;
	}
	
	export interface MapResp {
	    data?: {[key: string]: any};
	    error?: string;
	}
	
	export interface MenuItem {
	    id: string;
	    name: string;
	    path: string;
	    icon: string;
	    routes: MenuItem[];
	}
	export interface MenuResp {
	    menus?: Menu[];
	    error?: string;
	}
	export interface PageReq {
	    size: number;
	    num: number;
	}
	export interface PageResp {
	    size: number;
	    num: number;
	    total: number;
	}
	export interface Row {
	    id?: number;
	    data?: {[key: string]: any};
	    // Go type: time
	    created_at?: any;
	    // Go type: time
	    updated_at?: any;
	}
	export interface SearchAdapterReq {
	    page?: PageReq;
	    id: number;
	    name: string;
	}
	export interface SearchAdapterResp {
	    page?: PageResp;
	    list?: Adapter[];
	    error?: string;
	}
	export interface SearchBindingAdapterResp {
	    list?: Adapter[];
	    error?: string;
	}
	export interface SearchCategoryReq {
	    tree: boolean;
	}
	export interface SearchCategoryResp {
	    list?: Category[];
	    error?: string;
	}
	export interface SearchCompanyReq {
	    page?: PageReq;
	    id: number;
	    name: string;
	}
	export interface SearchCompanyResp {
	    page?: PageResp;
	    list?: Company[];
	    error?: string;
	}
	export interface Sort {
	    key: string;
	    value: string;
	}
	export interface SearchDataReq {
	    page?: PageReq;
	    did: number;
	    filters: Filter[];
	    sorts: Sort[];
	}
	export interface SearchDataResp {
	    page?: PageResp;
	    data?: Row[];
	    fields?: Field[];
	    error?: string;
	}
	export interface SearchDatastoreReq {
	    page?: PageReq;
	    cid: number;
	    name?: string;
	    mode?: string;
	}
	export interface SearchDatastoreResp {
	    page?: PageResp;
	    list?: Datastore[];
	    error?: string;
	}
	export interface SearchMappingResp {
	    list?: Mapping[];
	    error?: string;
	}
	export interface SearchStoreReq {
	    page?: PageReq;
	    id: number;
	    name: string;
	}
	export interface SearchStoreResp {
	    page?: PageResp;
	    list?: Store[];
	    error?: string;
	}
	export interface SearchUsageReq {
	    page?: PageReq;
	    sid: number;
	    txt?: string;
	}
	export interface SearchUsageResp {
	    page?: PageResp;
	    products: Usage[];
	    error: string;
	}
	export interface Sheet {
	    id?: number;
	    data?: {[key: string]: any};
	    // Go type: time
	    created_at?: any;
	    // Go type: time
	    updated_at?: any;
	}
	export interface SimpleResp {
	    data?: string;
	    error?: string;
	}
	
	
	export interface UpdateAdapterReq {
	    id: number;
	    path?: string;
	    config?: {[key: string]: any};
	}
	export interface UpdateCategoryReq {
	    id?: number;
	    aid?: number;
	    name?: string;
	    is_adapt?: boolean;
	}
	export interface UpdateDatastoreReq {
	    id?: number;
	    name?: string;
	    desc?: string;
	    aid?: number;
	}
	export interface UpdateDatastoreSchemaReq {
	    id?: number;
	    schema?: {[key: string]: any};
	    fields?: Field[];
	    primary_key?: string;
	}
	export interface UpdateMappingReq {
	    id?: number;
	    name?: string;
	    is_default?: boolean;
	    desc?: string;
	    mappings?: MappingSet[];
	}

}

