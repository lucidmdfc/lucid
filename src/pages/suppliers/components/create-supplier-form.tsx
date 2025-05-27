import { useState, type FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import { Autocomplete, Divider, OutlinedInput, SvgIcon } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useDialog } from 'src/hooks/use-dialog';
import { number } from 'prop-types';
import FileUploader from './file-uploader';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import CreateConfirmation from './create-modal-confirmation';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CREATE_SERVICE_PROVIDER } from 'src/graphql/entities/serviceProviders/mutations';
import { useGetProjectsQuery, useGetStatusQuery } from 'src/hooks/generatedHook';
import { PAYMENT_METHOD_OPTIONS } from 'src/graphql/shared/enums/paymentMethods';
import * as Yup from 'yup';
import { UPLOAD_FILE } from 'src/graphql/operations/mutations';
import { supabase } from 'src/libs/supabaseClient';

type Option = {
  text: string;
  value: number;
};

const projects: Option[] = [
  { text: 'project id 1', value: 1 },
  { text: 'project id 2', value: 2 },
  { text: 'project id 3', value: 3 },
  { text: 'project id 4', value: 4 },
  { text: 'project id 5', value: 5 },
];

const validationSchema = Yup.object().shape({
  projectId: Yup.number().typeError('Le projet est requis').required('Le projet est requis'),
  nom: Yup.string().required('Le nom est requis'),
  ice: Yup.string()
    .required('ICE est requis')
    .max(15, 'ICE doit contenir au maximum 15 caractères'),

  depositedDate: Yup.date()
    .typeError('La date de dépôt est invalide')
    .required('La date de dépôt est requise'),
  dueDate: Yup.date()
    .typeError("La date d'échéance est invalide")
    .required("La date d'échéance est requise"),
  amount: Yup.number()
    .typeError('Le montant doit être un nombre')
    .required('Le montant est requis')
    .min(0, 'Le montant doit être supérieur ou égal à 0'),
  status: Yup.number().typeError('Le statut est requis').required('Le statut est requis'),
  method: Yup.string().required('Le moyen de paiement est requis'),
  commentaire: Yup.string().required('Le commentaire est requis'),
  file: Yup.mixed()
    .required('Le fichier est requis')
    .test('fileFormat', 'Seuls les fichiers PDF sont autorisés', (value) => {
      const file = value as File;

      return file && file.type === 'application/pdf';
    })
    .test('fileSize', 'Le fichier doit être inférieur à 5 Mo', (value) => {
      const file = value as File;

      return file && file.size <= 15 * 1024 * 1024; //15MB
    }),
});

const SupplierCreateForm: FC = () => {
  const dialog = useDialog();
  const uploadDialog = useDialog();
  const router = useRouter();
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
    refetch: projectRefetch,
  } = useGetProjectsQuery();
  // console.log(projectsData);
  const {
    loading: statusLoading,
    error: statusError,
    data: statusData,
    refetch: statusRefetch,
  } = useGetStatusQuery();
  // console.log(statusData);

  const [createServiceProvider, { data, loading, error }] = useMutation(CREATE_SERVICE_PROVIDER);
  const [uploadFile, { data: uploadFileData, loading: uploadFileLoading, error: uploadFileError }] =
    useMutation(UPLOAD_FILE);
  console.log(uploadFileData);
  console.log(uploadFileError);

  const formik = useFormik({
    initialValues: {
      projectId: null,
      nom: '',
      ice: '',
      depositedDate: null,
      dueDate: null,
      amount: null,
      status: null,
      method: '',
      commentaire: '',
      file: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log(values);
        const { data } = await createServiceProvider({
          variables: {
            project_id: Number(values.projectId),
            name: values.nom,
            email: '',
            phone: '',
            ice: values.ice,
            depositedDate: values.depositedDate,
            dueDate: values.dueDate,
            amount: String(values.amount),
            comment: String(values.commentaire),
            payment_method: String(values.method),
            status_id: Number(values.status),
          },
        });
        const service_provider_id = data?.insertIntoservice_providersCollection?.records[0]?.id;
        // console.log(service_provider_id);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        const accessToken = session?.access_token;

        console.log(values.file);
        // console.log(service_provider_id);
        if (values.file && service_provider_id) {
          const { data: fileData, errors } = await uploadFile({
            variables: {
              file: values.file,
              documentCategory: 'service_provider_file',
              service_provider_id: String(service_provider_id),
            },
            context: {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          });
        }
        toast.success('le prestataire créé avec succès !');
        dialog.handleClose();
        resetForm();
        // router.push(paths.suppliers.search);
      } catch (error) {
        toast.error('Erreur lors de la création du prestataire!');
        console.error('Erreur lors de la création du prestataire!: ', error);
      } finally {
        // Set isSubmitting back to false after the submission is complete
        setSubmitting(false);
      }
    },
  });
  return (
    <form>
      <Stack spacing={4}>
        <Box maxWidth="lg">
          <Card>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={12}
                >
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Id Projet"
                      name="projectId"
                      onChange={formik.handleChange}
                      value={formik.values.projectId}
                      select
                      onBlur={formik.handleBlur}
                      error={formik.touched.projectId && Boolean(formik.errors.projectId)}
                      helperText={formik.touched.projectId && formik.errors.projectId}
                    >
                      {/* <MenuItem value="">--</MenuItem> */}
                      {projectsData?.projectsCollection?.edges?.map((project) => (
                        <MenuItem
                          value={project?.node?.id}
                          key={project?.node?.id}
                        >
                          {project?.node?.name}
                        </MenuItem>
                      ))}
                      {/* {projects?.map((project) => (
                        <MenuItem
                          value={project.value}
                          key={project.value}
                        >
                          {project.text}
                        </MenuItem>
                      ))} */}
                      {/* <MenuItem value={0}>autre</MenuItem> */}
                    </TextField>
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Nom / Raison sociale du prestataire"
                      name="nom"
                      onChange={formik.handleChange}
                      value={formik.values.nom}
                      onBlur={formik.handleBlur}
                      error={formik.touched.nom && Boolean(formik.errors.nom)}
                      helperText={formik.touched.nom && formik.errors.nom}
                    />
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="ICE"
                      name="ice"
                      onChange={formik.handleChange}
                      value={formik.values.ice}
                      onBlur={formik.handleBlur}
                      error={formik.touched.ice && Boolean(formik.errors.ice)}
                      helperText={formik.touched.ice && formik.errors.ice}
                    />
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Déposée le"
                      name="depositedDate"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.depositedDate}
                      onBlur={formik.handleBlur}
                      error={formik.touched.depositedDate && Boolean(formik.errors.depositedDate)}
                      helperText={formik.touched.depositedDate && formik.errors.depositedDate}
                    />
                    {/* <DatePicker
                      format="dd/MM/yyyy"
                      label="Déposée le"
                      onChange={(newDate) => formik.setFieldValue('depositedDate', newDate)}
                      value={formik.values.depositedDate}
                    /> */}
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Due le"
                      name="dueDate"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.dueDate}
                      onBlur={formik.handleBlur}
                      error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                      helperText={formik.touched.dueDate && formik.errors.dueDate}
                    />
                    {/* <DatePicker
                      format="dd/MM/yyyy"
                      label="Due le"
                      onChange={(newDate) => formik.setFieldValue('dueDate', newDate)}
                      value={formik.values.dueDate}
                    /> */}
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Montant"
                      name="amount"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.amount}
                      onBlur={formik.handleBlur}
                      error={formik.touched.amount && Boolean(formik.errors.amount)}
                      helperText={formik.touched.amount && formik.errors.amount}
                    />
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <Stack spacing={0}>
                    <TextField
                      fullWidth
                      label="Moyen de paiement"
                      name="method"
                      onChange={formik.handleChange}
                      value={formik.values.method}
                      select
                      onBlur={formik.handleBlur}
                      error={formik.touched.method && Boolean(formik.errors.method)}
                      helperText={formik.touched.method && formik.errors.method}
                    >
                      {PAYMENT_METHOD_OPTIONS.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                      {/* <MenuItem value="Cheque">Chèque</MenuItem>
                      <MenuItem value="Transfer">Virement</MenuItem>
                      <MenuItem value="Carte">Carte</MenuItem>
                      <MenuItem value="Cash">Espèce</MenuItem> */}
                    </TextField>
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <Stack spacing={0}>
                    <TextField
                      fullWidth
                      label="Statut"
                      name="status"
                      onChange={formik.handleChange}
                      value={formik.values.status}
                      select
                      onBlur={formik.handleBlur}
                      error={formik.touched.status && Boolean(formik.errors.status)}
                      helperText={formik.touched.status && formik.errors.status}
                    >
                      {statusData?.statusCollection?.edges?.map((edge: any) => (
                        <MenuItem
                          value={edge.node?.id ?? ''}
                          key={edge.node?.id ?? edge.node?.value}
                        >
                          {edge.node?.name ?? 'Statut'}
                        </MenuItem>
                      ))}
                      {/* <MenuItem value="paid">Reglé</MenuItem>
                      <MenuItem value="canceld">Non reglé</MenuItem>
                      <MenuItem value="pending">En cours</MenuItem> */}
                    </TextField>
                  </Stack>
                </Grid>

                <Grid
                  xs={12}
                  md={8}
                >
                  <Stack spacing={0}>
                    <Typography
                      sx={{ mb: 1 }}
                      variant="subtitle2"
                    >
                      Commentaire
                    </Typography>
                    <TextField
                      fullWidth
                      rows={4}
                      multiline
                      label="Commentaire"
                      name="commentaire"
                      onChange={formik.handleChange}
                      value={formik.values.commentaire}
                      onBlur={formik.handleBlur}
                      error={formik.touched.commentaire && Boolean(formik.errors.commentaire)}
                      helperText={formik.touched.commentaire && formik.errors.commentaire}
                    />
                    {/* <OutlinedInput
                      fullWidth
                      multiline
                      rows={6}
                      name="commentaire"
                      onChange={formik.handleChange}
                      value={formik.values.commentaire}
                      onBlur={formik.handleBlur}
                    /> */}
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <Stack spacing={1}>
                    <Typography variant="subtitle2">Fichier (PDF)</Typography>
                    {!formik.values.file ? (
                      <Button
                        variant="outlined"
                        component="label"
                      >
                        Sélectionner un fichier
                        <input
                          hidden
                          type="file"
                          name="file"
                          accept="application/pdf"
                          onChange={(event) => {
                            const file = event.currentTarget.files?.[0];
                            if (file) {
                              formik.setFieldValue('file', file);
                            }
                          }}
                        />
                      </Button>
                    ) : (
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                      >
                        <Typography variant="body2">{(formik.values.file as File).name}</Typography>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => formik.setFieldValue('file', null)}
                        >
                          Supprimer
                        </Button>
                      </Stack>
                    )}
                    {formik.touched.file && formik.errors.file && (
                      <Typography
                        variant="caption"
                        color="error"
                      >
                        {formik.errors.file}
                      </Typography>
                    )}
                    {/* <Button
                      variant="outlined"
                      component="label"
                    >
                      Sélectionner un fichier

                      <input
                        hidden
                        type="file"
                        name="file"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0];
                          formik.setFieldValue('file', file);
                        }}
                      />
                    </Button> */}
                  </Stack>
                </Grid>
                <Divider />
              </Grid>
            </CardContent>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="flex-end"
              spacing={1}
              m={3}
            >
              {/* <Button
                onClick={uploadDialog.handleOpen}
                startIcon={
                  <SvgIcon>
                    <Upload01Icon />
                  </SvgIcon>
                }
                color="secondary"
                variant="contained"
              >
                Télécharger
              </Button> */}

              <Button
                variant="contained"
                onClick={dialog.handleOpen}
              >
                Enregistrer
              </Button>
            </Stack>
          </Card>
        </Box>
      </Stack>
      {/* <FileUploader
        onClose={uploadDialog.handleClose}
        open={uploadDialog.open}
      /> */}

      <CreateConfirmation
        isOpen={dialog.open}
        onConfirm={formik.handleSubmit}
        onCancel={dialog.handleClose}
      />
    </form>
  );
};
export default SupplierCreateForm;
