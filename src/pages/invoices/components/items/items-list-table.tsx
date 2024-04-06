import type { ChangeEvent, Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import numeral from 'numeral';
import { toast } from 'react-hot-toast';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Scrollbar } from 'src/components/scrollbar';
import { FormControlLabel, OutlinedInput, Switch } from '@mui/material';
import { Item } from 'src/types/items';
import CreateNewItem from './create-new-item';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';

interface ItemListTableProps {
  count?: number;
  items?: Item[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
  setItems?: Dispatch<SetStateAction<Item[]>>; // Adjust the type of setItems
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  quantity: Yup.number().required('Quantity is required'),
});
const ItemsListTable: FC<ItemListTableProps> = (props) => {
  const {
    count = 0,
    items: initialItems = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    setItems,
  } = props;
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [itemsWithAmount, setItemsWithAmount] = useState<Item[]>(initialItems);

  const handleItemToggle = useCallback((ItemId: string): void => {
    setCurrentItem((prevItemId) => {
      if (prevItemId === ItemId) {
        return null;
      }
      return ItemId;
    });
  }, []);

  const handleItemClose = useCallback((): void => {
    setCurrentItem(null);
  }, []);

  const handleItemDelete = useCallback(
    (ItemId: string): void => {
      const updatedItems = itemsWithAmount.filter((item) => item.id !== ItemId);
      setItemsWithAmount(updatedItems);
      localStorage.setItem('items', JSON.stringify(updatedItems)); // Update local storage
      setCurrentItem(null);
      toast.error("L'item a été supprimé.");
    },
    [itemsWithAmount]
  );

  const handleNewItem = useCallback((newItem: Item) => {
    setItemsWithAmount((prevItems) => [...prevItems, newItem]);
  }, []);

  useEffect(() => {
    const storedItems = localStorage.getItem('items');

    if (storedItems) {
      setItemsWithAmount(JSON.parse(storedItems));
      if (setItems) {
        setItems(JSON.parse(storedItems));
      }
    }
  }, [itemsWithAmount]);

  const calculateAmount = useMemo(() => {
    return (price: number, quantity: number) => price * quantity;
  }, []);
  const handleFormSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void; resetForm: () => void }
  ) => {
    // Find the index of the item to be updated
    const index = itemsWithAmount.findIndex((item) => item.id === currentItem);

    // If the index is found
    if (index !== -1) {
      // Calculate the amount using useMemo

      // Update the item with the new values
      const updatedItems = [...itemsWithAmount];
      updatedItems[index] = {
        ...updatedItems[index],
        description: values.description,
        price: parseFloat(values.price),
        quantity: parseInt(values.quantity),
        amount: calculateAmount(parseFloat(values.price), parseInt(values.quantity)),
      };

      // Update the state with the new items
      setItemsWithAmount(updatedItems);

      // Update the local storage with the new items
      localStorage.setItem('items', JSON.stringify(updatedItems));

      // Reset form and set submitting to false
      actions.resetForm();
      actions.setSubmitting(false);
      handleItemClose();
    }
  };
  return (
    <div>
      <CreateNewItem setNewItem={handleNewItem} />
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width="25%">Description</TableCell>
              <TableCell width="25%">Quantité</TableCell>
              <TableCell>Prix unité</TableCell>
              <TableCell align="right">Montant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsWithAmount.map((item) => {
              const isCurrent = item.id === currentItem;
              const price = numeral(item.amount).format(`0,0.00`);

              return (
                <Fragment key={item.id}>
                  <TableRow
                    hover
                    key={item.id}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(isCurrent && {
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)',
                          },
                        }),
                      }}
                      width="25%"
                    >
                      <IconButton onClick={() => handleItemToggle(item.id)}>
                        <SvgIcon>{isCurrent ? <ChevronDownIcon /> : <ChevronRightIcon />}</SvgIcon>
                      </IconButton>
                    </TableCell>
                    <TableCell width="25%">
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Box sx={{ cursor: 'pointer', ml: 2 }}>
                          <Typography variant="subtitle2">{item.description}</Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell width="25%">
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        {item.quantity}{' '}
                      </Typography>
                    </TableCell>

                    <TableCell>{item.price}</TableCell>
                    <TableCell align="right">{price}</TableCell>
                  </TableRow>
                  {isCurrent && (
                    <TableRow>
                      <TableCell colSpan={7}>
                        {/* Formik form for item update */}
                        <Formik
                          initialValues={{
                            description: item.description,
                            price: item.price,
                            quantity: item.quantity,
                          }}
                          validationSchema={validationSchema}
                          onSubmit={handleFormSubmit}
                        >
                          {(formikProps) => (
                            <Form>
                              {/* Form fields */}
                              <Grid
                                spacing={2}
                                container
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
                                    value={formikProps.values.description}
                                    onChange={formikProps.handleChange}
                                  />
                                  {formikProps.touched.description &&
                                    formikProps.errors.description && (
                                      <Typography
                                        color="error"
                                        variant="caption"
                                      >
                                        {formikProps.errors.description}
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
                                      value={formikProps.values.price}
                                      onChange={formikProps.handleChange}
                                      error={
                                        formikProps.touched.price &&
                                        Boolean(formikProps.errors.price)
                                      } // Add error props
                                      helperText={
                                        formikProps.touched.price && formikProps.errors.price
                                      } // Add helperText props
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
                                      value={formikProps.values.quantity}
                                      onChange={formikProps.handleChange}
                                      error={
                                        formikProps.touched.quantity &&
                                        Boolean(formikProps.errors.quantity)
                                      } // Add error props
                                      helperText={
                                        formikProps.touched.quantity && formikProps.errors.quantity
                                      } // Add helperText props
                                    />
                                  </Grid>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                >
                                  <Stack
                                    flexDirection={'row'}
                                    justifyContent={'space-between'}
                                  >
                                    <Box>
                                      <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={formikProps.isSubmitting}
                                        onClick={(e) => {
                                          e.preventDefault(); // Prevent default form submission
                                          formikProps.handleSubmit(); // Manually handle form submission
                                        }}
                                      >
                                        Enregistrer
                                      </Button>
                                      <Button
                                        color="inherit"
                                        onClick={handleItemClose}
                                      >
                                        Annuler
                                      </Button>
                                    </Box>
                                    <Button
                                      onClick={() => handleItemDelete(item.id)}
                                      color="error"
                                    >
                                      Supprimer Item
                                    </Button>
                                  </Stack>
                                </Grid>
                              </Grid>

                              {/* Submit button */}
                            </Form>
                          )}
                        </Formik>
                        {/* Delete button */}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Lignes par page"
      />
    </div>
  );
};

export default ItemsListTable;
