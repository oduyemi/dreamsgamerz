import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { GamersCompetitionTab } from '../components/GamersCompetitionTab';
import { AppLayout } from '../components/AppLayout';

const Competition: React.FC = () => {
  return (
    <AppLayout>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Games</IonTitle>
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
