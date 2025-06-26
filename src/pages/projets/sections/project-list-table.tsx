import type { ChangeEvent, FC, MouseEvent } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Scrollbar } from 'src/components/scrollbar';
// import { Project } from 'src/types/project';
import ProjectListTableRow from '../components/project-list-table-row';
import { GetProjectsQuery } from 'src/types/generatedTypes';

type Project = NonNullable<
  NonNullable<GetProjectsQuery['projectsCollection']>['edges']
>[number]['node'];

interface ProjectListTableProps {
  count?: number;
  items?: Project[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (projectId: string) => void;
  page?: number;
  rowsPerPage?: number;
}

const ProjectListTable: FC<ProjectListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelect,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <Box sx={{ position: 'relative' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Nom projet</TableCell>
              <TableCell>Email de contact</TableCell>
              <TableCell>personne de contact</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Montant global</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((project) => {
              const totalAmount = numeral(project.project_budget).format(`0,0.00`);

              return (
                <ProjectListTableRow
                  project={project}
                  totalAmount={totalAmount}
                  onSelect={onSelect}
                />
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};
export default ProjectListTable;
ProjectListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
