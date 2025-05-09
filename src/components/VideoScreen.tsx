import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const VideoScreen: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative h-full w-full">
      <img 
        src="/final.png" 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-[90%] max-h-[50%]">
          <button 
            onClick={toggleMute}
            className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-white" />
            ) : (
              <Volume2 className="h-5 w-5 text-white" />
            )}
          </button>

          <video 
            ref={videoRef}
            className="w-full h-full object-contain rounded-lg shadow-xl"
            autoPlay
            muted
            loop
            playsInline
            poster="/final.png"
          >
            <source src="/ulajh.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoScreen;