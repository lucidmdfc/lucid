import { endOfDay, startOfDay } from 'date-fns';

import { applyPagination } from 'src/utils/apply-pagination';
import { deepCopy } from 'src/utils/deep-copy';
import { dummyCashOutData } from './data';
import { cashIn } from 'src/types/cash-in';

type GetCashOutRequest = {
  filters?: {
    endDate?: Date;
    query?: string;
    startDate?: Date;
  };
  page?: number;
  rowsPerPage?: number;
};

type GetCashOutResponse = Promise<{
  data: cashIn[];
  count: number;
}>;

type GetInvoiceRequest = object;

type GetInvoiceResponse = Promise<cashIn>;

class CashOutApi {
  getCashOut(request: GetCashOutRequest = {}): GetCashOutResponse {
    const { filters, page, rowsPerPage } = request;

    let data = deepCopy(dummyCashOutData) as cashIn[];
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

export const cashOutApi = new CashOutApi();
