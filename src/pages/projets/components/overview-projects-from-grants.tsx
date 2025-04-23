import type { FC } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

interface OverviewDoneTasksProps {
  amount: number;
  donors: number;
  name: string;
  id: string;
}

const OverviewProjectFromGrants: FC<OverviewDoneTasksProps> = (props) => {
  const { amount, name, id, donors } = props;
  const router = useRouter();

  // console.log(donors);

  const handleClick = () => {
    router.push(`/projets/grants/${id}`);
  };
  return (
    <Card>
      <Stack
        alignItems="center"
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={3}
        sx={{
          px: 4,
          py: 3,
        }}
      >
        {/* <div>
          <img
            src="/assets/iconly/iconly-glass-tick.svg"
            width={48}
          />
        </div> */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {name}
          </Typography>
          <Typography
            color="text.primary"
            variant="h4"
          >
            {amount}
          </Typography>

          <Typography
            color="text.secondary"
            variant="body2"
          >
            Total des bailleurs dans ce projet : {donors}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          onClick={handleClick}
        >
          Voir les détails du projet.
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewProjectFromGrants.propTypes = {
  amount: PropTypes.number.isRequired,
};
export default OverviewProjectFromGrants;
