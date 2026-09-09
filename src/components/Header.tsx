import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Music, Upload } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeaderProps {
  customAudioUrl: string | null;
  onAudioUpload: (file: File) => void;
}

export const Header: React.FC<HeaderProps> = ({ customAudioUrl, onAudioUpload }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle audio play/pause
  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current && customAudioUrl) {
        audioRef.current.pause();
      } else {
        soundEngine.stopAmbientCinemaMusic();
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current && customAudioUrl) {
        audioRef.current.play().catch(() => {
          // If browser blocked audio playback, fallback to ambient synthesis
          soundEngine.startAmbientCinemaMusic();
        });
      } else {
        // Ambient golden cinema sound
        soundEngine.startAmbientCinemaMusic();
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // If audio URL updates while playing
    if (customAudioUrl && audioRef.current && isPlaying) {
      soundEngine.stopAmbientCinemaMusic();
      audioRef.current.play().catch(() => {});
    }
  }, [customAudioUrl, isPlaying]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAudioUpload(file);
      // Auto play once user uploads their file
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 200);
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF7F2]/90 border-b border-[#E8DFC8] transition-colors">
      {customAudioUrl && (
        <audio
          ref={audioRef}
          src={customAudioUrl}
          loop
          onEnded={() => setIsPlaying(false)}
        />
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Left: Producer Cinema Logo / Monogram */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E6D5B8] via-[#D4AF37] to-[#997A35] p-[1.5px] shadow-sm flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#2D261E] font-serif-display font-semibold text-base">
              Е
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-display text-lg sm:text-xl font-bold tracking-wide text-[#2D261E]">
                ЕЛЕНА
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#F3E9DD] text-[#8C6D2B] font-medium border border-[#E5D7BF]">
                <Sparkles className="w-2.5 h-2.5" />
                Special Premiere
              </span>
            </div>
            <p className="text-xs text-[#7A6F62] tracking-wider uppercase font-medium">
              Кинопродюсер • Москва
            </p>
          </div>
        </div>

        {/* Right: Music Play Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="play-music-button"
            onClick={togglePlay}
            className={`group relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm ${
              isPlaying
                ? 'bg-[#2D261E] text-[#FDFBF7] shadow-md ring-2 ring-[#D4AF37]/50'
                : 'bg-gradient-to-r from-[#F0E6D2] via-[#E8DCBF] to-[#DFD0AC] text-[#2D261E] hover:shadow hover:scale-[1.02] border border-[#D9C8A5]'
            }`}
            title={isPlaying ? 'Остановить музыку' : 'Включить музыку'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
            ) : (
              <Play className="w-4 h-4 text-[#2D261E] fill-[#2D261E] ml-0.5" />
            )}

            <span className="text-xs sm:text-sm font-medium tracking-wide">
              {isPlaying ? 'Музыка играет' : 'Включить музыку'}
            </span>

            {/* Visualizer Soundwave Bars */}
            <div className="flex items-end gap-[3px] h-3.5 ml-1">
              <span
                className={`w-[2px] rounded-full transition-all ${
                  isPlaying
                    ? 'h-3.5 bg-[#D4AF37] animate-pulse'
                    : 'h-1.5 bg-[#A89880]'
                }`}
              />
              <span
                className={`w-[2px] rounded-full transition-all ${
                  isPlaying
                    ? 'h-2 bg-[#F3E9DD] animate-ping'
                    : 'h-2.5 bg-[#A89880]'
                }`}
              />
              <span
                className={`w-[2px] rounded-full transition-all ${
                  isPlaying
                    ? 'h-3 bg-[#D4AF37] animate-pulse'
                    : 'h-1 bg-[#A89880]'
                }`}
              />
            </div>
          </button>

          {/* Quick upload audio button */}
          <button
            id="upload-audio-btn"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-full text-[#7A6F62] hover:text-[#2D261E] hover:bg-[#F3E9DD] border border-[#E8DFC8] transition-colors"
            title="Выбрать свой аудиофайл (mp3)"
          >
            <Upload className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
