import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BASE = import.meta.env.BASE_URL;

export default function MacBookShowcase() {
  const [selectedColor, setSelectedColor] = useState<'grey' | 'light'>('grey');
  const [selectedSize, setSelectedSize] = useState<'14' | '16'>('16');

  const imageSrc = `${BASE}mac-${selectedColor}-${selectedSize}.png`;
  const colorLabel = selectedColor === 'grey' ? 'Silver' : 'Space Black';
  const sizeLabel = selectedSize === '14' ? '14"' : '16"';

  return (
    <section className="showcase-section">
      <div className="showcase-content">
      

        {/* Left-aligned heading */}
        <h2 className="showcase-main-heading">Take a closer look.</h2>

        {/* Image Display */}
        <div className="showcase-image-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={imageSrc}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <img
                src={imageSrc}
                alt={`MacBook Pro ${selectedSize}" in ${colorLabel}`}
                className="product-image"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Selection Title */}
        <h3 className="selection-title">
          MacBook Pro {sizeLabel} In {colorLabel} {selectedColor === 'grey' ? 'Silver' : 'Space Black'}
        </h3>

        {/* Controls - Side by side */}
        <div className="controls-row">
          {/* Color Selector Container */}
          <div className="selector-pill color-pill">
            <motion.button
              onClick={() => setSelectedColor('light')}
              className={`circle-button ${selectedColor === 'light' ? 'active' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="circle space-black" />
            </motion.button>

            <motion.button
              onClick={() => setSelectedColor('grey')}
              className={`circle-button ${selectedColor === 'grey' ? 'active' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="circle silver" />
            </motion.button>
          </div>

          {/* Size Selector Container */}
          <div className="selector-pill size-pill">
            <motion.button
              onClick={() => setSelectedSize('14')}
              className={`size-btn ${selectedSize === '14' ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              14"
            </motion.button>

            <motion.button
              onClick={() => setSelectedSize('16')}
              className={`size-btn ${selectedSize === '16' ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              16"
            </motion.button>
          </div>
        </div>
      </div>

      <style>{`
        .showcase-section {
          background-color: #000;
          padding: 100px 40px;
        }

        .showcase-content {
          max-width: 1120px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* M4 Video Text Mask */
        .m4-video-text-container {
          width: 100%;
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
        }

        .m4-video-text {
          display: block;
          width: clamp(200px, 40vw, 500px);
          height: auto;
          object-fit: contain;
          border-radius: 12px;
        }

        .showcase-main-heading {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 700;
          color: #f5f5f7;
          margin: 0 0 60px 0;
          text-align: center;
          letter-spacing: -0.02em;
          line-height: 1.1;
          width: 100%;
        }

        .showcase-image-area {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 60px;
        }

        .product-image {
          max-width: min(900px, 95vw);
          height: auto;
          display: block;
        }

        .selection-title {
          font-size: 1.3rem;
          font-weight: 400;
          color: #f5f5f7;
          margin: 0 0 40px 0;
          text-align: center;
          width: 100%;
          letter-spacing: 0;
        }

        .controls-row {
          display: flex;
          gap: 60px;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .selector-pill {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(255, 255, 255, 0.05);
          padding: 16px 24px;
          border-radius: 100px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Color Circles */
        .circle-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .circle.silver {
          background: linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.1);
        }

        .circle.space-black {
          background: linear-gradient(135deg, #2c2c2e 0%, #1c1c1e 100%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.8);
        }

        .circle-button.active .circle {
          border: 2px solid #ffffff;
        }

        .circle-button:not(.active) .circle {
          opacity: 0.4;
        }

        /* Size Buttons */
        .size-btn {
          padding: 10px 24px;
          background: transparent;
          border: none;
          border-radius: 50px;
          color: #f5f5f7;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .size-btn.active {
          background: #ffffff;
          color: #000;
        }

        .size-btn:not(.active) {
          opacity: 0.6;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .showcase-section {
            padding: 80px 30px;
          }

          .m4-video-text {
            width: clamp(150px, 35vw, 400px);
          }

          .showcase-main-heading {
            font-size: 2.5rem;
            margin-bottom: 50px;
          }

          .showcase-image-area {
            margin-bottom: 50px;
          }

          .selection-title {
            font-size: 1.1rem;
            margin-bottom: 30px;
          }

          .controls-row {
            gap: 40px;
          }

          .selector-pill {
            padding: 14px 20px;
            gap: 16px;
          }

          .circle {
            width: 40px;
            height: 40px;
          }

          .size-btn {
            padding: 8px 20px;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 768px) {
          .showcase-section {
            padding: 60px 20px;
          }

          .m4-video-text {
            width: clamp(100px, 30vw, 300px);
            margin-bottom: 30px;
          }

          .showcase-main-heading {
            font-size: 1.8rem;
            margin-bottom: 40px;
          }

          .showcase-image-area {
            margin-bottom: 40px;
          }

          .selection-title {
            font-size: 1rem;
            margin-bottom: 30px;
          }

          .controls-row {
            flex-direction: column;
            gap: 30px;
          }

          .selector-pill {
            padding: 12px 20px;
            gap: 14px;
          }

          .circle {
            width: 36px;
            height: 36px;
          }

          .size-btn {
            padding: 8px 18px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .showcase-section {
            padding: 40px 16px;
          }

          .m4-video-text {
            width: clamp(80px, 25vw, 200px);
            margin-bottom: 20px;
          }

          .showcase-main-heading {
            font-size: 1.3rem;
            margin-bottom: 30px;
          }

          .showcase-image-area {
            margin-bottom: 30px;
          }

          .selection-title {
            font-size: 0.9rem;
            margin-bottom: 20px;
          }

          .controls-row {
            gap: 20px;
          }

          .selector-pill {
            padding: 10px 16px;
            gap: 12px;
          }

          .circle {
            width: 32px;
            height: 32px;
          }

          .size-btn {
            padding: 6px 14px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
}
