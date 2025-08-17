import React, { useState } from "react";
import { IonImg, IonModal, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import "./VideoSection.css";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  url?: string;
  youtubeId?: string;
}

interface VideoSectionProps {
  title: string;
  videos: Video[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ title, videos }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="video-section">
      <h2 className="video-section-title">{title}</h2>
      <div className="video-row">
        {videos.map((video) => (
          <div
            key={video.id}
            className="video-card"
            onClick={() => setSelectedVideo(video)}
          >
            <IonImg
              src={video.thumbnail}
              alt={video.title}
              className="video-thumbnail"
            />
            <div className="video-overlay">
              <span>{video.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for playing video */}
      <IonModal isOpen={!!selectedVideo} onDidDismiss={() => setSelectedVideo(null)}>
        <IonHeader>
          <IonToolbar color="dark">
            <IonTitle>{selectedVideo?.title}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setSelectedVideo(null)}>
                <IonIcon icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen color="dark">
          {selectedVideo && (
            <div className="video-player-container">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </IonContent>
      </IonModal>
    </div>
  );
};

export default VideoSection;
