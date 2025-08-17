import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonButton,
  IonText,
  IonIcon,
} from '@ionic/react';
import './GamersCompetitionTab.css';
import token from '/images/token.png';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { trophyOutline, timeOutline, gameControllerOutline, sparklesOutline } from 'ionicons/icons';

const MotionButton = motion(IonButton);

const competitions = [
  { 
    id: 1, 
    image: token, 
    title: "Moving Picture", 
    description: "Test your reflexes with this fast-paced image matching game",
    highlight: true, 
    link: "/games/moving-picture",
    prize: "500 Tokens"
  },
  { 
    id: 2, 
    comingSoon: true,
    title: "Memory Challenge",
    description: "Coming soon: An exciting memory-based competition",
    link:"" 
  },
  { 
    id: 3, 
    comingSoon: true,
    title: "Speed Typing",
    description: "Coming soon: Prove your typing speed against others",
    link:"" 
  },
];

export const GamersCompetitionTab: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <IonPage>
        <IonContent fullscreen className="gamers-bg">
          <div className="competition-container">
            <div className="competition-header">
              <IonText color="light">
                <motion.h1
                  className="competition-title"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <IonIcon icon={gameControllerOutline} className="title-icon" />
                  Gamers Arena
                </motion.h1>
              </IonText>
              
              <motion.p 
                className="competition-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Compete against players worldwide and win amazing prizes
              </motion.p>
            </div>

            <div className="competition-grid">
              <AnimatePresence>
                {competitions.map((item, index) => {
                  const MotionCard = motion(IonCard);

                  return item.comingSoon ? (
                    <MotionCard
                      key={item.id}
                      className={`competition-card coming-soon-card`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.03, boxShadow: "0px 6px 20px rgba(255, 215, 0, 0.3)" }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <IonCardHeader>
                        <IonCardTitle className="coming-soon-title">
                          <IonIcon icon={timeOutline} /> {item.title}
                        </IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent className="coming-soon-content">
                        <p>{item.description}</p>
                        <div className="coming-soon-badge">
                          <IonIcon icon={sparklesOutline} /> Coming Soon
                        </div>
                      </IonCardContent>
                    </MotionCard>
                  ) : (
                    <MotionCard
                      key={item.id}
                      className={`competition-card highlight-card`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px rgba(0, 191, 255, 0.4)" }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <Box textAlign="center" className="game-image-container">
                        <Link to={item.link}>
                          <motion.img 
                            src={item.image} 
                            alt={item.title} 
                            className="game-img"
                            whileHover={{ scale: 1.05 }}
                          />
                          <div className="prize-badge">
                            <IonIcon icon={trophyOutline} /> {item.prize}
                          </div>
                        </Link>
                      </Box>
                      <IonCardHeader>
                        <IonCardTitle className="highlight-title">{item.title}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent className="highlight-content">
                        <p>{item.description}</p>
                        <MotionButton
                          expand="block"
                          fill="solid"
                          color="primary"
                          className="play-now-btn"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Play Now
                        </MotionButton>
                      </IonCardContent>
                    </MotionCard>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="more-slot-wrapper">
              <MotionButton
                fill="outline"
                color="light"
                className="more-slot-btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                View All Competitions
              </MotionButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </motion.div>
  );
};