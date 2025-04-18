import { useEffect, type FC } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { wait } from 'src/utils/wait';
import { NextPage } from 'next';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECT_BY_ID, GET_PROJECTS } from 'src/graphql/entities/projects/queries';
import { useRouter } from 'next/router';
import { DELETE_PROJECT, UPDATE_PROJECT } from 'src/graphql/entities/projects/mutations';

const Page: NextPage = () => {
  const router = useRouter();
  const { projetId } = router.query;
  console.log(projetId);
  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
    refetch: projectRefetsh,
  } = useQuery(GET_PROJECT_BY_ID, {
    variables: {
      id: Number(projetId),
    },
  });
  const project = projectData?.projectsCollection?.edges?.[0]?.node;
  console.log(project);
  const [updateProject, { loading: updateProjectLoading, error: updateProjectError }] =
    useMutation(UPDATE_PROJECT);

  const [deleteProject, { loading: deleteProjectLoading, error: deleteProjectError }] = useMutation(
    DELETE_PROJECT,
    {
      variables: { id: projetId },
    }
  );

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
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required('Project name is required'),
      description: Yup.string().max(500),
      start_date: Yup.date().required('Start date is required'),
      end_date: Yup.date().required('End date is required'),
      project_budget: Yup.number().required('Project budget is required').positive(),
      contact_person_email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Contact email is required'),
      contact_person_name: Yup.string().max(255).required('Contact person name is required'),
      note: Yup.string().max(1000),
      status: Yup.bool(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        console.log(values);
        const { data } = await updateProject({
          variables: {
            set: {
              name: values.name,
              description: values.description,
              start_date: values.start_date,
              end_date: values.end_date,
              project_budget: values.project_budget.toString(),
              status: values.status,
              note: values.note,
              contact_person_email: values.contact_person_email,
              contact_person_name: values.contact_person_name,
            },
            // filter: { id: Number(projetId) },
            filter: { id: { eq: Number(projetId) } },
            atMost: 1,
          },
        });
        console.log(data);
        await wait(500);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Project updated');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  // Wait for the project data to load and then update the form values
  useEffect(() => {
    if (project) {
      formik.setValues({
        name: project.name || '',
        description: project.description || '',
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        project_budget: project.project_budget || '',
        contact_person_email: project.contact_person_email || '',
        contact_person_name: project.contact_person_name || '',
        note: project.note || '',
        status: project.status || false,
        submit: null,
      });
    }
  }, [project]);
  // if (projectLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (projectError) {
  //   return <div>Error: {projectError.message}</div>;
  // }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title="Edit Project" />
        <CardContent sx={{ pt: 0 }}>
          <Grid
            container
            spacing={3}
          >
            {/* Project Name */}
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={
                  formik.touched.name && typeof formik.errors.name === 'string'
                    ? formik.errors.name
                    : undefined
                }
                label="Project Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>

            {/* Description */}
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.description && formik.errors.description)}
                fullWidth
                helperText={formik.touched.description && formik.errors.description}
                label="Project Description"
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Grid>

            {/* Start Date */}
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.start_date && formik.errors.start_date)}
                fullWidth
                helperText={formik.touched.start_date && formik.errors.start_date}
                label="Start Date"
                name="start_date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="date"
                required
                value={formik.values.start_date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* End Date */}
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.end_date && formik.errors.end_date)}
                fullWidth
                helperText={formik.touched.end_date && formik.errors.end_date}
                label="End Date"
                name="end_date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="date"
                required
                value={formik.values.end_date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Project Budget */}
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.project_budget && formik.errors.project_budget)}
                fullWidth
                helperText={formik.touched.project_budget && formik.errors.project_budget}
                label="Project Budget"
                name="project_budget"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                required
                value={formik.values.project_budget}
              />
            </Grid>

            {/* Contact Person Email */}
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={
                  !!(formik.touched.contact_person_email && formik.errors.contact_person_email)
                }
                fullWidth
                helperText={
                  formik.touched.contact_person_email && formik.errors.contact_person_email
                }
                label="Contact Person Email"
                name="contact_person_email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.contact_person_email}
              />
            </Grid>

            {/* Contact Person Name */}
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.contact_person_name && formik.errors.contact_person_name)}
                fullWidth
                helperText={formik.touched.contact_person_name && formik.errors.contact_person_name}
                label="Contact Person Name"
                name="contact_person_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.contact_person_name}
              />
            </Grid>

            {/* Notes */}
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.note && formik.errors.note)}
                fullWidth
                helperText={formik.touched.note && formik.errors.note}
                label="Notes"
                name="note"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.note}
              />
            </Grid>
          </Grid>

          <Stack
            divider={<Divider />}
            spacing={3}
            sx={{ mt: 3 }}
          >
            {/* Status Toggle */}
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                >
                  Project Status
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Toggle to mark the project as active or inactive.
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.status}
                color="primary"
                edge="start"
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
              />
            </Stack>
          </Stack>
        </CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Update
          </Button>
          {/* <Button
            color="inherit"
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.dashboard.projects.details}
          >
            Cancel
          </Button> */}
        </Stack>
      </Card>
    </form>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
