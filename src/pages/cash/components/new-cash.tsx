import React, { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Grid, MenuItem, Switch } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { cashIn } from 'src/types/cash-in';

interface Option {
  text: string;
  value: number;
}

const projects: Option[] = [
  { text: 'project id 1', value: 1 },
  { text: 'project id 2', value: 2 },
  { text: 'project id 3', value: 3 },
  { text: 'project id 4', value: 4 },
  { text: 'project id 5', value: 5 },
];
const NewCash = () => {
  const formik = useFormik({
    initialValues: {
      id: '',
      projectId: '',
      amount: 0,
      startDate: new Date(),
    },
    onSubmit: async (values: cashIn, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log(values);
        toast.success('la nouvelle entrée créé avec succès !');
        resetForm();
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
    <Box sx={{ p: 3 }}>
      <form onSubmit={formik.handleSubmit}>
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
              label="Nom projet"
              name="projectId"
              value={formik.values.projectId}
              onChange={formik.handleChange}
              select
              size="small"
              error={formik.touched.projectId && Boolean(formik.errors.projectId)}
              helperText={formik.touched.projectId && formik.errors.projectId}
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
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            container
          >
            <TextField
              fullWidth
              label="Montant"
              name="amount"
              type="number"
              required
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
              label="Date"
              onChange={(newDate) => formik.setFieldValue('startDate', newDate)}
              value={formik.values.startDate}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
          >
            Créer
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewCash;
