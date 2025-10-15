import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { GlobalStyles } from '@mui/material';
import { HomePage } from '../components/HomePage';
import { AppLayout } from '../components/AppLayout';

const Home: React.FC = () => {
  return (
    <AppLayout>
      <IonPage>
        <GlobalStyles
          styles={{
            body: { backgroundColor: '#ffffff' },
            '@keyframes bounce-subtle': {
              '0%, 100%': { transform: 'translateY(0) scale(1)' },
              '50%': { transform: 'translateY(-8px) scale(1.02)' },
            },
          }}
        />

        <IonHeader>
          <IonToolbar
            style={{
              backgroundColor: '#fff',
              borderBottom: '1px solid rgba(202,168,76,0.2)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <IonTitle
              style={{
                color: '#caa84c',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '1.5rem',
              }}
            >
              Dream Gamers
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent
          fullscreen
          style={{
            backgroundColor: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
            overflowY: 'auto',
          }}
        >
          <HomePage />
        </IonContent>
      </IonPage>
    </AppLayout>
  );
};

export default Home;
