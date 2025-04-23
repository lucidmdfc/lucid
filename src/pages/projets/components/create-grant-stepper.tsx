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

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    project_budget: '',
    contact_person_email: '',
    contact_person_name: '',
    note: '',
    status: false,
  });

  const [newDonorId, setNewDonorId] = useState('');
  const [newDonorAmount, setNewDonorAmount] = useState('');
  const [newDonor, setNewDonor] = useState({
    name: '',
    email: '',
    phone: '',
    note: '',
  });

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
                    label="Name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={2}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={newProject.start_date}
                    onChange={(e) => setNewProject({ ...newProject, start_date: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={newProject.end_date}
                    onChange={(e) => setNewProject({ ...newProject, end_date: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Project Budget"
                    type="number"
                    value={newProject.project_budget}
                    onChange={(e) =>
                      setNewProject({ ...newProject, project_budget: e.target.value })
                    }
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Contact Person Email"
                    value={newProject.contact_person_email}
                    onChange={(e) =>
                      setNewProject({ ...newProject, contact_person_email: e.target.value })
                    }
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Contact Person Name"
                    value={newProject.contact_person_name}
                    onChange={(e) =>
                      setNewProject({ ...newProject, contact_person_name: e.target.value })
                    }
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Note"
                    value={newProject.note}
                    onChange={(e) => setNewProject({ ...newProject, note: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Status"
                    select
                    value={newProject.status.toString()}
                    onChange={(e) =>
                      setNewProject({ ...newProject, status: e.target.value === 'true' })
                    }
                    sx={{ mt: 2 }}
                  >
                    <MenuItem value="true">Active</MenuItem>
                    <MenuItem value="false">Inactive</MenuItem>
                  </TextField>
                </DialogContent>
              </DialogContent>
              <DialogActions>
                <Button onClick={projectDialog.handleClose}>Cancel</Button>
                <Button
                  onClick={async () => {
                    await handleCreateProject(newProject);
                    setNewProject({
                      name: '',
                      description: '',
                      start_date: '',
                      end_date: '',
                      project_budget: '',
                      contact_person_email: '',
                      contact_person_name: '',
                      note: '',
                      status: false,
                    });
                    projectRefetch();
                    projectDialog.handleClose();
                  }}
                >
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        );

      /* ----------------------- 1 — Select donors --------------------------- */
      case 1:
        return (
          <Box>
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
              {formData.donors.map((d, i) => (
                <Typography key={i}>
                  {d.id} – ${d.amount}
                </Typography>
              ))}
            </Box>

            {/* ---- Add‑donor dialog ---- */}
            <Dialog
              open={donorDialog.open}
              onClose={donorDialog.handleClose}
            >
              <DialogTitle>Ajouter un bailleur</DialogTitle>
              <DialogContent>
                <DialogContent>
                  <TextField
                    fullWidth
                    label="Name"
                    value={newDonor.name}
                    onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={newDonor.email}
                    onChange={(e) => setNewDonor({ ...newDonor, email: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    value={newDonor.phone}
                    onChange={(e) => setNewDonor({ ...newDonor, phone: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Note"
                    value={newDonor.note}
                    onChange={(e) => setNewDonor({ ...newDonor, note: e.target.value })}
                    sx={{ mt: 2 }}
                  />
                </DialogContent>
              </DialogContent>
              <DialogActions>
                <Button onClick={donorDialog.handleClose}>Annuler</Button>
                <Button
                  onClick={async () => {
                    await handleCreateDonor(newDonor);
                    setNewDonor({ name: '', email: '', phone: '', note: '' });
                    donorsRefetch();
                    donorDialog.handleClose();
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
