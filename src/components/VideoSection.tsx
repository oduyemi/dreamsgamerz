import React, { useState } from "react";
import {
  IonImg,
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { close } from "ionicons/icons";
import "./VideoSection.css";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  youtubeId?: string;
  rating?: number;
  rank?: number;
  category?: string; // NEW
}

interface VideoSectionProps {
  title: string;
  tag?: string;
  videos: Video[];
  limit?: number; // NEW optional prop
  onViewAll?: () => void; // callback for CTA
}

const VideoSection: React.FC<VideoSectionProps> = ({ 
  title, 
  tag, 
  videos, 
  limit = 6, 
  onViewAll 
}) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const previewVideos = videos.slice(0, limit);
  return (
    <div className="video-section">
      {/* Header */}
      <div className="video-section-header">
        {tag && <span className="video-tag">{tag}</span>}
        <h2 className="video-section-title">{title}</h2>
        <button className="view-all-btn" onClick={onViewAll}>
          Check Full List
        </button>
      </div>

      {/* Grid */}
      <div className="video-grid">
        {previewVideos.map((video) => (
          <div
            key={video.id}
            className="video-card"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="video-thumb-container">
              <IonImg
                src={video.thumbnail}
                alt={video.title}
                className="video-thumbnail"
              />
              {video.rank && (
                <span className="rank-badge">TOP {video.rank.toString().padStart(2, "0")}</span>
              )}
              {video.rating && (
                <span className="rating-badge">{video.rating}</span>
              )}
              <div className="video-overlay">
                <span className="video-title">{video.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for playing video */}
      <IonModal
        isOpen={!!selectedVideo}
        onDidDismiss={() => setSelectedVideo(null)}
      >
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