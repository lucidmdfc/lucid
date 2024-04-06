import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import SvgIcon from '@mui/material/SvgIcon';

import GroupIcon from '@mui/icons-material/Group';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ConstructionIcon from '@mui/icons-material/Construction';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CalculateIcon from '@mui/icons-material/Calculate';
import UploadIcon from '@mui/icons-material/Upload';
import { tokens } from 'src/locales/tokens';
import { paths } from 'src/paths';
import FilePresentIcon from '@mui/icons-material/FilePresent';

export interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: Item[];
  subheader?: string;
}

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.overview),
            path: paths.dashboard.index,
            icon: (
              <SvgIcon fontSize="small">
                <DashboardIcon />
              </SvgIcon>
            ),
          },
        ],
      },
      {
        items: [
          {
            title: t(tokens.nav.revenus),
            path: paths.dashboard.revenus.index,
            icon: (
              <SvgIcon fontSize="small">
                <FileDownloadIcon />
              </SvgIcon>
            ),
            external: true,
            items: [
              {
                title: t(tokens.nav.projects_management),
                path: paths.dashboard.projets.index,
              },

              {
                title: t(tokens.nav.members_management),
                path: paths.dashboard.membres.index,
              },

              {
                title: t(tokens.nav.clients_management),
                path: paths.dashboard.clients.index,
              },
              {
                title: t(tokens.nav.invoices_management),
                path: paths.dashboard.invoices.index,
              },
            ],
          },
        ],
      },
      {
        items: [
          {
            title: 'Charge & Dépenses',
            icon: (
              <SvgIcon fontSize="small">
                <UploadIcon />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.salary),
                path: paths.dashboard.salary.index,
                icon: (
                  <SvgIcon fontSize="small">
                    <GroupIcon />
                  </SvgIcon>
                ),
              },
              {
                title: t(tokens.nav.utilities),
                path: paths.dashboard.utilities.index,
                icon: (
                  <SvgIcon fontSize="small">
                    <ConstructionIcon />
                  </SvgIcon>
                ),
              },
              {
                title: t(tokens.nav.achats),
                path: paths.dashboard.achats.index,
                icon: (
                  <SvgIcon fontSize="small">
                    <LocalGroceryStoreIcon />
                  </SvgIcon>
                ),
              },
              {
                title: t(tokens.nav.expenses),
                path: paths.dashboard.expenses.index,
                icon: (
                  <SvgIcon fontSize="small">
                    <RequestQuoteIcon />
                  </SvgIcon>
                ),
              },
            ],
          },
        ],
      },
      {
        items: [
          {
            title: t(tokens.nav.cash),
            path: paths.dashboard.cash.index,
            icon: (
              <SvgIcon fontSize="small">
                <CalculateIcon />
              </SvgIcon>
            ),
          },
        ],
      },
      {
        items: [
          {
            title: t(tokens.nav.fileManager),
            path: paths.dashboard.fileManager,
            icon: (
              <SvgIcon fontSize="small">
                <FilePresentIcon />
              </SvgIcon>
            ),
          },
        ],
      },
    ];
  }, [t]);
};
