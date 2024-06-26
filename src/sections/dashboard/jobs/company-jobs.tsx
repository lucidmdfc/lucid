import type { FC } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceStrict } from 'date-fns';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { Job } from 'src/types/template-types/job';

interface CompanyJobsProps {
  jobs?: Job[];
}

export const CompanyJobs: FC<CompanyJobsProps> = (props) => {
  const { jobs = [], ...other } = props;

  return (
    <Card
      variant="outlined"
      {...other}
    >
      <Stack divider={<Divider />}>
        {jobs.map((job) => {
          const location = job.isRemote ? 'Remote possible' : `(${job.country}, ${job.city})`;
          const publishedAt = formatDistanceStrict(job.publishedAt, new Date(), {
            addSuffix: true,
          });
          const salary = `${job.currency}${job.salaryMin} - ${job.currency}${job.salaryMax}`;

          return (
            <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
              key={job.id}
              sx={{
                px: 2,
                py: 1.5,
              }}
            >
              <div>
                <Typography variant="subtitle1">{job.title}</Typography>
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  {location} • {salary}
                </Typography>
              </div>
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
              >
                <Typography
                  color="text.secondary"
                  variant="caption"
                >
                  {publishedAt}
                </Typography>
                <Button size="small">Apply</Button>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Card>
  );
};

CompanyJobs.propTypes = {
  jobs: PropTypes.array,
};
