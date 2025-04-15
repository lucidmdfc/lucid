import type { NextPage } from 'next';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { useDialog } from 'src/hooks/use-dialog';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from 'src/graphql/entities/projects/queries';
import { GET_DONORS } from 'src/graphql/entities/donors/queries';
import { CREATE_GRANT_AGREEMENT } from 'src/graphql/entities/grantProjectAgreement/mutations';
import { CREATE_PROJECT } from 'src/graphql/entities/projects/mutations';
import { CREATE_DONOR } from 'src/graphql/entities/donors/mutations';
import toast from 'react-hot-toast';

const steps = ['Select Project', 'Select Donors', 'Agreement Details'];

const Page: NextPage = () => {
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
    refetch: projectRefetsh,
  } = useQuery(GET_PROJECTS);
  const {
    loading: donorsLoading,
    error: donorsError,
    data: donorsData,
    refetch: donorsRefetsh,
  } = useQuery(GET_DONORS);

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<{
    project: string;
    donors: { id: string; amount: number }[];
    agreementDate: string;
  }>({
    project: '',
    donors: [],
    agreementDate: '',
  });
  // console.log('FormData :', formData);

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
  const [CreateProject] = useMutation(CREATE_PROJECT);
  const [CreateDonor] = useMutation(CREATE_DONOR);

  const handleCreateProject = async () => {
    // setProjects([...projects, newProject.name]);
    console.log(newProject);
    try {
      const { data } = await CreateProject({
        variables: {
          name: newProject.name,
          description: newProject.description,
          start_date: newProject.start_date,
          end_date: newProject.end_date,
          project_budget: newProject.project_budget,
          contact_person_email: newProject.contact_person_email,
          contact_person_name: newProject.contact_person_name,
          status: newProject.status,
          note: newProject.note,
        },
      });
      console.log(data);
      toast.success('Nouveau projet créé avec succès !');
      setNewProject({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        project_budget: '',
        contact_person_email: '',
        contact_person_name: '',
        status: false,
        note: '',
      });
      projectRefetsh();
    } catch (error) {
      console.log('error', error);
      toast.error('Erreur lors de la création un nouveau projet!');
    }
    projectDialog.handleClose();
  };

  const handleCreateDonor = async () => {
    // setDonorsList([...donorsList, newDonor.name]);
    console.log(newDonor);
    try {
      const { data } = await CreateDonor({
        variables: {
          name: newDonor.name,
          email: newDonor.email,
          phone: newDonor.phone,
          note: newDonor.note,
        },
      });
      console.log(data);
      toast.success('Nouveau donateur créé avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la création un nouveau donateur!');
      // toast.error(error.message);
      console.log('error', error);
    }
    donorsRefetsh();
    setNewDonor({ name: '', email: '', phone: '', note: '' });
    donorDialog.handleClose();
  };

  const [CreateGrantAgreement] = useMutation(CREATE_GRANT_AGREEMENT);

  const handleSubmit = async () => {
    const donors = formData.donors;

    try {
      for (const donor of donors) {
        const { data } = await CreateGrantAgreement({
          variables: {
            donor_id: donor.id,
            project_id: formData.project,
            grant: donor.amount.toString(),
            agreement_date: formData.agreementDate,
          },
        });
        setFormData({
          project: '',
          donors: [],
          agreementDate: '',
        });
        setNewDonorId('');
        setActiveStep(0);
        toast.success('Nouveau grant créé avec succès !');
        // console.log('Created grant:', data);
        console.log(
          'Grants created successfully:',
          data?.insert_grant_project_agreement?.returning
        );
      }
    } catch (error) {
      console.error('Error creating grants:', error);
      toast.error('Erreur lors de la création un nouveau grant!');
    }
  };

  const projectDialog = useDialog();
  const donorDialog = useDialog();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Box
              display="flex"
              gap={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <TextField
                select
                fullWidth
                label="Select Project"
                name="project"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              >
                {projectsLoading && <MenuItem value="">Loading...</MenuItem>}
                {projectsData?.projectsCollection?.edges.map((project: any) => (
                  <MenuItem
                    key={project.node.id}
                    value={project.node.id}
                  >
                    {project.node.name}
                  </MenuItem>
                ))}
              </TextField>
              <Button onClick={() => projectDialog.handleOpen()}>+ Add</Button>
            </Box>

            <Dialog
              open={projectDialog.open}
              onClose={projectDialog.handleClose}
            >
              <DialogTitle>Add Project</DialogTitle>
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
                  onChange={(e) => setNewProject({ ...newProject, project_budget: e.target.value })}
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
              <DialogActions>
                <Button onClick={projectDialog.handleClose}>Cancel</Button>
                <Button onClick={handleCreateProject}>Add</Button>
              </DialogActions>
            </Dialog>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Box
              display="flex"
              gap={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <TextField
                select
                fullWidth
                label="Select Donor"
                value={newDonorId}
                onChange={(e) => setNewDonorId(e.target.value)}
              >
                {/* {donorsList.map((donor, i) => (
                  <MenuItem
                    key={i}
                    value={donor}
                  >
                    {donor}
                  </MenuItem>
                ))} */}
                {donorsData.donorsCollection?.edges.map((donor: any) => (
                  <MenuItem
                    key={donor.node.id}
                    value={donor.node.id}
                  >
                    {donor.node.name}
                  </MenuItem>
                ))}
              </TextField>
              <Button onClick={() => donorDialog.handleOpen()}>+ Add</Button>
            </Box>

            <TextField
              fullWidth
              label="Amount"
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
              Add Donor to List
            </Button>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Donors List:</Typography>
              {formData.donors.length === 0 ? <Typography>No donors added yet.</Typography> : null}
              {formData.donors.map((donor, i) => (
                <Typography key={i}>
                  {donor.id} - ${donor.amount}
                </Typography>
              ))}
            </Box>
            <Dialog
              open={donorDialog.open}
              onClose={donorDialog.handleClose}
            >
              <DialogTitle>Add Donor</DialogTitle>
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
              <DialogActions>
                <Button onClick={donorDialog.handleClose}>Cancel</Button>
                <Button onClick={handleCreateDonor}>Add</Button>
              </DialogActions>
            </Dialog>
          </Box>
        );

      case 2:
        return (
          <Box>
            <TextField
              fullWidth
              label="Agreement Date"
              type="date"
              value={formData.agreementDate}
              onChange={(e) => setFormData({ ...formData, agreementDate: e.target.value })}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />

            <Typography variant="h6">Summary:</Typography>
            <Typography>Project: {formData.project}</Typography>
            <Typography>Donors: {formData.donors.length}</Typography>
            <Typography>
              Agreement Date: {formData.agreementDate ? formData.agreementDate : 'Not Yet'}{' '}
            </Typography>
            {/* <Typography>Donors:</Typography>
            {formData.donors.map((d, i) => (
              <Typography key={i}>
                - {d.name}: ${d.amount}
              </Typography>
            ))} */}
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%', padding: '10px 22px' }}>
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

      <Box sx={{ mt: 4 }}>{renderStepContent(activeStep)}</Box>

      <Box
        display="flex"
        justifyContent="space-between"
        mt={4}
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
