import { endOfDay, startOfDay } from 'date-fns';

import { applyPagination } from 'src/utils/apply-pagination';
import { deepCopy } from 'src/utils/deep-copy';
import { dummyProvider, dummyProviders } from './data';
import { Supplier } from 'src/types/supplier';

type GetSuppliersRequest = {
  filters?: {
    providerNames?: string[];
    endDate?: Date;
    query?: string;
    startDate?: Date;
    status?: string;
  };
  page?: number;
  rowsPerPage?: number;
};

type GetSuppliersResponse = Promise<{
  data: Supplier[];
  count: number;
}>;

type GetSupplierRequest = object;

type GetSupplierResponse = Promise<Supplier>;

class SuppliersApi {
  getSuppliers(request: GetSuppliersRequest = {}): GetSuppliersResponse {
    const { filters, page, rowsPerPage } = request;

    let data = deepCopy(dummyProviders) as Supplier[];
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((provider) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          const matched = provider.nom.toLowerCase().includes(filters.query.toLowerCase());

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.startDate !== 'undefined') {
          if (typeof provider.depositedDate === 'undefined') {
            return false;
          }

          const matched = endOfDay(provider.depositedDate) >= startOfDay(filters.startDate);

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.endDate !== 'undefined') {
          if (typeof provider.depositedDate === 'undefined') {
            return false;
          }

          const matched = startOfDay(provider.depositedDate) <= endOfDay(filters.endDate);

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.providerNames !== 'undefined' && filters.providerNames.length > 0) {
          const matched = filters.providerNames.includes(provider.nom);

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.status !== 'undefined') {
          if (provider.status !== filters.status) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count,
    });
  }

  getSupplier(request?: GetSupplierRequest): GetSupplierResponse {
    return Promise.resolve(deepCopy(dummyProvider));
  }
}

export const suppliersApi = new SuppliersApi();
