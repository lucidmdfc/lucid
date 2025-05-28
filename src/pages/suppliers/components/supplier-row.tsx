import Edit from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import { IconButton, Stack, SvgIcon, TableCell, TableRow, Typography } from '@mui/material';
import { format } from 'date-fns';
import numeral from 'numeral';
import { FC } from 'react';
import { RouterLink } from 'src/components/router-link';
import { SeverityPill } from 'src/components/severity-pill';
import type { SeverityPillColor } from 'src/components/severity-pill';

import { paths } from 'src/paths';
import { ProviderStatus, Supplier } from 'src/types/supplier';
import Trash02 from '@untitled-ui/icons-react/build/esm/Trash02';
import { useDialog } from 'src/hooks/use-dialog';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from './delete-modal-confirmation';

const statusColorsMap: Record<ProviderStatus, SeverityPillColor> = {
  rejected: 'error',
  accepted: 'success',
  pending: 'warning',
};

interface SupplierRowProps {
  supplier: Supplier;
}

const SupplierRow: FC<SupplierRowProps> = (props) => {
  const { supplier, ...other } = props;
  const dialog = useDialog();

  const statusColor = statusColorsMap[supplier.status];

  const totalAmount = numeral(supplier.amount).format('0,0.00');
  const issueDate = supplier.depositedDate && format(supplier.depositedDate, 'dd/MM/yyyy');
  const dueDate = supplier.dueDate && format(supplier.dueDate, 'dd/MM/yyyy');

  const handleDelete = async (supplierId: string | undefined) => {
    try {
      // Implement the delete logic here
      toast.success('Le Prestataire a été supprimée avec succès!');
      dialog.handleClose();
    } catch (error) {
      console.error('Error deleting cash: ', error);
      toast.error('Échec de la suppression. Veuillez réessayer.');
    }
  };
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      {...other}
    >
      <DeleteConfirmationModal
        isOpen={dialog.open}
        onConfirm={handleDelete}
        onCancel={dialog.handleClose}
        message="Êtes-vous sûr de vouloir supprimer? Cette action sera irréversible."
      />{' '}
      <TableCell width="25%">
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
          sx={{
            display: 'inline-flex',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <div>
            <Typography
              color="text.primary"
              variant="subtitle2"
            >
              {supplier.nom}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {supplier.id}
            </Typography>
          </div>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">MAD {totalAmount}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">Déposée le</Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {issueDate}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">Due le</Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {dueDate}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <SeverityPill color={statusColor}>
          {supplier.status == 'rejected'
            ? 'Impayée'
            : supplier.status == 'accepted'
            ? 'payé'
            : 'en attente'}
        </SeverityPill>
      </TableCell>
      <TableCell align="right">
        <IconButton
          component={RouterLink}
          href={paths.suppliers.edit}
          color="warning"
        >
          <SvgIcon>
            <Edit />
          </SvgIcon>
        </IconButton>
        <IconButton
          color="error"
          onClick={dialog.handleOpen}
        >
          <SvgIcon>
            <Trash02 />
          </SvgIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
export default SupplierRow;

SupplierRow.propTypes = {
  // @ts-ignore
  supplier: PropTypes.object.isRequired,
};
