import { deepCopy } from 'src/utils/deep-copy';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { expense } from 'src/types/expense';
import { dummyExpenses } from './data';

type GetExpensesRequest = {
  filters?: {
    query?: string;
    status?: string;
  };
  page?: number;
  rowsPerPage?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

type GetExpensesResponse = Promise<{
  data: expense[];
  count: number;
}>;

type GetExpenseRequest = object;

type GetExpenseResponse = Promise<expense>;

class ExpensesApi {
  getExpenses(request: GetExpensesRequest = {}): GetExpensesResponse {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(dummyExpenses) as expense[];
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((expense) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          const containsQuery = (expense.projectId || '')
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

  //   getOrder(request?: GetExpenseRequest): GetExpenseResponse {
  //     return Promise.resolve(deepCopy(order));
  //   }
}

export const expensesApi = new ExpensesApi();
