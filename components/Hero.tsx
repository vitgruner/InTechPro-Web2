
import React, { useEffect, useRef } from 'react';
import { Zap } from 'lucide-react';
import { HeroProps } from '../types';
import SmartHomeWireframe from './SmartHomeWireframe';

const Hero: React.FC<HeroProps> = ({ setView }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 15000), 100); // Responsive count
    const connectionDistance = 150;
    const mouseDistance = 200;

    let mouse = { x: -1000, y: -1000 };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Determine theme colors (simple check, ideally passed via props or context)
      const isDark = document.documentElement.classList.contains('dark');
      const particleColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)';
      const lineColor = isDark ? 'rgba(37, 99, 235,' : 'rgba(37, 99, 235,'; // Blue base

      // Update and draw particles
      particles.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction (push away gently)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseDistance - distance) / mouseDistance;
          p.vx += forceDirectionX * force * 0.05;
          p.vy += forceDirectionY * force * 0.05;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Connect
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < connectionDistance) {
            const opacity = 1 - dist2 / connectionDistance;
            ctx.beginPath();
            ctx.strokeStyle = `${lineColor} ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
        
        // Connect to mouse
        if (distance < mouseDistance) {
             const opacity = 1 - distance / mouseDistance;
             ctx.beginPath();
             ctx.strokeStyle = `${lineColor} ${opacity * 0.4})`;
             ctx.lineWidth = 1;
             ctx.moveTo(p.x, p.y);
             ctx.lineTo(mouse.x, mouse.y);
             ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-28 md:pt-32 pb-8 md:pb-12 overflow-hidden">
      {/* Interactive Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-auto opacity-60"
      />
      
      {/* Subtle Gradient Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f4f7f9] dark:to-[#050505] z-0 pointer-events-none"></div>

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
              onClick={() => setView('services')}
              className="btn-magnetic px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all glow text-sm md:text-base shadow-lg shadow-blue-500/30 relative overflow-hidden group"
            >
              <span className="relative z-10">Naše služby</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button 
              onClick={() => setView('showcase')}
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
              <span className="text-xl md:text-2xl font-black font-mono text-gray-900 dark:text-white">15+</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Ocenění</span>
            </div>
            <div className="h-10 w-[1px] bg-black/10 dark:bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black font-mono text-gray-900 dark:text-white">100%</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Shoda norem</span>
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
