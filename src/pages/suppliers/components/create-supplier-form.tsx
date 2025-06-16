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
import LoadingBackdrop from 'src/components/loadingBackdrop';

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
  nom: Yup.string().required('Le nom est requis'),
  ice: Yup.string()
    .required('ICE est requis')
    .max(15, 'ICE doit contenir au maximum 15 caractères'),
  phone: Yup.string()
    .required('Le numéro de téléphone est requis')
    .matches(/^[0-9+\-() ]{6,20}$/, 'Numéro de téléphone invalide'),
  email: Yup.string().email('Email invalide').optional(),
  address: Yup.string().optional(),
  contact_person: Yup.string().optional(),
});

const SupplierCreateForm: FC = () => {
  const dialog = useDialog();
  const uploadDialog = useDialog();
  const router = useRouter();

  const [createServiceProvider, { data, loading, error }] = useMutation(CREATE_SERVICE_PROVIDER);

  const formik = useFormik({
    initialValues: {
      nom: '',
      ice: '',
      address: '',
      phone: '',
      email: '',
      contact_person: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log(values);
        const { data } = await createServiceProvider({
          variables: {
            name: values.nom,
            ice: values.ice,
            email: values.email,
            phone: values.phone,
            contact_person: values.contact_person,
            address: values.address,
          },
        });
        toast.success('le prestataire créé avec succès !');
        dialog.handleClose();
        resetForm();
        router.push(paths.suppliers.search);
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
                  md={12}
                >
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                      onBlur={formik.handleBlur}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone}
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
                      label="Contact Person"
                      name="contact_person"
                      onChange={formik.handleChange}
                      value={formik.values.contact_person}
                      onBlur={formik.handleBlur}
                      error={formik.touched.contact_person && Boolean(formik.errors.contact_person)}
                      helperText={formik.touched.contact_person && formik.errors.contact_person}
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
                      label="Email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
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
                      label="Address"
                      name="address"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                      onBlur={formik.handleBlur}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                    />
                  </Stack>
                </Grid>
                {/* <Grid
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
                    </Button> 
                  </Stack>
                </Grid> */}
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
      <LoadingBackdrop open={loading} />
      {!loading && (
        <CreateConfirmation
          isOpen={dialog.open}
          onConfirm={formik.handleSubmit}
          onCancel={dialog.handleClose}
        />
      )}
    </form>
  );
};
export default SupplierCreateForm;
