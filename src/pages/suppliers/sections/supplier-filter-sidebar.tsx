import type { ChangeEvent, FC, FormEvent } from 'react';
import { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Drawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Scrollbar } from 'src/components/scrollbar';
import { InvoiceStatus } from 'src/types/invoice';
import { dummySuppliers } from 'src/api/suppliers/data';
import { useQuery } from '@apollo/client';
import { GET_SERVICE_PROVIDERS } from 'src/graphql/entities/serviceProviders/queries';
import { status } from 'src/graphql/shared/enums/status';

// const providerNames: string[] = dummySuppliers.map((supplier) => supplier.nom);

export interface Filters {
  query?: string;
  startDate?: Date;
  endDate?: Date;
  providerNames?: string[];
  dummyProviders?: string[];
  status?: status;
}

interface SupplierFilterSidebarProps {
  container?: HTMLDivElement | null;
  filters?: Filters;
  group?: boolean;
  onClose?: () => void;
  onFiltersChange?: (filters: Filters) => void;
  onGroupChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  open?: boolean;
}

const SupplierFilterSidebar: FC<SupplierFilterSidebarProps> = (props) => {
  const {
    container,
    filters = {},
    group,
    onClose,
    onFiltersChange,
    onGroupChange,
    open,
    ...other
  } = props;
  // console.log(props);

  const queryRef = useRef<HTMLInputElement | null>(null);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const { data, loading, error } = useQuery(GET_SERVICE_PROVIDERS);
  // console.log(data);
  const providerNames: string[] = data?.service_providersCollection?.edges.map(
    (supplier: any) => supplier.node.name
  );
  // console.log(providerNames);

  const handleQueryChange = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      onFiltersChange?.({
        ...filters,
        query: queryRef.current?.value || '',
      });
    },
    [filters, onFiltersChange]
  );

  const handleStartDateChange = useCallback(
    (date: Date | null): void => {
      const newFilters: Filters = {
        ...filters,
        startDate: date || undefined,
      };

      // Prevent end date to be before start date
      if (newFilters.endDate && date && date > newFilters.endDate) {
        newFilters.endDate = date;
      }

      onFiltersChange?.(newFilters);
    },
    [filters, onFiltersChange]
  );

  const handleEndDateChange = useCallback(
    (date: Date | null): void => {
      const newFilters: Filters = {
        ...filters,
        endDate: date || undefined,
      };

      // Prevent start date to be after end date
      if (newFilters.startDate && date && date < newFilters.startDate) {
        newFilters.startDate = date;
      }

      onFiltersChange?.(newFilters);
    },
    [filters, onFiltersChange]
  );

  const handleCustomerToggle = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      let providerNames: string[];

      if (event.target.checked) {
        providerNames = [...(filters.providerNames || []), event.target.value];
      } else {
        providerNames = (filters.providerNames || []).filter(
          (provider) => provider !== event.target.value
        );
      }

      onFiltersChange?.({
        ...filters,
        providerNames: providerNames,
      });
    },
    [filters, onFiltersChange]
  );

  const handleStatusChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      onFiltersChange?.({
        ...filters,
        status: event.target.checked ? status.Paid : undefined,
      });
    },
    [filters, onFiltersChange]
  );

  const content = (
    <div>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        sx={{ p: 3 }}
      >
        <Typography variant="h5">Filtres</Typography>
        {!lgUp && (
          <IconButton onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        )}
      </Stack>
      <Stack
        spacing={3}
        sx={{ p: 3 }}
      >
        <form onSubmit={handleQueryChange}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder="Rechercher par projet"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </form>
        <div>
          <FormLabel
            sx={{
              display: 'block',
              mb: 2,
            }}
          >
            {'Rechercher par date'}
          </FormLabel>
          <Stack spacing={2}>
            <DatePicker
              format="dd/MM/yyyy"
              label="De"
              onChange={handleStartDateChange}
              value={filters.startDate || null}
            />
            <DatePicker
              format="dd/MM/yyyy"
              label="À"
              onChange={handleEndDateChange}
              value={filters.endDate || null}
            />
          </Stack>
        </div>
        {/* <div>
          <FormLabel
            sx={{
              display: 'block',
              mb: 2,
            }}
          >
            Rechercher Nom / Raison sociale du prestataire
          </FormLabel>
          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
              borderColor: 'divider',
              borderRadius: 1,
              borderStyle: 'solid',
              borderWidth: 1,
            }}
          >
            <Scrollbar sx={{ maxHeight: 200 }}>
              <FormGroup
                sx={{
                  py: 1,
                  px: 1.5,
                }}
              >
                {(providerNames ?? []).map((provider) => {
                  // const isChecked = filters.dummyProviders?.includes(provider);

                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          // checked={isChecked}
                          onChange={handleCustomerToggle}
                        />
                      }
                      key={provider}
                      label={provider}
                      value={provider}
                    />
                  );
                })}
              </FormGroup>
            </Scrollbar>
          </Box>
        </div> */}
        <FormControlLabel
          control={
            <Switch
              checked={filters.status === 'accepted'}
              onChange={handleStatusChange}
            />
          }
          label="Payé uniquement"
        />
        <FormControlLabel
          control={
            <Switch
              checked={group}
              onChange={onGroupChange}
            />
          }
          label="Regrouper par statut"
        />
      </Stack>
    </div>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={open}
        PaperProps={{
          elevation: 16,
          sx: {
            border: 'none',
            borderRadius: 2.5,
            overflow: 'hidden',
            position: 'relative',
            width: 380,
          },
        }}
        SlideProps={{ container }}
        variant="persistent"
        sx={{ p: 3 }}
        {...other}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: 'none',
          position: 'absolute',
        },
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 380,
          pointerEvents: 'auto',
          position: 'absolute',
        },
      }}
      SlideProps={{ container }}
      variant="temporary"
      {...other}
    >
      {content}
    </Drawer>
  );
};
export default SupplierFilterSidebar;
SupplierFilterSidebar.propTypes = {
  container: PropTypes.any,
  // @ts-ignore
  filters: PropTypes.object,
  group: PropTypes.bool,
  onClose: PropTypes.func,
  onFiltersChange: PropTypes.func,
  onGroupChange: PropTypes.func,
  open: PropTypes.bool,
};
