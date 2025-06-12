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
import { Autocomplete, Divider, ListItemText, OutlinedInput, Select, SvgIcon } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useDialog } from 'src/hooks/use-dialog';
import { number } from 'prop-types';
import FileUploader from './file-uploader';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import CreateConfirmation from './create-modal-confirmation';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_SERVICE_PROVIDER } from 'src/graphql/entities/serviceProviders/mutations';
import { useGetProjectsQuery, useGetStatusQuery } from 'src/hooks/generatedHook';
import { PAYMENT_METHOD_OPTIONS } from 'src/graphql/shared/enums/paymentMethods';
import * as Yup from 'yup';
import { UPLOAD_FILE } from 'src/graphql/operations/mutations';
import { supabase } from 'src/libs/supabaseClient';
import { CREATE_PROVIDER_INVOICE } from 'src/graphql/entities/providerInvoices/mutations';
import { GET_SERVICE_PROVIDERS } from 'src/graphql/entities/serviceProviders/queries';
import { Add, Delete } from '@mui/icons-material';

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
  service_provider_id: Yup.number().typeError('Fournisseur requis').required('Fournisseur requis'),
  project_id: Yup.number().typeError('Projet requis').required('Projet requis'),
  invoice_number: Yup.string().required('Numéro de facture requis'),
  amount_ht: Yup.number().typeError('Montant HT invalide').required('Montant HT requis'),
  tax_rate: Yup.number()
    .typeError('Taux d’imposition invalide')
    .required('Taux d’imposition requis'),
  amount_ttc: Yup.number().typeError('Montant TTC invalide').required('Montant TTC requis'),
  currency: Yup.string().required('Devise requise'),
  issue_date: Yup.date().typeError('Date d’émission invalide').required('Date d’émission requise'),
  due_date: Yup.date().typeError('Date d’échéance invalide').nullable(),
  payment_date: Yup.date().typeError('Date de paiement invalide').nullable(),
  payment_method: Yup.string().required('Méthode de paiement requise'),
  status_id: Yup.number().typeError('Statut requis').required('Statut requis'),
  notes: Yup.string().nullable(),
  files: Yup.array().of(
    Yup.object().shape({
      file: Yup.mixed()
        .nullable()
        .test('fileType', 'Seuls les fichiers PDF sont autorisés', (value) => {
          if (!value) return true;
          if (value instanceof File) {
            return value.type === 'application/pdf';
          }
          return false;
        }),
      category: Yup.string().when('file', {
        is: (file: File) => !!file,
        then: (schema) => schema.required('Catégorie requise pour chaque fichier ajouté'),
        otherwise: (schema) => schema.notRequired(),
      }),
    })
  ),
});

const SupplierInvoiceCreateForm: FC = () => {
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
  const {
    loading: serviceProviderLoading,
    error: serviceProviderError,
    data: serviceProviderData,
    refetch: serviceProviderRefetch,
  } = useQuery(GET_SERVICE_PROVIDERS);

  const [createProviderInvoice, { data, loading, error }] = useMutation(CREATE_PROVIDER_INVOICE);
  const [uploadFile, { data: uploadFileData, loading: uploadFileLoading, error: uploadFileError }] =
    useMutation(UPLOAD_FILE);
  console.log(data);
  console.log('file data :', uploadFileData);
  console.log('file error :', uploadFileError);

  const formik = useFormik({
    initialValues: {
      service_provider_id: '',
      project_id: '',
      invoice_number: '',
      amount_ht: '',
      tax_rate: '',
      amount_ttc: '',
      currency: '',
      issue_date: '',
      due_date: '',
      payment_date: '',
      payment_method: '',
      status_id: '',
      notes: '',
      files: [] as { file: File; category: String }[],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log('values :', values);
        const { data } = await createProviderInvoice({
          variables: {
            service_provider_id: Number(values.service_provider_id),
            project_id: Number(values.project_id),
            invoice_number: values.invoice_number,
            amount_ht: String(values.amount_ht),
            tax_rate: String(values.tax_rate),
            amount_ttc: String(values.amount_ttc),
            currency: values.currency,
            issue_date: values.issue_date,
            due_date: values.due_date || null,
            payment_date: values.payment_date || null,
            payment_method: values.payment_method,
            status_id: Number(values.status_id),
            notes: values.notes || '',
          },
        });
        console.log(data);
        const provider_invoice_id = data?.insertIntoprovider_invoicesCollection?.records[0]?.id;
        console.log(provider_invoice_id);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        const accessToken = session?.access_token;

        // console.log(accessToken);
        if (provider_invoice_id && values.files?.length > 0) {
          for (const item of values.files) {
            if (item.file && item.category) {
              await uploadFile({
                variables: {
                  file: item.file,
                  documentCategory: 'provider_invoice_file',
                  provider_invoice_id: String(provider_invoice_id),
                  provider_invoice_file_category: item.category,
                },
                context: {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                },
              });
            }
          }
        }
        toast.success('La facture du prestataire a été créée avec succès !');
        dialog.handleClose();
        resetForm();
        router.push(paths.suppliers.search);
      } catch (error) {
        toast.error('Erreur lors de la création de la facture du prestataire !');
        console.error('Erreur lors de la création de la facture du prestataire !: ', error);
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
                      label="Projet"
                      name="project_id"
                      onChange={formik.handleChange}
                      value={formik.values.project_id}
                      select
                      onBlur={formik.handleBlur}
                      error={formik.touched.project_id && Boolean(formik.errors.project_id)}
                      helperText={formik.touched.project_id && formik.errors.project_id}
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
                      label="supplier"
                      name="service_provider_id"
                      onChange={formik.handleChange}
                      value={formik.values.service_provider_id}
                      select
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.service_provider_id &&
                        Boolean(formik.errors.service_provider_id)
                      }
                      helperText={
                        formik.touched.service_provider_id && formik.errors.service_provider_id
                      }
                    >
                      {/* <MenuItem value="">--</MenuItem> */}
                      {serviceProviderData?.service_providersCollection?.edges?.map(
                        (serviceProvider: any) => (
                          <MenuItem
                            value={serviceProvider?.node?.id}
                            key={serviceProvider?.node?.id}
                          >
                            {/* <ListItemText
                              primary={serviceProvider?.node?.name}
                              secondary={serviceProvider?.node?.ice}
                            /> */}
                            {serviceProvider?.node?.name}

                            {/* {serviceProvider?.node?.ice} */}
                          </MenuItem>
                        )
                      )}
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
                      label="Invoice Number"
                      name="invoice_number"
                      onChange={formik.handleChange}
                      value={formik.values.invoice_number}
                      onBlur={formik.handleBlur}
                      error={formik.touched.invoice_number && Boolean(formik.errors.invoice_number)}
                      helperText={formik.touched.invoice_number && formik.errors.invoice_number}
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
                      label="Amount HT"
                      name="amount_ht"
                      onChange={formik.handleChange}
                      value={formik.values.amount_ht}
                      onBlur={formik.handleBlur}
                      error={formik.touched.amount_ht && Boolean(formik.errors.amount_ht)}
                      helperText={formik.touched.amount_ht && formik.errors.amount_ht}
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
                      label="Tax Rate"
                      name="tax_rate"
                      onChange={formik.handleChange}
                      value={formik.values.tax_rate}
                      onBlur={formik.handleBlur}
                      error={formik.touched.tax_rate && Boolean(formik.errors.tax_rate)}
                      helperText={formik.touched.tax_rate && formik.errors.tax_rate}
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
                      label="Amount TTC"
                      name="amount_ttc"
                      onChange={formik.handleChange}
                      value={formik.values.amount_ttc}
                      onBlur={formik.handleBlur}
                      error={formik.touched.amount_ttc && Boolean(formik.errors.amount_ttc)}
                      helperText={formik.touched.amount_ttc && formik.errors.amount_ttc}
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
                      label="Currency"
                      name="currency"
                      onChange={formik.handleChange}
                      value={formik.values.currency}
                      onBlur={formik.handleBlur}
                      error={formik.touched.currency && Boolean(formik.errors.currency)}
                      helperText={formik.touched.currency && formik.errors.currency}
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
                      name="payment_method"
                      onChange={formik.handleChange}
                      value={formik.values.payment_method}
                      select
                      onBlur={formik.handleBlur}
                      error={formik.touched.payment_method && Boolean(formik.errors.payment_method)}
                      helperText={formik.touched.payment_method && formik.errors.payment_method}
                    >
                      {PAYMENT_METHOD_OPTIONS.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Grid>

                <Grid
                  xs={12}
                  md={6}
                >
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="date d'émission"
                      name="issue_date"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.issue_date}
                      onBlur={formik.handleBlur}
                      error={formik.touched.issue_date && Boolean(formik.errors.issue_date)}
                      helperText={formik.touched.issue_date && formik.errors.issue_date}
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
                      name="due_date"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.due_date}
                      onBlur={formik.handleBlur}
                      error={formik.touched.due_date && Boolean(formik.errors.due_date)}
                      helperText={formik.touched.due_date && formik.errors.due_date}
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
                      label="date de paiement"
                      name="payment_date"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.payment_date}
                      onBlur={formik.handleBlur}
                      error={formik.touched.payment_date && Boolean(formik.errors.payment_date)}
                      helperText={formik.touched.payment_date && formik.errors.payment_date}
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
                      label="Statut"
                      name="status_id"
                      onChange={formik.handleChange}
                      value={formik.values.status_id}
                      select
                      onBlur={formik.handleBlur}
                      error={formik.touched.status_id && Boolean(formik.errors.status_id)}
                      helperText={formik.touched.status_id && formik.errors.status_id}
                    >
                      {statusData?.statusCollection?.edges?.map((edge: any) => (
                        <MenuItem
                          value={edge.node?.id ?? ''}
                          key={edge.node?.id ?? edge.node?.value}
                        >
                          {edge.node?.name ?? 'Statut'}
                        </MenuItem>
                      ))}
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
                      name="notes"
                      onChange={formik.handleChange}
                      value={formik.values.notes}
                      onBlur={formik.handleBlur}
                      error={formik.touched.notes && Boolean(formik.errors.notes)}
                      helperText={formik.touched.notes && formik.errors.notes}
                    />
                  </Stack>
                </Grid>

                <Grid
                  xs={12}
                  md={12}
                >
                  <Stack spacing={1}>
                    <Typography variant="subtitle2">Fichiers (PDF)</Typography>
                    <Button
                      variant="outlined"
                      component="label"
                    >
                      Ajouter un fichier
                      <input
                        hidden
                        type="file"
                        multiple
                        accept="application/pdf"
                        onChange={(event) => {
                          const newFiles = Array.from(event.currentTarget.files || []);
                          if (newFiles.length > 0) {
                            // Add new files to the existing files array
                            const currentFiles = formik.values.files || [];
                            const updatedFiles = [
                              ...currentFiles,
                              ...newFiles.map((file) => ({ file, category: '' })),
                            ];
                            formik.setFieldValue('files', updatedFiles);
                          }
                        }}
                      />
                    </Button>
                    {formik.values.files?.length > 0 && (
                      <Stack
                        spacing={2}
                        sx={{ mt: 2 }}
                      >
                        {formik.values.files.map((fileItem, index) => {
                          const fileError =
                            Array.isArray(formik.errors.files) &&
                            formik.errors.files[index] &&
                            typeof formik.errors.files[index] === 'object'
                              ? (formik.errors.files[index] as { category?: string; file?: string })
                              : {};

                          return (
                            <Stack
                              key={index}
                              direction="column"
                              spacing={1}
                            >
                              <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                              >
                                <Typography variant="body2">{fileItem.file.name}</Typography>

                                <Select
                                  value={fileItem.category}
                                  onChange={(e) => {
                                    const updatedFiles = [...formik.values.files];
                                    updatedFiles[index].category = e.target.value;
                                    formik.setFieldValue('files', updatedFiles);
                                  }}
                                  displayEmpty
                                  size="small"
                                  error={!!fileError?.category}
                                >
                                  <MenuItem
                                    value=""
                                    disabled
                                  >
                                    Sélectionner une catégorie
                                  </MenuItem>
                                  <MenuItem value="invoice">Facture</MenuItem>
                                  <MenuItem value="cheque">Chèque</MenuItem>
                                </Select>

                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={() => {
                                    const updatedFiles = formik.values.files.filter(
                                      (_, i) => i !== index
                                    );
                                    formik.setFieldValue('files', updatedFiles);
                                  }}
                                >
                                  Supprimer
                                </Button>
                              </Stack>

                              {fileError?.category && (
                                <Typography
                                  variant="caption"
                                  color="error"
                                  sx={{ ml: 2 }}
                                >
                                  {fileError.category}
                                </Typography>
                              )}
                              {fileError?.file && (
                                <Typography
                                  variant="caption"
                                  color="error"
                                  sx={{ ml: 2 }}
                                >
                                  {fileError.file}
                                </Typography>
                              )}
                            </Stack>
                          );
                        })}
                      </Stack>
                    )}
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
export default SupplierInvoiceCreateForm;
