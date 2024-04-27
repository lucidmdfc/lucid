import { useState, FC, useCallback, ChangeEvent, MouseEvent, useEffect } from 'react';
import numeral from 'numeral';
import { format, subDays, subHours } from 'date-fns';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import DeleteConfirmationModal from '../components/delete-modal-confirmation';
import toast from 'react-hot-toast';
import { Box, Card, Divider } from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import CashListInRow from '../components/cash-in-list-row';
import { cashIn } from 'src/types/cash-in';
import { cashOut } from 'src/types/cash-out';
import { cashInApi } from 'src/api/cash-in';
import { cashOutApi } from 'src/api/cash-out';
import { useMounted } from 'src/hooks/use-mounted';
import CashListOutRow from '../components/chash-out-list-row';
import { useDialog } from 'src/hooks/use-dialog';

const tabs = [
  {
    label: 'Entrées',
    value: 'in',
  },
  {
    label: 'Sorties',
    value: 'out',
  },
];

interface Filters {
  endDate?: Date;
  query?: string;
  startDate?: Date;
}

interface CashSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  currentTab: string;
}

const useCashSearch = () => {
  const [state, setState] = useState<CashSearchState>({
    filters: {
      endDate: undefined,
      query: '',
      startDate: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    currentTab: 'in',
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
      page: 0,
    }));
  }, []);

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  const handleTabsChange = useCallback((event: ChangeEvent<any>, value: string): void => {
    setState((prevState) => ({
      ...prevState,
      currentTab: value,
    }));
  }, []);

  return {
    handleFiltersChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleTabsChange,
    state,
  };
};

interface CashStoreState {
  cashData: (cashIn | cashOut)[];
  cashCount: number;
}

const useCashStore = (searchState: CashSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<CashStoreState>({
    cashData: [],
    cashCount: 0,
  });

  const handleCashGet = useCallback(async () => {
    try {
      let response;
      if (searchState.currentTab === 'in') {
        response = await cashInApi.getCashIn(searchState);
      } else {
        response = await cashOutApi.getCashOut(searchState);
      }

      if (isMounted()) {
        setState({
          cashData: response.data,
          cashCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(() => {
    handleCashGet();
  }, [handleCashGet]);

  return {
    ...state,
  };
};

const TableCash: FC = () => {
  const cashSearch = useCashSearch();
  const cashStore = useCashStore(cashSearch.state);

  const dialog = useDialog();

  const handleDelete = async (cashId: string | undefined) => {
    try {
      // Implement the delete logic here
      toast.success('La tranche a été supprimée avec succès!');
      dialog.handleClose();
    } catch (error) {
      console.error('Error deleting cash: ', error);
      toast.error('Échec de la suppression. Veuillez réessayer.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <DeleteConfirmationModal
        isOpen={dialog.open}
        onConfirm={handleDelete}
        onCancel={dialog.handleClose}
        message="Êtes-vous sûr de vouloir supprimer? Cette action sera irréversible."
      />
      <Card>
        <Tabs
          indicatorColor="primary"
          scrollButtons="auto"
          textColor="primary"
          onChange={cashSearch.handleTabsChange}
          value={cashSearch.state.currentTab}
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
        <Scrollbar>
          {cashSearch.state.currentTab === 'in' && (
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Projet</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Montant</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cashStore.cashData.map((cash) => {
                  const totalAmount = numeral(cash.amount).format(`0,0.00`);
                  const date = format(cash.startDate, 'dd/MM/yyyy');
                  return (
                    <CashListInRow
                      key={cash.id}
                      id={cash.id}
                      amount={totalAmount}
                      projectName={cash.projectId}
                      date={date}
                      onDelete={dialog.handleOpen}
                    />
                  );
                })}
              </TableBody>
            </Table>
          )}
          {cashSearch.state.currentTab === 'out' && (
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Projet</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Montant</TableCell>
                  <TableCell>Motif</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cashStore.cashData.map((cash) => {
                  const totalAmount = numeral(cash.amount).format(`0,0.00`);
                  const date = format(cash.startDate, 'dd/MM/yyyy');
                  return (
                    <CashListOutRow
                      key={cash.id}
                      id={cash.id}
                      amount={totalAmount}
                      projectName={cash.projectId}
                      motif={(cash as cashOut).motif}
                      date={date}
                      onDelete={dialog.handleOpen}
                    />
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Scrollbar>
        <TablePagination
          component="div"
          count={cashStore.cashCount}
          onPageChange={cashSearch.handlePageChange}
          onRowsPerPageChange={cashSearch.handleRowsPerPageChange}
          page={cashSearch.state.page}
          rowsPerPage={cashSearch.state.rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </Box>
  );
};

export default TableCash;
