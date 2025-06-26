import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { slice } from 'src/types/slice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import { Project } from 'src/types/project';
import CreateConfirmation from './create-confirmation-modal';
import { useDialog } from 'src/hooks/use-dialog';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from 'src/graphql/entities/projects/queries';
import { CREATE_GRANT_SLICE } from 'src/graphql/entities/grantSlices/mutations';
import { GET_GRANT_PROJECT_AGREEMENT } from 'src/graphql/entities/grantProjectAgreement/queries';
import { useCreateGrantSliceMutation, useGetProjectsQuery } from 'src/hooks/generatedHook';

type Option = {
  text: string;
  value: string;
};

type PaymentMethod = {
  text: string;
  value: number;
};

const validationSchema = yup.object({
  amount: yup.number().min(1, 'Montant est requis'),
});
const NewInstallment = () => {
  const [projects, setProjects] = useState<Option[]>([]);

  const dialog = useDialog();
  const router = useRouter();
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
    refetch: projectRefetsh,
  } = useGetProjectsQuery();
  // const {
  //   loading: projectGrantAgreementLoading,
  //   error: projectGrantAgreementError,
  //   data: projectGrantAgreementData,
  //   refetch: projectGrantAgreementRefetsh,
  // } = useQuery(GET_GRANT_PROJECT_AGREEMENT);
  // console.log(projectGrantAgreementData);

  const [createGrantSlice] = useCreateGrantSliceMutation();

  // const handleProjectsGet = () => {
  //   try {
  //     // Retrieve projects from local storage

  //     const storedProjects = localStorage.getItem('projects');
  //     const existingProjects = storedProjects ? JSON.parse(storedProjects) : [];

  //     // Map the existing projects to create an array of objects with 'text' and 'value' properties
  //     const mappedProjects = existingProjects.map(({ id, project_name }: Project) => ({
  //       text: project_name,
  //       value: id,
  //     }));

  //     // Set the projects state with the mapped projects
  //     setProjects(mappedProjects);
  //   } catch (error) {
  //     console.error('Error fetching projects:', error);
  //   }
  // };

  useEffect(() => {
    // Call handleProjectsGet when the component mounts
    // handleProjectsGet();
    if (projectsData?.projectsCollection?.edges) {
      const mappedProjects = projectsData?.projectsCollection?.edges.map((edge: any) => {
        const node: any = edge.node;
        return {
          text: node.name,
          value: node.id,
        };
      });

      setProjects(mappedProjects);
    }
  }, [projectsData]);

  const formik = useFormik({
    initialValues: {
      project_id: '',
      amount: 0,
      received_date: new Date(),
      created_at: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const { project_id, ...sliceData } = values;
      try {
        // Generate a unique ID for the slice
        // const slice_id = Math.random().toString(36).substring(7);

        // Construct the slice object including the generated ID
        // const slice = { id: slice_id, project_id, ...sliceData };

        // Retrieve existing slices from local storage
        // const storedSlices = localStorage.getItem('slices');
        // const existingSlices = storedSlices ? JSON.parse(storedSlices) : [];

        // Add the new slice to the array of existing slices
        // const updatedSlices = [...existingSlices, slice];

        // Store the updated slices array in local storage
        // localStorage.setItem('slices', JSON.stringify(updatedSlices));
        await createGrantSlice({
          variables: {
            project_id: Number(project_id),
            amount: sliceData.amount.toString(),
            received_date: sliceData.received_date,
            status: 'received',
          },
        });

        console.log(project_id, sliceData);
        toast.success('Tranche créé avec succès !');
        router.replace(paths.projets.index);
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la création du tranche!');
        console.error('Erreur lors de la création du tranche!: ', error);
      } finally {
        // Set isSubmitting back to false after the submission is complete
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
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={12}
          >
            <FormControl
              variant="outlined"
              fullWidth
            >
              <InputLabel id="demo-simple-select-label">sélectionner un projet</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                size="small"
                label="sélectionner un projet"
                onChange={formik.handleChange}
                value={formik.values.project_id}
                name="project_id"
              >
                {projects.map((project) => (
                  <MenuItem
                    value={project.value}
                    key={project.value}
                  >
                    {project.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              type="number"
              required
              size="small"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <MobileDatePicker
              label="Reçu le"
              onChange={(newDate) => formik.setFieldValue('received_date', newDate)}
              value={formik.values.received_date}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            onClick={dialog.handleOpen}
            variant="contained"
          >
            Créer une tranche
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewInstallment;
