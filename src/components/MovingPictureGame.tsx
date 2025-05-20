import {
  IonPage,
  IonContent,
  IonText,
  IonButton,
  IonImg,
  IonToggle,
} from '@ionic/react';
import './MovingPictureGame.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const competitions = [
  { label: '1st Competition', image: '/images/pic1.jpg', players: 50 },
  { label: '2nd Competition', image: '/images/pic2.jpg', players: 50 },
  { label: '3rd Competition', image: '/images/pic3.jpg', players: 50 },
];

export const MovingPictureGameTab: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setDarkMode(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <IonPage className={darkMode ? 'theme-dark' : 'theme-light'}>
      <IonContent fullscreen className="mpg-bg">
        <div className="theme-toggle">
          <IonText className="toggle-label">Dark Mode</IonText>
          <IonToggle
            checked={darkMode}
            onIonChange={(e) => setDarkMode(e.detail.checked)}
            color="light"
          />
        </div>

        <motion.h1
          className="mpg-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Moving Picture Game
        </motion.h1>

        <div className="competition-list">
          {competitions.map((comp, index) => (
            <motion.div
              key={index}
              className="competition-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="circle-image-wrapper">
                <IonImg src={comp.image} alt={comp.label} className="circle-image" />
                <div className="competition-label">{comp.label}</div>
              </div>
              <IonText className="players-text">{comp.players} players</IonText>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <IonButton expand="block" className="more-btn" fill="outline" color="light">
            More
          </IonButton>
        </motion.div>
      </IonContent>
    </IonPage>
  );
};
