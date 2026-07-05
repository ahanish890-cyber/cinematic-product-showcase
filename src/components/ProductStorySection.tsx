import React, { useEffect, useRef } from 'react';
import { useProductFrameSequence } from '@/hooks/useProductFrameSequence';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProductStorySection.css';

gsap.registerPlugin(ScrollTrigger);

const BASE = import.meta.env.BASE_URL;

const CONFIG = {
  TOTAL_FRAMES: 192,
  FRAME_PATH: `${BASE}product-frames/frame-`,
  FRAME_EXT: '.png',
  BG_COLOR: '#050505',
};

const features = [
  {
    id: 'email-ai',
    title: 'Email AI.',
    description: 'Summarize and draft replies to emails instantly, so you stay on top of your inbox.',
    position: 'left-top',
    icon: (
      <svg className="product-feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 6-10 5L2 6"/>
      </svg>
    ),
  },
  {
    id: 'image-ai',
    title: 'Image AI.',
    description: 'Generate or edit images with ease. Just type what you imagine, and let AI bring it to life.',
    position: 'right-bottom',
    icon: (
      <svg className="product-feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="m21 15-5-5L5 21"/>
      </svg>
    ),
  },
  {
    id: 'summarize',
    title: 'Summarize AI.',
    description: 'Turn long articles, reports, or notes into clear, bite-sized summaries in seconds.',
    position: 'left-top',
    icon: (
      <svg className="product-feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    ),
  },
  {
    id: 'airdrop',
    title: 'AirDrop.',
    description: 'Wirelessly share photos, large files, and more between your iPhone, your Mac, & other devices.',
    position: 'right-bottom',
    icon: (
      <svg className="product-feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v10m0 0l-3-3m3 3l3-3"/>
        <circle cx="12" cy="18" r="1"/>
        <circle cx="8" cy="14" r="1" opacity="0.5"/>
        <circle cx="16" cy="14" r="1" opacity="0.5"/>
      </svg>
    ),
  },
];

const ProductStorySection: React.FC = () => {
  const { canvasRef, isLoaded, drawFrame } = useProductFrameSequence({
    totalFrames: CONFIG.TOTAL_FRAMES,
    framePath: CONFIG.FRAME_PATH,
    frameExt: CONFIG.FRAME_EXT,
    bgColor: CONFIG.BG_COLOR,
  });

  const currentFrameRef = useRef(0);

  useEffect(() => {
    if (!isLoaded) return;

    drawFrame(0);

    const timeout = setTimeout(() => {
      // Master timeline: product frame sequence
      const frameObj = { frame: 0 };

      gsap.to(frameObj, {
        frame: CONFIG.TOTAL_FRAMES - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: '#product-story-section',
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

      // ── Feature Beats: Alternating Left/Right ────────────────

      features.forEach((_, index) => {
        const beatId = `#product-beat-${index}`;
        const startPercent = 5 + index * 22;
        const endPercent = startPercent + 20;

        gsap.set(beatId, { opacity: 0, y: 60 });
        gsap.to(beatId, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#product-story-section',
            start: `${startPercent}% top`,
            end: `${startPercent + 8}% top`,
            scrub: 0.5,
          },
        });

        gsap.to(beatId, {
          opacity: 0,
          y: -40,
          duration: 1,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: '#product-story-section',
            start: `${endPercent - 5}% top`,
            end: `${endPercent}% top`,
            scrub: 0.5,
          },
        });
      });

      // CTA at the end
      gsap.set('#product-cta', { opacity: 0, scale: 0.95 });
      gsap.to('#product-cta', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#product-story-section',
          start: '88% top',
          end: '95% top',
          scrub: 0.5,
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger?.id?.includes('product')) st.kill();
      });
    };
  }, [isLoaded, drawFrame]);

  return (
    <section id="product-story-section" className="product-story-section" aria-label="Product storytelling">
      <div className="product-canvas-container">
        <canvas id="product-frame-canvas" ref={canvasRef} aria-hidden="true" />

        {/* Feature Beats - Alternating Left/Right */}
        {features.map((feature, index) => (
          <div
            key={feature.id}
            id={`product-beat-${index}`}
            className={`product-feature-beat product-beat-${feature.position}`}
          >
            <div className="product-feature-icon-wrapper">{feature.icon}</div>
            <h3 className="product-feature-title">{feature.title}</h3>
            <p className="product-feature-desc">{feature.description}</p>
          </div>
        ))}

        {/* CTA at end */}
        <div id="product-cta" className="product-cta-beat">
          <h2>Experience Apple Intelligence.</h2>
          <p>Built into MacBook Pro.</p>
        </div>
      </div>
    </section>
  );
};

export default ProductStorySection;
