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

const steps = ['Select Project', 'Add Donors', 'Agreement Details'];

const Page: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<{
    project: string;
    donors: { name: string; amount: number }[];
    agreementDate: string;
    grantAmount: string;
  }>({
    project: '',
    donors: [],
    agreementDate: '',
    grantAmount: '',
  });

  const [projects, setProjects] = useState(['Project A', 'Project B']);
  const [donorsList, setDonorsList] = useState(['Donor X', 'Donor Y']);

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    project_budget: '',
    total_slice_amount: '',
    contact_person_email: '',
    contact_person_name: '',
    status: false,
  });

  const [newDonorName, setNewDonorName] = useState('');
  const [newDonorAmount, setNewDonorAmount] = useState('');

  const [newDonor, setNewDonor] = useState({
    name: '',
    email: '',
    phone: '',
    note: '',
    amount: '',
  });

  const handleCreateProject = () => {
    setProjects([...projects, newProject.name]);
    console.log(newProject);
    setNewProject({
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      project_budget: '',
      total_slice_amount: '',
      contact_person_email: '',
      contact_person_name: '',
      status: false,
    });
    projectDialog.handleClose();
  };
  const handleCreateDonor = () => {
    setDonorsList([...donorsList, newDonor.name]);
    console.log(newDonor);
    setNewDonor({ name: '', email: '', phone: '', note: '', amount: '' });
    donorDialog.handleClose();
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
                {projects.map((project, i) => (
                  <MenuItem
                    key={i}
                    value={project}
                  >
                    {project}
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
                  label="Total Slice Amount"
                  type="number"
                  value={newProject.total_slice_amount}
                  onChange={(e) =>
                    setNewProject({ ...newProject, total_slice_amount: e.target.value })
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
                value={newDonorName}
                onChange={(e) => setNewDonorName(e.target.value)}
              >
                {donorsList.map((donor, i) => (
                  <MenuItem
                    key={i}
                    value={donor}
                  >
                    {donor}
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
                if (newDonorName && newDonorAmount) {
                  setFormData({
                    ...formData,
                    donors: [
                      ...formData.donors,
                      { name: newDonorName, amount: parseFloat(newDonorAmount) },
                    ],
                  });
                  setNewDonorName('');
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
                  {donor.name} - ${donor.amount}
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

            <TextField
              fullWidth
              label="Grant Amount"
              type="number"
              value={formData.grantAmount}
              onChange={(e) => setFormData({ ...formData, grantAmount: e.target.value })}
              sx={{ mb: 2 }}
            />

            <Typography variant="h6">Summary:</Typography>
            <Typography>Project: {formData.project}</Typography>
            <Typography>Donors: {formData.donors.length}</Typography>
            <Typography>
              Agreement Date: {formData.agreementDate ? formData.agreementDate : 'Not Yet'}{' '}
            </Typography>
            <Typography>
              Grant Amount: {formData.grantAmount ? formData.grantAmount : 'Not Yet'}{' '}
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
            onClick={() => console.log('Submitting', formData)}
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
