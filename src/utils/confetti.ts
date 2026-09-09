/**
 * Golden Sparkles and Champagne Confetti Burst
 */

export function triggerGoldenSparkles(originX?: number, originY?: number) {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const startX = originX ?? width / 2;
  const startY = originY ?? height / 2;

  const colors = [
    '#FDF3D6', // ivory shimmer
    '#E7C979', // soft champagne gold
    '#D4AF37', // metallic gold
    '#F2E5C9', // warm cream
    '#BFA054', // bronze gold
    '#FFF8EB'  // diamond highlight
  ];

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
    alpha: number;
    life: number;
    decay: number;
    shape: 'star' | 'circle' | 'rect';
  }

  const particles: Particle[] = [];
  const particleCount = 110;

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
    const speed = Math.random() * 9 + 4;
    const shapes: ('star' | 'circle' | 'rect')[] = ['star', 'circle', 'rect'];

    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
      vy: Math.sin(angle) * speed - Math.random() * 5, // upward bias
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      alpha: 1,
      life: 1,
      decay: Math.random() * 0.015 + 0.012,
      shape: shapes[Math.floor(Math.random() * shapes.length)]
    });
  }

  let animationFrameId: number;

  function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }

  function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    let aliveCount = 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // subtle gravity
      p.vx *= 0.98;
      p.rotation += p.rotationSpeed;
      p.life -= p.decay;
      p.alpha = Math.max(0, p.life);

      if (p.alpha > 0.02) {
        aliveCount++;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.shape === 'star') {
          drawStar(ctx, 0, 0, 4, p.size * 1.5, p.size * 0.5);
          ctx.fill();
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size, -p.size * 0.6, p.size * 2, p.size * 1.2);
        }

        ctx.restore();
      }
    }

    if (aliveCount > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrameId);
      canvas.remove();
    }
  }

  render();
}
