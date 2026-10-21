import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  type: 'bokeh' | 'petal' | 'heart' | 'sparkle';
  angle: number;
  angularSpeed: number;
  life?: number;
  maxLife?: number;
}

export const RomanticCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const petalColors = ['#f43f5e', '#fb7185', '#e11d48', '#fda4af', '#be123c'];
    const bokehColors = ['#f59e0b', '#fbbf24', '#fef08a', '#d97706'];

    // Spawn initial atmospheric particles
    const particleCount = Math.min(36, Math.floor(width / 25));
    for (let i = 0; i < particleCount; i++) {
      const isPetal = Math.random() > 0.45;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isPetal ? 7 + Math.random() * 8 : 4 + Math.random() * 14,
        speedX: (Math.random() - 0.3) * 0.8,
        speedY: isPetal ? 0.6 + Math.random() * 0.9 : -0.2 - Math.random() * 0.4,
        opacity: 0.15 + Math.random() * 0.45,
        color: isPetal ? petalColors[Math.floor(Math.random() * petalColors.length)] : bokehColors[Math.floor(Math.random() * bokehColors.length)],
        type: isPetal ? 'petal' : 'bokeh',
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.03,
      });
    }

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 3, 0, size);
      // top right curve
      ctx.bezierCurveTo(size, topCurveHeight / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.4, size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.angularSpeed;

        if (p.life !== undefined && p.maxLife !== undefined) {
          p.life--;
          p.opacity = (p.life / p.maxLife) * 0.9;
          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }
        }

        // Wrap around screen for continuous ambient particles
        if (p.life === undefined) {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          } else if (p.y < -30) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;
        }

        if (p.type === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.angle, p.color, p.opacity);
        } else if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity);
        } else if (p.type === 'sparkle') {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Soft golden bokeh glow
          ctx.save();
          ctx.globalAlpha = p.opacity;
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Tap/Click to burst glowing hearts & stardust
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      const burstCount = 10;
      for (let k = 0; k < burstCount; k++) {
        const isHeart = Math.random() > 0.35;
        const speed = 1.5 + Math.random() * 3.5;
        const rad = Math.random() * Math.PI * 2;
        particles.push({
          x: clientX,
          y: clientY,
          size: isHeart ? 10 + Math.random() * 12 : 3 + Math.random() * 4,
          speedX: Math.cos(rad) * speed,
          speedY: Math.sin(rad) * speed - 1.2, // slightly drift up
          opacity: 1,
          color: isHeart ? '#ff4b72' : '#fde047',
          type: isHeart ? 'heart' : 'sparkle',
          angle: Math.random() * Math.PI,
          angularSpeed: (Math.random() - 0.5) * 0.1,
          life: 45 + Math.floor(Math.random() * 25),
          maxLife: 70,
        });
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ touchAction: 'none' }}
    />
  );
};
