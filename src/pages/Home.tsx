import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { HomePage } from '../components/HomePage';
import { AppLayout } from '../components/AppLayout';

const Home: React.FC = () => {
  return (
    <AppLayout>
      <HomePage />
    </AppLayout>
  );
};

export default Home;
