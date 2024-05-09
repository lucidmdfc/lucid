import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useState } from 'react';
import { IconButton, SvgIcon } from '@mui/material';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import toast from 'react-hot-toast';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditCashOutForm from '../components/edit-cash-out-form';

interface CashListOutRowProps {
  projectName: string;
  date: string;
  amount: number;
  id: string;
  motif: string;
}

const CashListOutRow: React.FC<CashListOutRowProps> = ({
  id,
  date,
  amount,
  motif,
  projectName,
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    // Handle canceling the edit mode
    setEditMode(false);
  };

  const handleDeleteClick = () => {
    // Handle deleting the record
    toast.success('La tranch a été supprimé avec succès');
    // onDelete(id);
  };

  return (
    <TableRow hover>
      {editMode ? (
        <EditCashOutForm onCancle={handleCancelClick} />
      ) : (
        <>
          <TableCell>{projectName}</TableCell>
          <TableCell>{date}</TableCell>
          <TableCell>MAD {amount}</TableCell>
          <TableCell>{motif}</TableCell>
          <TableCell align="right">
            <IconButton
              color="error"
              onClick={handleDeleteClick}
            >
              <SvgIcon>
                <DeleteOutline />
              </SvgIcon>
            </IconButton>
            <IconButton
              color="warning"
              onClick={handleEditClick}
            >
              <SvgIcon>
                <Edit02Icon />
              </SvgIcon>
            </IconButton>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default CashListOutRow;
