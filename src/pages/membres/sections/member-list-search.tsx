import type { ChangeEvent, FC, FormEvent } from 'react';
import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';

import { useUpdateEffect } from 'src/hooks/use-update-effect';

interface Filters {
  query?: string;
}

interface MemberListSearchProps {
  onFiltersChange?: (filters: Filters) => void;
}

const MemberListSearch: FC<MemberListSearchProps> = (props) => {
  const { onFiltersChange } = props;
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [filters, setFilters] = useState<Filters>({
    query: undefined,
  });

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleQueryChange = useCallback((event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const query = queryRef.current?.value || '';
    setFilters((prevState) => ({
      ...prevState,
      query,
    }));
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
          onChange={handleQueryChange}
        >
          <OutlinedInput
            defaultValue=""
            fullWidth
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
export default MemberListSearch;
MemberListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
};
