import type { ChangeEvent, FC, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

import { Scrollbar } from 'src/components/scrollbar';
import { ProviderStatus, Supplier } from 'src/types/supplier';
import SupplierRow from '../components/supplier-row';

export type GroupedSuppliers = {
  canceled: Supplier[];
  paid: Supplier[];
  pending: Supplier[];
};

const groupSuppliers = (invoices: Supplier[]) => {
  return invoices.reduce(
    (acc, invoice) => {
      const { status } = invoice;
      const providerStatus: ProviderStatus = status as ProviderStatus; // Type assertion

      if (!(providerStatus in acc)) {
        // If the status is not a key in acc, initialize it as an empty array
        acc[providerStatus] = [];
      }

      return {
        ...acc,
        [providerStatus]: [...acc[providerStatus], invoice],
      };
    },
    {
      [ProviderStatus.Canceled]: [],
      [ProviderStatus.Paid]: [],
      [ProviderStatus.Pending]: [],
    }
  );
};

interface PaymentStateListProps {
  count?: number;
  group?: boolean;
  items?: Supplier[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
}

const PaymentStateList: FC<PaymentStateListProps> = (props) => {
  const {
    group = false,
    items = [],
    count = 0,
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  let content: JSX.Element;

  if (group) {
    const groupedSuppliers = groupSuppliers(items);

    const statuses = Object.keys(groupedSuppliers) as ProviderStatus[];

    content = (
      <Stack spacing={6}>
        {statuses.map((status) => {
          const groupTitle = status.charAt(0).toUpperCase() + status.slice(1);
          const count = groupedSuppliers[status].length;
          const providers = groupedSuppliers[status];
          const hasInvoices = providers.length > 0;

          return (
            <Stack
              key={groupTitle}
              spacing={2}
            >
              <Typography
                color="text.secondary"
                variant="h6"
              >
                {groupTitle == 'Accepted'
                  ? 'Payés'
                  : groupTitle == 'Pending'
                  ? 'En cours'
                  : 'Impayées'}{' '}
                ({count})
              </Typography>
              {hasInvoices && (
                <Card>
                  <Scrollbar>
                    <Table sx={{ minWidth: 600 }}>
                      <TableBody>
                        {providers.map((supplier, i) => (
                          <SupplierRow
                            key={i}
                            supplier={supplier}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </Scrollbar>
                </Card>
              )}
            </Stack>
          );
        })}
      </Stack>
    );
  } else {
    content = (
      <Card>
        <Table>
          <TableBody>
            {items.map((supplier) => (
              <SupplierRow
                key={supplier.id}
                supplier={supplier}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  return (
    <Stack spacing={4}>
      {content}
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Lignes par page"
      />
    </Stack>
  );
};
export default PaymentStateList;
PaymentStateList.propTypes = {
  count: PropTypes.number,
  group: PropTypes.bool,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
