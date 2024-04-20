import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { IconButton, SvgIcon } from '@mui/material';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack } from '@mui/system';
import toast from 'react-hot-toast';
import { DatePicker } from '@mui/x-date-pickers';
import { payment } from 'src/types/payment';

interface PaymentHistoryTableRowProps {
  onDelete: (id: string) => void;
  payment: payment;
}

const PaymentHistoryTableRow: React.FC<PaymentHistoryTableRowProps> = ({ payment, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedDate, setEditedDate] = useState(new Date(payment.updatedDate));
  const [editedAmount, setEditedAmount] = useState(payment.amount);
  const date = new Date(payment.date);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Handle saving the edited values (e.g., make an API call, update state, etc.)
    setEditMode(false);
    toast.success('Le virement a été modifié avec succès');
  };

  const handleCancelClick = () => {
    // Handle canceling the edit mode
    setEditMode(false);
  };

  const handleDeleteClick = () => {
    // Handle deleting the record
    toast.success('Le virement a été supprimé avec succès');
    onDelete(payment.id);
  };

  return (
    <TableRow>
      {editMode ? (
        <>
          <TableCell>
            <DatePicker
              label="Reçu le"
              value={editedDate}
              format="dd/MM/yyyy"
            />
          </TableCell>
          <TableCell>
            <TextField
              size="small"
              type="text"
              variant="standard"
              value={editedAmount}
            />
          </TableCell>
          <TableCell>
            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <IconButton
                color="success"
                onClick={handleSaveClick}
              >
                <SvgIcon>
                  <SaveIcon />
                </SvgIcon>
              </IconButton>
              <IconButton
                color="error"
                onClick={handleCancelClick}
              >
                <SvgIcon>
                  <CloseIcon />
                </SvgIcon>
              </IconButton>
            </Stack>
          </TableCell>
        </>
      ) : (
        <>
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
                onClick={handleEditClick}
              >
                <SvgIcon>
                  <Edit02Icon />
                </SvgIcon>
              </IconButton>
              <IconButton
                color="error"
                onClick={handleDeleteClick}
              >
                <SvgIcon>
                  <DeleteOutlineIcon />
                </SvgIcon>
              </IconButton>
            </Stack>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default PaymentHistoryTableRow;
