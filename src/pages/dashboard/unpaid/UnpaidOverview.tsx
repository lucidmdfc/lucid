import { FC, useState, useCallback, useMemo } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabsNavigation, { UnpaidTab } from './components/TabsNavigation';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import FacturesTab from './components/tabs/FacturesTab';
import SalairesTab from './components/tabs/SalairesTab';
import UtilitiesTab from './components/tabs/UtilitiesTab';
import PrestatairesTab from './components/tabs/PrestatairesTab';
import { useTranslation } from 'react-i18next';
import type {
  FactureData,
  SalaireUnpaidData,
  UtilityUnpaidData,
  PrestaireUnpaidData,
} from '../../../types/dashboard/unpaidTypes';

const UnpaidOverview: FC = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState<UnpaidTab>('factures');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for each tab
  // TODO: Replace with actual data fetching
  const mockData = useMemo(() => {
    return {
      facturesData: [
        {
          id: '1',
          projectName: 'Project A',
          amount: 50000,
          dueDate: '2024-02-25',
          daysOverdue: 15,
          status: 'pending',
          invoiceNumber: 'INV-2024-001',
          clientName: 'Client A',
          issueDate: '2024-02-10',
          description: 'Services rendered',
        },
        {
          id: '2',
          projectName: 'Project B',
          amount: 75000,
          dueDate: '2024-01-15',
          daysOverdue: 45,
          status: 'overdue',
          invoiceNumber: 'INV-2024-002',
          clientName: 'Client B',
          issueDate: '2024-01-01',
          description: 'Product delivery',
        },
      ] as FactureData[],

      salairesData: [
        {
          id: '1',
          projectName: 'Project A',
          amount: 15000,
          dueDate: '2024-02-25',
          daysOverdue: 15,
          status: 'pending',
          employeeName: 'John Doe',
          position: 'Developer',
          paymentPeriod: 'February 2024',
        },
        {
          id: '2',
          projectName: 'Project B',
          amount: 18000,
          dueDate: '2024-01-15',
          daysOverdue: 45,
          status: 'overdue',
          employeeName: 'Jane Smith',
          position: 'Designer',
          paymentPeriod: 'January 2024',
        },
      ] as SalaireUnpaidData[],

      utilitiesData: [
        {
          id: '1',
          projectName: 'Project A',
          amount: 2500,
          dueDate: '2024-02-25',
          daysOverdue: 15,
          status: 'pending',
          utilityType: 'electricity',
          provider: 'ONEE',
          billingPeriod: 'February 2024',
          referenceNumber: 'ELEC-2024-001',
        },
        {
          id: '2',
          projectName: 'Project B',
          amount: 1800,
          dueDate: '2024-01-15',
          daysOverdue: 45,
          status: 'overdue',
          utilityType: 'water',
          provider: 'ONEP',
          billingPeriod: 'January 2024',
          referenceNumber: 'WATER-2024-001',
        },
      ] as UtilityUnpaidData[],

      prestatairesData: [
        {
          id: '1',
          projectName: 'Project A',
          amount: 35000,
          dueDate: '2024-02-25',
          daysOverdue: 15,
          status: 'pending',
          supplierName: 'ABC Consulting',
          serviceType: 'IT Services',
          contractPeriod: 'Q1 2024',
          contactInfo: 'contact@abc.com',
          invoiceReference: 'ABC-2024-001',
        },
        {
          id: '2',
          projectName: 'Project B',
          amount: 42000,
          dueDate: '2024-01-15',
          daysOverdue: 45,
          status: 'overdue',
          supplierName: 'XYZ Solutions',
          serviceType: 'Marketing',
          contractPeriod: 'Q1 2024',
          contactInfo: 'info@xyz.com',
          invoiceReference: 'XYZ-2024-001',
        },
      ] as PrestaireUnpaidData[],
    };
  }, []);

  const handleTabChange = useCallback((tab: UnpaidTab) => {
    setCurrentTab(tab);
    setPage(0);
  }, []);

  const handlePageChange = useCallback((event: any, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  // Get the current data based on the active tab
  const getCurrentData = useCallback(() => {
    switch (currentTab) {
      case 'factures':
        return mockData.facturesData;
      case 'salaires':
        return mockData.salairesData;
      case 'utilities':
        return mockData.utilitiesData;
      case 'prestataires':
        return mockData.prestatairesData;
      default:
        return [];
    }
  }, [currentTab, mockData]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    const currentData = getCurrentData();

    return searchQuery
      ? [...currentData].filter(
          (item) =>
            item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            // Also search in other relevant fields based on tab type
            (currentTab === 'factures' &&
              ((item as FactureData).clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item as FactureData).invoiceNumber
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()))) ||
            (currentTab === 'salaires' &&
              (item as SalaireUnpaidData).employeeName
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (currentTab === 'utilities' &&
              (item as UtilityUnpaidData).provider
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (currentTab === 'prestataires' &&
              ((item as PrestaireUnpaidData).supplierName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                (item as PrestaireUnpaidData).serviceType
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())))
        )
      : [...currentData];
  }, [currentTab, getCurrentData, searchQuery]);

  const renderCurrentTab = () => {
    const commonProps = {
      isLoading: false,
    };

    switch (currentTab) {
      case 'factures':
        return (
          <FacturesTab
            items={filteredItems as FactureData[]}
            {...commonProps}
          />
        );
      case 'salaires':
        return (
          <SalairesTab
            items={filteredItems as SalaireUnpaidData[]}
            {...commonProps}
          />
        );
      case 'utilities':
        return (
          <UtilitiesTab
            items={filteredItems as UtilityUnpaidData[]}
            {...commonProps}
          />
        );
      case 'prestataires':
        return (
          <PrestatairesTab
            items={filteredItems as PrestaireUnpaidData[]}
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <Stack spacing={3}>
        <Box sx={{ px: 3, pt: 3 }}>
          <Typography variant="h6">{t('Impayés')}</Typography>
        </Box>
        <Filters
          onSearchChange={setSearchQuery}
          searchValue={searchQuery}
          placeholder={t('Rechercher un impayé...')}
        />
        <TabsNavigation
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />
        {renderCurrentTab()}
        <Pagination
          count={filteredItems.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Stack>
    </Card>
  );
};
export default UnpaidOverview;
