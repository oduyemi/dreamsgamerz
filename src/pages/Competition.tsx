import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { GamersCompetitionTab } from '../components/GamersCompetitionTab';
import { AppLayout } from '../components/AppLayout';
import { useMediaQuery, useTheme } from '@mui/material';

const Competition: React.FC = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppLayout>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle style={{ color: '#caa84c', textAlign: 'center', fontWeight: 700, fontSize: isSmall ? '1.2rem' : '1.5rem' }}>Games</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 2</IonTitle>
            </IonToolbar>
          </IonHeader>
          <GamersCompetitionTab />
        </IonContent>
      </IonPage>
      </AppLayout>
  );
};

export default Competition;
