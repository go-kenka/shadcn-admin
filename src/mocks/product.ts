import { bo } from '@/wailsjs/go/models';

// 模拟产品数据
const products: bo.Product[] = [
  {
    id: 1,
    sid: 1,
    lid: '1',
    cid: 1,
    item_id: 1,
    brand: '品牌1',
    booking_type: 1,
    cities: ['北京', '上海'],
    number: 10,
    fixed_price: 100,
    buy_notice: '购买须知',
    spu: 'SPU1',
    sender_city: '北京',
    begin_date: '2023-01-01',
    end_date: '2023-01-01',
    consume_store: '消费门店',
    title: '标题1',
    simple_desc: '简单描述',
    main_image: 'https://example.com/image1.jpg',
    png_image: 'https://example.com/image1.png',
    html_content: 'HTML内容1',
    html_content_url: 'https://example.com/content1.html',
    recharge_address: '充值地址1',
    category_name: '类别1',
    item_list: [
      {
        sku: 'SKU1',
        title: '标题1',
        sale_price: 100,
        origin_price: 100,
        channel_price: 100,
        stock: 10,
        single_max: 10,
        code_amount: 10,
      },
    ],
    field1: '字段1',
    field2: '字段2',
    field3: '字段3',
    field4: '字段4',
    field5: '字段5',
    field6: '字段6',
    field7: '字段7',
    field8: '字段8',
    field9: '字段9',
    field10: '字段10',
    created_at: new Date(),
    updated_at: new Date(),
    status: 1,
    launched_time: new Date(),
    sold_time: new Date(),
  },
];

const CreateProduct = (arg1: bo.CreateProductReq): Promise<bo.SimpleResp> => {
  // 实现创建产品的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

const DiscontinuedConfirm = (arg1: number): Promise<bo.SimpleResp> => {
  // 实现确认下架产品的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

const DiscontinuedProduct = (
  arg1: number,
  arg2: number
): Promise<bo.SimpleResp> => {
  // 实现下架产品的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

const GetProductDetail = (arg1: number): Promise<bo.GetDetailResp> => {
  // 实现获取产品详情的逻辑
  return Promise.resolve({ doc: products[0], error: '' });
};

const LaunchProduct = (arg1: number, arg2: number): Promise<bo.SimpleResp> => {
  // 实现上架产品的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

const LaunchedConfirm = (
  arg1: number,
  arg2: string
): Promise<bo.SimpleResp> => {
  // 实现确认上架产品的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

const SearchProductList = (
  arg1: bo.SearchProductReq
): Promise<bo.SearchProductResp> => {
  // 实现搜索产品列表的逻辑
  return Promise.resolve({
    page: {
      total: products.length,
      num: 1,
      size: 10,
    },
    products: products,
    error: '',
  });
};

const UpdateProduct = (arg1: number, arg2: number): Promise<bo.SimpleResp> => {
  // 实现更新产品的逻辑
  return Promise.resolve({ data: 'ok', error: undefined });
};

export const initProduct = () => {
  window['go'] = {
    service: {
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
    },
  };
};
