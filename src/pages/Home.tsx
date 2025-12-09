import { GlobalStyles } from '@mui/material';
import { HomePage } from '../components/HomePage';
import { AppLayout } from '../components/AppLayout';

const Home: React.FC = () => {
  return (
    <AppLayout>
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#ffffff' },
          '@keyframes bounce-subtle': {
            '0%, 100%': { transform: 'translateY(0) scale(1)' },
            '50%': { transform: 'translateY(-8px) scale(1.02)' },
          },
        }}
      />

      <div
        style={{
          backgroundColor: '#fff',
          width: '100%',
          padding: '16px 0',
          textAlign: 'center',
          borderBottom: '1px solid rgba(202,168,76,0.2)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <h1 style={{ color: '#caa84c', fontWeight: 700 }}>Dream Gamers</h1>
      </div>

      {/* Main page content */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 90px)',
        }}
      >
        <HomePage />
      </div>
    </AppLayout>
  );
};

export default Home;
