import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationsOptions {
  totalFrames: number;
  isLoaded: boolean;
  drawFrame: (index: number) => void;
}

export function useScrollAnimations({
  totalFrames,
  isLoaded,
  drawFrame,
}: UseScrollAnimationsOptions) {
  const lenisRef = useRef<Lenis | null>(null);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    if (!isLoaded) return;

    // Small delay to let loader transition finish
    const timeout = setTimeout(() => {
      // ── Initialize Lenis Smooth Scroll ─────────────────────────
      const lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 0.8,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // ── Master timeline: frame sequence ──────────────────────────
      const frameObj = { frame: 0 };

      gsap.to(frameObj, {
        frame: totalFrames - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero-sequence',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: () => {
            const newFrame = Math.round(frameObj.frame);
            if (newFrame !== currentFrameRef.current) {
              currentFrameRef.current = newFrame;
              requestAnimationFrame(() => drawFrame(newFrame));
            }
          },
        },
      });

      // ── Beat 1: Hero (0–15%) ──────────────────────────────────
      gsap.set('#beat-hero-content', { opacity: 0, y: 60, scale: 0.95 });
      gsap.set('#scroll-indicator', { opacity: 0, y: -10 });

      // Fade in hero with improved timing
      gsap.to('#beat-hero-content', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#hero-sequence',
          start: 'top 85%',
          end: 'top 50%',
          scrub: 0.5,
        },
      });

      gsap.to('#scroll-indicator', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#hero-sequence',
          start: 'top 70%',
          end: 'top 40%',
          scrub: 0.5,
        },
      });

      // Keep hero visible through most of the sequence, fade out only in final ~10%
      gsap.to('#beat-hero-content', {
        opacity: 0,
        y: -40,
        scale: 0.95,
        duration: 1.2,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: '#hero-sequence',
          start: '85% top',
          end: '95% top',
          scrub: 0.5,
        },
      });

      gsap.to('#scroll-indicator', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: '#hero-sequence',
          start: '85% top',
          end: '95% top',
          scrub: 0.5,
        },
      });

      // ── Beat 2: Engineering (15–40%) ────────────────────────────
      gsap.set('#beat-engineering-content', { opacity: 0, x: -80, y: 40 });
      gsap.to('#beat-engineering-content', {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#hero-sequence',
          start: '12% top',
          end: '25% top',
          scrub: 0.5,
        },
      });
      gsap.to('#beat-engineering-content', {
        opacity: 0,
        x: -60,
        y: -40,
        duration: 1.2,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: '#hero-sequence',
          start: '37% top',
          end: '42% top',
          scrub: 0.5,
        },
      });

      // ── Beat 3: Performance (40–65%) ────────────────────────────
      gsap.set('#beat-performance-content', { opacity: 0, x: 80, y: 40 });
      gsap.to('#beat-performance-content', {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#hero-sequence',
          start: '37% top',
          end: '50% top',
          scrub: 0.5,
        },
      });
      gsap.to('#beat-performance-content', {
        opacity: 0,
        x: 60,
        y: -40,
        duration: 1.2,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: '#hero-sequence',
          start: '62% top',
          end: '67% top',
          scrub: 0.5,
        },
      });

      // ── Beat 4: Display (65–85%) ─────────────────────────────────
      gsap.set('#beat-display-content', { opacity: 0, x: -80, y: 40 });
      gsap.to('#beat-display-content', {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#hero-sequence',
          start: '62% top',
          end: '75% top',
          scrub: 0.5,
        },
      });
      gsap.to('#beat-display-content', {
        opacity: 0,
        x: -60,
        y: -40,
        duration: 1.2,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: '#hero-sequence',
          start: '82% top',
          end: '87% top',
          scrub: 0.5,
        },
      });

      // ── Beat 5: CTA (85–100%) ───────────────────────────────────
      gsap.set('#beat-cta-content', { opacity: 0, y: 60, scale: 0.95 });
      gsap.to('#beat-cta-content', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#hero-sequence',
          start: '82% top',
          end: '95% top',
          scrub: 0.5,
        },
      });

      // ── Navbar scroll behavior ──────────────────────────────────
      ScrollTrigger.create({
        start: 80,
        onUpdate: (self) => {
          const navbar = document.getElementById('navbar');
          if (!navbar) return;
          if (self.scroll() > 80) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        },
      });

      // ── Specs cards reveal with stagger ────────────────────────
      gsap.utils.toArray<HTMLElement>('.spec-card').forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, 400);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, [isLoaded, totalFrames, drawFrame]);
}
