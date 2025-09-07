import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import Competition from './pages/Competition';
import MovingPicture from './pages/MovingPicture';
import UserWallet from './pages/Wallet';
import UserProfile from './pages/Profile';
import './theme/variables.css';
import MovingPicturePlayGame from './components/MovingPictureGamePlay';
import { VideoPage } from './components/Video';



setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={Home} />
        <Route exact path="/games" component={Competition} />
        <Route exact path="/games/moving-picture" component={MovingPicture} />
        <Route exact path="/videos" component={VideoPage} />
        <Route exact path="/wallet" component={UserWallet} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/games/moving-picture/single" component={MovingPicturePlayGame} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
