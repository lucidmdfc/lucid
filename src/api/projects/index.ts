import { deepCopy } from 'src/utils/deep-copy';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { Project } from 'src/types/project';

type GetProjectsRequest = {
  filters?: {
    query?: string;
    status?: string;
  };
  page?: number;
  rowsPerPage?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

type GetProjectsResponse = Promise<{
  data: Project[];
  count: number;
}>;

type GetProjectRequest = object;

type GetProjectResponse = Promise<Project>;

class ProjectsApi {
  getProjects(request: GetProjectsRequest = {}): GetProjectsResponse {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    const storedProjects = localStorage.getItem('projects');
    const parsedProjects = storedProjects ? JSON.parse(storedProjects) : [];

    let data = deepCopy(parsedProjects) as Project[];
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((project) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          const containsQuery = (project.project_name || '')
            .toLowerCase()
            .includes(filters.query.toLowerCase());

          if (!containsQuery) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }
    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count,
    });
  }

  //   getOrder(request?: GetProjectRequest): GetProjectResponse {
  //     return Promise.resolve(deepCopy(order));
  //   }
}

export const projectsApi = new ProjectsApi();
