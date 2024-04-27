import { useState, type FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Chip, Grid, IconButton, SvgIcon } from '@mui/material';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Project } from 'src/types/project';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import UpdateConfirmationModal from './update-confirmation-modal';
import toast from 'react-hot-toast';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';
import { useDialog } from 'src/hooks/use-dialog';

interface EditProjectProps {
  project: Project;
}

const EditProject: FC<EditProjectProps> = (props) => {
  const { project } = props;
  const router = useRouter();
  const [financialBackersInput, setFinancialBackersInput] = useState<string>('');
  const [financialBackersList, setFinancialBackersList] = useState<string[]>(
    project.financial_backer
  );
  const [beneficiaryInput, setBeneficiaryInput] = useState<string>('');
  const [beneficiaryList, setBeneficiaryList] = useState<string[]>(project.beneficiaries);
  const dialog = useDialog();

  const handleFinancialBackersInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinancialBackersInput(event.target.value);
  };

  const handleAddFinancialBacker = () => {
    if (financialBackersInput.trim() !== '') {
      setFinancialBackersList([...financialBackersList, financialBackersInput.trim()]);
      setFinancialBackersInput('');
    }
  };

  const handleDeleteFinancialBacker = (index: number) => {
    const updatedList = [...financialBackersList];
    updatedList.splice(index, 1);
    setFinancialBackersList(updatedList);
  };

  const handleBeneficiaryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeneficiaryInput(event.target.value);
  };

  const handleAddBeneficiary = () => {
    if (beneficiaryInput.trim() !== '') {
      setBeneficiaryList([...beneficiaryList, beneficiaryInput.trim()]);
      setBeneficiaryInput('');
    }
  };

  const handleDeleteBeneficiary = (index: number) => {
    const updatedList = [...beneficiaryList];
    updatedList.splice(index, 1);
    setBeneficiaryList(updatedList);
  };

  const { values, handleChange, handleSubmit, setFieldValue, touched, errors } = useFormik({
    initialValues: {
      id: '', // Add id field to store the project ID
      project_name: '',
      email: '',
      amount: 0,
      beneficiaries: beneficiaryList,
      financial_backer: financialBackersList,
      updated_at: new Date(),
    },
    validationSchema: Yup.object({
      project_name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
    }),
    onSubmit: async (formValues) => {
      formValues.beneficiaries = beneficiaryList;
      formValues.financial_backer = financialBackersList;
      try {
        // Fetch existing projects from local storage
        const storedProjects = localStorage.getItem('projects');
        const existingProjects = storedProjects ? JSON.parse(storedProjects) : [];

        // Find the index of the project with the provided ID
        const projectIndex = existingProjects.findIndex((proj: any) => proj.id === formValues.id);

        if (projectIndex !== -1) {
          // Update the project with the new values
          existingProjects[projectIndex] = formValues;

          // Save the updated projects array back to local storage
          localStorage.setItem('projects', JSON.stringify(existingProjects));

          console.log(formValues.id, formValues);
          toast.success('Projet modifié avec succès !');
          dialog.handleClose();
          router.replace(paths.dashboard.projets.details.replace(':projetId', formValues.id));
        } else {
          // Handle the case where the project with the provided ID is not found
          toast.error('Projet non trouvé');
        }
      } catch (error) {
        dialog.handleClose();
        toast.error('Erreur lors de la modification du projet!');
        console.error('Erreur lors de la modification du projet!: ', error);
      }
    },
  });

  useEffect(() => {
    setFieldValue('id', project.id);
    setFieldValue('project_name', project.project_name);
    setFieldValue('email', project.email);
    setFieldValue('amount', project.amount);
    setFinancialBackersList(project.financial_backer);
    setBeneficiaryList(project.beneficiaries);
  }, [project, setFieldValue]);
  return (
    <>
      <UpdateConfirmationModal
        isOpen={dialog.open}
        onConfirm={handleSubmit}
        onCancel={dialog.handleClose}
      />

      <form>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Nom projet"
                  name="project_name"
                  value={values.project_name}
                  onChange={handleChange}
                  error={touched.project_name && Boolean(errors.project_name)}
                  helperText={touched.project_name && errors.project_name}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email de Contact"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <TextField
                    fullWidth
                    label="BAILLEUR DE FOND"
                    name="financialBackers"
                    size="small"
                    value={financialBackersInput}
                    onChange={handleFinancialBackersInputChange}
                  />
                  <IconButton onClick={handleAddFinancialBacker}>
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  </IconButton>
                </Stack>
                {financialBackersList && (
                  <Stack
                    alignItems="center"
                    direction="row"
                    flexWrap="wrap"
                    spacing={0}
                    sx={{
                      flexGrow: 1,
                      pt: financialBackersList?.length > 0 ? 1 : 0,
                      paddingTop: 0,
                    }}
                  >
                    {financialBackersList.map((backer, index) => (
                      <Chip
                        key={index}
                        label={backer}
                        onDelete={() => handleDeleteFinancialBacker(index)}
                        variant="outlined"
                        sx={{
                          margin: 0.5,
                        }}
                      />
                    ))}
                  </Stack>
                )}
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <TextField
                    fullWidth
                    label="BÉNÉFICIAIRE"
                    name="beneficiaries"
                    size="small"
                    value={beneficiaryInput}
                    onChange={handleBeneficiaryInputChange}
                  />
                  <IconButton onClick={handleAddBeneficiary}>
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  </IconButton>
                </Stack>
                <Stack
                  alignItems="center"
                  direction="row"
                  flexWrap="wrap"
                  spacing={0}
                  sx={{
                    flexGrow: 1,
                    pt: 0,
                  }}
                >
                  {beneficiaryList.map((beneficiary, index) => {
                    return (
                      <Chip
                        key={index}
                        label={beneficiary}
                        onDelete={() => handleDeleteBeneficiary(index)}
                        variant="outlined"
                        sx={{
                          margin: 0.5,
                        }}
                      />
                    );
                  })}
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  label="Montant global"
                  name="amount"
                  type="number"
                  value={values.amount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  flexWrap="wrap"
                  spacing={2}
                >
                  <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    onClick={dialog.handleOpen}
                  >
                    Sauvegarder
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    size="small"
                  >
                    Annuler
                  </Button>
                </Stack>
              </Grid>{' '}
            </Grid>
          </CardContent>
        </Card>
      </form>
    </>
  );
};
export default EditProject;
EditProject.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  // @ts-ignore
  project: PropTypes.object,
};
