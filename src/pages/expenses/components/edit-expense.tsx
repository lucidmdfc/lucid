import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Stack,
  SvgIcon,
  Switch,
  Typography,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useDialog } from 'src/hooks/use-dialog';
import Upload01 from '@untitled-ui/icons-react/build/esm/Upload01';
import FileUploader from 'src/pages/expenses/components/file-uploader';
import { SeverityPill } from 'src/components/severity-pill';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import { ExpenseDetails, expense, expenseDetails } from 'src/types/expense';
import { useGetEmployeesQuery, useGetProjectsQuery } from 'src/hooks/generatedHook';
import { ExpenseClaimFragmentFragment } from 'src/types/generatedTypes';

const validationSchema = Yup.object().shape({
  projectId: Yup.string().required('Nom projet est requis'),
  salaryId: Yup.string().required('Salarié est requis'),
  amount: Yup.number().required('Montant est requis').positive('Le montant doit être positif'),
});

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

const salaries: Option[] = [
  { text: 'salary 1', value: 1 },
  { text: 'salary 2', value: 2 },
  { text: 'salary 3', value: 3 },
  { text: 'salary 4', value: 4 },
  { text: 'salary 5', value: 5 },
];
interface types {
  expenseClaim: ExpenseClaimFragmentFragment;
}

const EditExpense: FC<types> = (expenseClaim) => {
  const router = useRouter();

  const [isSwitchOn, setSwitchOn] = useState(false);
  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchOn(event.target.checked);
  };
  console.log('expenseClaim', expenseClaim);

  const uploadDialog = useDialog();
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
    refetch: projectRefetch,
  } = useGetProjectsQuery();
  const {
    loading: employeesLoading,
    error: employeesError,
    data: employeesData,
    refetch: employeesRefetch,
  } = useGetEmployeesQuery();

  const mappedProjects = projectsData?.projectsCollection?.edges?.map((project) => ({
    text: project?.node?.name,
    value: project?.node?.id,
  }));
  console.log('mappedProjects', mappedProjects);
  const mappedSalaries = employeesData?.employeesCollection?.edges.map((employee) => ({
    text: `${employee.node.salaryName} `,
    value: employee.node.id,
  }));

  const formik = useFormik<ExpenseClaimFragmentFragment>({
    initialValues: {
      id: 0,
      project_id: 0,
      employee_id: 0,
      amount: 0,
      comment: '',
      startDate: new Date(),
      endDate: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      status_id: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: ExpenseClaimFragmentFragment, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log(values);

        toast.success('Nouveaux frais modifié avec succès !');
        router.replace(paths.dashboard.expenses.index);
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la modification des nouveaux frais!');
        console.error('Erreur lors de la modification des nouveaux frais!: ', error);
      } finally {
        // Set isSubmitting back to false after the submission is complete
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (expenseClaim) {
      formik.setValues({
        id: Number(expenseClaim?.expenseClaim?.id),
        project_id: Number(expenseClaim?.expenseClaim?.project_id),
        employee_id: expenseClaim?.expenseClaim?.employee_id,
        amount: expenseClaim?.expenseClaim?.amount,
        startDate: new Date(expenseClaim?.expenseClaim?.startDate),
        endDate: new Date(expenseClaim?.expenseClaim?.endDate),
        created_at: new Date(expenseClaim?.expenseClaim?.created_at),
        updated_at: new Date(expenseClaim?.expenseClaim?.updated_at),
        status_id: expenseClaim?.expenseClaim?.status_id,
      });
    }
  }, [expenseClaim]);

  const renderExpenseDetails = (detail: ExpenseDetails) => (
    <Grid
      item
      xs={12}
      md={12}
      container
      spacing={4}
      key={detail.value}
    >
      <Grid
        item
        xs={12}
        md={4}
      >
        <SeverityPill color="info">{detail.text}</SeverityPill>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
      >
        <TextField
          fullWidth
          label="Montant"
          name="amount"
          type="number"
          required
          size="small"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
      >
        <Button
          onClick={uploadDialog.handleOpen}
          startIcon={
            <SvgIcon>
              <Upload01 />
            </SvgIcon>
          }
          color="secondary"
          variant="contained"
        >
          Télécharger
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        <Box maxWidth="lg">
          <Card>
            <CardContent>
              <Grid
                container
                spacing={2}
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
                    value={formik.values.project_id}
                    onChange={formik.handleChange}
                    select
                    size="small"
                    error={formik.touched.project_id && Boolean(formik.errors.project_id)}
                    helperText={formik.touched.project_id && formik.errors.project_id}
                  >
                    <MenuItem value="">--</MenuItem>
                    {(mappedProjects ?? []).map((project) => (
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
                >
                  <TextField
                    fullWidth
                    label="Salarié"
                    name="salaryId"
                    value={formik.values.employee_id}
                    onChange={formik.handleChange}
                    select
                    size="small"
                    error={formik.touched.employee_id && Boolean(formik.errors.employee_id)}
                    helperText={formik.touched.employee_id && formik.errors.employee_id}
                  >
                    <MenuItem value="">--</MenuItem>
                    {(mappedSalaries ?? []).map((salary) => (
                      <MenuItem
                        value={salary.value}
                        key={salary.value}
                      >
                        {salary.text}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  container
                  spacing={2}
                >
                  <Grid
                    item
                    xs={12}
                    md={12}
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
                      error={formik.touched.amount && Boolean(formik.errors.amount)}
                      helperText={
                        formik.touched.amount && typeof formik.errors.amount === 'string'
                          ? formik.errors.amount
                          : ''
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                  >
                    <OutlinedInput
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Commentaire"
                      name="comment"
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={2}
                  >
                    <MobileDatePicker
                      label="Date"
                      onChange={(newDate) => formik.setFieldValue('startDate', newDate)}
                      value={formik.values.startDate}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={2}
                  >
                    <MobileDatePicker
                      label="Ajout date de fin"
                      onChange={(newDate) =>
                        formik.setFieldValue('endDate', isSwitchOn ? newDate : null)
                      }
                      value={formik.values.endDate}
                      disabled={!isSwitchOn}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={2}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isSwitchOn}
                          onChange={handleSwitchChange}
                          name="allDay"
                        />
                      }
                      label=""
                    />
                  </Grid>
                </Grid>

                {expenseDetails.map(renderExpenseDetails)}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
              >
                {/* <FormControlLabel
                  control={
                    <Switch
                      name="status"
                      checked={formik?.values.status_id}
                      onChange={(e) => {
                        formik?.setFieldValue('status', e.target.checked);
                      }}
                    />
                  }
                  label="Validié"
                /> */}
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                >
                  Enregistrer
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Stack>
      <FileUploader
        onClose={uploadDialog.handleClose}
        open={uploadDialog.open}
      />
    </form>
  );
};

export default EditExpense;
