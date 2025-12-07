import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Competition from './pages/Competition';
import MovingPicture from './pages/MovingPicture';
import MovingPicturePlayGame from './components/MovingPictureGamePlay';

import { VideoPage } from './components/Video';
import { Short } from './components/ShortVideo';
import { Funny } from './components/FunnyVideo';
import { Inspire } from './components/InspiringVideo';
import { AnimationVideo } from './components/AnimationVideo';

import UserWallet from './pages/Wallet';
import UserProfile from './pages/Profile';

import { AdminDashboard } from './components/AdminDashboard';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Home} />
          <Route path="/games" component={Competition} />
          <Route path="/games/moving-picture" component={MovingPicture} />
          <Route path="/games/moving-picture/single" component={MovingPicturePlayGame} />
          <Route path="/videos" component={VideoPage} />
          <Route path="/videos/shorts" component={Short} />
          <Route path="/videos/funny-videos" component={Funny} />
          <Route path="/videos/inspiration" component={Inspire} />
          <Route path="/videos/animations" component={AnimationVideo} />
          <Route path="/wallet" component={UserWallet} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
