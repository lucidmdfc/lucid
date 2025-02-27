import { ChangeEvent, FC } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'react-i18next';

export type ProjectTab =
  | 'tranches'
  | 'salaires'
  | 'utilities'
  | 'prestataires'
  | 'solde'
  | 'expenses';

interface TabsNavigationProps {
  currentTab: ProjectTab;
  onTabChange: (tab: ProjectTab) => void;
}

export const TabsNavigation: FC<TabsNavigationProps> = ({ currentTab, onTabChange }) => {
  const { t } = useTranslation();

  const handleTabsChange = (_: ChangeEvent<{}>, value: ProjectTab): void => {
    onTabChange(value);
  };

  return (
    <Tabs
      indicatorColor="primary"
      onChange={handleTabsChange}
      scrollButtons="auto"
      textColor="primary"
      value={currentTab}
      variant="scrollable"
      sx={{ px: 3 }}
    >
      <Tab
        label={t('Tranches')}
        value="tranches"
      />
      <Tab
        label={t('Salaires')}
        value="salaires"
      />
      <Tab
        label={t('Utilities')}
        value="utilities"
      />
      <Tab
        label={t('Prestataires')}
        value="prestataires"
      />
      <Tab
        label={t('Solde Caisse')}
        value="solde"
      />
      <Tab
        label={t('Notes de frais')}
        value="expenses"
      />
    </Tabs>
  );
};
