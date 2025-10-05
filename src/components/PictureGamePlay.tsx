import {
  IonPage,
  IonContent,
  IonButton,
  IonImg,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLoading,
  IonAlert,
  IonText
} from '@ionic/react';
import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { trophy, close, checkmark, reload, play, stopwatch, warning } from 'ionicons/icons';
import './PictureGamePlay.css';
import axios from "axios";
import { useMediaQuery, useTheme } from '@mui/material';

const MAX_TRIES = 5;
const WINS_TO_ADVANCE = 2;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

interface GameImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const PictureGamePlay: React.FC = () => {
  const [gameState, setGameState] = useState({
    started: false,
    loading: false,
    error: null as string | null,
    tries: 0,
    wins: 0,
    showFeedback: false,
    isSuccess: false,
    speed: 1
  });
  
  const [currentImage, setCurrentImage] = useState<GameImage | null>(null);
  const controls = useAnimation();
  const imageRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const getRandomImage = async (): Promise<string> => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/images/random`);
      const imageUrl = res.data.url;

      // Ensure image URL is absolute
      return imageUrl.startsWith('/')
        ? `${API_BASE_URL}${imageUrl}`
        : imageUrl;
    } catch (error) {
      console.error('Failed to fetch image:', error);
      return '';
    }
  };

  const startGame = async () => {
  setGameState(prev => ({ ...prev, loading: true, error: null }));

  try {
    const imageUrl = await getRandomImage();
    if (!imageUrl) throw new Error("No image returned");

    setCurrentImage({ url: imageUrl });

    // Preload
    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Image failed to load'));
    });

    setGameState(prev => ({ ...prev, started: true, loading: false }));
    animateImage();
  } catch (error) {
    console.error('Game initialization error:', error);
    setGameState(prev => ({
      ...prev,
      loading: false,
      error: error instanceof Error ? error.message : 'Failed to start game',
    }));
  }
};


  const resetGame = () => {
    controls.stop();
    setGameState({
      started: false,
      loading: false,
      error: null,
      tries: 0,
      wins: 0,
      showFeedback: false,
      isSuccess: false,
      speed: 1
    });
    setCurrentImage(null);
  };

  const animateImage = () => {
    controls.start({
      y: ['100%', '-100%'],
      transition: {
        duration: gameState.speed,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  };

  const stopGame = () => {
    controls.stop();
    const imageTop = imageRef.current?.getBoundingClientRect().top || 0;
    const circleCenter = window.innerHeight / 2;
    const success = Math.abs(imageTop - circleCenter) <= 30;

    setGameState(prev => ({
      ...prev,
      showFeedback: true,
      isSuccess: success,
      tries: prev.tries + 1,
      wins: success ? prev.wins + 1 : prev.wins
    }));

    setTimeout(() => {
      setGameState(prev => ({ ...prev, showFeedback: false }));
      
      if (gameState.tries + 1 >= MAX_TRIES) {
        setGameState(prev => ({ ...prev, started: false }));
      } else {
        startGame();
      }
    }, 1200);
  };

  // Clean up animation on unmount
  useEffect(() => {
    return () => controls.stop();
  }, [controls]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{ color: '#caa84c', textAlign: 'center', fontWeight: 700, fontSize: isSmall ? '1.2rem' : '1.5rem' }}>Picture Perfect</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="gameplay-bg">
        <IonLoading isOpen={gameState.loading} message="Loading image..." />
        <IonAlert
          isOpen={!!gameState.error}
          onDidDismiss={() => setGameState(prev => ({ ...prev, error: null }))}
          header="Error"
          message={gameState.error || 'Unknown error'}
          buttons={['OK']}
        />
        
        <div className="game-container">
          <div className="top-controls">
            <div className="stats-display">
              <div className="stat-item">
                <IonIcon icon={trophy} color="warning" />
                <span>{gameState.wins}/{WINS_TO_ADVANCE}</span>
              </div>
              <div className="stat-item">
                <IonIcon icon={stopwatch} color="medium" />
                <span>{gameState.tries}/{MAX_TRIES}</span>
              </div>
            </div>

            {!gameState.started ? (
              <IonButton 
                onClick={gameState.tries === 0 ? startGame : resetGame}
                expand="block" 
                color="primary"
                shape="round"
                className="action-button"
              >
                <IonIcon icon={gameState.tries === 0 ? play : reload} slot="start" />
                {gameState.tries === 0 ? 'Start Game' : 'Play Again'}
              </IonButton>
            ) : (
              <IonButton 
                onClick={stopGame} 
                expand="block" 
                color="danger"
                shape="round"
                className="action-button tap-button"
              >
                TAP NOW!
              </IonButton>
            )}
          </div>

          <div className="target-area">
            <div className="target-circle">
              <div className="target-center"></div>
              <div className="target-guides">
                <div className="guide-line"></div>
                <div className="guide-line"></div>
              </div>
              {gameState.started && currentImage && (
                <motion.div
                  className="moving-image"
                  animate={controls}
                  ref={imageRef}
                >
                  {currentImage && (
                    <IonImg
                      src={currentImage.url}
                      alt="Guess This Face"
                      style={{
                        width: '300px',
                        height: 'auto',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      }}
                    />
                  )}
                </motion.div>
              )}
            </div>

            <AnimatePresence>
              {gameState.showFeedback && (
                <motion.div
                  className={`feedback ${gameState.isSuccess ? 'success' : 'fail'}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                >
                  <IonIcon icon={gameState.isSuccess ? checkmark : close} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {gameState.tries > 0 && (
            <div className={`result-display ${gameState.isSuccess ? 'success' : 'fail'}`}>
              <IonText>
                {gameState.isSuccess ? 'Perfect hit!' : 'Missed!'} 
                {gameState.tries < MAX_TRIES ? ` ${MAX_TRIES - gameState.tries} tries remaining` : ''}
              </IonText>
            </div>
          )}

          {gameState.tries >= MAX_TRIES && (
            <motion.div
              className="game-summary"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="summary-content">
                <IonIcon 
                  icon={gameState.wins >= WINS_TO_ADVANCE ? trophy : close} 
                  className={`summary-icon ${gameState.wins >= WINS_TO_ADVANCE ? 'success' : 'fail'}`}
                />
                <h3>
                  {gameState.wins >= WINS_TO_ADVANCE
                    ? 'Level Complete!'
                    : 'Challenge Failed'}
                </h3>
                <p>
                  {gameState.wins >= WINS_TO_ADVANCE
                    ? `You won ${gameState.wins} out of ${MAX_TRIES} attempts!`
                    : `You needed ${WINS_TO_ADVANCE} wins but got ${gameState.wins}`}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

