import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { labels } from 'src/api/mail/data';
import { SeverityPill } from 'src/components/severity-pill';
import CreateConfirmationModal from 'src/pages/utilities/components/create-modal-confirmation';
import toast from 'react-hot-toast';
import { utilities } from 'src/types/utilities';
import { useDialog } from 'src/hooks/use-dialog';

const initialFields: utilities[] = [
  { category: 'rent', amount: '', date: new Date() },
  { category: 'electric', amount: '', date: new Date() },
  { category: 'communication', amount: '', date: new Date() },
  { category: 'entretien', amount: '', date: new Date() },
];

const NewUtilities = () => {
  const dialog = useDialog();

  const [expenses, setExpenses] = useState<utilities[]>(initialFields);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleInputChange = (category: string, amount: string, date: Date, index: number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = { category, amount, date };
    setExpenses(updatedExpenses);
  };

  const handleSubmit = () => {
    // Assuming validation is not needed for predefined fields

    console.log(expenses);

    // Clear the form and show success message
    setExpenses(initialFields);
    toast.success('La dépense a été crée avec succés');
    dialog.handleClose();

    // Clear the success message after a delay (e.g., 3 seconds)
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <CreateConfirmationModal
        isOpen={dialog.open}
        onConfirm={handleSubmit}
        onCancel={dialog.handleClose}
        message="
        Êtes-vous sûr de vouloir soumettre ce formulaire pour créer une nouvelle dépense ? "
      />
      <form>
        <Grid
          container
          spacing={3}
        >
          {expenses.map((expense, index) => (
            <Grid
              item
              xs={12}
              md={12}
              container
              spacing={4}
              key={index}
            >
              <Grid
                item
                xs={12}
                md={3}
              >
                <SeverityPill color="info">
                  {` ${
                    expense.category == 'rent'
                      ? 'Loyer'
                      : expense.category == 'electric'
                      ? 'Eau et électricité'
                      : expense.category == 'communication'
                      ? 'Communications'
                      : 'Entretien et réparations'
                  }`}
                </SeverityPill>
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
              >
                <TextField
                  fullWidth
                  label="Montant"
                  name={`amount-${index}`}
                  size="small"
                  type="number"
                  value={expense.amount}
                  onChange={(e) =>
                    handleInputChange(expense.category, e.target.value, expense.date, index)
                  }
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
              >
                <MobileDatePicker
                  label="Date"
                  value={expense.date}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={dialog.handleOpen}
          >
            Créer
          </Button>
        </Box>
      </form>
      {successMessage && (
        <SeverityPill
          sx={{
            mt: 2,
          }}
          color="success"
        >
          {successMessage}
        </SeverityPill>
      )}
    </Box>
  );
};

export default NewUtilities;
