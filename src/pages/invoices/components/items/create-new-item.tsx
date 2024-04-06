import { useState, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  CardContent,
  Typography,
  Grid,
  OutlinedInput,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { toast } from 'react-hot-toast';
import { Item } from 'src/types/items';

interface CreateNewItemProps {
  setNewItem: (item: Item) => void;
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  quantity: Yup.number().required('Quantity is required'),
});

const CreateNewItem: React.FC<CreateNewItemProps> = ({ setNewItem }) => {
  const calculateAmount = useMemo(() => {
    return (price: number, quantity: number) => price * quantity;
  }, []);

  const formik = useFormik({
    initialValues: {
      description: '',
      price: '',
      quantity: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const newItem: Item = {
          id: Math.random().toString(36).substring(7),
          description: values.description,
          price: parseFloat(values.price),
          quantity: parseInt(values.quantity),
          amount: calculateAmount(parseFloat(values.price), parseInt(values.quantity)),
        };

        // Get existing items from local storage or initialize an empty array
        const existingItemsJSON = localStorage.getItem('items');
        const existingItems = existingItemsJSON ? JSON.parse(existingItemsJSON) : [];

        // Add the new item to the existing items array
        const updatedItems = [...existingItems, newItem];

        // Update local storage with the updated items array
        localStorage.setItem('items', JSON.stringify(updatedItems));

        // Call setNewItem with the new item
        setNewItem(newItem);

        // Reset the form
        formik.resetForm();

        // Show success toast
        toast.success('Le item a été ajouté avec succès.');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });

  const hanldeSubmit = () => formik.handleSubmit();

  return (
    <CardContent>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
          <Typography
            variant="subtitle2"
            sx={{ mb: 1 }}
          >
            Description
          </Typography>
          <form>
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <OutlinedInput
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                />
                {formik.touched.description && formik.errors.description && (
                  <Typography
                    color="error"
                    variant="caption"
                  >
                    {formik.errors.description}
                  </Typography>
                )}
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
                container
                spacing={2}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Prix unité"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)} // Add error props
                    helperText={formik.touched.price && formik.errors.price} // Add helperText props
                  />
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Quantité"
                    type="number"
                    name="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    error={formik.touched.quantity && Boolean(formik.errors.quantity)} // Add error props
                    helperText={formik.touched.quantity && formik.errors.quantity} // Add helperText props
                  />
                </Grid>
              </Grid>
              <Grid
                item
                md={2}
                xs={12}
              >
                <Stack
                  alignItems="end"
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Button
                    variant="contained"
                    disabled={formik.isSubmitting}
                    onClick={hanldeSubmit}
                  >
                    Ajouter
                  </Button>
                  <Button
                    color="warning"
                    variant="outlined"
                  >
                    Effacer
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default CreateNewItem;
