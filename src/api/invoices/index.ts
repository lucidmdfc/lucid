import { endOfDay, startOfDay } from 'date-fns';

import type { Invoice } from 'src/types/invoice';
import { applyPagination } from 'src/utils/apply-pagination';
import { deepCopy } from 'src/utils/deep-copy';
import { dummyInvoices } from './data';

type GetInvoicesRequest = {
  filters?: {
    customers?: string[];
    endDate?: Date;
    query?: string;
    startDate?: Date;
    status?: string;
  };
  page?: number;
  rowsPerPage?: number;
};

type GetInvoicesResponse = Promise<{
  data: Invoice[];
  count: number;
}>;

type GetInvoiceRequest = object;

type GetInvoiceResponse = Promise<Invoice>;

class InvoicesApi {
  getInvoices(request: GetInvoicesRequest = {}): GetInvoicesResponse {
    const { filters, page, rowsPerPage } = request;

    let data = deepCopy(dummyInvoices) as Invoice[];
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((invoice) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          const matched = invoice.customer.toLowerCase().includes(filters.query.toLowerCase());

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.startDate !== 'undefined') {
          if (typeof invoice.issueDate === 'undefined') {
            return false;
          }

          const matched = endOfDay(invoice.issueDate) >= startOfDay(filters.startDate);

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.endDate !== 'undefined') {
          if (typeof invoice.issueDate === 'undefined') {
            return false;
          }

          const matched = startOfDay(invoice.issueDate) <= endOfDay(filters.endDate);

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.customers !== 'undefined' && filters.customers.length > 0) {
          const matched = filters.customers.includes(invoice.customer);

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.status !== 'undefined') {
          if (invoice.status !== filters.status) {
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

  getInvoice(request?: GetInvoiceRequest): GetInvoiceResponse {
    return Promise.resolve(deepCopy(dummyInvoices));
  }
}

export const invoicesApi = new InvoicesApi();
