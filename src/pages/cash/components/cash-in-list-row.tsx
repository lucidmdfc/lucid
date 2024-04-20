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

interface Option {
  text: string;
  value: string;
}

const projects: Option[] = [
  { text: 'project_1', value: 'project_1' },
  { text: 'project_2', value: 'project_2' },
  { text: 'project_3', value: 'project_3' },
  { text: 'project_4', value: 'project_4' },
  { text: 'project_5', value: 'project_5' },
];
interface CashList {
  date: string;
  amount: string;
  id: string;
  projectName: string;
}

interface CashListInRowProps extends CashList {
  onDelete: (id: number) => void;
}

const CashListInRow: React.FC<CashListInRowProps> = ({
  id,
  date,
  amount,
  onDelete,
  projectName,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedDate, setEditedDate] = useState(date);
  const [editedAmount, setEditedAmount] = useState(amount);
  const [editedProjectName, setEditedProjectName] = useState(projectName);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Handle saving the edited values (e.g., make an API call, update state, etc.)
    setEditMode(false);
    toast.success('La tranch a été modifié avec succès');
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
        <>
          <TableCell>
            <TextField
              fullWidth
              label="Nom projet"
              name="projectId"
              value={editedProjectName}
              onChange={(e) => setEditedProjectName(e.target.value)}
              select
              size="small"
            >
              <MenuItem value="">--</MenuItem>
              {projects.map((project) => (
                <MenuItem
                  value={project.value}
                  key={project.value}
                >
                  {project.text}
                </MenuItem>
              ))}
              <MenuItem value={0}>autre</MenuItem>
            </TextField>
          </TableCell>
          <TableCell>
            <TextField
              size="small"
              type="text"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              variant="standard"
            />
          </TableCell>
          <TableCell>
            <TextField
              size="small"
              type="text"
              variant="standard"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
            />
          </TableCell>

          <TableCell>
            <Stack
              direction="row"
              justifyContent="end"
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
