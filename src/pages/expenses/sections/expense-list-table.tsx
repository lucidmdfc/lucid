import { useState, type ChangeEvent, type FC, type MouseEvent } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { IconButton, SvgIcon, TableHead } from '@mui/material';
import { Customer } from 'src/types/template-types/customer';
import { format } from 'date-fns';
import { SeverityPill } from 'src/components/severity-pill';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import Edit02 from '@untitled-ui/icons-react/build/esm/Edit02';
import DeleteConfirmationModal from '../components/delete-modal-confirmation';
import toast from 'react-hot-toast';
import { useDialog } from 'src/hooks/use-dialog';
import { expense } from 'src/types/expense';
import { useMutation } from '@apollo/client';
import { DELETE_EXPENSE_CLAIM } from 'src/graphql/entities/expenseClaims/mutations';
import { ExpenseClaimFragmentFragment } from 'src/types/generatedTypes';

interface ExpenseListTableProps {
  count?: number;
  items?: ExpenseClaimFragmentFragment[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (orderId: string) => void;
  page?: number;
  rowsPerPage?: number;
  expensesRefetch?: any;
}

const ExpenseListTable: FC<ExpenseListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelect,
    page = 0,
    rowsPerPage = 0,
    expensesRefetch,
  } = props;
  const dialog = useDialog();
  const [deleteExpenseClaim] = useMutation(DELETE_EXPENSE_CLAIM);
  // Replace this with your actual delete function
  const handleDelete = async (projectId: string | undefined) => {
    // Implement the delete logic here
    try {
      console.log('Deleting expense with ID:', projectId);
      await deleteExpenseClaim({
        variables: { id: Number(projectId) },
      });
      expensesRefetch();
      toast.success('Le frais a été supprimé avec succès!');
      dialog.handleClose();
    } catch (error) {
      console.error('Error deleting expense: ', error);
      toast.error('Échec de la suppression du frais. Veuillez réessayer.');
    }
  };

  console.log(items);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Projet</TableCell>
            <TableCell>Salarié</TableCell>
            <TableCell>Date </TableCell>
            <TableCell>montant</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Editer/Valider</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((expense) => {
            const totalAmount = numeral(expense.amount).format(`0,0.00`);
            const date = expense.startDate ? format(new Date(expense.startDate), 'dd/MM/yyyy') : '';
            console.log('expense', expense);
            return (
              <TableRow
                hover
                key={expense.id}
              >
                <TableCell>
                  <Typography variant="subtitle2">{expense?.projects?.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{expense?.employees?.salaryName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{date || 'N/A'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{totalAmount}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    <SeverityPill color={expense.status ? 'info' : 'error'}>
                      {expense.status ? 'Validé' : 'En Attente'}
                    </SeverityPill>
                  </Typography>
                </TableCell>

                <TableCell>
                  <IconButton
                    color="error"
                    onClick={dialog.handleOpen}
                  >
                    <SvgIcon>
                      <DeleteOutlineIcon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton
                    component={RouterLink}
                    href={`/expenses/${expense.id}/edite`}
                    color="warning"
                  >
                    <SvgIcon>
                      <Edit02 />
                    </SvgIcon>
                  </IconButton>
                </TableCell>
                <DeleteConfirmationModal
                  isOpen={dialog.open}
                  onConfirm={() => handleDelete(String(expense.id))}
                  onCancel={dialog.handleClose}
                  message="Êtes vous sûr de vouloir supprimer le frais? Cette action sera irréversible."
                />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
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
    </div>
  );
};
export default ExpenseListTable;
ExpenseListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
