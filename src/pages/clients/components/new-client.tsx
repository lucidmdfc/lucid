import React from 'react';
import { Field, useFormik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import toast from 'react-hot-toast';
import { client } from 'src/types/client';
import * as yup from 'yup';

// Define formik configuration object
const validationSchema = yup.object({
  fullName: yup.string().max(255).required('Nom et prénom est requis'),
  phoneNumber: yup.string().max(20).required('Numéro de téléphone est requis'),
  ice: yup.number().required('ICE est requis'),
  address: yup.string().max(255).required('Adresse est requis'),
});
// Form component that uses the formikEnhancer
const NewClientForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      ice: 0,
      address: '',
      phoneNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: client) => {
      toast.success('Client créé avec succès !');
      console.log(values);
    },
  });
  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Nom et prénom"
              name="fullName"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              size="small"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Numéro de téléphone"
              name="phoneNumber"
              type="tel"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              onBlur={formik.handleBlur}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              size="small"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="ICE"
              name="ice"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.ice}
              onBlur={formik.handleBlur}
              error={formik.touched.ice && Boolean(formik.errors.ice)}
              helperText={formik.touched.ice && formik.errors.ice}
              size="small"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Adresse"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.phoneNumber}
              size="small"
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            Créer un client
          </Button>
        </Box>
      </form>
    </Box>
  );
};

// Connect NewClientForm component with formikEnhancer
export default NewClientForm;
