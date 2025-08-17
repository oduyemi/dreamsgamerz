import {
  IonPage,
  IonContent,
  IonText,
  IonButton,
  IonImg,
  IonToggle,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonIcon
} from '@ionic/react';
import './MovingPictureGame.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { trophyOutline, peopleOutline, sparklesOutline } from 'ionicons/icons';

const competitions = [
  { 
    label: '1st Competition', 
    image: '/images/hometoken.png', 
    players: 50,
    prize: '500 USDT',
    duration: '3 days left'
  },
  { 
    label: '2nd Competition', 
    image: '/images/single.png', 
    players: 50,
    prize: '300 USDT',
    duration: '1 day left'
  },
  { 
    label: '3rd Competition', 
    image: '/images/multi.png', 
    players: 50,
    prize: '200 USDT',
    duration: '5 days left'
  },
];

export const MovingPictureGameTab: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setDarkMode(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <IonPage className={darkMode ? 'theme-dark' : 'theme-light'}>
      <IonContent fullscreen className="mpg-bg">
        <div className="header-section">
          <motion.div
            className="theme-toggle-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <IonToggle
              checked={darkMode}
              onIonChange={(e) => setDarkMode(e.detail.checked)}
              color="primary"
              className="theme-toggle"
            />
            <IonText className="toggle-label">
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </IonText>
          </motion.div>

          <motion.div
            className="title-section"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <IonIcon 
              icon={sparklesOutline} 
              className="sparkle-icon"
              color="primary"
            />
            <h1 className="mpg-title">Moving Picture Game</h1>
            <IonText className="mpg-subtitle">
              Join exciting competitions and win amazing prizes
            </IonText>
          </motion.div>
        </div>

        <IonGrid className="competition-grid">
          <IonRow>
            {competitions.map((comp, index) => (
              <IonCol size="12" sizeMd="4" key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -5 }}
                >
                  <IonCard className="competition-card">
                    <IonCardContent>
                      <div className="card-header">
                        <div className="image-container">
                          <IonImg 
                            src={comp.image} 
                            alt={comp.label} 
                            className="competition-image"
                          />
                        </div>
                        <IonText className="competition-label">
                          {comp.label}
                        </IonText>
                      </div>

                      <div className="card-details">
                        <div className="detail-item">
                          <IonIcon icon={peopleOutline} />
                          <IonText>{comp.players} players</IonText>
                        </div>
                        <div className="detail-item">
                          <IonIcon icon={trophyOutline} />
                          <IonText>{comp.prize}</IonText>
                        </div>
                        <div className="detail-item">
                          <IonText>{comp.duration}</IonText>
                        </div>
                      </div>

                      <IonButton 
                        expand="block" 
                        className="join-btn"
                        fill={index === 0 ? "solid" : "outline"}
                        color={index === 0 ? "primary" : "medium"}
                      >
                        {index === 0 ? 'Join Now' : 'View Details'}
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </motion.div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <motion.div
          className="footer-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <IonButton 
            expand="block" 
            className="more-btn" 
            fill="solid"
            color="primary"
            shape="round"
          >
            Discover More Competitions
          </IonButton>
        </motion.div>
      </IonContent>
    </IonPage>
  );
};