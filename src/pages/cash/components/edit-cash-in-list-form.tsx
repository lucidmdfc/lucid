import Close from '@mui/icons-material/Close';
import Save from '@mui/icons-material/Save';
import { IconButton, MenuItem, Stack, SvgIcon, TableCell, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import toast from 'react-hot-toast';
import { useDialog } from 'src/hooks/use-dialog';
import { cashIn } from 'src/types/cash-in';
import UpdateConfirmation from './edit-confirmation-modal';
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
interface EditCashListFormProps {
  onCancle: () => void;
}
const EditCashListForm: FC<EditCashListFormProps> = ({ onCancle }) => {
  const dialog = useDialog();
  const formik = useFormik({
    initialValues: {
      id: '',
      projectId: '',
      amount: 0,
      startDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    onSubmit: async (values: cashIn, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log(values);
        toast.success('la nouvelle entrée créé avec succès !');
        resetForm();
        onCancle();
        dialog.handleClose();
      } catch (error) {
        toast.error('Erreur lors de la création du Nouvelle Entrée!');
        console.error('Erreur lors de la création du Nouvelle Entrée!: ', error);
      } finally {
        // Set isSubmitting back to false after the submission is complete
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <UpdateConfirmation
        isOpen={dialog.open}
        onCancel={dialog.handleClose}
        onConfirm={formik.handleSubmit}
      />
      <TableCell>
        <TextField
          fullWidth
          label="Nom projet"
          name="projectId"
          value={formik.values.projectId}
          onChange={formik.handleChange}
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
          value={formik.values.startDate}
          onChange={(e) => formik.setFieldValue('startDate', e.target.value)}
          variant="standard"
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          type="text"
          variant="standard"
          name="amountr"
          value={formik.values.amount}
          onChange={formik.handleChange}
        />
      </TableCell>

      <TableCell>
        <Stack
          direction="row"
          justifyContent="end"
        >
          <IconButton
            color="success"
            onClick={dialog.handleOpen}
          >
            <SvgIcon>
              <Save />
            </SvgIcon>
          </IconButton>
          <IconButton
            color="error"
            onClick={onCancle}
          >
            <SvgIcon>
              <Close />
            </SvgIcon>
          </IconButton>
        </Stack>
      </TableCell>
    </>
  );
};

export default EditCashListForm;
