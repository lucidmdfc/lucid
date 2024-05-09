import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Autocomplete, MenuItem } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';
import { payment } from 'src/types/employees_salaries';
import CreateConfirmation from './create-modal-confirmation';
import { useDialog } from 'src/hooks/use-dialog';

type Option = {
  text: string;
  value: number;
};

const employees: Option[] = [
  { text: 'Employee 1', value: 1 },
  { text: 'Employee 2', value: 2 },
  { text: 'Employee 3', value: 3 },
  { text: 'Employee 4', value: 4 },
  { text: 'Employee 5', value: 5 },
];

const NewPayment = () => {
  const router = useRouter();
  const dialog = useDialog();
  const formik = useFormik({
    initialValues: {
      id: '',
      amount: Number(),
      employee: '',
      date: new Date(),
      createdDate: new Date(),
    },
    // validationSchema: validationSchema,
    onSubmit: async (values: payment, { setSubmitting, resetForm }) => {
      console.log(values);

      try {
        // Handle form submission
        toast.success('Nouveau virement créé avec succès !');
        router.replace(paths.employee.index);
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la création un nouveau virement!');
        console.error('Erreur lors de la création un nouveau virement!: ', error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <Box sx={{ p: 3 }}>
      <CreateConfirmation
        isOpen={dialog.open}
        onConfirm={formik.handleSubmit}
        onCancel={dialog.handleClose}
      />
      <form>
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Choisir un(e) salarié(e)"
              name="employee"
              value={formik.values.employee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.employee && Boolean(formik.errors.employee)}
              helperText={formik.touched.employee && formik.errors.employee}
              select
              size="small"
            >
              <MenuItem disabled>--</MenuItem>
              {employees?.map((employee) => (
                <MenuItem
                  key={employee?.value}
                  value={employee?.value}
                >
                  {employee.text}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Montant"
              name="amount"
              required
              type="number"
              size="small"
              value={formik.values.amount}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <MobileDatePicker
              label="Date de versement"
              onChange={(newDate) => formik.setFieldValue('date', newDate)}
              value={formik.values.date}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            onClick={dialog.handleOpen}
            variant="contained"
          >
            Créer
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewPayment;
