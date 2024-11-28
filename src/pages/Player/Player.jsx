import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa';
import './Player.css';

const Player = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('default');
  const playerRef = useRef(null);

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
  };

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const isCurrentlyMuted = playerRef.current.isMuted();
    playerRef.current[isCurrentlyMuted ? 'unMute' : 'mute']();
    setIsMuted(!isCurrentlyMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    playerRef.current.setVolume(newVolume);
    setIsMuted(newVolume === '0');
  };

  const handleProgressUpdate = () => {
    const currentTime = playerRef.current.getCurrentTime();
    const duration = playerRef.current.getDuration();
    setProgress((currentTime / duration) * 100);
  };

  const handleProgressClick = (e) => {
    const newTime = (e.nativeEvent.offsetX / e.target.clientWidth) * playerRef.current.getDuration();
    playerRef.current.seekTo(newTime, true);
  };

  const handleFullscreen = () => {
    if (playerRef.current.getIframe().requestFullscreen) {
      playerRef.current.getIframe().requestFullscreen();
    }
  };

  const handleQualityChange = (e) => {
    const newQuality = e.target.value;
    setQuality(newQuality);
    playerRef.current.setPlaybackQuality(newQuality);
  };

  const handlePlaybackRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
    playerRef.current.setPlaybackRate(newRate);
  };

  return (
    <div className="player-container">
      <YouTube
        videoId={videoId}
        opts={{
          width: '100%', // Buat width penuh
          height: '100%', // Buat height penuh
          playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            vq: 'hd2160',
          },
        }}
        onReady={onPlayerReady}
        onStateChange={handleProgressUpdate}
        className="video-frame"
      />
      <div className="overlay">
        <button onClick={togglePlay} className="play-button">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <div className="controls">
        <div className="progress-bar" onClick={handleProgressClick}>
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
        <div className='button'>
          <div className="control-buttons">
              <button onClick={togglePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <div className="volume-control">
              <button onClick={toggleMute}>
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
            <select onChange={handleQualityChange} value={quality}>
              <option value="default">Auto</option>
              <option value="small">144p</option>
              <option value="medium">360p</option>
              <option value="large">480p</option>
              <option value="hd720">720p</option>
              <option value="hd1080">1080p</option>
              <option value="hd1440">1440p</option>
              <option value="hd2160">4K</option>
            </select>
            <select onChange={handlePlaybackRateChange} value={playbackRate}>
              <option value="0.25">0.25x</option>
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x (Normal)</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="1.75">1.75x</option>
              <option value="2">2x</option>
            </select>
          </div>
          <div className="control-buttons">
            <button onClick={handleFullscreen}>
              <FaExpand />
            </button>
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default Player;
