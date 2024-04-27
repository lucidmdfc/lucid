/* eslint-disable */
import Check from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';
import Edit from '@mui/icons-material/Edit';
import { IconButton, TableCell, TableRow, TextField } from '@mui/material';
import Trash02 from '@untitled-ui/icons-react/build/esm/Trash02';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { paths } from 'src/paths';
import DeleteSliceModal from '../components/delete-slice-modal';
import * as yup from 'yup';
import { slice } from 'src/types/slice';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';
import { useDialog } from 'src/hooks/use-dialog';

interface SliceRowProps {
  slice: slice;
  projectId: string;
  onRefresh: () => void;
  onUpdate: () => void;
}

const validationSchema = yup.object({
  amount: yup.number().min(0, 'Montant est requis'),
  received_date: yup.date().required('date reçu est requis'),
});

const SliceRow: FC<SliceRowProps> = ({ slice, projectId, onRefresh }) => {
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [sliceId, setSliceId] = useState<string | null>(null);

  const issueDate = new Date(slice.received_date);

  const router = useRouter();
  const dialog = useDialog();

  const formik = useFormik({
    initialValues: {
      id: '',
      amount: 0,
      received_date: '',
      updated_at: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      values.amount = values.amount * 1;

      const { id, ...sliceData } = values;

      try {
        // Handle form submission
        if (projectId) {
          console.log(projectId, id, sliceData);
          // await firebaseSlice.updateSlice(projectId, id, sliceData as unknown as slice, onUpdate);
        }
        toast.success('Slice modfiée avec succès !');
        handleCancelEdit();
      } catch (error) {
        toast.error('Erreur lors de la création du membre!');
        console.error('Erreur lors de la création du membre!: ', error);
      } finally {
        // Set isSubmitting back to false after the submission is complete
        setSubmitting(false);
      }
    },
  });

  const handleEditClick = (sliceId: string) => {
    setEditRowId(sliceId);
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
  };

  const handleSaveEdit = async (sliceId: string) => {
    try {
      // Make sure formik values are valid
      await formik.validateForm();

      // Update the slice with the formik values
      const updatedSlice = {
        ...slice,
        amount: formik.values.amount,
        received_date: new Date(formik.values.received_date),
      };

      // Get slices from local storage
      const slicesJson = localStorage.getItem('slices');
      if (!slicesJson) {
        throw new Error('No slices found in local storage');
      }
      const slices: slice[] = JSON.parse(slicesJson);

      // Find the index of the slice to update
      const index = slices.findIndex((slice) => slice.id === sliceId);
      if (index === -1) {
        throw new Error('Slice not found in local storage');
      }

      // Update the slice in the array
      slices[index] = updatedSlice;

      // Save the updated slices back to local storage
      localStorage.setItem('slices', JSON.stringify(slices));

      // Notify user and refresh
      toast.success('Slice modifiée avec succès !');
      onRefresh();
    } catch (error) {
      toast.error('Erreur lors de la modification de la tranche');
      console.error('Error editing slice:', error);
    } finally {
      // Close edit mode
      setEditRowId(null);
    }
  };

  useEffect(() => {
    formik.setFieldValue('id', slice.id);
    formik.setFieldValue('amount', slice.amount);
    formik.setFieldValue('received_date', new Date(slice.received_date));
  }, [slice.id]);

  const handleDeleteClick = (id: string) => {
    setSliceId(id);
    dialog.handleOpen();
  };

  const handleDeleteConfirmation = async (sliceId: string) => {
    try {
      if (!sliceId) {
        throw new Error('Slice ID is undefined');
      }

      const slicesJson = localStorage.getItem('slices');
      if (!slicesJson) {
        throw new Error('No slices found for the project in local storage');
      }
      const slices: { id: string; name: string }[] = JSON.parse(slicesJson);

      const sliceIndex = slices.findIndex((slice) => slice.id === sliceId);
      if (sliceIndex === -1) {
        throw new Error('Slice not found');
      }

      slices.splice(sliceIndex, 1);

      localStorage.setItem('slices', JSON.stringify(slices));

      console.log('deleted slice: ' + sliceId);
      toast.success('La tranche a été supprimé avec succès!');
      router.replace(paths.dashboard.projets.details.replace(':projetId', projectId));
      onRefresh();
    } catch (error) {
      console.error('Error deleting slice: ', error);
      toast.error('Échec de la suppression de la tranche. Veuillez réessayer.');
    }
    dialog.handleClose();
  };

  const handleDeleteCancel = () => {
    setSliceId(null);
    dialog.handleClose();
  };

  return (
    <TableRow>
      <TableCell>
        {editRowId === slice.id ? (
          <DatePicker
            label="Reçu le"
            onChange={(newDate) => formik.setFieldValue('received_date', newDate)}
            value={formik.values.received_date}
            format="dd/MM/yyyy"
          />
        ) : (
          `${issueDate.getDate()}/${issueDate.getMonth() + 1}/${issueDate.getFullYear()}`
        )}
      </TableCell>
      <TableCell>
        {editRowId === slice.id ? (
          <TextField
            size="small"
            type="number"
            variant="filled"
            label="Montant"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
          />
        ) : (
          `MAD ${slice.amount}`
        )}
      </TableCell>

      <TableCell align="right">
        {editRowId === slice.id ? (
          <>
            <IconButton
              color="success"
              onClick={() => handleSaveEdit(slice.id)}
            >
              <Check />
            </IconButton>
            <IconButton
              color="error"
              onClick={handleCancelEdit}
            >
              <Clear />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              color="warning"
              onClick={() => handleEditClick(slice.id)}
            >
              <Edit />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDeleteClick(slice.id)}
            >
              <Trash02 />
            </IconButton>
            <DeleteSliceModal
              isOpen={dialog.open}
              onConfirm={handleDeleteConfirmation}
              onCancel={dialog.handleClose}
              message="Êtes vous sûr de vouloir supprimer cette tranche? Cette action sera irréversible."
              id={sliceId || ''}
              projectId={projectId}
            />
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default SliceRow;
