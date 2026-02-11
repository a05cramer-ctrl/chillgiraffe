import { useState, useEffect, useRef } from 'react'
import './App.css'
import giraffeImg from './assets/chill-giraffe.png'

const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS_HERE'

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function App() {
  const [copied, setCopied] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const copyCA = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = CONTRACT_ADDRESS
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const faqs = [
    {
      q: 'What is Chill Giraffe?',
      a: 'Chill Giraffe ($GIRAFFE) is a community-driven meme token for the most relaxed degens in crypto. No stress. No drama. Just vibes and long necks.',
    },
    {
      q: 'Is there a tax on transactions?',
      a: 'Nope. 0% buy tax. 0% sell tax. We keep it chill — your tokens are fully yours.',
    },
    {
      q: 'How do I buy $GIRAFFE?',
      a: 'Connect your wallet, head to your favorite DEX, paste the contract address, swap, and start chilling. That\'s it.',
    },
    {
      q: 'Is the contract renounced?',
      a: 'Yes. Contract ownership has been renounced and liquidity is burned. Fully community-owned — the way it should be.',
    },
    {
      q: 'Wen moon?',
      a: 'We don\'t rush. We don\'t stress. The giraffe stands tall and watches the horizon. When it\'s time, it\'s time.',
    },
  ]

  return (
    <div className="page">
      {/* Floating particles */}
      <div className="particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`} />
        ))}
      </div>

      {/* ========== HERO ========== */}
      <section className="hero">
        <div className="hero-content fade-in">
          <div className="badge">$GIRAFFE</div>
          <h1 className="title">Chill Giraffe</h1>
          <p className="subtitle">Stay tall. Stay chill.</p>

          <div className="giraffe-wrapper">
            <div className="giraffe-glow" />
            <div className="giraffe-shadow" />
            <img src={giraffeImg} alt="Chill Giraffe" className="giraffe-img" />
          </div>

          <div className="button-group">
            <a href="#" className="btn btn-primary">
              Buy $GIRAFFE
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter
            </a>
            <button onClick={copyCA} className="btn btn-copy">
              {copied ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  Copy CA
                </>
              )}
            </button>
          </div>

          <div className="scroll-hint">
            <span>Scroll down</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ========== TICKER ========== */}
      <div className="ticker-strip">
        <div className="ticker-content">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="ticker-group">
              <span>CHILL GIRAFFE</span>
              <span className="ticker-dot" />
              <span>$GIRAFFE</span>
              <span className="ticker-dot" />
              <span>STAY TALL STAY CHILL</span>
              <span className="ticker-dot" />
              <span>NO STRESS JUST VIBES</span>
              <span className="ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ========== MANIFESTO ========== */}
      <section className="section manifesto-section">
        <RevealSection className="manifesto">
          <span className="section-label">The Philosophy</span>
          <h2 className="section-title">Why Chill Giraffe?</h2>
          <div className="manifesto-grid">
            <div className="manifesto-card">
              <div className="manifesto-icon">🦒</div>
              <h3>Stand Tall</h3>
              <p>While others panic sell, we see further. The giraffe's perspective is unmatched — calm, elevated, unbothered.</p>
            </div>
            <div className="manifesto-card">
              <div className="manifesto-icon">😎</div>
              <h3>Stay Chill</h3>
              <p>No rug anxiety. No toxic chat. Just a community of relaxed degens who know that good things come to those who vibe.</p>
            </div>
            <div className="manifesto-card">
              <div className="manifesto-icon">🌿</div>
              <h3>Pure Vibes</h3>
              <p>Chill Giraffe isn't just a token — it's a lifestyle. We're building the most relaxed corner of crypto, one chill moment at a time.</p>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ========== GIRAFFE-NOMICS ========== */}
      <section className="section tokenomics-section">
        <RevealSection>
          <span className="section-label">Giraffe-nomics</span>
          <h2 className="section-title">Simple. Transparent. Chill.</h2>
          <div className="tokenomics-grid">
            <div className="token-card">
              <div className="token-ring">
                <svg viewBox="0 0 120 120" className="token-svg">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(45,45,31,0.08)" strokeWidth="8"/>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="var(--accent)" strokeWidth="8" strokeDasharray="327" strokeDashoffset="0" strokeLinecap="round" className="token-ring-fill"/>
                </svg>
                <span className="token-ring-label">1B</span>
              </div>
              <h3>Total Supply</h3>
              <p>1,000,000,000 tokens</p>
            </div>
            <div className="token-card">
              <div className="token-ring">
                <svg viewBox="0 0 120 120" className="token-svg">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(45,45,31,0.08)" strokeWidth="8"/>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#7cb97a" strokeWidth="8" strokeDasharray="327" strokeDashoffset="0" strokeLinecap="round" className="token-ring-fill"/>
                </svg>
                <span className="token-ring-label">0%</span>
              </div>
              <h3>Buy / Sell Tax</h3>
              <p>No tax. Ever. For real.</p>
            </div>
            <div className="token-card">
              <div className="token-ring">
                <svg viewBox="0 0 120 120" className="token-svg">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(45,45,31,0.08)" strokeWidth="8"/>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#e07a5f" strokeWidth="8" strokeDasharray="327" strokeDashoffset="0" strokeLinecap="round" className="token-ring-fill"/>
                </svg>
                <span className="token-ring-label">🔥</span>
              </div>
              <h3>LP Burned</h3>
              <p>Liquidity permanently locked</p>
            </div>
            <div className="token-card">
              <div className="token-ring">
                <svg viewBox="0 0 120 120" className="token-svg">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(45,45,31,0.08)" strokeWidth="8"/>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#6baed6" strokeWidth="8" strokeDasharray="327" strokeDashoffset="0" strokeLinecap="round" className="token-ring-fill"/>
                </svg>
                <span className="token-ring-label">✓</span>
              </div>
              <h3>Renounced</h3>
              <p>Contract fully renounced</p>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ========== HOW TO BUY ========== */}
      <section className="section howto-section">
        <RevealSection>
          <span className="section-label">3 Easy Steps</span>
          <h2 className="section-title">How to Get Chill</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Get a Wallet</h3>
                <p>Download Phantom, MetaMask, or your favorite wallet. Fund it with SOL or ETH.</p>
              </div>
            </div>
            <div className="step-line" />
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Copy the CA</h3>
                <p>Hit that "Copy CA" button above. Head to your DEX of choice and paste it in.</p>
              </div>
            </div>
            <div className="step-line" />
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Swap & Chill</h3>
                <p>Confirm the swap. You're officially a Chill Giraffe holder. Now relax.</p>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ========== COMMUNITY VIBES ========== */}
      <section className="section vibes-section">
        <RevealSection>
          <span className="section-label">Community</span>
          <h2 className="section-title">The Chill Zone</h2>
          <div className="vibes-grid">
            <div className="vibe-card vibe-quote">
              <blockquote>"I don't check the charts. The charts check on me."</blockquote>
              <span className="vibe-author">— Every Chill Giraffe Holder</span>
            </div>
            <div className="vibe-card vibe-stat-card">
              <div className="vibe-stat">
                <span className="vibe-stat-value">100%</span>
                <span className="vibe-stat-desc">Community Owned</span>
              </div>
            </div>
            <div className="vibe-card vibe-stat-card">
              <div className="vibe-stat">
                <span className="vibe-stat-value">∞</span>
                <span className="vibe-stat-desc">Chill Level</span>
              </div>
            </div>
            <div className="vibe-card vibe-quote">
              <blockquote>"They asked me when I'm selling. I said when giraffes stop being tall."</blockquote>
              <span className="vibe-author">— Diamond Hooves Gang</span>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ========== FAQ ========== */}
      <section className="section faq-section">
        <RevealSection>
          <span className="section-label">Got Questions?</span>
          <h2 className="section-title">FAQ</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? 'faq-open' : ''}`}
              >
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="faq-chevron"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="section cta-section">
        <RevealSection className="cta-banner">
          <h2>Ready to get chill?</h2>
          <p>Join the tallest community in crypto.</p>
          <div className="button-group">
            <a href="#" className="btn btn-primary">Buy $GIRAFFE</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Follow Us
            </a>
          </div>
        </RevealSection>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-logo">🦒 Chill Giraffe</span>
          <p>Stay tall. Stay chill. &copy; {new Date().getFullYear()}</p>
          <p className="footer-disclaimer">$GIRAFFE is a meme coin with no intrinsic value or expectation of financial return. Always DYOR.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
