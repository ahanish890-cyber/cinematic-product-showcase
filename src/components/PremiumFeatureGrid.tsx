import './PremiumFeatureGrid.css';

export default function PremiumFeatureGrid() {
  return (
    <section className="premium-feature-section">
      <div className="premium-feature-container">
        <div className="premium-feature-grid">
          {/* Card 1: Top Left - Large Feature */}
          <div className="feature-card card-large">
            <div className="card-image" style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=800&fit=crop)'
            }}></div>
            <div className="card-overlay"></div>
            <div className="card-content">
              <svg className="card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              <h3 className="card-title">Fly through demanding tasks up to 9.8× faster.</h3>
            </div>
          </div>

          {/* Card 2: Bottom Left - Medium Feature */}
          <div className="feature-card card-medium">
            <div className="card-content card-content-horizontal">
              <svg className="card-icon-sun" width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="28" cy="28" r="8"/>
                <line x1="28" y1="4" x2="28" y2="8"/>
                <line x1="28" y1="48" x2="28" y2="52"/>
                <line x1="4" y1="28" x2="8" y2="28"/>
                <line x1="48" y1="28" x2="52" y2="28"/>
                <line x1="9" y1="9" x2="12" y2="12"/>
                <line x1="44" y1="44" x2="47" y2="47"/>
                <line x1="47" y1="9" x2="44" y2="12"/>
                <line x1="12" y1="44" x2="9" y2="47"/>
              </svg>
              <h3 className="card-title-medium">A stunning Liquid Retina XDR display.</h3>
            </div>
          </div>

          {/* Card 3: Top Right - Small Feature */}
          <div className="feature-card card-small card-gradient-border">
            <div className="card-content card-content-ai">
              <svg className="card-icon-ai" width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="28" cy="28" r="22"/>
                <circle cx="28" cy="28" r="14"/>
                <circle cx="28" cy="28" r="8"/>
              </svg>
              <div className="ai-text">
                <p className="ai-label">Built for</p>
                <p className="ai-highlight">Apple Intelligence.</p>
              </div>
            </div>
          </div>

          {/* Card 4: Bottom Right - Large Feature */}
          <div className="feature-card card-large">
            <div className="card-content card-content-battery">
              <svg className="card-icon-battery" width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="10" y="16" width="36" height="28" rx="3"/>
                <rect x="46" y="24" width="3" height="12" rx="1"/>
                <rect x="14" y="20" width="28" height="20" fill="currentColor" opacity="0.9"/>
              </svg>
              <div className="battery-text">
                <h3 className="card-title-battery">Up to <span className="battery-highlight">14 more hours</span> battery life.</h3>
                <p className="battery-support">(Up to 24 hours total.)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
