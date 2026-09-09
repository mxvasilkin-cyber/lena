import React, { useState } from 'react';
import { Sparkles, Film, Heart, RefreshCw, Volume2 } from 'lucide-react';
import { CINEMA_WISHES } from '../data/slides';
import { soundEngine } from '../utils/audio';
import { triggerGoldenSparkles } from '../utils/confetti';

export const Clapperboard: React.FC = () => {
  const [wishIndex, setWishIndex] = useState<number>(0);
  const [takeCount, setTakeCount] = useState<number>(1);
  const [isClapping, setIsClapping] = useState<boolean>(false);

  const currentWish = CINEMA_WISHES[wishIndex];

  const handleClap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isClapping) return;

    // Trigger clap animation
    setIsClapping(true);

    // Audio click effect
    soundEngine.playClapperSound();

    // Trigger golden sparkles originating from clapper position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + 50;
    triggerGoldenSparkles(x, y);

    // Increment take and change wish
    setTimeout(() => {
      setWishIndex((prev) => (prev + 1) % CINEMA_WISHES.length);
      setTakeCount((prev) => prev + 1);
    }, 150);

    // Reset clapping state
    setTimeout(() => {
      setIsClapping(false);
    }, 450);
  };

  return (
    <section id="clapperboard" className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-24">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8C6D2B] bg-[#F4EADB] px-3.5 py-1.5 rounded-full border border-[#E2D4BC] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Интерактивная хлопушка поздравлений</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#2D261E] tracking-tight">
          Мотор! Камера! С днём рождения!
        </h2>
        <p className="text-sm sm:text-base text-[#7A6F62] mt-2 max-w-xl mx-auto font-light">
          Нажмите на хлопушку, чтобы сделать новый праздничный дубль и открыть вдохновляющее пожелание
        </p>
      </div>

      {/* Cinematic Clapperboard Slate */}
      <div
        id="cinema-clapperboard-slate"
        onClick={handleClap}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClap(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        className="relative group cursor-pointer select-none mx-auto max-w-2xl bg-[#201A15] rounded-2xl shadow-2xl p-4 sm:p-7 border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all duration-300 transform hover:-translate-y-1 champagne-glow overflow-hidden"
      >
        {/* TOP HINGED CLAPPER BAR */}
        <div className="relative mb-5 origin-bottom-left transition-transform duration-200">
          {/* Top movable stick */}
          <div
            className={`w-full h-11 sm:h-14 rounded-lg overflow-hidden flex shadow-md transition-transform duration-200 ease-in-out ${
              isClapping ? '-rotate-12 -translate-y-2' : 'rotate-0 translate-y-0 group-hover:-rotate-3'
            }`}
            style={{
              background: 'repeating-linear-gradient(-45deg, #F8F5EE 0, #F8F5EE 24px, #201A15 24px, #201A15 48px)'
            }}
          >
            {/* Clapper hinge metal detail */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-[#1A140F] shadow-sm flex items-center justify-center z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1A140F]" />
            </div>
          </div>

          {/* Lower fixed stick */}
          <div
            className="w-full h-7 sm:h-9 rounded-md overflow-hidden flex mt-1 border-t border-[#3B3228]"
            style={{
              background: 'repeating-linear-gradient(-45deg, #201A15 0, #201A15 24px, #F8F5EE 24px, #F8F5EE 48px)'
            }}
          />
        </div>

        {/* SLATE BODY - Production Fields */}
        <div className="bg-[#1A1510] rounded-xl border border-[#D4AF37]/30 p-4 sm:p-6 text-[#FAF7F2]">
          {/* Header row of slate */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-[#3B3228] pb-3 text-center">
            <div className="border-r border-[#3B3228] last:border-0 pr-2">
              <span className="block text-[10px] uppercase tracking-wider text-[#A89880]">ПРОЕКТ</span>
              <span className="font-serif-display font-semibold text-xs sm:text-sm text-[#F3E9DD]">
                Елена: Жизнь
              </span>
            </div>
            <div className="border-r border-[#3B3228] last:border-0 pr-2">
              <span className="block text-[10px] uppercase tracking-wider text-[#A89880]">ПРОДЮСЕР</span>
              <span className="font-serif-display font-semibold text-xs sm:text-sm text-[#D4AF37]">
                Елена
              </span>
            </div>
            <div className="border-r border-[#3B3228] last:border-0 pr-2">
              <span className="block text-[10px] uppercase tracking-wider text-[#A89880]">СЦЕНА</span>
              <span className="font-serif-display font-semibold text-xs sm:text-sm text-[#F3E9DD]">
                {currentWish.scene}
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#A89880]">ДУБЛЬ</span>
              <span className="font-serif-display font-bold text-sm sm:text-base text-[#D4AF37]">
                #{takeCount}
              </span>
            </div>
          </div>

          {/* Core Slate Info - The Changing Wish */}
          <div className="py-6 sm:py-8 text-center min-h-[190px] flex flex-col justify-center items-center">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-3">
              <Heart className="w-4 h-4 fill-[#D4AF37]/20" />
            </div>

            <p className="font-serif-display text-lg sm:text-2xl text-[#FDFBF7] font-medium leading-snug max-w-xl mx-auto italic transition-all duration-300">
              {currentWish.quote}
            </p>

            <p className="text-xs sm:text-sm text-[#CFC2AF] mt-3.5 max-w-lg mx-auto leading-relaxed font-light">
              {currentWish.body}
            </p>

            <div className="mt-4 inline-block px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#E7C979] text-xs font-medium tracking-wide">
              ★ {currentWish.highlight}
            </div>
          </div>

          {/* Slate Footer Details */}
          <div className="grid grid-cols-3 gap-2 border-t border-[#3B3228] pt-3 text-[11px] text-[#A89880]">
            <div>
              <span className="text-[#6E6456]">РЕЖИССЁР:</span> Судьба
            </div>
            <div className="text-center">
              <span className="text-[#6E6456]">КАМЕРА:</span> Любовь и Свет
            </div>
            <div className="text-right">
              <span className="text-[#6E6456]">ЗВУК:</span> Овации & Музыка
            </div>
          </div>
        </div>

        {/* Action Callout & Hint */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#C5B396] px-1">
          <span className="flex items-center gap-1.5 text-[#E6C687]">
            <RefreshCw className={`w-3.5 h-3.5 ${isClapping ? 'animate-spin' : ''}`} />
            <span>Нажмите, чтобы хлопнуть</span>
          </span>
          <span className="text-[#8F816E]">
            Дублей снято: <strong className="text-[#FAF7F2]">{takeCount}</strong>
          </span>
        </div>
      </div>
    </section>
  );
};
