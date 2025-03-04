import { FC } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

const EmptyState: FC<EmptyStateProps> = ({ message, icon }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px',
      }}
    >
      <Stack
        alignItems="center"
        spacing={2}
      >
        {icon && (
          <Box
            sx={{
              color: 'text.secondary',
              '& svg': {
                fontSize: 60,
              },
            }}
          >
            {icon}
          </Box>
        )}
        <Typography
          color="text.secondary"
          variant="body1"
        >
          {message || t('Aucune donnée disponible')}
        </Typography>
      </Stack>
    </Box>
  );
};
export default EmptyState;
