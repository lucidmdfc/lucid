import { FC, useState, useCallback, useMemo } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabsNavigation, type ProjectTab } from './components/TabsNavigation';
import { Filters, type SortOption } from '../components/Filters';
import { Pagination } from '../components/Pagination';
import { TranchesTab } from './components/tabs/TranchesTab';
import { SalairesTab } from './components/tabs/SalairesTab';
import { UtilitiesTab } from './components/tabs/UtilitiesTab';
import { PrestatairesTab } from './components/tabs/PrestatairesTab';
import { SoldeTab } from './components/tabs/SoldeTab';
import { ExpensesTab } from './components/tabs/ExpensesTab';
import { useTranslation } from 'react-i18next';
import type {
  TrancheData,
  SalaireData,
  UtilityData,
  PrestaireData,
  SoldeData,
  ExpenseData,
} from './types';

export const ProjectOverview: FC = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState<ProjectTab>('tranches');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Mock data for each tab
  // TODO: Replace with actual data fetching
  const mockData = useMemo(() => {
    return {
      tranchesData: [
        {
          id: '1',
          projectName: 'Project A',
          amount: 50000,
          date: '2024-02-25',
          status: 'paid',
          donor: 'BAILLEUR DE FOND 1',
          trancheNumber: 1,
          trancheType: 'initial',
          dueDate: '2024-02-25',
          description: 'Initial payment',
        },
        {
          id: '2',
          projectName: 'Project B',
          amount: 75000,
          date: '2024-01-15',
          status: 'pending',
          donor: 'BAILLEUR DE FOND 2',
          trancheNumber: 2,
          trancheType: 'milestone',
          dueDate: '2024-03-15',
          description: 'Milestone payment',
        },
      ] as TrancheData[],

      salairesData: [
        {
          id: '1',
          projectName: 'Project A',
          amount: 15000,
          date: '2024-02-25',
          status: 'paid',
          donor: 'BAILLEUR DE FOND 1',
          employeeName: 'John Doe',
          position: 'Developer',
          paymentPeriod: 'February 2024',
        },
        {
          id: '2',
          projectName: 'Project B',
          amount: 18000,
          date: '2024-01-15',
          status: 'pending',
          donor: 'BAILLEUR DE FOND 2',
          employeeName: 'Jane Smith',
          position: 'Designer',
          paymentPeriod: 'January 2024',
        },
      ] as SalaireData[],

      utilitiesData: [
        {
          id: '1',
          projectName: 'Project A',
          amount: 2500,
          date: '2024-02-25',
          status: 'paid',
          donor: 'BAILLEUR DE FOND 1',
          utilityType: 'electricity',
          provider: 'ONEE',
          billingPeriod: 'February 2024',
          dueDate: '2024-03-10',
        },
        {
          id: '2',
          projectName: 'Project B',
          amount: 1800,
          date: '2024-01-15',
          status: 'pending',
          donor: 'BAILLEUR DE FOND 2',
          utilityType: 'water',
          provider: 'ONEP',
          billingPeriod: 'January 2024',
          dueDate: '2024-02-15',
        },
      ] as UtilityData[],

      prestatairesData: [
        {
          id: '1',
          projectName: 'Project A',
          amount: 35000,
          date: '2024-02-25',
          status: 'paid',
          donor: 'BAILLEUR DE FOND 1',
          supplierName: 'ABC Consulting',
          serviceType: 'IT Services',
          contractPeriod: 'Q1 2024',
          contactInfo: 'contact@abc.com',
          dueDate: '2024-03-15',
        },
        {
          id: '2',
          projectName: 'Project B',
          amount: 42000,
          date: '2024-01-15',
          status: 'pending',
          donor: 'BAILLEUR DE FOND 2',
          supplierName: 'XYZ Solutions',
          serviceType: 'Marketing',
          contractPeriod: 'Q1 2024',
          contactInfo: 'info@xyz.com',
          dueDate: '2024-02-28',
        },
      ] as PrestaireData[],

      soldeData: [
        {
          id: '1',
          projectName: 'Project A',
          amount: 50000,
          date: '2024-02-25',
          status: 'paid',
          donor: 'BAILLEUR DE FOND 1',
          transactionType: 'income',
          category: 'Payment',
          runningBalance: 50000,
          description: 'Client payment',
        },
        {
          id: '2',
          projectName: 'Project B',
          amount: -25000,
          date: '2024-01-15',
          status: 'pending',
          donor: 'BAILLEUR DE FOND 2',
          transactionType: 'expense',
          category: 'Materials',
          runningBalance: 25000,
          description: 'Purchase of materials',
        },
      ] as SoldeData[],

      expensesData: [
        {
          id: '1',
          projectName: 'Project A',
          employeeName: 'John Doe',
          amount: 1500,
          date: '2024-02-25',
          status: 'pending',
          donor: 'BAILLEUR DE FOND 1',
          expenseType: 'Transport',
          description: 'Déplacement client',
        },
        {
          id: '2',
          projectName: 'Project B',
          employeeName: 'Jane Smith',
          amount: 2500,
          date: '2024-01-15',
          status: 'paid',
          donor: 'BAILLEUR DE FOND 2',
          expenseType: 'Hébergement',
          description: 'Mission formation',
        },
      ] as ExpenseData[],
    };
  }, []);

  // Define sort options based on the current tab
  const sortOptions = useMemo<SortOption[]>(() => {
    // Get all unique donors from the current data
    const allData = [
      ...mockData.tranchesData,
      ...mockData.salairesData,
      ...mockData.utilitiesData,
      ...mockData.prestatairesData,
      ...mockData.soldeData,
      ...mockData.expensesData,
    ];

    const uniqueDonors = Array.from(new Set(allData.map((item) => item.donor)));

    return [
      { value: '', label: t('Tous les bailleurs') },
      ...uniqueDonors.map((donor) => ({
        value: donor,
        label: donor,
      })),
    ];
  }, [mockData, t]);

  const handleTabChange = useCallback(
    (tab: ProjectTab) => {
      setCurrentTab(tab);
      setPage(0);
      // Reset sort to first donor when changing tabs
      setSortBy(sortOptions[0]?.value || '');
    },
    [sortOptions]
  );

  const handlePageChange = useCallback((event: any, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    setPage(0); // Reset to first page when sorting changes
  }, []);

  // Get the current data based on the active tab
  const getCurrentData = useCallback(() => {
    switch (currentTab) {
      case 'tranches':
        return mockData.tranchesData;
      case 'salaires':
        return mockData.salairesData;
      case 'utilities':
        return mockData.utilitiesData;
      case 'prestataires':
        return mockData.prestatairesData;
      case 'solde':
        return mockData.soldeData;
      case 'expenses':
        return mockData.expensesData;
      default:
        return [];
    }
  }, [currentTab, mockData]);

  // Sort items based on the selected sort option
  const sortedItems = useMemo(() => {
    const currentData = getCurrentData();

    // First filter by selected donor if one is selected
    const donorFilteredData = sortBy
      ? currentData.filter((item) => item.donor === sortBy)
      : currentData;

    // Then filter by search query if one exists
    const filteredData = searchQuery
      ? donorFilteredData.filter(
          (item) =>
            item.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : donorFilteredData;

    return filteredData;
  }, [getCurrentData, searchQuery, sortBy]);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'tranches':
        return <TranchesTab items={sortedItems as TrancheData[]} />;
      case 'salaires':
        return <SalairesTab items={sortedItems as SalaireData[]} />;
      case 'utilities':
        return <UtilitiesTab items={sortedItems as UtilityData[]} />;
      case 'prestataires':
        return <PrestatairesTab items={sortedItems as PrestaireData[]} />;
      case 'solde':
        return <SoldeTab items={sortedItems as SoldeData[]} />;
      case 'expenses':
        return <ExpensesTab items={sortedItems as ExpenseData[]} />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <Stack spacing={3}>
        <Box sx={{ px: 3, pt: 3 }}>
          <Typography variant="h6">{t('Aperçu du projet')}</Typography>
        </Box>
        <Filters
          onSearchChange={setSearchQuery}
          searchValue={searchQuery}
          placeholder="Rechercher un projet..."
          sortOptions={sortOptions}
          sortValue={sortBy}
          onSortChange={handleSortChange}
          sortLabel={t('Trier par')}
        />
        <TabsNavigation
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />
        {renderCurrentTab()}
        <Pagination
          count={sortedItems.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Stack>
    </Card>
  );
};
