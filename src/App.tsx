import React, { useState } from "react";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import { UserProvider } from "./userContext";

/* PAGES */
import Home from "./pages/Home";
import Competition from "./pages/Competition";
import UserWallet from "./pages/Wallet";
import UserProfile from "./pages/Profile";

/* AUTH */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* GAMES */
import { MovingPhotoGame } from "./components/movinggame/Intro";
// import { MovingGame } from "./components/movinggame/Game";
import { GameArena } from './components/MovingPictureGame';
import MovingPicturePlayGame from "./components/MovingPictureGamePlay";
import { TournamentLobby } from "./components/TournamentLobby";

/* VIDEOS */
import { VideoPage } from "./components/Video";
import { Short } from "./components/ShortVideo";
import { Funny } from "./components/FunnyVideo";
import { Inspire } from "./components/InspiringVideo";
import { AnimationVideo } from "./components/AnimationVideo";

/* ADMIN */
import { AdminDashboard } from "./components/AdminDashboard";

/* IONIC STYLES */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const [lives, setLives] = React.useState(3);

  const handleLoseLife = () => {
    setLives((prev) => Math.max(prev - 1, 0));
  };

  return (
    <IonApp>
      <UserProvider>
        <IonReactRouter>
          <IonRouterOutlet>

            {/* AUTH */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            {/* HOME */}
            <Route exact path="/" component={Home} />

            {/* GAMES */}
            <Route exact path="/games" component={Competition} />
            <Route exact path="/games/moving-picture" component={MovingPhotoGame} />
            <Route
              exact
              path="/games/moving-game/start"
              render={() => (
                <GameArena
                  lives={lives}
                  onLoseLife={handleLoseLife}
                />
              )}
            />
            <Route exact path="/games/moving-picture/lobby" component={TournamentLobby} />
            <Route exact path="/games/moving-picture/play" component={MovingPicturePlayGame} />

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

            {/* FALLBACK */}
            <Redirect to="/" />

          </IonRouterOutlet>
        </IonReactRouter>
      </UserProvider>
    </IonApp>
  );
};

export default App;
