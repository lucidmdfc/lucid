import { ChangeEvent, FC } from 'react';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import { useTranslation } from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export type SortOption = {
  value: string;
  label: string;
};

interface FiltersProps {
  onSearchChange: (value: string) => void;
  searchValue: string;
  placeholder?: string;
  sortOptions?: SortOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  sortLabel?: string;
}

const Filters: FC<FiltersProps> = ({
  onSearchChange,
  searchValue,
  placeholder,
  sortOptions = [],
  sortValue = '',
  onSortChange,
  sortLabel,
}) => {
  const { t } = useTranslation();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onSearchChange(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent): void => {
    onSortChange?.(event.target.value);
  };

  const showSortDropdown = sortOptions.length > 0 && onSortChange;

  return (
    <Box
      sx={{
        p: 2,
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <OutlinedInput
        defaultValue=""
        sx={{
          flex: showSortDropdown ? '1 1 auto' : '1 1 100%',
          height: 40,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'action.active',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
        }}
        onChange={handleSearchChange}
        placeholder={placeholder || t('Rechercher...')}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon>
              <SearchMdIcon />
            </SvgIcon>
          </InputAdornment>
        }
        value={searchValue}
      />

      {showSortDropdown && (
        <FormControl
          sx={{
            minWidth: 180,
            ml: 2,
            flex: '0 0 auto',
            height: 40,
            '& .MuiOutlinedInput-root': {
              height: 40,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'action.active',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            },
          }}
          size="small"
        >
          <InputLabel id="sort-select-label">{sortLabel || t('Trier par')}</InputLabel>
          <Select
            labelId="sort-select-label"
            value={sortValue}
            label={sortLabel || t('Trier par')}
            onChange={handleSortChange}
          >
            {sortOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};
export default Filters;
