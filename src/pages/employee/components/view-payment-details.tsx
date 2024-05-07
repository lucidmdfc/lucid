import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { IconButton, Stack, SvgIcon, TableCell } from '@mui/material';
import Edit02 from '@untitled-ui/icons-react/build/esm/Edit02';
import React, { FC } from 'react';
import toast from 'react-hot-toast';
import { payment } from 'src/types/employees_salaries';
import DeleteConfirmationModal from './delete-modal-confirmation';
import { useDialog } from 'src/hooks/use-dialog';

interface ViewPaymentDetailsProps {
  payment: payment;
  onDelete: (id: string) => void;
  handleOpen: () => void;
}
const ViewPaymentDetails: FC<ViewPaymentDetailsProps> = ({ payment, onDelete, handleOpen }) => {
  const dialog = useDialog();
  const date = new Date(payment.date);

  const handleDeleteConfirmation = async (id: string | undefined) => {
    try {
      console.log('virement avec id ', id, 'est supprimer');

      // await firebaseSlice.deleteSlice(projectId, sliceId, onRefresh);
      toast.success('Le virement a été supprimé avec succès!');
      onDelete(payment.id);
    } catch (error) {
      console.error('Error deleting salary: ', error);
      toast.error('Échec de la suppression du virement. Veuillez réessayer.');
    }
    dialog.handleClose();
  };
  return (
    <>
      <DeleteConfirmationModal
        isOpen={dialog.open}
        onConfirm={handleDeleteConfirmation}
        onCancel={dialog.handleClose}
        message="Êtes vous sûr de vouloir supprimer ce virement? Cette action sera irréversible."
        id={payment?.id}
      />
      <TableCell>
        {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
      </TableCell>
      <TableCell>{payment.amount}</TableCell>
      <TableCell align="right">
        <Stack
          direction="row"
          justifyContent="end"
          spacing={1}
        >
          <IconButton
            color="warning"
            onClick={handleOpen}
          >
            <SvgIcon>
              <Edit02 />
            </SvgIcon>
          </IconButton>
          <IconButton
            color="error"
            onClick={dialog.handleOpen}
          >
            <SvgIcon>
              <DeleteOutline />
            </SvgIcon>
          </IconButton>
        </Stack>
      </TableCell>
    </>
  );
};

export default ViewPaymentDetails;
