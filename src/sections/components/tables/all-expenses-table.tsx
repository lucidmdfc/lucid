import { useState, type FC, useCallback, ChangeEvent } from 'react';
import numeral from 'numeral';
import { subDays, subHours } from 'date-fns';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';

import { Scrollbar } from 'src/components/scrollbar';

const now = new Date();

interface Customer {
  id: string;
  avatar: string;
  city: string;
  country: string;
  currency: string;
  email: string;
  hasAcceptedMarketing: boolean;
  isProspect: boolean;
  isReturning: boolean;
  name: string;
  state: string;
  totalSpent: number;
  totalOrders: number;
  updatedAt: number;
}

const customers: Customer[] = [
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    city: 'Cleveland',
    country: 'USA',
    currency: '$',
    email: 'carson.darrin@devias.io',
    hasAcceptedMarketing: true,
    isProspect: false,
    isReturning: true,
    name: 'Carson Darrin',
    state: 'Ohio',
    totalSpent: 300.0,
    totalOrders: 3,
    updatedAt: subDays(subHours(now, 7), 1).getTime(),
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    avatar: '/assets/avatars/avatar-fran-perez.png',
    city: 'Atlanta',
    country: 'USA',
    currency: '$',
    email: 'fran.perez@devias.io',
    hasAcceptedMarketing: true,
    isProspect: true,
    isReturning: false,
    name: 'Fran Perez',
    state: 'Georgia',
    totalSpent: 0.0,
    totalOrders: 0,
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    city: 'North Canton',
    country: 'USA',
    currency: '$',
    email: 'jie.yan.song@devias.io',
    hasAcceptedMarketing: false,
    isProspect: false,
    isReturning: false,
    name: 'Jie Yan Song',
    state: 'Ohio',
    totalSpent: 5600.0,
    totalOrders: 6,
    updatedAt: subDays(subHours(now, 4), 2).getTime(),
  },
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Madrid',
    country: 'Spain',
    currency: '$',
    email: 'anika.visser@devias.io',
    hasAcceptedMarketing: true,
    isProspect: false,
    isReturning: true,
    name: 'Anika Visser',
    state: 'Madrid',
    totalSpent: 500.0,
    totalOrders: 1,
    updatedAt: subDays(subHours(now, 11), 2).getTime(),
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    city: 'San Diego',
    country: 'USA',
    currency: '$',
    email: 'miron.vitold@devias.io',
    hasAcceptedMarketing: true,
    isProspect: true,
    isReturning: false,
    name: 'Miron Vitold',
    totalSpent: 0.0,
    totalOrders: 0,
    state: 'California',
    updatedAt: subDays(subHours(now, 7), 3).getTime(),
  },
];

const tabs = [
  {
    label: 'Tranches',
    value: 'slices',
  },
  {
    label: 'Dépenses',
    value: 'expenses',
  },
];

interface Option {
  label: string;
  value: number;
}

const sortOptions: Option[] = [
  {
    label: 'BAILLEUR DE FOND 1',
    value: 1,
  },
  {
    label: 'BAILLEUR DE FOND 2',
    value: 2,
  },
  {
    label: 'BAILLEUR DE FOND 3',
    value: 3,
  },
  {
    label: 'BAILLEUR DE FOND 3',
    value: 4,
  },
];

const AllExpenses: FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('slices');
  const handleTabsChange = useCallback((event: ChangeEvent<any>, value: string): void => {
    setCurrentTab(value);
  }, []);
  return (
    <Card>
      <Tabs
        indicatorColor="primary"
        scrollButtons="auto"
        textColor="primary"
        onChange={handleTabsChange}
        value={currentTab}
        sx={{ px: 3 }}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={2}
        sx={{ p: 3 }}
      >
        <OutlinedInput
          placeholder="Recherche de projets"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon>
                <SearchMdIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ flexGrow: 1 }}
        />
        <TextField
          label="Trier par"
          name="sort"
          select
          SelectProps={{ native: true }}
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>
      <Scrollbar>
        {currentTab === 'slices' && (
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Projet</TableCell>
                <TableCell>Total</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => {
                const totalSpent = numeral(customer.totalSpent).format(`0,0.00`);

                return (
                  <TableRow
                    hover
                    key={customer.id}
                  >
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{totalSpent} MAD</TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <SvgIcon>
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        {currentTab === 'expenses' && (
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Projet</TableCell>
                <TableCell>Total</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers
                .slice()
                .reverse()
                .map((customer) => {
                  const totalSpent = numeral(customer.totalSpent).format(`0,0.00`);

                  return (
                    <TableRow
                      hover
                      key={customer.id}
                    >
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{totalSpent} MAD</TableCell>
                      <TableCell align="right">
                        <IconButton>
                          <SvgIcon>
                            <ArrowRightIcon />
                          </SvgIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </Scrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
export default AllExpenses;
