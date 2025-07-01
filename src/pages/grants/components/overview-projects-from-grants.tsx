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
import { Grid } from '@mui/material';
import { Chart } from 'src/components/chart';
import { useTheme } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';

interface OverviewDoneTasksProps {
  amount: number;
  donorsCount: number;
  name: string;
  id: string;
  donors: any[];
}
const useChartOptions = (labels: string[]): ApexOptions => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main, theme.palette.warning.main, theme.palette.info.main],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: 'solid',
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

const OverviewProjectFromGrants: FC<OverviewDoneTasksProps> = (props) => {
  const { amount, name, id, donorsCount, donors } = props;
  const router = useRouter();

  console.log(donors);
  const labels = donors.map((d) => d.name);
  const series = donors.map((d) => d.grant_amount ?? 0);

  const chartOptions = useChartOptions(labels);
  console.log(series);
  console.log(chartOptions);
  const handleClick = () => {
    router.push(`/grants/${id}`);
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
            variant="h5"
            sx={{ textAlign: 'center' }}
          >
            {name}
          </Typography>
          <Chart
            height={200}
            options={chartOptions}
            series={series}
            type="donut"
          />

          <Typography
            color="text.primary"
            variant="h6"
            sx={{ textAlign: 'center' }}
          >
            Project Budget
          </Typography>
          <Typography
            color="text.primary"
            variant="h5"
            sx={{ textAlign: 'center' }}
          >
            {amount} Dh
          </Typography>
          <Grid
            container
            spacing={1}
            sx={{ mt: 2 }}
          >
            {labels.map((label, index) => (
              <Grid
                key={index}
                xs={12}
                sm={12}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <Box
                      sx={{
                        backgroundColor: chartOptions.colors?.[index % chartOptions.colors.length],
                        borderRadius: '50%',
                        height: 8,
                        width: 8,
                      }}
                    />
                    <Typography variant="subtitle2">{label}</Typography>
                  </Stack>
                  <Typography variant="subtitle2">{series[index]}Dh</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>

          {/* <Typography
            color="text.secondary"
            variant="body2"
          >
            Total des bailleurs dans ce projet : {donorsCount}
          </Typography> */}
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
          Voir les détails.
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewProjectFromGrants.propTypes = {
  amount: PropTypes.number.isRequired,
};
export default OverviewProjectFromGrants;
