import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
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
    
    const newSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setSparkles(newSparkles);
    
    setTimeout(() => {
      setSparkles([]);
      setIsAnimating(false);
    }, 1000);
  };

  useEffect(() => {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      setTimeout(() => {
        (star as HTMLElement).style.animationDelay = `${index * 0.2}s`;
      }, index * 100);
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-300 via-purple-300 to-pink-400">
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star absolute text-yellow-300 animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 animate-float drop-shadow-2xl text-center" 
            style={{ 
              fontFamily: 'Comic Sans MS, cursive',
              textShadow: '0 0 20px rgba(255,105,180,0.8), 0 0 40px rgba(217,70,239,0.6)'
            }}>
          💝 Пожелание дня 💝
        </h1>

        <div className="mb-12 relative">
          <Button
            onClick={generateWish}
            disabled={isAnimating}
            className="w-64 h-64 rounded-full bg-gradient-to-br from-pink-500 via-pink-400 to-pink-300 hover:from-pink-600 hover:via-pink-500 hover:to-pink-400 border-8 border-white shadow-2xl animate-pulse-glow transition-all duration-300 hover:scale-110 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ff1493 0%, #ff69b4 50%, #ffb6c1 100%)',
            }}
          >
            <Icon name="Heart" size={120} className="text-white drop-shadow-xl" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" 
                 style={{ backgroundSize: '1000px 100%' }} />
          </Button>

          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute text-4xl animate-sparkle pointer-events-none"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
              }}
            >
              ✨
            </div>
          ))}
        </div>

        {currentWish && (
          <div className="max-w-2xl text-center animate-float">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-pink-300"
                 style={{
                   boxShadow: '0 0 40px rgba(255,105,180,0.5), 0 20px 60px rgba(0,0,0,0.2)'
                 }}>
              <p className="text-3xl md:text-4xl font-bold text-pink-600 leading-relaxed"
                 style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                {currentWish}
              </p>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-2xl text-white font-bold drop-shadow-lg"
             style={{ 
               fontFamily: 'Comic Sans MS, cursive',
               textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
             }}>
            Нажми на сердечко! 💖
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-500/30 to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
