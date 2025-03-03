import { deepCopy } from 'src/utils/deep-copy';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { dummySalaries } from './data';
import { employee } from 'src/types/employees_salaries';

type GetSalariesRequest = {
  filters?: {
    query?: string;
    status?: string;
  };
  page?: number;
  rowsPerPage?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

type GetSalariesResponse = Promise<{
  data: employee[];
  count: number;
}>;

type GetSalaryRequest = object;

type GetOrderResponse = Promise<employee>;

class SalariesApi {
  getSalaries(request: GetSalariesRequest = {}): GetSalariesResponse {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(dummySalaries) as employee[];
    let count = data.length;
    if (typeof filters !== 'undefined') {
      data = data.filter((salary) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          // Checks only the salary number, but can be extended to support other fields, such as customer
          // name, email, etc.
          const containsQuery = (salary.salaryName || '')
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

  //   getOrder(request?: GetSalaryRequest): GetOrderResponse {
  //     return Promise.resolve(deepCopy(order));
  //   }
}

export const slariesApi = new SalariesApi();
