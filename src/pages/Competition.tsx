import { GamersCompetitionTab } from '../components/GamersCompetitionTab';
import { AppLayout } from '../components/AppLayout';
import { useMediaQuery, useTheme } from '@mui/material';

const Competition = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppLayout>

      <div className="header">
        <h1 style={{ fontSize: isSmall ? '1.2rem' : '1.5rem' }}>Games</h1>
      </div>

      <div className="page-content">
        <GamersCompetitionTab />
      </div>

    </AppLayout>
  );
};

export default Competition;
