import { endOfDay, startOfDay } from 'date-fns';

import { applyPagination } from 'src/utils/apply-pagination';
import { deepCopy } from 'src/utils/deep-copy';
import { dummyCashInData } from './data';
import { cashIn } from 'src/types/cash-in';

type GetCashInRequest = {
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

type GetCashInResponse = Promise<{
  data: cashIn[];
  count: number;
}>;

type GetInvoiceRequest = object;

type GetInvoiceResponse = Promise<cashIn>;

class CashInApi {
  getCashIn(request: GetCashInRequest = {}): GetCashInResponse {
    const { filters, page, rowsPerPage } = request;

    let data = deepCopy(dummyCashInData) as cashIn[];
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((cashIn) => {
        if (typeof filters.startDate !== 'undefined') {
          if (typeof cashIn.startDate === 'undefined') {
            return false;
          }

          const matched = endOfDay(cashIn.startDate) >= startOfDay(filters.startDate);

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.endDate !== 'undefined') {
          if (typeof cashIn.startDate === 'undefined') {
            return false;
          }

          const matched = startOfDay(cashIn.startDate) <= endOfDay(filters.endDate);

          if (!matched) {
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

  // getInvoice(request?: GetInvoiceRequest): GetInvoiceResponse {
  //   return Promise.resolve(deepCopy(provider));
  // }
}

export const cashInApi = new CashInApi();
