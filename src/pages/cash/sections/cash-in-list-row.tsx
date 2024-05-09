import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { IconButton, MenuItem, SvgIcon } from '@mui/material';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack } from '@mui/system';
import toast from 'react-hot-toast';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditCashListForm from '../components/edit-cash-in-list-form';

interface CashList {
  date: string;
  amount: string;
  id: string;
  projectName: string;
}

interface CashListInRowProps extends CashList {
  onDelete: (id: string) => void;
}

const CashListInRow: React.FC<CashListInRowProps> = ({
  id,
  date,
  amount,
  onDelete,
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
    onDelete(id);
  };

  return (
    <TableRow hover>
      {editMode ? (
        <EditCashListForm onCancle={handleCancelClick} />
      ) : (
        <>
          <TableCell>{projectName}</TableCell>
          <TableCell>{date}</TableCell>
          <TableCell>MAD {amount}</TableCell>
          <TableCell align="right">
            <IconButton
              color="error"
              onClick={handleDeleteClick}
              // Replace handleDelete with your actual delete function
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

export default CashListInRow;
