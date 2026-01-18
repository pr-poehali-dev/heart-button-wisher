import { useState } from 'react';
import { Button } from '@/components/ui/button';

const wishes = [
  "💖 Пусть этот день принесёт тебе радость!",
  "✨ Желаю волшебного настроения!",
  "🌸 Пусть улыбка не сходит с твоего лица!",
  "🌈 Солнечного дня и море позитива!",
  "💫 Пусть все мечты сбудутся сегодня!",
  "🎀 Желаю моря счастья и вдохновения!",
  "🌟 Пусть день будет полон приятных сюрпризов!",
  "💝 Тепла, уюта и добрых людей рядом!",
  "🦋 Лёгкости и красоты в каждом моменте!",
  "🌺 Пусть сегодня случится что-то прекрасное!",
  "💕 Желаю ярких эмоций и улыбок!",
  "🎉 Праздничного настроения на весь день!",
  "🌼 Пусть жизнь дарит только хорошее!",
  "✨ Волшебства и чудес на твоём пути!",
  "💗 Любви, тепла и уютных моментов!"
];

const Index = () => {
  const [currentWish, setCurrentWish] = useState<string>('');
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; rotation: number; delay: number }>>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const playSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const generateWish = () => {
    setIsAnimating(true);
    playSound();
    
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    setCurrentWish(randomWish);
    
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 60,
      y: 50 + (Math.random() - 0.5) * 60,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.2,
    }));
    setSparkles(newSparkles);
    
    setTimeout(() => {
      setSparkles([]);
      setIsAnimating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-400 via-purple-400 to-pink-500">
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <div 
              className="w-2 h-2 rotate-45"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFF 50%, #FFD700 100%)',
                boxShadow: '0 0 8px rgba(255, 215, 0, 0.8)',
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <h1 
          className="text-6xl md:text-8xl font-bold text-white mb-16 animate-float drop-shadow-2xl text-center px-4" 
          style={{ 
            fontFamily: 'Pacifico, cursive',
            textShadow: '0 0 30px rgba(255,105,180,1), 0 0 60px rgba(217,70,239,0.8), 4px 4px 8px rgba(0,0,0,0.3)',
            letterSpacing: '0.05em'
          }}
        >
          Пожелание дня
        </h1>

        <div className="mb-16 relative">
          <Button
            onClick={generateWish}
            disabled={isAnimating}
            className="group relative w-72 h-72 p-0 border-none overflow-visible bg-transparent hover:bg-transparent transition-all duration-300"
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(255,20,147,0.5))',
            }}
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-full h-full transition-transform duration-300 group-hover:scale-110"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255,105,180,0.8))',
              }}
            >
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ff1493', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#ff69b4', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#ffb6c1', stopOpacity: 1 }} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path 
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                fill="url(#heartGradient)"
                stroke="#fff"
                strokeWidth="0.5"
                filter="url(#glow)"
                className="animate-pulse-glow"
              />
            </svg>
            
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                animation: 'shimmer 2s linear infinite',
              }}
            />
          </Button>

          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute pointer-events-none"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animation: `sparkle 1s ease-out forwards`,
                animationDelay: `${sparkle.delay}s`,
              }}
            >
              <div 
                className="w-6 h-6"
                style={{
                  background: 'linear-gradient(45deg, #FFD700 0%, #FFF 50%, #FFD700 100%)',
                  transform: `rotate(${sparkle.rotation}deg)`,
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                  boxShadow: '0 0 15px rgba(255, 215, 0, 1)',
                }}
              />
            </div>
          ))}
        </div>

        {currentWish && (
          <div className="max-w-2xl text-center animate-float">
            <div 
              className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-10 border-4"
              style={{
                borderImage: 'linear-gradient(135deg, #FFD700, #ff69b4, #d946ef, #FFD700) 1',
                boxShadow: '0 0 60px rgba(255,105,180,0.6), 0 25px 70px rgba(0,0,0,0.3), inset 0 0 30px rgba(255,215,0,0.1)',
              }}
            >
              <p 
                className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-relaxed"
                style={{ 
                  fontFamily: 'Chewy, cursive',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {currentWish}
              </p>
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <p 
            className="text-3xl text-white font-bold drop-shadow-lg animate-pulse"
            style={{ 
              fontFamily: 'Caveat, cursive',
              textShadow: '0 0 20px rgba(255,215,0,0.8), 3px 3px 6px rgba(0,0,0,0.4)',
            }}
          >
            Нажми на сердечко! 💖
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-600/40 to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
