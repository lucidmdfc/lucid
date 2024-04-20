import { type FC } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { salary } from 'src/types/salary';

interface SalaryEditProps {
  onCancel?: () => void;
  onSave?: () => void;
  salary: salary;
}

const SalaryEdit: FC<SalaryEditProps> = (props) => {
  const { onCancel, onSave, salary } = props;

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Typography variant="h6">Détails</Typography>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Nom du salarié"
            name="number"
            value={salary.salaryName}
          />
          <TextField
            fullWidth
            label="Fonction"
            name="fonction"
            value={salary.salaryFunction}
          />

          <TextField
            fullWidth
            label="Salaire Brut"
            name="amount"
            type="number"
            value={salary.grossSalary}
          />
          <DatePicker
            label="Date de recrutement"
            value={new Date(salary.recruitmentDate)} // Cast to DateValue
            // onChange={(newValue) => setValue(newValue)}
            format="dd/MM/yyyy"
          />
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          spacing={2}
        >
          <Button
            color="primary"
            onClick={onSave}
            size="small"
            variant="contained"
          >
            Sauvegarder
          </Button>
          <Button
            color="inherit"
            onClick={onCancel}
            size="small"
          >
            Annuler
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default SalaryEdit;
SalaryEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  // @ts-ignore
  salary: PropTypes.object,
};
