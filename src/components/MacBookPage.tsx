import React, { useEffect, useState } from 'react';
import { useFrameSequence } from '@/hooks/useFrameSequence';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import GlowHero from '@/components/ui/hero-1';
import ProductHero from '@/components/ProductHero';
import ProductStorySection from '@/components/ProductStorySection';
import BentoGrid from '@/components/BentoGrid';
import PremiumFeatureGrid from '@/components/PremiumFeatureGrid';
import MacBookShowcase from '@/components/MacBookShowcase';

const CONFIG = {
  TOTAL_FRAMES: 52,
  FRAME_PATH: '/frames/frame-',
  FRAME_EXT: '.png',
  BG_COLOR: '#050505',
};

const MacBookPage: React.FC = () => {
  const [loaderHidden, setLoaderHidden] = useState(false);

  const { canvasRef, isLoaded, loadProgress, drawFrame } = useFrameSequence({
    totalFrames: CONFIG.TOTAL_FRAMES,
    framePath: CONFIG.FRAME_PATH,
    frameExt: CONFIG.FRAME_EXT,
    bgColor: CONFIG.BG_COLOR,
  });

  useScrollAnimations({
    totalFrames: CONFIG.TOTAL_FRAMES,
    isLoaded: isLoaded && loaderHidden,
    drawFrame,
  });

  // Draw first frame and hide loader when loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
      // Let the loader fade animation play
      const timer = setTimeout(() => {
        setLoaderHidden(true);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, drawFrame]);

  return (
    <>

      {/* ════════════════════════════════════════════════════════════════
          NAVBAR
          ════════════════════════════════════════════════════════════════ */}
      <nav id="navbar" aria-label="Main navigation">
        <div className="nav-logo">
          <img src="/apple-logo.png" alt="Apple" className="apple-logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#hero-sequence" id="nav-overview">Home</a></li>
          <li><a href="#beat-engineering" id="nav-design">Mac</a></li>
          <li><a href="#beat-performance" id="nav-performance">Chip</a></li>
          <li><a href="#specs-section" id="nav-specs">Features</a></li>
          <li><a href="#beat-cta" id="nav-buy">Footer</a></li>
        </ul>
        <a >
          
        </a>
        <div
          className="nav-hamburger"
          id="nav-hamburger"
          role="button"
          tabIndex={0}
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════════════════════════════════════ */}
      <main>
        {/* ── HERO SEQUENCE — Sticky Canvas + Story Overlays ──────── */}
        <section id="hero-sequence" aria-label="Product showcase">
          <div className="canvas-container">
            <canvas
              id="frame-canvas"
              ref={canvasRef}
              aria-hidden="true"
            />

            {/* Beat 1: Hero Intro (0–15%) — GlowHero at top, laptop visible below */}
            <div className="story-overlay hero-overlay-top" id="beat-hero">
              <div className="beat-content" id="beat-hero-content">
                <GlowHero
                  label="MacBook Pro"
                  glowText="Built for Apple Intelligence."
                  glowTextSize="2xl"
                  labelSize="lg"
                  id="glow-hero-text"
                />
              </div>
              <div className="scroll-indicator" id="scroll-indicator">
               
              </div>
            </div>

            {/* Beat 2: Engineering (15–40%) */}
            <div className="story-overlay" id="beat-engineering">
              
            
            </div>

            {/* Beat 3: Performance (40–65%) */}
            <div className="story-overlay" id="beat-performance">
              
            </div>

            {/* Beat 4: Display (65–85%) */}
            <div className="story-overlay" id="beat-display">
              
             
            </div>

            {/* Beat 5: CTA (85–100%) */}
            <div className="story-overlay" id="beat-cta">
              
            </div>
          </div>
        </section>

        {/* ── MACBOOK SHOWCASE SECTION ────────────────────────────────– */}
        <MacBookShowcase />

        {/* ── PRODUCT HERO SECTION ───────────────────────────────────── */}
        <ProductHero />

        {/* ── PRODUCT STORYTELLING HEADING ────────────────────────────– */}
        <section className="product-story-intro">
          <div className="product-story-intro-content">
            <h2>See it all in a new light.</h2>
          </div>
        </section>

        {/* ── PRODUCT STORYTELLING SECTION ────────────────────────────– */}
        <ProductStorySection />

        {/* ── BENTO GRID SECTION ──────────────────────────────────────── */}
        <BentoGrid />

        {/* ── PREMIUM FEATURE GRID SECTION ────────────────────────────── */}
        <PremiumFeatureGrid />
      </main>

      {/* ════════════════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════════════════ */}
      <footer>
        <div className="footer-left">
          © 2026 Apple Inc. All rights reserved. This is a concept showcase.
        </div>
        <ul className="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Sales and Refunds</a></li>
        </ul>
      </footer>
    </>
  );
};

export default MacBookPage;
