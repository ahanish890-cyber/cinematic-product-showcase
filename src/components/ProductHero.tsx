'use client';

import { useEffect, useRef, useState } from 'react';
import './ProductHero.css';

export default function ProductHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="product-hero">
      <div className="product-hero-container">
        {/* Premium M4 SVG Mask Section */}
        <div className="product-hero-m4-section" ref={containerRef}>
          <svg
            className="product-hero-m4-svg"
            viewBox="0 0 1400 500"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <mask id="m4-video-mask">
                {/* Apple Logo - sized to match M4 text height */}
                <image
                  xlinkHref="/apple-logo.png"
                  x="100"
                  y="-130"
                  width="700"
                  height="700"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ filter: 'brightness(2)' }}
                />

                {/* M4 Text - immediately adjacent to logo */}
                <text
                  x="970"
                  y="390"
                  fontSize="490"
                  fontWeight="800"
                  fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
                  textAnchor="middle"
                  letterSpacing="-12"
                  fill="white"
                  style={{ fontVariationSettings: '"wght" 900' }}
                >
                  M4
                </text>
              </mask>
            </defs>

            {/* Black background */}
            <rect width="1400" height="500" fill="#000000" />

            {/* Video container with mask applied */}
            <foreignObject
              x="0"
              y="0"
              width="1400"
              height="500"
              mask="url(#m4-video-mask)"
              style={{ display: 'block' }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="product-hero-video-container"
                src="/M4-text.mp4"
              />
            </foreignObject>
          </svg>

          {/* Fade-in overlay */}
          <div
            className={`product-hero-m4-fade ${isLoaded ? 'loaded' : ''}`}
          />
        </div>

        {/* Main content grid */}
        <div className="product-hero-grid">
          {/* Left Column */}
          <div className="product-hero-left">
            <h1 className="product-hero-title">Rocket chip.</h1>

            <p className="product-hero-intro">
              Introducing <strong>M4</strong>, the next generation of Apple
              silicon. <strong>M4 powers</strong>
            </p>

            <p className="product-hero-body">
              It drives Apple Intelligence on iPad Pro, so you can write,
              create, and accomplish more with ease. All in a design that's
              unbelievably thin, light, and powerful.
            </p>

            <p className="product-hero-body">
              A brand-new display engine delivers breathtaking precision, color
              accuracy, and brightness. And a next-gen GPU with
              hardware-accelerated ray tracing brings cinema-quality rendering
              to your fingertips.
            </p>
          </div>

          {/* Right Column */}
          <div className="product-hero-metrics">
            {/* Statistic Block 1 */}
            <div className="metric-card">
              <p className="metric-label">Up to</p>
              <h2 className="metric-value">4x faster</h2>
              <p className="metric-description">
                pro rendering performance than M2
              </p>
            </div>

            {/* Statistic Block 2 */}
            <div className="metric-card">
              <p className="metric-label">Up to</p>
              <h2 className="metric-value">1.5x faster</h2>
              <p className="metric-description">CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
