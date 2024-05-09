import { Grid, MenuItem, Box, TextField, Button } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { Motif, cashOut } from 'src/types/cash-out';
import CreateConfirmation from './create-confirmation-modal';
import { useDialog } from 'src/hooks/use-dialog';

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

const motifs: Motif[] = [
  { text: 'Notes de frais', value: 1 },
  { text: 'Utilities', value: 2 },
  { text: 'suppliers & Prestataires', value: 3 },
];

const NewOutCash = () => {
  const dialog = useDialog();
  const formik = useFormik({
    initialValues: {
      id: '',
      projectId: '',
      amount: 0,
      motif: '',
      startDate: new Date(),
    },
    onSubmit: async (values: cashOut, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log(values);
        toast.success('la nouvelle sortie créé avec succès !');
        resetForm();
        dialog.handleClose();
      } catch (error) {
        toast.error('Erreur lors de la création du nouvelle sortie!');
        console.error('Erreur lors de la création du nouvelle sortie!: ', error);
      } finally {
        // Set isSubmitting back to false after the submission is complete
        setSubmitting(false);
      }
    },
  });
  return (
    <Box sx={{ p: 3 }}>
      <CreateConfirmation
        isOpen={dialog.open}
        onCancel={dialog.handleClose}
        onConfirm={formik.handleSubmit}
      />
      <form>
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Nom projet"
              name="projectId"
              value={formik.values.projectId}
              onChange={formik.handleChange}
              select
              size="small"
              error={formik.touched.projectId && Boolean(formik.errors.projectId)}
              helperText={formik.touched.projectId && formik.errors.projectId}
            >
              <MenuItem value="">--</MenuItem>
              {projects.map((project) => (
                <MenuItem
                  value={project.value}
                  key={project.value}
                >
                  {project.text}
                </MenuItem>
              ))}
              <MenuItem value={0}>autre</MenuItem>
            </TextField>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            container
          >
            <TextField
              fullWidth
              label="Montant"
              name="amount"
              type="number"
              required
              size="small"
              value={formik.values.amount}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
          >
            <TextField
              fullWidth
              label="Motif"
              name="motif"
              size="small"
              onChange={formik.handleChange}
              value={formik.values.motif}
              select
            >
              <MenuItem
                value=""
                disabled
              >
                --
              </MenuItem>
              {motifs?.map((motif) => (
                <MenuItem
                  value={motif.value}
                  key={motif.value}
                >
                  {motif.text}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
          >
            <MobileDatePicker
              label="Date"
              onChange={(newDate) => formik.setFieldValue('startDate', newDate)}
              value={formik.values.startDate}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            onClick={dialog.handleOpen}
            variant="contained"
          >
            Créer
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewOutCash;
