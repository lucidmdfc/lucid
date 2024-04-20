import { useState, type FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { Scrollbar } from 'src/components/scrollbar';
import DeleteConfirmationModal from '../components/delete-modal-confirmation';
import toast from 'react-hot-toast';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { salary } from 'src/types/salary';
import { payment } from 'src/types/payment';
import PaymentHistoryTableRow from './payment-history-table-row';

interface SalaryDetailsProps {
  onApprove?: () => void;
  onEdit?: () => void;
  onReject?: () => void;
  salary: salary;
}

const dummyPayments: payment[] = [
  {
    id: '1',
    salary: 5000,
    amount: 1000,
    date: new Date('2022-01-01'),
    createdDate: new Date('2022-01-01'),
    updatedDate: new Date('2022-01-01'),
  },
  {
    id: '2',
    salary: 6000,
    amount: 1200,
    date: new Date('2022-01-02'),
    createdDate: new Date('2022-01-02'),
    updatedDate: new Date('2022-01-02'),
  },
  {
    id: '3',
    salary: 5500,
    amount: 1100,
    date: new Date('2022-01-03'),
    createdDate: new Date('2022-01-03'),
    updatedDate: new Date('2022-01-03'),
  },
  {
    id: '4',
    salary: 5800,
    amount: 1160,
    date: new Date('2022-01-04'),
    createdDate: new Date('2022-01-04'),
    updatedDate: new Date('2022-01-04'),
  },
  {
    id: '5',
    salary: 5200,
    amount: 1040,
    date: new Date('2022-01-05'),
    createdDate: new Date('2022-01-05'),
    updatedDate: new Date('2022-01-05'),
  },
];

const SalaryDetails: FC<SalaryDetailsProps> = (props) => {
  const { onApprove, onEdit, onReject, salary } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const date = salary.recruitmentDate && format(salary.recruitmentDate, 'dd/MM/yyyy');

  const align = lgUp ? 'horizontal' : 'vertical';

  const handleDeletePayment = (paymentId: string) => {
    // Handle the deletion logic here (e.g., make an API call)
    // For now, let's just log the paymentId
    console.log(`Deleting payment with ID: ${paymentId}`);
  };
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = async (salaryId: string | undefined) => {
    try {
      console.log('salarié avec id ', salaryId, 'est supprimer');

      // await firebaseSlice.deleteSlice(projectId, sliceId, onRefresh);
      toast.success('Le salarié a été supprimé avec succès!');
      if (onReject) {
        onReject();
      }
    } catch (error) {
      console.error('Error deleting salary: ', error);
      toast.error('Échec de la suppression du salarié. Veuillez réessayer.');
    }
    setDeleteModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };
  return (
    <Stack spacing={6}>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirmation}
        onCancel={handleDeleteCancel}
        message="Êtes vous sûr de vouloir supprimer ce salarié(e)? Cette action sera irréversible."
        salaryId={salary?.id}
      />
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">Détails</Typography>
          <Stack
            flexDirection={'row'}
            gap={2}
          >
            <Button
              color="error"
              variant="text"
              onClick={handleDeleteClick}
              size="small"
              startIcon={
                <SvgIcon>
                  <DeleteOutline />
                </SvgIcon>
              }
            >
              Supprimer
            </Button>
            <Button
              color="warning"
              variant="outlined"
              onClick={onEdit}
              size="small"
              startIcon={
                <SvgIcon>
                  <Edit02Icon />
                </SvgIcon>
              }
            >
              Modifier
            </Button>
          </Stack>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Nom du salarié"
            value={salary.salaryName}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Fonction"
            value={salary.salaryFunction}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Date de recrutement"
            value={date}
          />

          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Salaire Brut"
            value={'MAD ' + salary.grossSalary + '.00'}
          />
        </PropertyList>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h6">Historique des virements</Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Virement</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyPayments.map((payment) => (
                <PaymentHistoryTableRow
                  key={payment.id}
                  payment={payment}
                  onDelete={() => handleDeletePayment(payment.id)}
                />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </Stack>
    </Stack>
  );
};
export default SalaryDetails;
SalaryDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  // @ts-ignore
  order: PropTypes.object,
};
