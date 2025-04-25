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

interface DonorEntry {
  id: string;
  amount: number;
}

interface StepperProps {
  projectsLoading: boolean;
  projectsData: any;
  projectRefetch: () => void;
  donorsData: any;
  donorsRefetch: () => void;
  handleCreateProject: (project: any) => Promise<void>;
  handleCreateDonor: (donor: any) => Promise<void>;
  handleSubmit: (formData: FormDataState) => Promise<void>;
}

interface FormDataState {
  project: string;
  donors: DonorEntry[];
  agreementDate: string;
}

const steps = ['Sélectionner le projet', 'Sélectionner les bailleurs', 'Détails de l’accord'];
// Validation schemas
const projectValidationSchema = Yup.object({
  name: Yup.string().required('Le nom du projet est requis'),
  description: Yup.string().required('La description est requise'),
  start_date: Yup.date().required('La date de début est requise'),
  end_date: Yup.date()
    .required('La date de fin est requise')
    .min(Yup.ref('start_date'), 'La date de fin doit être après la date de début'),
  project_budget: Yup.number()
    .typeError('Le budget doit être un nombre')
    .required('Le budget est requis')
    .positive('Le budget doit être positif'),
  contact_person_email: Yup.string()
    .email('Email invalide')
    .required("L'email de contact est requis"),
  contact_person_name: Yup.string().required('Le nom de contact est requis'),
});
const donorValidationSchema = Yup.object({
  name: Yup.string().required('Le nom du bailleur est requis'),
  email: Yup.string().email('Email invalide').required("L'email est requis"),
  phone: Yup.string().required('Le téléphone est requis'),
});

const GrantAgreementStepper: React.FC<StepperProps> = ({
  projectsLoading,
  projectsData,
  projectRefetch,
  donorsData,
  donorsRefetch,
  handleCreateProject,
  handleCreateDonor,
  handleSubmit,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormDataState>({
    project: '',
    donors: [],
    agreementDate: '',
  });

  const projectFormik = useFormik({
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
    validationSchema: projectValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        console.log('values', values);
        await handleCreateProject(values);
        resetForm();
        projectRefetch();
        projectDialog.handleClose();
      } catch (error) {
        console.error('Erreur lors de la création du projet!: ', error);
      }
    },
  });
  // Donor form handling with Formik
  const donorFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      note: '',
    },
    validationSchema: donorValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await handleCreateDonor(values);
        resetForm();
        donorsRefetch();
        donorDialog.handleClose();
      } catch (error) {
        console.error('Erreur lors de la création du bailleur!: ', error);
      }
    },
  });
  const [newDonorId, setNewDonorId] = useState('');
  const [newDonorAmount, setNewDonorAmount] = useState('');

  const projectDialog = useDialog();
  const donorDialog = useDialog();

  // ----- internal helpers ---------------------------------------------------

  const next = () => setActiveStep((s) => s + 1);
  const back = () => setActiveStep((s) => s - 1);

  const submitStepper = async () => {
    await handleSubmit(formData);
    // reset on success
    setFormData({ project: '', donors: [], agreementDate: '' });
    setNewDonorId('');
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
                select
                fullWidth
                label="Sélectionner un projet"
                name="project"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
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

              <IconButton onClick={projectDialog.handleOpen}>
                <SvgIcon>
                  <PlusIcon />
                </SvgIcon>
              </IconButton>
            </Box>

            {/* ---- Add‑project dialog ---- */}
            <Dialog
              open={projectDialog.open}
              onClose={projectDialog.handleClose}
            >
              <DialogTitle>Ajouter un projet</DialogTitle>
              <DialogContent>
                <DialogContent>
                  <TextField
                    fullWidth
                    label="Nom"
                    name="name"
                    value={projectFormik.values.name}
                    onChange={projectFormik.handleChange}
                    onBlur={projectFormik.handleBlur}
                    error={projectFormik.touched.name && Boolean(projectFormik.errors.name)}
                    helperText={projectFormik.touched.name && projectFormik.errors.name}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={2}
                    value={projectFormik.values.description}
                    onChange={projectFormik.handleChange}
                    onBlur={projectFormik.handleBlur}
                    error={
                      projectFormik.touched.description && Boolean(projectFormik.errors.description)
                    }
                    helperText={
                      projectFormik.touched.description && projectFormik.errors.description
                    }
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Date de début"
                    type="date"
                    name="start_date"
                    InputLabelProps={{ shrink: true }}
                    value={projectFormik.values.start_date}
                    onChange={projectFormik.handleChange}
                    onBlur={projectFormik.handleBlur}
                    error={
                      projectFormik.touched.start_date && Boolean(projectFormik.errors.start_date)
                    }
                    helperText={projectFormik.touched.start_date && projectFormik.errors.start_date}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Date de fin"
                    name="end_date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={projectFormik.values.end_date}
                    onChange={projectFormik.handleChange}
                    onBlur={projectFormik.handleBlur}
                    error={projectFormik.touched.end_date && Boolean(projectFormik.errors.end_date)}
                    helperText={projectFormik.touched.end_date && projectFormik.errors.end_date}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Budget du projet"
                    name="project_budget"
                    type="number"
                    value={projectFormik.values.project_budget}
                    onChange={projectFormik.handleChange}
                    onBlur={projectFormik.handleBlur}
                    error={
                      projectFormik.touched.project_budget &&
                      Boolean(projectFormik.errors.project_budget)
                    }
                    helperText={
                      projectFormik.touched.project_budget && projectFormik.errors.project_budget
                    }
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Contact Person Email"
                    name="contact_person_email"
                    value={projectFormik.values.contact_person_email}
                    onChange={projectFormik.handleChange}
                    onBlur={projectFormik.handleBlur}
                    error={
                      projectFormik.touched.contact_person_email &&
                      Boolean(projectFormik.errors.contact_person_email)
                    }
                    helperText={
                      projectFormik.touched.contact_person_email &&
                      projectFormik.errors.contact_person_email
                    }
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Contact Person Name"
                    name="contact_person_name"
                    value={projectFormik.values.contact_person_name}
                    onChange={projectFormik.handleChange}
                    onBlur={projectFormik.handleBlur}
                    error={
                      projectFormik.touched.contact_person_name &&
                      Boolean(projectFormik.errors.contact_person_name)
                    }
                    helperText={
                      projectFormik.touched.contact_person_name &&
                      projectFormik.errors.contact_person_name
                    }
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Note"
                    name="note"
                    value={projectFormik.values.note}
                    onChange={projectFormik.handleChange}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Status"
                    name="status"
                    select
                    value={projectFormik.values.status.toString()}
                    onChange={(e) => {
                      projectFormik.setFieldValue('status', e.target.value === 'true');
                    }}
                    sx={{ mt: 2 }}
                  >
                    <MenuItem value="true">Active</MenuItem>
                    <MenuItem value="false">Inactive</MenuItem>
                  </TextField>
                </DialogContent>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    projectDialog.handleClose;
                    projectFormik.resetForm();
                  }}
                >
                  Annuler
                </Button>
                <Button onClick={() => projectFormik.handleSubmit()}>Ajouter</Button>
              </DialogActions>
            </Dialog>
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
                select
                fullWidth
                label="Sélectionner un bailleur"
                value={newDonorId}
                onChange={(e) => setNewDonorId(e.target.value)}
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

              <IconButton onClick={donorDialog.handleOpen}>
                <SvgIcon>
                  <PlusIcon />
                </SvgIcon>
              </IconButton>
            </Box>

            <TextField
              fullWidth
              label="Montant"
              type="number"
              value={newDonorAmount}
              onChange={(e) => setNewDonorAmount(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              variant="outlined"
              onClick={() => {
                if (newDonorId && newDonorAmount) {
                  setFormData({
                    ...formData,
                    donors: [
                      ...formData.donors,
                      { id: newDonorId, amount: parseFloat(newDonorAmount) },
                    ],
                  });
                  setNewDonorId('');
                  setNewDonorAmount('');
                }
              }}
            >
              Ajouter un bailleur à la liste
            </Button>

            {/* donor list */}
            <Box mt={2}>
              <Typography variant="h6">Liste des bailleurs:</Typography>
              {formData.donors.length === 0 && (
                <Typography>Aucun bailleur ajouté pour le moment.</Typography>
              )}
              {formData.donors.map((d, i) => {
                const donorInfo = donorsData?.donorsCollection?.edges.find(
                  (edge: any) => edge.node.id === d.id
                );

                return (
                  <Typography
                    key={i}
                    sx={{ padding: '8px 0' }}
                  >
                    {donorInfo?.node.name ?? 'Unknown Donor'} – {d.amount} MAD
                  </Typography>
                );
              })}
            </Box>

            {/* ---- Add‑donor dialog ---- */}
            <Dialog
              open={donorDialog.open}
              onClose={donorDialog.handleClose}
            >
              <DialogTitle>Ajouter un bailleur</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={donorFormik.values.name}
                  onChange={donorFormik.handleChange}
                  onBlur={donorFormik.handleBlur}
                  error={donorFormik.touched.name && Boolean(donorFormik.errors.name)}
                  helperText={donorFormik.touched.name && donorFormik.errors.name}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={donorFormik.values.email}
                  onChange={donorFormik.handleChange}
                  onBlur={donorFormik.handleBlur}
                  error={donorFormik.touched.email && Boolean(donorFormik.errors.email)}
                  helperText={donorFormik.touched.email && donorFormik.errors.email}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={donorFormik.values.phone}
                  onChange={donorFormik.handleChange}
                  onBlur={donorFormik.handleBlur}
                  error={donorFormik.touched.phone && Boolean(donorFormik.errors.phone)}
                  helperText={donorFormik.touched.phone && donorFormik.errors.phone}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Note"
                  name="note"
                  value={donorFormik.values.note}
                  onChange={donorFormik.handleChange}
                  sx={{ mt: 2 }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={donorDialog.handleClose}>Annuler</Button>
                <Button
                  onClick={() => {
                    donorFormik.handleSubmit();
                  }}
                >
                  Ajouter
                </Button>
              </DialogActions>
            </Dialog>
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
              value={formData.agreementDate}
              onChange={(e) => setFormData({ ...formData, agreementDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6">Résumé :</Typography>
            <Typography>Projet: {formData.project}</Typography>
            <Typography>Bailleur: {formData.donors.length}</Typography>
            <Typography>Date de l'accord: {formData.agreementDate || 'Pas encore'}</Typography>
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
          Dos
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={submitStepper}
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
      </Box>
    </Box>
  );
};
export default GrantAgreementStepper;
