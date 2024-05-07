import type { ChangeEvent, FC, MouseEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Unstable_Grid2';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import { Divider, OutlinedInput } from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { useMounted } from 'src/hooks/use-mounted';
import { Item, itemsApi } from 'src/api/items';
import ItemsListTable from './items/items-list-table';
import ItemsDetails from './items/total-ht-ttc';
import EditConfirmationModal from './edit-modal-confirmation';
import { useDialog } from 'src/hooks/use-dialog';
import { BillingCycle } from 'src/types/invoice';

interface Option {
  label: string;
  id: string;
}
const statusOption: Option[] = [
  {
    label: 'Payée',
    id: '1',
  },
  {
    label: 'Impayée',
    id: '2',
  },
];
const clients: Option[] = [
  {
    label: 'John Doe',
    id: 'id123',
  },
  {
    label: 'Jane Smith',
    id: 'id456',
  },
  {
    label: 'Bob Johnson',
    id: 'id789',
  },
  {
    label: 'Alice Williams',
    id: 'id101',
  },
  {
    label: 'David Brown',
    id: 'id202',
  },
  {
    label: 'Emily Davis',
    id: 'id303',
  },
];

const billingOptions: { label: string; id: string }[] = [
  {
    label: BillingCycle.Quotidien,
    id: BillingCycle.Quotidien,
  },
  {
    label: BillingCycle.Hebdomadaire,
    id: BillingCycle.Hebdomadaire,
  },
  {
    label: BillingCycle.Mensuel,
    id: BillingCycle.Mensuel,
  },
  {
    label: BillingCycle.Annuel,
    id: BillingCycle.Annuel,
  },
];

interface itemsSearchState {
  page: number;
  rowsPerPage: number;
}

const useItemsSearch = () => {
  const [state, setState] = useState<itemsSearchState>({
    page: 0,
    rowsPerPage: 5,
  });

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

interface ItemsStoreState {
  items: Item[];
  itemsCount: number;
}

const useItemsStore = (searchState: itemsSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<ItemsStoreState>({
    items: [],
    itemsCount: 0,
  });

  const handleProductsGet = useCallback(async () => {
    try {
      const response = await itemsApi.getItems(searchState);

      if (isMounted()) {
        setState({
          items: response.data,
          itemsCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleProductsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state,
  };
};

const InvoiceUpdateForm: FC = (props) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [isSwitchOn, setSwitchOn] = useState(false);
  const itemsSearch = useItemsSearch();
  const itemsStore = useItemsStore(itemsSearch.state);
  const [items, setItems] = useState<Item[]>([]);

  const dialog = useDialog();

  // Function to handle switch state changes
  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchOn(event.target.checked);
  };

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      client: '',
    },
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        // NOTE: Make API request
        toast.success('La facture a été modifiée avec succès.');
        router.push(paths.invoices.index);
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form {...props}>
      <EditConfirmationModal
        isOpen={dialog.open}
        onConfirm={formik.handleSubmit}
        onCancel={dialog.handleClose}
        message="
        Êtes-vous sûr de vouloir soumettre ce formulaire pour modifier la facture ?"
      />
      <Stack spacing={4}>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={7}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.client && formik.errors.client)}
                    fullWidth
                    label="Choisir un client"
                    name="client"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={formik.values.client ? formik?.values?.client : 'id123'}
                  >
                    {clients.map((option) => (
                      <MenuItem
                        key={option.id} // Assuming you want to use the 'id' as the key
                        value={option.id}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
              <Grid
                xs={12}
                md={5}
              >
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Status"
                    name="category"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    select
                    value={'2'}
                  >
                    {statusOption.map((status) => (
                      <MenuItem
                        key={status.id}
                        value={status.id}
                      >
                        {status.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
              <Divider />
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography
              sx={{ mb: 1 }}
              variant="h6"
            >
              Désignation
            </Typography>
            <OutlinedInput
              fullWidth
              multiline
              rows={2}
              value="lorem Ips et dolor et dolor et"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={2}
            >
              <Grid
                xs={12}
                md={2}
              >
                <Typography variant="h6">Paiement</Typography>
              </Grid>
              <Grid
                xs={12}
                md={5}
              >
                <Stack spacing={3}>
                  <DatePicker
                    onChange={(newDate) => setStartDate(newDate)}
                    label="Date d’émission"
                    value={startDate}
                  />
                </Stack>
              </Grid>

              <Grid
                xs={12}
                md={5}
              >
                <Stack spacing={3}>
                  <DatePicker
                    onChange={(newDate) => setEndDate(newDate)}
                    label="Date d’échéance"
                    value={endDate}
                  />
                </Stack>
              </Grid>
              <Grid
                xs={12}
                md={2}
              ></Grid>
              <Grid
                xs={12}
                md={10}
              >
                <Stack spacing={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isSwitchOn}
                        onChange={handleSwitchChange}
                        name="allDay"
                      />
                    }
                    label="Il s’agit d’une facture récurrente"
                  />
                </Stack>
              </Grid>
              <Grid
                xs={12}
                md={2}
              ></Grid>
              {isSwitchOn && (
                <>
                  <Grid
                    xs={12}
                    md={5}
                  >
                    <Stack spacing={3}>
                      <TextField
                        // error={!!(formik.touched.billing && formik.errors.billing)}
                        fullWidth
                        label="Cycle de facturation"
                        name="billing"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        select
                        // value={formik.values.billing}
                      >
                        {billingOptions.map((option) => (
                          <MenuItem
                            key={option.id}
                            value={option.id}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Stack>
                  </Grid>
                  <Grid
                    xs={12}
                    md={5}
                  >
                    <Stack spacing={3}>
                      <DatePicker
                        onChange={(newDate) => setEndDate(newDate)}
                        label="Prochaine échéance"
                        value={endDate}
                      />
                    </Stack>
                  </Grid>
                </>
              )}
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <ItemsListTable
              onPageChange={itemsSearch.handlePageChange}
              onRowsPerPageChange={itemsSearch.handleRowsPerPageChange}
              page={itemsSearch.state.page}
              items={itemsStore.items}
              count={itemsStore.itemsCount}
              rowsPerPage={itemsSearch.state.rowsPerPage}
              setItems={setItems}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <ItemsDetails items={items} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography
              sx={{ mb: 1 }}
              variant="subtitle2"
            >
              Note
            </Typography>
            <OutlinedInput
              fullWidth
              multiline
              rows={6}
              value="lorem Ips et dolor et dolor et al et lorem Ips et dolor et dolor et al et lorem Ips et"
            />
          </CardContent>
        </Card>

        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={1}
        >
          <Button
            onClick={dialog.handleOpen}
            variant="contained"
          >
            Enregistrer
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
export default InvoiceUpdateForm;
