import { FC } from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Scrollbar } from 'src/components/scrollbar';
import TableSkeleton from '../../../components/TableSkeleton';
import EmptyState from '../../../components/EmptyState';
import type { SalaireUnpaidData } from '../../../../../types/dashboard/unpaidTypes';
import { useTranslation } from 'react-i18next';
import { SeverityPill, type SeverityPillColor } from 'src/components/severity-pill';

interface SalairesTabProps {
  items: SalaireUnpaidData[];
  isLoading?: boolean;
}

const SalairesTab: FC<SalairesTabProps> = ({ items, isLoading }) => {
  const { t } = useTranslation();

  // Map status to SeverityPill color
  const getStatusColor = (status: string): SeverityPillColor => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'overdue':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'primary';
    }
  };

  if (isLoading) {
    return <TableSkeleton columnsCount={4} />;
  }

  if (items.length === 0) {
    return <EmptyState message={t('Aucun salaire impayé')} />;
  }

  return (
    <Card>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('Employé')}</TableCell>
              <TableCell>{t('Projet')}</TableCell>
              <TableCell>{t('Montant')}</TableCell>
              <TableCell>{t('Retard')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                hover
                key={item.id}
              >
                <TableCell>
                  <Typography variant="subtitle2">{item.employeeName}</Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    {item.position}
                  </Typography>
                </TableCell>
                <TableCell>{item.projectName}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(
                    item.amount
                  )}
                </TableCell>
                <TableCell>
                  <SeverityPill color={item.daysOverdue > 30 ? 'error' : 'warning'}>
                    {item.daysOverdue} {t('jours')}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
};
export default SalairesTab;
