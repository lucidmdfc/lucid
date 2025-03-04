import { type ChangeEvent, type FC, type MouseEvent } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { Scrollbar } from 'src/components/scrollbar';
import type { Invoice, InvoiceStatus } from 'src/types/invoice';
import InvoiceRow from '../components/invoice-row';

type GroupedInvoices = {
  [key in InvoiceStatus]: Invoice[];
};

const groupInvoices = (invoices: Invoice[]): GroupedInvoices => {
  return invoices.reduce(
    (acc, invoice) => {
      const { status } = invoice;

      return {
        ...acc,
        [status]: [...acc[status], invoice],
      };
    },
    {
      canceled: [],
      paid: [],
      pending: [],
    }
  );
};

interface InvoiceListTableProps {
  count?: number;
  group?: boolean;
  items?: Invoice[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
}

const InvoiceListTable: FC<InvoiceListTableProps> = (props) => {
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
    const groupedInvoices = groupInvoices(items);

    const statuses = Object.keys(groupedInvoices) as InvoiceStatus[];

    content = (
      <Stack spacing={6}>
        {statuses.map((status) => {
          const groupTitle = status.charAt(0).toUpperCase() + status.slice(1);
          const count = groupedInvoices[status].length;
          const invoices = groupedInvoices[status];
          const hasInvoices = invoices.length > 0;

          return (
            <Stack
              key={groupTitle}
              spacing={2}
            >
              <Typography
                color="text.secondary"
                variant="h6"
              >
                {groupTitle == 'Paid' ? 'Payés' : groupTitle == 'Pending' ? 'En cours' : 'Impayées'}{' '}
                ({count})
              </Typography>
              {hasInvoices && (
                <Card>
                  <Scrollbar>
                    <Table sx={{ minWidth: 600 }}>
                      <TableBody>
                        {invoices.map((invoice) => (
                          <InvoiceRow
                            key={invoice.id}
                            invoice={invoice}
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
            {items.map((invoice) => (
              <InvoiceRow
                key={invoice.id}
                invoice={invoice}
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
export default InvoiceListTable;
InvoiceListTable.propTypes = {
  count: PropTypes.number,
  group: PropTypes.bool,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
