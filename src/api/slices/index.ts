import { deepCopy } from 'src/utils/deep-copy';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { slice } from 'src/types/slice';

type GetSlicesRequest = {
  filters?: {
    query?: string;
    status?: string;
  };
  page?: number;
  rowsPerPage?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

type GetSlicesResponse = Promise<{
  data: slice[];
  count: number;
}>;

type GetSliceRequest = object;

type GetSliceResponse = Promise<slice>;

class SlicesApi {
  getSlices(request: GetSlicesRequest = {}): GetSlicesResponse {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    const storedSlices = localStorage.getItem('slices');
    const parsedSlices = storedSlices ? JSON.parse(storedSlices) : [];

    let data = deepCopy(parsedSlices) as slice[];
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((slice) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          // Checks only the slice number, but can be extended to support other fields, such as customer
          // name, email, etc.
          const containsQuery = slice.created_at || '';

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

  //   gSlice(request?: GetSliceRequest): GetProjectResponse {
  //     return Promise.resolve(deepCopy(order));
  //   }
}

export const slicesApi = new SlicesApi();
