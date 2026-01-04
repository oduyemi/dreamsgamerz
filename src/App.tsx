import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";

import Home from "./pages/Home";
import Competition from "./pages/Competition";
// import MovingPicture from "./pages/MovingPicture";
import { MovingPhotoGame } from "./components/movinggame/Intro";
import { MovingGame } from "./components/movinggame/Game";
import MovingPicturePlayGame from "./components/MovingPictureGamePlay";
import { TournamentLobby } from "./components/TournamentLobby";

import { VideoPage } from "./components/Video";
import { Short } from "./components/ShortVideo";
import { Funny } from "./components/FunnyVideo";
import { Inspire } from "./components/InspiringVideo";
import { AnimationVideo } from "./components/AnimationVideo";

import UserWallet from "./pages/Wallet";
import UserProfile from "./pages/Profile";
import { AdminDashboard } from "./components/AdminDashboard";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>

          {/* HOME */}
          <Route exact path="/" component={Home} />

          {/* GAMES */}
          <Route exact path="/games" component={Competition} />
          {/* <Route exact path="/games/moving-picture" component={MovingPicture} /> */}
          <Route exact path="/games/moving-picture" component={MovingPhotoGame} />
          <Route exact path="/games/moving-game/start"  component={MovingGame} />
          {/* MOVING PICTURE GAME FLOW */}
          <Route
            exact
            path="/games/moving-picture/lobby"
            component={TournamentLobby}
          />
          <Route
            exact
            path="/games/moving-picture/play"
            component={MovingPicturePlayGame}
          />

          {/* VIDEOS */}
          <Route exact path="/videos" component={VideoPage} />
          <Route exact path="/videos/shorts" component={Short} />
          <Route exact path="/videos/funny-videos" component={Funny} />
          <Route exact path="/videos/inspiration" component={Inspire} />
          <Route exact path="/videos/animations" component={AnimationVideo} />

          {/* USER */}
          <Route exact path="/wallet" component={UserWallet} />
          <Route exact path="/profile" component={UserProfile} />

          {/* ADMIN */}
          <Route exact path="/admin/dashboard" component={AdminDashboard} />

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
