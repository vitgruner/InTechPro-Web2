
import React, { useEffect, useRef } from 'react';
import { Zap } from 'lucide-react';
import { HeroProps } from '../types';
import SmartHomeWireframe from './SmartHomeWireframe';

const Hero: React.FC<HeroProps> = ({ setView }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    // Snížený počet částic pro lepší výkon na mobilních zařízeních
    const particleCount = Math.min(Math.floor((width * height) / 25000), 60); 
    const connectionDistance = 140;
    const mouseDistance = 180;

    let mouse = { x: -1000, y: -1000 };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 1,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const isDark = document.documentElement.classList.contains('dark');
      const particleColor = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.2)';
      const lineColor = isDark ? 'rgba(37, 99, 235, 0.4)' : 'rgba(37, 99, 235, 0.3)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseDistance) {
          const force = (mouseDistance - distance) / mouseDistance;
          p.vx += (dx / distance) * force * 0.03;
          p.vy += (dy / distance) * force * 0.03;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < connectionDistance) {
            const opacity = (1 - dist2 / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = lineColor.replace('0.4', opacity.toString()).replace('0.3', opacity.toString());
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-28 md:pt-32 pb-8 md:pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 dark:bg-blue-500/10 blur-[120px]" />
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f4f7f9] dark:to-[#050505]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-500/20 border border-blue-600/20 dark:border-blue-400/30 text-blue-600 dark:text-blue-300 text-xs font-bold tracking-wider uppercase mb-6 mx-auto lg:mx-0 animate-in slide-in-from-bottom-4 fade-in duration-700">
            < Zap className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            22. století již dnes
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white transition-colors duration-500 animate-in slide-in-from-bottom-6 fade-in duration-1000">
            Integrovaná <br className="hidden sm:block" />
            <span className="text-gradient">Inteligence</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-200 max-w-lg mb-8 leading-relaxed mx-auto lg:mx-0 font-medium transition-colors duration-500 animate-in slide-in-from-bottom-8 fade-in duration-1000">
            Plánujeme, projektujeme a realizujeme špičkovou inteligentní infrastrukturu. Od automatizovaných domovů po inteligentní průmyslové areály.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-in slide-in-from-bottom-10 fade-in duration-1000">
            <button 
              onClick={() => setView('sluzby')}
              className="btn-magnetic px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all glow text-sm md:text-base shadow-lg shadow-blue-500/30"
            >
              Naše služby
            </button>
            <button 
              onClick={() => setView('reference')}
              className="btn-magnetic px-8 py-4 glass-panel rounded-full font-bold hover:bg-black/5 dark:hover:bg-white/10 transition-all text-[#1a1d21] dark:text-white text-sm md:text-base border border-black/10 dark:border-white/20"
            >
              Reference
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 md:gap-8 animate-in slide-in-from-bottom-12 fade-in duration-1000">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black font-mono text-gray-900 dark:text-white">500+</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Projektů</span>
            </div>
            <div className="h-10 w-[1px] bg-black/10 dark:bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black font-mono text-gray-900 dark:text-white">100%</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Spolehlivost</span>
            </div>
          </div>
        </div>

        <div className="relative group w-full max-w-[84rem] mx-auto animate-in fade-in zoom-in duration-1000 delay-200">
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/25 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-black/10 dark:border-white/20 shadow-xl
                          h-[300px] md:h-[416px] lg:h-[512px] bg-black/40 backdrop-blur-md transform transition-transform duration-500 hover:scale-[1.01]">
            <SmartHomeWireframe />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
