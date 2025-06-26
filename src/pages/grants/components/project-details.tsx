import type { FC } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import EditIcon from '@mui/icons-material/Edit';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import Link from 'next/link';
import { IconButton } from '@mui/material';

interface ProjectDetailsProps {
  id: string;
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  project_budget?: number;
  created_at?: string;
  updated_at?: string;
  status?: string;
  note?: string;
}

const ProjectDetails: FC<ProjectDetailsProps> = (props) => {
  const { id, name, description, start_date, end_date, project_budget, status, note, ...other } =
    props;
  console.log(id);
  return (
    <Card
      {...other}
      sx={{ height: '100%' }}
    >
      <CardHeader
        title="Détails du projet"
        action={
          <Link
            href={`/projets/${id}/edit`}
            passHref
          >
            <IconButton
              component="a"
              aria-label="Edit project"
            >
              <EditIcon />
            </IconButton>
          </Link>
        }
      />
      <PropertyList>
        <PropertyListItem
          divider
          label="Nom"
          value={name}
        />
        <PropertyListItem
          divider
          label="Description"
          value={description}
        />
        <PropertyListItem
          divider
          label="Date de début"
          value={start_date}
        />
        <PropertyListItem
          divider
          label="Date de fin"
          value={end_date}
        />
        <PropertyListItem
          divider
          label="Budget du projet"
          value={project_budget ? `${project_budget} MAD` : 'N/A'}
        />
        <PropertyListItem
          divider
          label="Status"
          value={status}
        />
        <PropertyListItem
          divider
          label="Note"
          value={note}
        />
      </PropertyList>
      {/* <CardActions>
        <Button
          color="inherit"
          size="small"
        >
          Reset Project
        </Button>
      </CardActions> */}
    </Card>
  );
};

ProjectDetails.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  project_budget: PropTypes.number,
  status: PropTypes.string,
  note: PropTypes.string,
};

export default ProjectDetails;
