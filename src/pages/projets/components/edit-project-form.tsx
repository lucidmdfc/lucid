import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { MenuItem, Switch } from '@mui/material';
// import { Member, PaymentMethod } from 'src/types/member';
import UpdateConfirmation from './edit-confirmation-modal';
import { useDialog } from 'src/hooks/use-dialog';
import { useMutation } from '@apollo/client';
import { UPDATE_MEMBER } from 'src/graphql/entities/members/mutations';
import { PAYMENT_METHOD_OPTIONS } from 'src/graphql/shared/enums/paymentMethods';
import LoadingBackdrop from 'src/components/loadingBackdrop';
import toast from 'react-hot-toast';
import { GetProjectsQuery } from 'src/types/generatedTypes';
import { useUpdateProjectMutation } from 'src/hooks/generatedHook';
import { id } from 'date-fns/locale';
type Project = NonNullable<
  NonNullable<GetProjectsQuery['projectsCollection']>['edges']
>[number]['node'];
interface ProjectEditProps {
  onCancel?: () => void;
  onSave?: (id: string, values: Project) => void;
  project: Project;
}

const ProjectEdit: React.FC<ProjectEditProps> = ({ onCancel, onSave, project }) => {
  const dialog = useDialog();
  const [updateProject, { loading, error }] = useUpdateProjectMutation();

  const { values, handleChange, handleSubmit, setFieldValue, touched, errors } = useFormik({
    initialValues: {
      id: project.id,
      name: project.name,
      description: project.description,
      start_date: project.start_date,
      end_date: project.end_date,
      project_budget: project.project_budget,
      contact_person_email: project.contact_person_email,
      contact_person_name: project.contact_person_name,
      status: project.status,
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
              contact_person_email: values.contact_person_email,
              contact_person_name: values.contact_person_name,
            },
            // filter: { id: Number(projetId) },
            filter: { id: { eq: values.id } },
            atMost: 1,
          },
        });
        dialog.handleClose();
        toast.success('Project updated');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
      }
    },
  });
  useEffect(() => {
    setFieldValue('id', project.id);
    setFieldValue('name', project.name);
    setFieldValue('description', project.description);
    setFieldValue('start_date', project.start_date);
    setFieldValue('end_date', project.end_date);
    setFieldValue('project_budget', project.project_budget);
    setFieldValue('contact_person_email', project.contact_person_email);
    setFieldValue('contact_person_name', project.contact_person_name);
    setFieldValue('note', project.note);
    setFieldValue('status', project.status);
  }, [project, setFieldValue]);
  return (
    <>
      <LoadingBackdrop open={loading} />
      {!loading && (
        <UpdateConfirmation
          isOpen={dialog.open}
          onCancel={dialog.handleClose}
          onConfirm={handleSubmit}
        />
      )}
      <form>
        <Stack spacing={6}>
          <Stack spacing={3}>
            <Typography variant="h6">Détails</Typography>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Project Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                label="Project Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              <TextField
                fullWidth
                label="Start Date"
                name="start_date"
                type="date"
                value={values.start_date}
                onChange={handleChange}
                error={touched.start_date && Boolean(errors.start_date)}
                helperText={
                  touched.start_date && typeof errors.start_date === 'string'
                    ? errors.start_date
                    : ''
                }
              />
              <TextField
                fullWidth
                label="End Date"
                name="end_date"
                type="date"
                value={values.end_date}
                onChange={handleChange}
                error={touched.end_date && Boolean(errors.end_date)}
                helperText={
                  touched.end_date && typeof errors.end_date === 'string' ? errors.end_date : ''
                }
              />
              <TextField
                fullWidth
                label="Project Budget"
                name="project_budget"
                type="number"
                value={values.project_budget}
                onChange={handleChange}
                error={touched.project_budget && Boolean(errors.project_budget)}
                helperText={
                  touched.project_budget && typeof errors.project_budget === 'string'
                    ? errors.project_budget
                    : ''
                }
              />
              <TextField
                fullWidth
                label="Contact Person Email"
                name="contact_person_email"
                value={values.contact_person_email}
                onChange={handleChange}
                error={touched.contact_person_email && Boolean(errors.contact_person_email)}
                helperText={
                  touched.contact_person_email && typeof errors.contact_person_email === 'string'
                    ? errors.contact_person_email
                    : ''
                }
              />
              <TextField
                fullWidth
                label="Contact Person Name"
                name="contact_person_name"
                value={values.contact_person_name}
                onChange={handleChange}
                error={touched.contact_person_name && Boolean(errors.contact_person_name)}
                helperText={
                  touched.contact_person_name && typeof errors.contact_person_name === 'string'
                    ? errors.contact_person_name
                    : ''
                }
              />
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
                    Statut du projet
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    Basculer pour marquer le projet comme actif ou inactif.
                  </Typography>
                </Stack>
                <Switch
                  checked={values.status}
                  color="primary"
                  edge="start"
                  name="status"
                  onChange={(e) => setFieldValue('status', e.target.checked)}
                  value={values.status}
                />
              </Stack>
              {/* <TextField
                fullWidth
                label="Status"
                name="status"
                select
                SelectProps={{ native: true }}
                value={values.status}
                onChange={(e) => setFieldValue('status', e.target.value === 'true')} // convert string to boolean
                error={touched.status && Boolean(errors.status)}
                helperText={
                  touched.status && typeof errors.status === 'string' ? errors.status : ''
                }
              >
                <option value="true">Payée</option>
                <option value="false">Impayée</option>
              </TextField> */}
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              spacing={2}
            >
              <Button
                color="primary"
                size="small"
                variant="contained"
                onClick={dialog.handleOpen}
              >
                Sauvegarder
              </Button>
              <Button
                color="error"
                onClick={onCancel}
                size="small"
              >
                Annuler
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </>
  );
};
export default ProjectEdit;
ProjectEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};
