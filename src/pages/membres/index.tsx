import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NextPage } from 'next';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { Seo } from 'src/components/seo';
import { useDialog } from 'src/hooks/use-dialog';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { Member } from 'src/types/member';
import MemberDrawer from './sections/member-drawer';
import MemberListSearch from './sections/member-list-search';
import MemberListTable from './sections/member-list-table';
import MemberListContainer from './sections/member-list-container';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { membersApi } from 'src/api/members';
import { useQuery } from '@apollo/client';
import { GET_MEMBER, GET_MEMBERS } from 'src/graphql/entities/members/queries';
interface Filters {
  query?: string;
}

interface MemberSearchState {
  filters: Filters;
  page: number | undefined;
  rowsPerPage: number | undefined;
}

const useMembersSearch = () => {
  const [state, setState] = useState<MemberSearchState>({
    filters: {
      query: undefined,
    },
    page: 0,
    rowsPerPage: 5,
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handlePageChange = useCallback(
    async (event: MouseEvent<HTMLButtonElement> | null, page: number): Promise<void> => {
      console.log(page);

      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    [setState]
  );

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 5),
    }));
  }, []);

  return {
    handleFiltersChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

interface MemberStoreState {
  members: Member[];
  membersCount: number;
}

const useMembersStore = (searchState: MemberSearchState) => {
  const isMounted = useMounted();

  const [state, setState] = useState<MemberStoreState>({
    members: [],
    membersCount: 0,
  });

  const handleMembersGet = useCallback(async () => {
    try {
      const response = await membersApi.getMembers(searchState);
      console.log(response);

      if (isMounted()) {
        setState({
          members: response.data,
          membersCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  const handleMemberDelete = useCallback(() => {
    handleMembersGet();
  }, [handleMembersGet]);
  const handleMemberUpdate = useCallback(() => {
    handleMembersGet();
  }, [handleMembersGet]);
  useEffect(() => {
    handleMembersGet();
  }, [handleMembersGet, searchState]);

  return {
    ...state,
    onDeleteMember: handleMemberDelete,
    onUpdateMember: handleMemberUpdate,
  };
};

const useCurrentMember = (members: Member[], id?: string): Member | undefined => {
  return useMemo((): Member | undefined => {
    if (!id) {
      return undefined;
    }

    return members.find((member) => member.id === id);
  }, [members, id]);
};

const Page: NextPage = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const membersSearch = useMembersSearch();
  const membersStore = useMembersStore(membersSearch.state);
  const dialog = useDialog<string>();
  const currentMember = useCurrentMember(membersStore.members, dialog.data);
  const { t } = useTranslation();
  usePageView();
  const { loading, error, data } = useQuery(GET_MEMBERS);

  const {
    loading: singleMemberLoading,
    error: singleMemberError,
    data: singleMemberData,
  } = useQuery(GET_MEMBER, { variables: { id: dialog.data } });

  // console.log(singleMemberData?.membersCollection?.edges[0]?.node);
  // console.log(currentMember);

  const members = data?.membersCollection?.edges?.map((edge: { node: any }) => edge.node) || [];
  console.log(members);
  const handleMemberOpen = useCallback(
    (memberId: string): void => {
      // Close drawer if is the same order

      if (dialog.open && dialog.data === memberId) {
        dialog.handleClose();
        return;
      }

      dialog.handleOpen(memberId);
    },
    [dialog]
  );

  return (
    <>
      <Seo title="Revenus: Gestion membres" />
      <Divider />
      <Box
        component="main"
        ref={rootRef}
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: 'flex',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <MemberListContainer open={dialog.open}>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
                sx={{ mx: 5 }}
              >
                <div>
                  <Typography variant="h4">{t(tokens.nav.members_management)}</Typography>
                </div>
                <Button
                  component={RouterLink}
                  href={paths.membres.create}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Nouveau
                </Button>
              </Stack>
            </Box>
            <Divider />

            <Divider />
            <MemberListSearch onFiltersChange={membersSearch.handleFiltersChange} />
            <Divider />
            <MemberListTable
              count={membersStore.membersCount}
              // members={membersStore.members}
              members={members}
              onPageChange={membersSearch.handlePageChange}
              onRowsPerPageChange={membersSearch.handleRowsPerPageChange}
              onSelect={handleMemberOpen}
              page={membersSearch.state.page}
              rowsPerPage={membersSearch.state.rowsPerPage}
              onDeleteMember={membersStore.onDeleteMember}
            />
          </MemberListContainer>
          <MemberDrawer
            container={rootRef.current}
            onClose={dialog.handleClose}
            open={dialog.open}
            member={singleMemberData?.membersCollection?.edges[0]?.node}
            onUpdateMember={membersStore.onUpdateMember}
          />
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
