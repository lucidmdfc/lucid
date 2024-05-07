import type { FC } from 'react';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';

interface Filters {
  query?: string;
}

interface SalaryListSearchProps {
  onFiltersChange?: (filters: Filters) => void;
}

const SalaryListSearch: FC<SalaryListSearchProps> = (props) => {
  const { onFiltersChange } = props;
  const [query, setQuery] = useState<string>('');

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setQuery(event.target.value);
      const filters: Filters = { query: event.target.value };
      onFiltersChange?.(filters);
    },
    [onFiltersChange]
  );

  return (
    <div>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={3}
        sx={{ p: 3 }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <OutlinedInput
            fullWidth
            value={query}
            onChange={handleQueryChange}
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

export default SalaryListSearch;

SalaryListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
};
