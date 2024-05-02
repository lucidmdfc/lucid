import type { FC, ChangeEvent } from 'react';
import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';

import { useUpdateEffect } from 'src/hooks/use-update-effect';

interface Filters {
  query?: string;
}

interface ExpenseListSearchProps {
  onFiltersChange?: (filters: Filters) => void;
}

const ExpenseListSearch: FC<ExpenseListSearchProps> = (props) => {
  const { onFiltersChange } = props;
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState<string>('');

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.({ query });
  }, [query, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [query, handleFiltersUpdate]);

  const handleQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setQuery(value);
  }, []);

  return (
    <div>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={3}
        sx={{ p: 3 }}
      >
        <Box
          component="form"
          sx={{ flexGrow: 1 }}
        >
          <OutlinedInput
            value={query}
            fullWidth
            onChange={handleQueryChange}
            inputProps={{ ref: queryRef }}
            name="orderNumber"
            placeholder="Rechercher"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
      </Stack>
    </div>
  );
};

export default ExpenseListSearch;

ExpenseListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
};
