import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Chip from '@mui/material/Chip';
import { Grid, MenuItem, Stack, Typography } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Project } from 'src/types/project';
import toast from 'react-hot-toast';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';
import CreateConfirmation from './create-confirmation-modal';
import { useDialog } from 'src/hooks/use-dialog';
import { useCreateDonorMutation, useCreateProjectMutation } from 'src/hooks/generatedHook';
import LoadingBackdrop from 'src/components/loadingBackdrop';

const validationSchema = yup.object({
  name: yup.string().required('Le nom du bailleur est requis'),
  email: yup.string().email('Email invalide').required("L'email est requis"),
  phone: yup.string().required('Le téléphone est requis'),
});
const NewDonorForm = () => {
  const [financialBackersInput, setFinancialBackersInput] = useState<string>('');
  const [financialBackersList, setFinancialBackersList] = useState<string[]>([]);
  const [beneficiaryInput, setBeneficiaryInput] = useState<string>('');
  const [beneficiaryList, setBeneficiaryList] = useState<string[]>([]);

  const handleFinancialBackersInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinancialBackersInput(event.target.value);
  };

  const handleAddFinancialBacker = () => {
    if (financialBackersInput.trim() !== '') {
      setFinancialBackersList([...financialBackersList, financialBackersInput.trim()]);
      setFinancialBackersInput('');
    }
  };

  const handleDeleteFinancialBacker = (index: number) => {
    const updatedList = [...financialBackersList];
    updatedList.splice(index, 1);
    setFinancialBackersList(updatedList);
  };

  const handleBeneficiaryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeneficiaryInput(event.target.value);
  };

  const handleAddBeneficiary = () => {
    if (beneficiaryInput.trim() !== '') {
      setBeneficiaryList([...beneficiaryList, beneficiaryInput.trim()]);
      setBeneficiaryInput('');
    }
  };

  const handleDeleteBeneficiary = (index: number) => {
    const updatedList = [...beneficiaryList];
    updatedList.splice(index, 1);
    setBeneficiaryList(updatedList);
  };

  const router = useRouter();
  const dialog = useDialog();
  const [CreateDonor, { loading }] = useCreateDonorMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      note: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { data } = await CreateDonor({
          variables: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            note: values.note,
          },
        });
        toast.success('Projet créé avec succès !');
        router.replace(paths.donors.index);
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la création du projet!');
        console.error('Erreur lors de la création du projet!: ', error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <Box sx={{ p: 3 }}>
      <LoadingBackdrop open={loading} />
      {!loading && (
        <CreateConfirmation
          isOpen={dialog.open}
          onConfirm={formik.handleSubmit}
          onCancel={dialog.handleClose}
        />
      )}
      <form>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Nom"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Téléphone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Note"
              name="note"
              multiline
              rows={3}
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.note && Boolean(formik.errors.note)}
              helperText={formik.touched.note && formik.errors.note}
              sx={{ mt: 2 }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            onClick={dialog.handleOpen}
            variant="contained"
          >
            {formik.isSubmitting ? 'Création en cours...' : 'Créer un Bailleur'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewDonorForm;
