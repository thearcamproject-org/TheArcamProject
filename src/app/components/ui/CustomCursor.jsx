'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const lag = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', move);

    let raf;
    const animate = () => {
      lag.current.x += (pos.current.x - lag.current.x) * 0.12;
      lag.current.y += (pos.current.y - lag.current.y) * 0.12;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${lag.current.x - 18}px, ${lag.current.y - 18}px, 0)`;
      }

      raf = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseEnter = () => {
      if (ring.current) {
        ring.current.style.transform += ' scale(2)';
        ring.current.style.borderColor = '#E7B366';
      }
    };

    const handleMouseLeave = () => {
      if (ring.current) {
        ring.current.style.transform = ring.current.style.transform.replace(' scale(2)', '');
        ring.current.style.borderColor = 'rgba(231, 179, 102, 0.5)';
      }
    };

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#E7B366] z-[9999] pointer-events-none mix-blend-difference will-change-transform"
      />
      <div
        ref={ring}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border-[1.5px] border-[#E7B366]/50 z-[9998] pointer-events-none will-change-transform transition-transform duration-100 ease-out"
      />
    </>
  );
}
