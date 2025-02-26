import { FC } from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Scrollbar } from 'src/components/scrollbar';
import { TableSkeleton } from '../../../components/TableSkeleton';
import { EmptyState } from '../../../components/EmptyState';
import type { SoldeData } from '../../types';
import { useTranslation } from 'react-i18next';
import { SeverityPill, type SeverityPillColor } from 'src/components/severity-pill';

interface SoldeTabProps {
  items: SoldeData[];
  isLoading?: boolean;
}

export const SoldeTab: FC<SoldeTabProps> = ({ items, isLoading }) => {
  const { t } = useTranslation();

  // Map transaction type to SeverityPill color
  const getTransactionColor = (type: string): SeverityPillColor => {
    switch (type) {
      case 'income':
        return 'success';
      case 'expense':
        return 'error';
      default:
        return 'primary';
    }
  };

  if (isLoading) {
    return <TableSkeleton columnsCount={5} />;
  }

  if (items.length === 0) {
    return <EmptyState message={t('Aucune transaction')} />;
  }

  return (
    <Card>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('Transaction')}</TableCell>
              <TableCell>{t('Projet')}</TableCell>
              <TableCell>{t('Description')}</TableCell>
              <TableCell>{t('Montant')}</TableCell>
              <TableCell>{t('Solde')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                hover
                key={item.id}
              >
                <TableCell>
                  <SeverityPill color={getTransactionColor(item.transactionType)}>
                    {t(item.transactionType)}
                  </SeverityPill>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ mt: 1 }}
                  >
                    {item.category}
                  </Typography>
                </TableCell>
                <TableCell>{item.projectName}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(
                    item.amount
                  )}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(
                    item.runningBalance
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
};
