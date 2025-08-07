import { Tab } from '@mui/material';
import { useRouteMatch } from '@lib/hooks';
import { tabs } from './tabs';
import { Link } from 'react-router-dom';
import { StyledTabs } from './Tabs.style';

const Tabs = () => {
  const routes = tabs.map((tab) => tab.path);
  const currentTab = useRouteMatch(routes);

  return (
    <StyledTabs value={currentTab ?? tabs[0].path}>
      {tabs.map(({ label, path }) => (
        <Tab key={label} label={label} value={path} to={path} component={Link} />
      ))}
    </StyledTabs>
  );
};

export default Tabs;
