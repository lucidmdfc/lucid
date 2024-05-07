import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { IconButton, SvgIcon } from '@mui/material';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack } from '@mui/system';
import toast from 'react-hot-toast';
import { DatePicker } from '@mui/x-date-pickers';
import { payment } from 'src/types/employees_salaries';
import EditPaymentForm from '../components/edit-payment-form';
import ViewPaymentDetails from '../components/view-payment-details';

interface PaymentHistoryTableRowProps {
  payment: payment;
  onDelete: (id: string) => void;
}

const PaymentHistoryTableRow: React.FC<PaymentHistoryTableRowProps> = ({ payment, onDelete }) => {
  const [editMode, setEditMode] = useState(false);

  const handleCloseEditForm = () => {
    setEditMode(false);
  };
  const handleOpenEditForm = () => {
    setEditMode(true);
  };

  return (
    <TableRow>
      {editMode ? (
        <EditPaymentForm
          payment={payment}
          handleClose={handleCloseEditForm}
        />
      ) : (
        <ViewPaymentDetails
          payment={payment}
          onDelete={onDelete}
          handleOpen={handleOpenEditForm}
        />
      )}
    </TableRow>
  );
};

export default PaymentHistoryTableRow;
