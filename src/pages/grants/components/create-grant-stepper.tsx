import React, { useState } from 'react';
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  SvgIcon,
  MenuItem,
} from '@mui/material';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { useDialog } from 'src/hooks/use-dialog';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateGrantAgreementMutation } from 'src/hooks/generatedHook';
import toast from 'react-hot-toast';
import { supabase } from 'src/libs/supabaseClient';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import { useMutation } from '@apollo/client';
import { UPLOAD_FILE } from 'src/graphql/operations/mutations';
import { Stack } from '@mui/system';
import LoadingBackdrop from 'src/components/loadingBackdrop';

interface DonorEntry {
  id: string;
  amount: number;
}

interface StepperProps {
  projectsLoading: boolean;
  projectsData: any;
  donorsData: any;
  handleSubmit: (formData: FormDataState) => Promise<void>;
}

interface FormDataState {
  project: string;
  donor: string;
  grant: string;
  agreementDate: string;
}

const steps = ['Sélectionner le projet', 'Sélectionner les bailleurs', 'Détails de l’accord'];
// Validation schemas
const validationSchema = Yup.object().shape({
  donor: Yup.string().required(),
  grant: Yup.number().positive().required(),
  project: Yup.string().required(),
  agreementDate: Yup.date().required('La date de l’accord est requise'),
  file: Yup.mixed()
    .required('Le fichier est requis')
    .test(
      'fileType',
      'Seul les fichiers PDF sont autorisés',
      (value) => !value || (value && (value as File).type === 'application/pdf')
    ),
});

const GrantAgreementStepper: React.FC<StepperProps> = ({
  projectsLoading,
  projectsData,
  donorsData,
  handleSubmit,
}) => {
  const dialog = useDialog();
  const router = useRouter();

  const [CreateGrantAgreement] = useCreateGrantAgreementMutation();
  const [uploadFile, { data: uploadFileData, loading: uploadFileLoading, error: uploadFileError }] =
    useMutation(UPLOAD_FILE);

  const [globalLoading, setGlobalLoading] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const formik = useFormik({
    initialValues: {
      project: '',
      donor: '',
      grant: '',
      agreementDate: '',
      file: null as File | null, // one file for the entire agreement
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log('values :', values);
        setGlobalLoading(true);
        const { data: grantData } = await CreateGrantAgreement({
          variables: {
            donor_id: Number(values.donor),
            project_id: Number(values?.project),
            grant: values.grant.toString(),
            agreement_date: values?.agreementDate,
          },
        });
        console.log(grantData);
        const grant_id = grantData?.insertIntogrant_project_agreementCollection?.records[0].id;
        console.log(grant_id);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        const accessToken = session?.access_token;


        if (values.file) {
          await uploadFile({
            variables: {
              file: values.file,
              documentCategory: 'grant_agreements',
              grant_id: String(grant_id),
            },
            context: {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          });
        }

        setGlobalLoading(false);

        toast.success('La facture du prestataire a été créée avec succès !');
        dialog.handleClose();
        resetForm();
        router.push(paths.grants.index);
      } catch (error) {
        toast.error('Erreur lors de la création de la facture du prestataire !');
        console.error('Erreur lors de la création de la facture du prestataire !: ', error);
      } finally {
        // Set isSubmitting back to false after the submission is complete
        setGlobalLoading(false);
        setSubmitting(false);
      }
    },
  });

  const [formData, setFormData] = useState<FormDataState>({
    project: '',
    donor: '',
    grant: '',
    agreementDate: '',
  });

  // ----- internal helpers ---------------------------------------------------

  const next = () => setActiveStep((s) => s + 1);
  const back = () => setActiveStep((s) => s - 1);

  const submitStepper = async () => {
    await handleSubmit(formData);
    // reset on success
    setFormData({ project: '', donor: '', grant: '', agreementDate: '' });
    setActiveStep(0);
  };

  // ----- Step content -------------------------------------------------------

  const renderStepContent = (step: number) => {
    switch (step) {
      /* ----------------------- 0 — Select project -------------------------- */
      case 0:
        return (
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              paddingBottom={1}
            >
              Sélectionnez un projet
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="text.secondary"
              gutterBottom
              paddingBottom={2}
            >
              Commencez par effectuer une recherche ou créez un nouveau projet directement ici.
            </Typography>
            <Box
              display="flex"
              gap={2}
              alignItems="center"
              mb={2}
            >
              <TextField
                fullWidth
                label="Sélectionner un projet"
                name="project"
                onChange={formik.handleChange}
                value={formik.values.project}
                select
                onBlur={formik.handleBlur}
                error={formik.touched.project && Boolean(formik.errors.project)}
                helperText={formik.touched.project && formik.errors.project}
              >
                {projectsLoading && <MenuItem value="">Loading…</MenuItem>}
                {projectsData?.projectsCollection?.edges.map((p: any) => (
                  <MenuItem
                    key={p.node.id}
                    value={p.node.id}
                  >
                    {p.node.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        );

      /* ----------------------- 1 — Select donors --------------------------- */
      case 1:
        return (
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              paddingBottom={1}
            >
              Bailleurs et contributions
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="text.secondary"
              gutterBottom
              paddingBottom={2}
            >
              Sélectionnez les bailleurs et précisez leurs contributions.
            </Typography>

            <Box
              display="flex"
              gap={2}
              alignItems="center"
              mb={2}
            >
              <TextField
                fullWidth
                label="Sélectionner un bailleur"
                name="donor"
                onChange={formik.handleChange}
                value={formik.values.donor}
                select
                onBlur={formik.handleBlur}
                error={formik.touched.donor && Boolean(formik.errors.donor)}
                helperText={formik.touched.donor && formik.errors.donor}
              >
                {donorsData.donorsCollection?.edges.map((d: any) => (
                  <MenuItem
                    key={d.node.id}
                    value={d.node.id}
                  >
                    {d.node.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <TextField
              fullWidth
              label="Montant"
              name="grant"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.grant}
              onBlur={formik.handleBlur}
              error={formik.touched.grant && Boolean(formik.errors.grant)}
              helperText={formik.touched.grant && formik.errors.grant}
            />
          </Box>
        );

      /* --------------------- 2 — Agreement details ------------------------- */
      case 2:
        return (
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              paddingBottom={1}
            >
              Détails de la subvention
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="text.secondary"
              gutterBottom
              paddingBottom={2}
            >
              Finalisez les détails de la subvention avant la soumission.
            </Typography>
            <TextField
              fullWidth
              label="Date de l'accord"
              type="date"
              name="agreementDate"
              onChange={formik.handleChange}
              value={formik.values.agreementDate}
              onBlur={formik.handleBlur}
              error={formik.touched.agreementDate && Boolean(formik.errors.agreementDate)}
              helperText={formik.touched.agreementDate && formik.errors.agreementDate}
            />
            <Stack
              spacing={1}
              mt={2}
            >
              <Typography variant="subtitle2">Fichiers (PDF)</Typography>
              <Button
                variant="outlined"
                component="label"
              >
                Ajouter un fichier
                <input
                  hidden
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0] ?? null;
                    formik.setFieldValue('file', file);
                  }}
                />
              </Button>
            </Stack>
            {formik.values.file && (
              <Box mt={2}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Typography variant="body2">{formik.values.file.name}</Typography>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => formik.setFieldValue('file', null)}
                  >
                    Supprimer
                  </Button>
                </Stack>
              </Box>
            )}
            {formik.touched.file && formik.errors.file && (
              <Typography color="error">{formik.errors.file}</Typography>
            )}
            {/* <Typography variant="h6">Résumé :</Typography>
            <Typography>Projet: {formData.project}</Typography>
            <Typography>Bailleur: {formData.donor}</Typography>
            <Typography>Date de l'accord: {formData.agreementDate || 'Pas encore'}</Typography> */}
          </Box>
        );

      default:
        return 'Étape inconnue';
    }
  };

  /* ----------------------------------------------------------------------- */

  return (
    <Box width="100%">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ paddingBottom: '40px' }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>{renderStepContent(activeStep)}</Box>

      <Box
        display="flex"
        justifyContent="space-between"
        mt={4}
      >
        <Button
          disabled={activeStep === 0}
          onClick={back}
        >
          Retour
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={() => formik.handleSubmit()}
          >
            Soumettre
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={next}
          >
            Suivant
          </Button>
        )}
        <LoadingBackdrop open={globalLoading} />
      </Box>
    </Box>
  );
};
export default GrantAgreementStepper;
