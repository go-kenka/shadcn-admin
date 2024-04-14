import { bo } from '@/wailsjs/go/models';
import Mock from 'better-mock';

const companyData: bo.Company[] = Mock.mock({
  'list|10': [
    {
      id: '@id',
      name: '@name',
      desc: '@cparagraph',
      create_at: '@datetime',
      update_at: '@datetime',
    },
  ],
}).list;

const SearchCompanyList = (
  arg1: bo.SearchCompanyReq
): Promise<bo.SearchCompanyResp> => {
  const { page, id, name } = arg1;
  const filteredData = companyData.filter((company) => {
    const idMatch = id ? company.id === id : true;
    const nameMatch = name ? company.name?.includes(name) : true;
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

const CreateCompany = (arg1: string, arg2: string): Promise<bo.SimpleResp> => {
  const newCompany = { id: companyData.length + 1, name: arg1, desc: arg2 };
  companyData.push(newCompany);
  return Promise.resolve({
    data: 'Company created successfully',
    error: undefined,
  });
};

const UpdateCompany = (
  arg1: number,
  arg2: string,
  arg3: string
): Promise<bo.SimpleResp> => {
  const companyIndex = companyData.findIndex((company) => company.id === arg1);
  if (companyIndex !== -1) {
    companyData[companyIndex].name = arg2;
    companyData[companyIndex].desc = arg3;
    return Promise.resolve({
      data: 'Company updated successfully',
      error: undefined,
    });
  } else {
    return Promise.resolve({ data: undefined, error: 'Company not found' });
  }
};

const DeleteCompany = (arg1: number): Promise<bo.SimpleResp> => {
  const companyIndex = companyData.findIndex((company) => company.id === arg1);
  if (companyIndex !== -1) {
    companyData.splice(companyIndex, 1);
    return Promise.resolve({
      data: 'Company deleted successfully',
      error: undefined,
    });
  } else {
    return Promise.resolve({ data: undefined, error: 'Company not found' });
  }
};

const GetCompany = (arg1: number): Promise<bo.GetCompanyResp> => {
  const company = companyData.find((company) => company.id === arg1);
  if (company) {
    return Promise.resolve({ company, error: undefined });
  } else {
    return Promise.resolve({ company: undefined, error: 'Company not found' });
  }
};

export const initCompany = () => {
  window['go'] = {
    service: {
      Company: {
        SearchCompanyList,
        CreateCompany,
        UpdateCompany,
        DeleteCompany,
        GetCompany,
      },
    },
  };
};
