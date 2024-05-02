import Edit from '@mui/icons-material/Edit';
import { IconButton, Stack, SvgIcon, TableCell, TableRow, Typography } from '@mui/material';
import ArrowRight from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { format } from 'date-fns';
import { FC, useState } from 'react';
import { calculateTotals } from 'src/calculations/total-items-calculate';
import { RouterLink } from 'src/components/router-link';
import { SeverityPill, SeverityPillColor } from 'src/components/severity-pill';
import { paths } from 'src/paths';
import { Invoice, InvoiceStatus } from 'src/types/invoice';
import PropTypes from 'prop-types';
import Trash02 from '@untitled-ui/icons-react/build/esm/Trash02';
import { useDialog } from 'src/hooks/use-dialog';
import DeleteConfirmationModal from './delete-modal-confirmation';
import toast from 'react-hot-toast';

interface InvoiceRowProps {
  invoice: Invoice;
}
const statusColorsMap: Record<InvoiceStatus, SeverityPillColor> = {
  canceled: 'error',
  paid: 'success',
  pending: 'warning',
};
const InvoiceRow: FC<InvoiceRowProps> = (props) => {
  const { invoice, ...other } = props;

  const statusColor = statusColorsMap[invoice.status];

  const [isTvaActive, setIsTvaActive] = useState(true); // Set the initial state based on your logic
  const { totalWithVat } = calculateTotals(invoice?.items ?? [], isTvaActive);
  const issueDate = invoice.issueDate && format(invoice?.issueDate, 'dd/MM/yyyy');
  const dueDate = invoice.dueDate && format(invoice.dueDate, 'dd/MM/yyyy');

  const handleDelete = async (invoiceId: string | undefined) => {
    try {
      // Implement the delete logic here
      toast.success('La facture a été supprimée avec succès!');
      dialog.handleClose();
    } catch (error) {
      console.error('Error deleting cash: ', error);
      toast.error('Échec de la suppression. Veuillez réessayer.');
    }
  };
  const dialog = useDialog();
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
          component={RouterLink}
          href={paths.invoices.details}
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
              {invoice.customer}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {invoice.id}
            </Typography>
          </div>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">MAD {totalWithVat}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">Emise le</Typography>
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
          {invoice.status == 'canceled'
            ? 'Impayée'
            : invoice.status == 'paid'
            ? 'payé'
            : 'en attente'}
        </SeverityPill>
      </TableCell>
      <TableCell align="right">
        <IconButton
          component={RouterLink}
          href={paths.invoices.edit}
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
        <IconButton
          component={RouterLink}
          href={paths.invoices.details}
          color="info"
        >
          <SvgIcon>
            <ArrowRight />
          </SvgIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

InvoiceRow.propTypes = {
  // @ts-ignore
  invoice: PropTypes.object.isRequired,
};

export default InvoiceRow;
