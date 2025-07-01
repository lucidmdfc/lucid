import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MenuItem, Switch } from '@mui/material';
// import { Member, PaymentMethod } from 'src/types/member';
import UpdateConfirmation from './edit-confirmation-modal';
import { useDialog } from 'src/hooks/use-dialog';
import { useMutation } from '@apollo/client';
import LoadingBackdrop from 'src/components/loadingBackdrop';
import toast from 'react-hot-toast';
import {
  useGetDonorsQuery,
  useGetProjectsQuery,
} from 'src/hooks/generatedHook';
import { id } from 'date-fns/locale';
import { GetOneGrantProjectAgreementQuery } from 'src/types/generatedTypes';
import { UPDATE_GRANT_AGREEMENT } from 'src/graphql/entities/grantProjectAgreement/mutations';
type Grant = NonNullable<
  NonNullable<GetOneGrantProjectAgreementQuery['grant_project_agreementCollection']>['edges']
>[number]['node'];
interface ProjectEditProps {
  onCancel?: () => void;
  onSave?: (id: string, values: Grant) => void;
  grant: Grant;
}

const GrantEdit: React.FC<ProjectEditProps> = ({ onCancel, onSave, grant }) => {
  const dialog = useDialog();
  // const [updateProject, { loading, error }] = useUpdateProjectMutation();
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
    refetch: projectRefetch,
  } = useGetProjectsQuery();
  const {
    loading: donorsLoading,
    error: donorsError,
    data: donorsData,
    refetch: donorsRefetch,
  } = useGetDonorsQuery();
  const [UpdateGrantAgreement, { loading, error }] = useMutation(UPDATE_GRANT_AGREEMENT);

  const { values, handleChange, handleSubmit, setFieldValue, touched, errors } = useFormik({
    initialValues: {
      id: grant.id,
      donor_id: grant.donor_id,
      project_id: grant.project_id,
      grant: grant.grant,
      agreement_date: grant.agreement_date,
      submit: null,
    },
    validationSchema: Yup.object({
      id: Yup.string().required("L'identifiant est requis"),
      donor_id: Yup.string().required("L'identifiant du donateur est requis"),
      project_id: Yup.string().required("L'identifiant du projet est requis"),
      grant: Yup.number()
        .required('Le montant de la subvention est requis')
        .min(0, 'Le montant de la subvention doit être un nombre positif'),
      agreement_date: Yup.date()
        .required("La date de l'accord est requise")
        .typeError('Format de date invalide'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        console.log(values);
        const { data } = await UpdateGrantAgreement({
          variables: {
            set: {
              donor_id: values.donor_id,
              project_id: values.project_id,
              grant: String(values.grant),
              agreement_date: values.agreement_date,
            },
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
    setFieldValue('donor_id', grant.donor_id);
    setFieldValue('project_id', grant.project_id);
    setFieldValue('grant', grant.grant);
    setFieldValue('agreement_date', grant.agreement_date);
  }, [grant, setFieldValue]);
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
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Projet"
                  name="project_id"
                  onChange={handleChange}
                  value={values.project_id}
                  select
                  error={touched.project_id && Boolean(errors.project_id)}
                  helperText={touched.project_id && errors.project_id}
                >
                  {projectsData?.projectsCollection?.edges?.map((project) => (
                    <MenuItem
                      value={project?.node?.id}
                      key={project?.node?.id}
                    >
                      {project?.node?.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="bailleur"
                  name="donor_id"
                  onChange={handleChange}
                  value={values.donor_id}
                  select
                  error={touched.donor_id && Boolean(errors.donor_id)}
                  helperText={touched.donor_id && errors.donor_id}
                >
                  {donorsData?.donorsCollection?.edges.map((d: any) => (
                    <MenuItem
                      key={d.node.id}
                      value={d.node.id}
                    >
                      {d.node.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <TextField
                fullWidth
                label="date de l'accord"
                name="start_date"
                type="date"
                value={values.agreement_date}
                onChange={handleChange}
                error={touched.agreement_date && Boolean(errors.agreement_date)}
                helperText={
                  touched.agreement_date && typeof errors.agreement_date === 'string'
                    ? errors.agreement_date
                    : ''
                }
              />
            </Stack>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Montant du Grant"
                name="grant"
                type="number"
                value={values.grant}
                onChange={handleChange}
                error={touched.grant && Boolean(errors.grant)}
                helperText={touched.grant && typeof errors.grant === 'string' ? errors.grant : ''}
              />
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
        </Stack>
      </form>
    </>
  );
};
export default GrantEdit;
GrantEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};
