import { deepCopy } from 'src/utils/deep-copy';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { Member } from 'src/types/member';
import { membersData } from './data';

type GetMembersRequest = {
  filters?: {
    query?: string;
    status?: string;
  };
  page?: number;
  rowsPerPage?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

type GetMembersResponse = Promise<{
  data: Member[];
  count: number;
}>;

type GetMemberRequest = object;

type GetMemberResponse = Promise<Member>;

class MembersApi {
  getMembers(request: GetMembersRequest = {}): GetMembersResponse {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(membersData) as Member[];
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((member) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          // Checks only the member number, but can be extended to support other fields, such as customer
          // name, email, etc.
          const containsQuery = (member.full_name || '')
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

  //   gSlice(request?: GetMemberRequest): GetProjectResponse {
  //     return Promise.resolve(deepCopy(order));
  //   }
}

export const membersApi = new MembersApi();
