import { ChangeEvent, FC } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'react-i18next';

export type UnpaidTab = 'factures' | 'salaires' | 'utilities' | 'prestataires';

interface TabsNavigationProps {
  currentTab: UnpaidTab;
  onTabChange: (tab: UnpaidTab) => void;
}

export const TabsNavigation: FC<TabsNavigationProps> = ({ currentTab, onTabChange }) => {
  const { t } = useTranslation();

  const handleTabsChange = (_: ChangeEvent<{}>, value: UnpaidTab): void => {
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
        label={t('Factures')}
        value="factures"
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
    </Tabs>
  );
};
