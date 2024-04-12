export namespace bo {
	
	export interface Adapter {
	    id?: number;
	    name?: string;
	    plugin?: string;
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
	    name?: string;
	    plugin?: string;
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
	export interface Item {
	    sku: string;
	    title: string;
	    sale_price: number;
	    origin_price: number;
	    channel_price: number;
	    stock: number;
	    single_max: number;
	    code_amount: number;
	}
	export interface CreateProductReq {
	    sid?: number;
	    lid?: string;
	    cid?: number;
	    item_id?: number;
	    brand?: string;
	    booking_type?: number;
	    cities?: string[];
	    number?: number;
	    fixed_price?: number;
	    buy_notice?: string;
	    spu?: string;
	    sender_city?: string;
	    begin_date?: string;
	    end_date?: string;
	    consume_store?: string;
	    title?: string;
	    simple_desc?: string;
	    main_image?: string;
	    png_image?: string;
	    html_content?: string;
	    html_content_url?: string;
	    recharge_address?: string;
	    category_name?: string;
	    item_list?: Item[];
	    field1?: string;
	    field2?: string;
	    field3?: string;
	    field4?: string;
	    field5?: string;
	    field6?: string;
	    field7?: string;
	    field8?: string;
	    field9?: string;
	    field10?: string;
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
	    address?: string;
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
	export interface Product {
	    id?: number;
	    sid?: number;
	    lid?: string;
	    cid?: number;
	    item_id?: number;
	    brand?: string;
	    booking_type?: number;
	    cities?: string[];
	    number?: number;
	    fixed_price?: number;
	    buy_notice?: string;
	    spu?: string;
	    sender_city?: string;
	    begin_date?: string;
	    end_date?: string;
	    consume_store?: string;
	    title?: string;
	    simple_desc?: string;
	    main_image?: string;
	    png_image?: string;
	    html_content?: string;
	    html_content_url?: string;
	    recharge_address?: string;
	    category_name?: string;
	    item_list?: Item[];
	    field1?: string;
	    field2?: string;
	    field3?: string;
	    field4?: string;
	    field5?: string;
	    field6?: string;
	    field7?: string;
	    field8?: string;
	    field9?: string;
	    field10?: string;
	    // Go type: time
	    created_at?: any;
	    // Go type: time
	    updated_at?: any;
	    status: number;
	    // Go type: time
	    launched_time?: any;
	    // Go type: time
	    sold_time?: any;
	}
	export interface GetDetailResp {
	    doc?: Product;
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
	
	export interface MenuItem {
	    id: string;
	    name: string;
	    path: string;
	    icon: string;
	    routes: MenuItem[];
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
	    id: number;
	    name: string;
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
	export interface SearchProductReq {
	    page?: PageReq;
	    sid: number;
	    category?: string;
	    txt?: string;
	    city?: string;
	    status?: number;
	    item_name?: string;
	}
	export interface SearchProductResp {
	    page?: PageResp;
	    products: Product[];
	    error: string;
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
	export interface SimpleResp {
	    data?: string;
	    error?: string;
	}
	
	
	export interface UpdateAdapterReq {
	    id: number;
	    name?: string;
	    plugin?: string;
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

