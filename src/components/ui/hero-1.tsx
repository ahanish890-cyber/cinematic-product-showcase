import React from 'react';

interface GlowHeroProps {
  label?: string;
  glowText: string;
  labelSize?: 'sm' | 'md' | 'lg';
  glowTextSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  id?: string;
}

const GlowHero: React.FC<GlowHeroProps> = ({ 
  glowText, 
  className = '',
  id
}) => {

  return (
    <>
      <style>{`
        .glow-hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          padding-top: clamp(85px, 12vh, 110px);
          height: 100%;
        }

        .glow-hero-label {
          font-size: clamp(0.7rem, 1.8vw, 0.95rem);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.65);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-align: center;
          transition-property: opacity, transform;
          transition-duration: 300ms;
          transition-timing-function: ease-out;
        }

      .glow-text-wrapper {
  position: relative;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
}

      .glow-text {
  position: relative;

  display: inline-block;      /* IMPORTANT */
  width: fit-content;         /* Glow only around text */
  margin: 0 auto;
    font-size: clamp(2.3rem, 4.4vw, 4.3rem);
    font-weight: 600;
    line-height: 0.95;
    letter-spacing: -0.04em;

  text-align: center;
  white-space: nowrap;

  color: rgba(255,255,255,0.98);

  z-index: 10;

  will-change: transform, opacity;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

        .glow-text::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #00d4ff, #ff0099, #ff6600);
          filter: blur(40px) brightness(0.95);
          opacity: 0.75;
          z-index: -2;
          pointer-events: none;
          background-size: 200% 200%;
          animation: gradientShift 14s ease-in-out infinite;
         box-shadow:
    0 0 18px rgba(0,212,255,.35),
    0 0 36px rgba(255,0,153,.25),
    0 0 60px rgba(255,102,0,.18);
        }
        
        .glow-text::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          font-size: inherit;
          font-weight: inherit;
          font-family: inherit;
          letter-spacing: inherit;
          background: linear-gradient(90deg, #ffffff, #ffffff, #ffffff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          mix-blend-mode: screen;
          filter: brightness(1.7) contrast(1.4);
          z-index: 1;
          pointer-events: none;
          background-size: 100% 100%;
        }
        
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @media (max-width: 1024px) {
          .glow-text {
            font-size: clamp(1.4rem, 4vw, 2.5rem);
          }

          .glow-text-wrapper {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .glow-text {
            font-size: clamp(1.2rem, 6vw, 2rem);
            white-space: normal;
          }
          
          .glow-hero-label {
            margin-bottom: 8px;
            font-size: clamp(0.65rem, 1.5vw, 0.8rem);
          }

          .glow-hero-container {
            gap: 20px;
          }

          .glow-text-wrapper {
            max-width: 100%;
          }
        }
      `}</style>
      
      <div id={id} className={`glow-hero-container ${className}`}>
        <div className="glow-text-wrapper">
          <div 
            className="glow-text"
            data-text={glowText}
          >
            {glowText}
          </div>
        </div>
      </div>
    </>
  );
};

export default GlowHero;
