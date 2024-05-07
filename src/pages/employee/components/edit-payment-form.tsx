import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton, Stack, TableCell, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { payment } from 'src/types/employees_salaries';

interface EditPaymentFormProps {
  payment: payment;
  handleClose: () => void;
}

const EditPaymentForm: FC<EditPaymentFormProps> = ({ payment, handleClose }) => {
  const [editedDate, setEditedDate] = useState<Date>(new Date(payment.updatedDate || new Date()));
  const [editedAmount, setEditedAmount] = useState<number>(payment.amount);

  const handleSaveClick = () => {
    // Handle saving the edited values (e.g., make an API call, update state, etc.)
    handleClose(); // Assuming handleClose doesn't take any arguments
    toast.success('Le virement a été modifié avec succès');
  };

  const handleCancelClick = () => {
    // Handle canceling the edit mode
    handleClose(); // Assuming handleClose doesn't take any arguments
  };

  return (
    <>
      <TableCell>
        <DatePicker
          label="Reçu le"
          value={editedDate}
          format="dd/MM/yyyy"
          onChange={(date) => setEditedDate(date as Date)}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          type="text"
          variant="standard"
          value={editedAmount}
          onChange={(event) => setEditedAmount(parseFloat(event.target.value))}
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
            <SaveIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={handleCancelClick}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </>
  );
};

export default EditPaymentForm;
