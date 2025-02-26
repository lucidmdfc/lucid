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
import { useTranslation } from 'react-i18next';
import type { TrancheData, SalaireData, UtilityData, PrestaireData, SoldeData } from './types';

export const ProjectOverview: FC = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState<ProjectTab>('tranches');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('projectName');

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
          transactionType: 'expense',
          category: 'Materials',
          runningBalance: 25000,
          description: 'Purchase of materials',
        },
      ] as SoldeData[],
    };
  }, []);

  // Define sort options based on the current tab
  const sortOptions = useMemo<SortOption[]>(() => {
    const commonOptions: SortOption[] = [
      { value: 'projectName', label: t('Projet') },
      { value: 'amount', label: t('Montant') },
      { value: 'date', label: t('Date') },
      { value: 'status', label: t('Statut') },
    ];

    // Add tab-specific sort options
    switch (currentTab) {
      case 'tranches':
        return [
          ...commonOptions,
          { value: 'trancheNumber', label: t('Numéro de tranche') },
          { value: 'dueDate', label: t('Échéance') },
        ];
      case 'salaires':
        return [
          ...commonOptions,
          { value: 'employeeName', label: t('Employé') },
          { value: 'paymentPeriod', label: t('Période') },
        ];
      case 'utilities':
        return [
          ...commonOptions,
          { value: 'utilityType', label: t('Service') },
          { value: 'provider', label: t('Fournisseur') },
        ];
      case 'prestataires':
        return [
          ...commonOptions,
          { value: 'supplierName', label: t('Prestataire') },
          { value: 'serviceType', label: t('Type de service') },
        ];
      case 'solde':
        return [
          ...commonOptions,
          { value: 'transactionType', label: t('Type de transaction') },
          { value: 'runningBalance', label: t('Solde') },
        ];
      default:
        return commonOptions;
    }
  }, [currentTab, t]);

  const handleTabChange = useCallback((tab: ProjectTab) => {
    setCurrentTab(tab);
    setPage(0);
    // Reset sort to a common field when changing tabs
    setSortBy('projectName');
  }, []);

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
      default:
        return [];
    }
  }, [currentTab, mockData]);

  // Sort items based on the selected sort option
  const sortedItems = useMemo(() => {
    const currentData = getCurrentData();

    // Filter items based on search query
    const filteredData = searchQuery
      ? [...currentData].filter(
          (item) =>
            item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            // Also search in other relevant fields based on tab type
            (currentTab === 'tranches' &&
              (item as TrancheData).description
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (currentTab === 'salaires' &&
              (item as SalaireData).employeeName
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (currentTab === 'utilities' &&
              (item as UtilityData).provider.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (currentTab === 'prestataires' &&
              ((item as PrestaireData).supplierName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                (item as PrestaireData).serviceType
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()))) ||
            (currentTab === 'solde' &&
              ((item as SoldeData).description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item as SoldeData).category.toLowerCase().includes(searchQuery.toLowerCase())))
        )
      : [...currentData];

    return filteredData.sort((a, b) => {
      // Use a type-safe approach for sorting
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];

      if (aValue !== undefined && bValue !== undefined) {
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return aValue - bValue;
        }
      }
      return 0;
    });
  }, [currentTab, sortBy, getCurrentData, searchQuery]);

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
