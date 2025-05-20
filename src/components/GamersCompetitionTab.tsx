import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonButton,
  IonText,
} from '@ionic/react';
import './GamersCompetitionTab.css';
import billardsGif from '/images/gifs/billards.gif';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';


const MotionButton = motion(IonButton);

const competitions = [
  { id: 1, image: billardsGif, title: "Moving Picture", highlight: true, link: "/games/moving-picture" },
  { id: 2, comingSoon: true, link:"" },
  { id: 3, comingSoon: true, link:"" },
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
              <IonText color="light">
                <motion.h1
                  className="competition-title"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Gamers Competition
                </motion.h1>

              </IonText>

              <div className="competition-grid">
                <AnimatePresence>
                  {competitions.map((item, index) => {
                    const MotionCard = motion(IonCard);

                    return item.comingSoon ? (
                      <MotionCard
                        key={item.id}
                        className={`competition-card ${item.comingSoon ? 'coming-card' : 'highlight-card'}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03, boxShadow: "0px 6px 20px rgba(0, 191, 255, 0.3)" }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        <IonCardContent className="coming-soon-text">Coming Soon</IonCardContent>
                      </MotionCard>
                    ) : (
                      <MotionCard
                        key={item.id}
                        className={`competition-card ${item.comingSoon ? 'coming-card' : 'highlight-card'}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        whileHover={{ scale: 1.03, boxShadow: "0px 6px 20px rgba(0, 191, 255, 0.3)" }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        <Box textAlign="center">
                          <Link to={item.link}>
                            <img src={item.image} alt={item.title} className="game-img" />
                          </Link>
                        </Box>
                        <IonCardHeader>
                          <IonCardTitle className="highlight-title">{item.title}</IonCardTitle>
                        </IonCardHeader>
                      </MotionCard>
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="more-slot-wrapper">
                <MotionButton
                  fill="outline"
                  color="primary"
                  className="more-slot-btn"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  More Slot
                </MotionButton>
              </div>
            </div>
          </IonContent>
        </IonPage>
    </motion.div>
  );
};

