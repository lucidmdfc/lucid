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
import { useCreateProjectMutation } from 'src/hooks/generatedHook';
import LoadingBackdrop from 'src/components/loadingBackdrop';

const validationSchema = yup.object({
  name: yup.string().required('Le nom du projet est requis'),
  description: yup.string().required('La description est requise'),
  start_date: yup.date().required('La date de début est requise'),
  end_date: yup
    .date()
    .required('La date de fin est requise')
    .min(yup.ref('start_date'), 'La date de fin doit être après la date de début'),
  project_budget: yup
    .number()
    .typeError('Le budget doit être un nombre')
    .required('Le budget est requis')
    .positive('Le budget doit être positif'),
  contact_person_email: yup
    .string()
    .email('Email invalide')
    .required("L'email de contact est requis"),
  contact_person_name: yup.string().required('Le nom de contact est requis'),
});
const NewProjectForm = () => {
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
  const [CreateProject, { loading }] = useCreateProjectMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      project_budget: '',
      contact_person_email: '',
      contact_person_name: '',
      note: '',
      status: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Generate unique ID for the project
        // const projectId = Math.random().toString(36).substring(7);
        // Assign the generated ID to the project

        // Handle form submission
        // const storedProjects = localStorage.getItem('projects');
        // const existingProjects = storedProjects ? JSON.parse(storedProjects) : [];

        // Add the new project to the array
        // const updatedProjects = [...existingProjects, values];

        // Store the updated projects array in local storage
        // localStorage.setItem('projects', JSON.stringify(updatedProjects));
        // console.log(values as unknown as Project);
        const { data } = await CreateProject({
          variables: {
            name: values.name,
            description: values.description,
            start_date: values.start_date,
            end_date: values.end_date,
            project_budget: values.project_budget.toString(),
            contact_person_email: values.contact_person_email,
            contact_person_name: values.contact_person_name,
            status: values.status,
            note: values.note,
          },
        });
        toast.success('Projet créé avec succès !');
        router.replace(paths.projets.index);
        resetForm();
        // setBeneficiaryList([]);
        // setFinancialBackersList([]);
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
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <TextField
                fullWidth
                label="Date de début"
                type="date"
                name="start_date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.start_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                helperText={formik.touched.start_date && formik.errors.start_date}
                sx={{ mt: 2 }}
              />
            </Stack>
            {/* <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              spacing={1}
              sx={{
                flexGrow: 1,
                pt: financialBackersList?.length > 0 ? 1 : 0,
              }}
            >
              {financialBackersList.map((backer, index) => (
                <Chip
                  key={index}
                  label={backer}
                  onDelete={() => handleDeleteFinancialBacker(index)}
                  variant="outlined"
                />
              ))}
            </Stack> */}
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <TextField
                fullWidth
                label="Date de fin"
                name="end_date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.end_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                helperText={formik.touched.end_date && formik.errors.end_date}
                sx={{ mt: 2 }}
              />
              {/* <IconButton onClick={handleAddBeneficiary}>
                <SvgIcon>
                  <PlusIcon />
                </SvgIcon>
              </IconButton> */}
            </Stack>
            {/* <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              spacing={1}
              sx={{
                flexGrow: 1,
                pt: 1,
              }}
            >
              {beneficiaryList.map((beneficiary, index) => (
                <Chip
                  key={index}
                  label={beneficiary}
                  onDelete={() => handleDeleteBeneficiary(index)}
                  variant="outlined"
                />
              ))}
            </Stack> */}
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Budget du projet"
              name="project_budget"
              type="number"
              value={formik.values.project_budget}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.project_budget && Boolean(formik.errors.project_budget)}
              helperText={formik.touched.project_budget && formik.errors.project_budget}
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
              label="Contact Personne Email"
              name="contact_person_email"
              value={formik.values.contact_person_email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contact_person_email && Boolean(formik.errors.contact_person_email)
              }
              helperText={formik.touched.contact_person_email && formik.errors.contact_person_email}
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
              label="Contact Personne nom"
              name="contact_person_name"
              value={formik.values.contact_person_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contact_person_name && Boolean(formik.errors.contact_person_name)
              }
              helperText={formik.touched.contact_person_name && formik.errors.contact_person_name}
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
              label="Status"
              name="status"
              select
              value={formik.values.status.toString()}
              onChange={(e) => {
                formik.setFieldValue('status', e.target.value === 'true');
              }}
              sx={{ mt: 2 }}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </TextField>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={2}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              sx={{ mt: 2 }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            onClick={dialog.handleOpen}
            variant="contained"
          >
            {formik.isSubmitting ? 'Création en cours...' : 'Créer un projet'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewProjectForm;
