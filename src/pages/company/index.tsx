import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { UserNav } from '@/components/user-nav';
import {
  IconAdjustmentsHorizontal,
  IconDatabaseLeak,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react';
import { chain } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateCompany from './components/create-company';
import UpdateCompany from './components/update-company';
import { useCompanyStore } from './store/company';

const appText = new Map<string, string>([
  ['all', '所有'],
  ['connected', '合作'],
  ['notConnected', '合作中止'],
]);

export default function CompanyList() {
  const list = useCompanyStore((state) => state.cms);
  const search = useCompanyStore((state) => state.search);
  const navigate = useNavigate();

  const [sort, setSort] = useState('asc');
  const [appType, setAppType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    search('');
  }, []);

  const filteredApps = chain(list)
    .filter((app) => app.name?.includes(searchTerm) || false)
    .orderBy('updated_at', sort as any)
    .value();

  const toInfo = (id: number | undefined) => {
    navigate(`/company/${id}`);
  };

  return (
    <Layout fadedBelow fixedHeight>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className='flex w-full items-center justify-between'>
          <Search />
          <div className='flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </LayoutHeader>

      {/* ===== Content ===== */}
      <LayoutBody className='flex flex-col' fixedHeight>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>供应商</h1>
          <p className='text-muted-foreground'>
            供应商是一个公司或者组织，他们提供产品给我们。
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='搜索供应商'
              className='h-9 w-40 lg:w-[250px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={appType} onValueChange={setAppType}>
              <SelectTrigger className='w-36'>
                <SelectValue>{appText.get(appType)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>所有</SelectItem>
                <SelectItem value='connected'>合作</SelectItem>
                <SelectItem value='notConnected'>合作中止</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center gap-4'>
            <CreateCompany />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className='w-16'>
                <SelectValue>
                  <IconAdjustmentsHorizontal size={18} />
                </SelectValue>
              </SelectTrigger>
              <SelectContent align='end'>
                <SelectItem value='asc'>
                  <div className='flex items-center gap-4'>
                    <IconSortAscendingLetters size={16} />
                    <span>升序</span>
                  </div>
                </SelectItem>
                <SelectItem value='desc'>
                  <div className='flex items-center gap-4'>
                    <IconSortDescendingLetters size={16} />
                    <span>降序</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator className='shadow' />
        <ul className='no-scrollbar grid h-full gap-4  pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredApps.map((app) => (
            <li
              key={app.name}
              className='h-[170px] rounded-lg border p-4 hover:shadow-md'
            >
              <div className='mb-8 flex items-center justify-between'>
                <div
                  className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                >
                  <IconDatabaseLeak />
                </div>
                <UpdateCompany id={app.id ?? 0} />
              </div>
              <div
                onClick={() => toInfo(app.id)}
                className='cursor-pointer rounded p-2'
              >
                <h2 className='mb-1 font-semibold'>{app.name}</h2>
                <p className='line-clamp-2 text-gray-500'>{app.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </LayoutBody>
    </Layout>
  );
}
