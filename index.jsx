import { useState, useEffect } from "react";

// ── Design tokens ──────────────────────────────────────────────
// Palette: deep plum · soft lavender · warm blush · ivory · charcoal
// Typography: Playfair Display (display) · Inter (body)
// Signature: a silky animated gradient hero underline that blooms on load

const COLORS = {
  plum:     "#4A1D6E",
  violet:   "#7B3FA0",
  lavender: "#C8A8E9",
  blush:    "#F2E6F9",
  ivory:    "#FAF7FC",
  charcoal: "#2C2C2C",
  muted:    "#6B6B6B",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: ${COLORS.ivory};
    color: ${COLORS.charcoal};
    -webkit-font-smoothing: antialiased;
  }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5vw;
    height: 68px;
    background: rgba(250,247,252,0.92);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid ${COLORS.lavender}44;
    transition: box-shadow 0.3s;
  }
  .nav.scrolled { box-shadow: 0 2px 24px ${COLORS.plum}18; }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.35rem;
    color: ${COLORS.plum};
    letter-spacing: 0.02em;
    text-decoration: none;
  }
  .nav-links {
    display: flex; gap: 2rem; list-style: none;
  }
  .nav-links a {
    font-size: 0.85rem; font-weight: 500; letter-spacing: 0.06em;
    text-transform: uppercase; color: ${COLORS.charcoal};
    text-decoration: none; transition: color 0.2s;
  }
  .nav-links a:hover { color: ${COLORS.violet}; }
  .nav-cta {
    background: ${COLORS.plum}; color: #fff;
    border: none; border-radius: 2px;
    padding: 0.55rem 1.3rem;
    font-size: 0.8rem; font-weight: 500; letter-spacing: 0.07em;
    text-transform: uppercase; cursor: pointer;
    transition: background 0.2s;
  }
  .nav-cta:hover { background: ${COLORS.violet}; }
  .nav-hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 4px;
  }
  .nav-hamburger span {
    display: block; width: 24px; height: 2px;
    background: ${COLORS.plum}; transition: all 0.25s;
  }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    text-align: center;
    padding: 100px 5vw 60px;
    background: linear-gradient(160deg, ${COLORS.blush} 0%, ${COLORS.ivory} 60%);
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 50% at 70% 30%, ${COLORS.lavender}55, transparent);
    pointer-events: none;
  }
  .hero-eyebrow {
    font-size: 0.75rem; font-weight: 500; letter-spacing: 0.18em;
    text-transform: uppercase; color: ${COLORS.violet};
    margin-bottom: 1.2rem;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.6rem, 6vw, 5.2rem);
    line-height: 1.08;
    color: ${COLORS.plum};
    margin-bottom: 0.6rem;
  }
  .hero-title em {
    font-style: italic;
    background: linear-gradient(90deg, ${COLORS.violet}, ${COLORS.lavender});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-sub {
    font-size: clamp(1rem, 2vw, 1.2rem); font-weight: 300;
    color: ${COLORS.muted}; margin: 1.4rem auto 0;
    max-width: 480px; line-height: 1.7;
  }
  .hero-actions {
    display: flex; gap: 1rem; justify-content: center;
    flex-wrap: wrap; margin-top: 2.4rem;
  }
  .btn-primary {
    background: ${COLORS.plum}; color: #fff;
    border: none; border-radius: 2px;
    padding: 0.9rem 2rem; font-size: 0.9rem;
    font-weight: 500; letter-spacing: 0.06em;
    text-transform: uppercase; cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-primary:hover { background: ${COLORS.violet}; transform: translateY(-1px); }
  .btn-ghost {
    background: transparent; color: ${COLORS.plum};
    border: 1.5px solid ${COLORS.plum}; border-radius: 2px;
    padding: 0.9rem 2rem; font-size: 0.9rem;
    font-weight: 500; letter-spacing: 0.06em;
    text-transform: uppercase; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-ghost:hover { background: ${COLORS.blush}; }

  /* ── SECTION SHARED ── */
  section { padding: 80px 5vw; }
  .section-label {
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.18em;
    text-transform: uppercase; color: ${COLORS.violet};
    margin-bottom: 0.6rem;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    color: ${COLORS.plum}; line-height: 1.2;
    margin-bottom: 1rem;
  }
  .section-body {
    font-size: 1rem; color: ${COLORS.muted};
    line-height: 1.75; max-width: 520px;
  }

  /* ── SERVICES ── */
  .services { background: ${COLORS.ivory}; }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem; margin-top: 3rem;
  }
  .service-card {
    background: #fff;
    border: 1px solid ${COLORS.lavender}66;
    border-radius: 4px;
    padding: 2rem 1.6rem;
    transition: box-shadow 0.25s, transform 0.2s;
    cursor: default;
  }
  .service-card:hover {
    box-shadow: 0 8px 32px ${COLORS.plum}14;
    transform: translateY(-3px);
  }
  .service-icon {
    font-size: 1.8rem; margin-bottom: 1rem;
  }
  .service-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem; color: ${COLORS.plum};
    margin-bottom: 0.5rem;
  }
  .service-desc {
    font-size: 0.88rem; color: ${COLORS.muted};
    line-height: 1.65;
  }
  .service-price {
    margin-top: 1.2rem;
    font-size: 0.8rem; font-weight: 500;
    letter-spacing: 0.05em; color: ${COLORS.violet};
  }

  /* ── ABOUT ── */
  .about {
    background: ${COLORS.blush};
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem; align-items: center;
  }
  .about-visual {
    aspect-ratio: 4/5;
    background: linear-gradient(145deg, ${COLORS.lavender}88, ${COLORS.plum}55);
    border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    font-size: 5rem;
  }
  .about-stats {
    display: flex; gap: 2rem; margin-top: 2.5rem; flex-wrap: wrap;
  }
  .stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 2rem; color: ${COLORS.plum};
  }
  .stat-label {
    font-size: 0.75rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: ${COLORS.muted};
    margin-top: 0.2rem;
  }

  /* ── TESTIMONIALS ── */
  .testimonials { background: ${COLORS.plum}; }
  .testimonials .section-label { color: ${COLORS.lavender}; }
  .testimonials .section-title { color: #fff; }
  .testi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem; margin-top: 3rem;
  }
  .testi-card {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 4px; padding: 1.8rem;
  }
  .testi-stars { color: ${COLORS.lavender}; font-size: 0.9rem; margin-bottom: 1rem; }
  .testi-quote {
    font-size: 0.95rem; color: rgba(255,255,255,0.88);
    line-height: 1.7; font-style: italic;
    margin-bottom: 1.2rem;
  }
  .testi-name {
    font-size: 0.8rem; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: ${COLORS.lavender};
  }

  /* ── BOOKING ── */
  .booking { background: ${COLORS.ivory}; text-align: center; }
  .booking .section-body { margin: 0 auto; text-align: center; }
  .booking-card {
    margin: 2.5rem auto 0;
    max-width: 560px;
    background: #fff;
    border: 1px solid ${COLORS.lavender}66;
    border-radius: 4px;
    padding: 2.5rem 2rem;
  }
  .form-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
    margin-bottom: 1rem;
  }
  .form-field {
    display: flex; flex-direction: column; gap: 0.4rem;
    text-align: left;
  }
  .form-field label {
    font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: ${COLORS.muted};
  }
  .form-field input, .form-field select {
    border: 1px solid ${COLORS.lavender}99;
    border-radius: 2px; padding: 0.65rem 0.8rem;
    font-size: 0.9rem; font-family: inherit;
    color: ${COLORS.charcoal}; background: ${COLORS.ivory};
    outline: none; transition: border-color 0.2s;
  }
  .form-field input:focus, .form-field select:focus {
    border-color: ${COLORS.violet};
  }
  .form-submit {
    width: 100%; margin-top: 1rem;
    background: ${COLORS.plum}; color: #fff;
    border: none; border-radius: 2px;
    padding: 0.9rem; font-size: 0.9rem;
    font-weight: 500; letter-spacing: 0.06em;
    text-transform: uppercase; cursor: pointer;
    transition: background 0.2s;
  }
  .form-submit:hover { background: ${COLORS.violet}; }

  /* ── FOOTER ── */
  footer {
    background: ${COLORS.charcoal}; color: rgba(255,255,255,0.6);
    padding: 3rem 5vw 2rem;
    display: flex; flex-wrap: wrap;
    justify-content: space-between; gap: 2rem;
  }
  .footer-brand {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem; color: #fff; margin-bottom: 0.5rem;
  }
  .footer-tagline { font-size: 0.82rem; }
  .footer-col h4 {
    font-size: 0.72rem; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: ${COLORS.lavender}; margin-bottom: 0.8rem;
  }
  .footer-col p, .footer-col a {
    font-size: 0.85rem; line-height: 2;
    color: rgba(255,255,255,0.55);
    text-decoration: none; display: block;
    transition: color 0.2s;
  }
  .footer-col a:hover { color: ${COLORS.lavender}; }
  .footer-bottom {
    width: 100%; border-top: 1px solid rgba(255,255,255,0.08);
    margin-top: 2rem; padding-top: 1.2rem;
    font-size: 0.78rem; text-align: center;
  }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    .nav-links, .nav-cta { display: none; }
    .nav-hamburger { display: flex; }
    .nav-links.open {
      display: flex; flex-direction: column;
      position: fixed; top: 68px; left: 0; right: 0;
      background: ${COLORS.ivory}; padding: 1.5rem 5vw 2rem;
      border-bottom: 1px solid ${COLORS.lavender}44;
      gap: 1.2rem;
    }
    .nav-links.open + .nav-cta { display: block; margin-top: 0.5rem; }
    .about {
      grid-template-columns: 1fr;
    }
    .about-visual { max-height: 280px; }
    .form-row { grid-template-columns: 1fr; }
    footer { flex-direction: column; }
  }

  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; animation: none !important; }
  }
`;

const SERVICES = [
  { icon: "💅", name: "Nail Art & Manicure", desc: "Gel, acrylic, chrome, and hand-painted designs tailored to you.", price: "From £28" },
  { icon: "✨", name: "Facial Treatments", desc: "Deep-cleanse, hydrating, and anti-ageing facials using premium serums.", price: "From £45" },
  { icon: "🌸", name: "Lash & Brow", desc: "Lash extensions, lifts, tints, and precision brow shaping.", price: "From £35" },
  { icon: "💆", name: "Luxury Massage", desc: "Swedish, hot stone, and aromatherapy massages for full relaxation.", price: "From £55" },
  { icon: "🌿", name: "Waxing & Threading", desc: "Smooth, long-lasting results with skin-kind waxes.", price: "From £12" },
  { icon: "💄", name: "Bridal Packages", desc: "Full-day pampering packages for your most important occasion.", price: "From £180" },
];

const TESTIMONIALS = [
  { quote: "I leave feeling like a completely new person every single time. The team genuinely listen to what you want.", name: "Sophie M." },
  { quote: "The atmosphere is so calm and luxurious. My lashes have never looked this good — honestly incredible.", name: "Priya K." },
  { quote: "Booked a bridal package and they exceeded every expectation. Couldn't have asked for a better experience.", name: "Hannah T." },
];

export default function EleganceBeautySalon() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a className="nav-logo" href="#">Elegance</a>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {["services","about","testimonials","booking"].map(s => (
            <li key={s}><a href={`#${s}`} onClick={e => { e.preventDefault(); scrollTo(s); }}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("booking")}>Book Now</button>
        <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div>
          <p className="hero-eyebrow">Award-winning beauty salon · Est. 2018</p>
          <h1 className="hero-title">
            Where beauty<br />meets <em>intention</em>
          </h1>
          <p className="hero-sub">
            Premium treatments, expert hands, and a calm space that puts you first.
            Located in the heart of the city.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("booking")}>Book a Treatment</button>
            <button className="btn-ghost" onClick={() => scrollTo("services")}>View Services</button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <p className="section-label">What we offer</p>
        <h2 className="section-title">Our treatments</h2>
        <p className="section-body">Every treatment is tailored to you — because beauty isn't one-size-fits-all.</p>
        <div className="services-grid">
          {SERVICES.map(s => (
            <div className="service-card" key={s.name}>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <p className="service-price">{s.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-visual">🌸</div>
        <div>
          <p className="section-label">Our story</p>
          <h2 className="section-title">Beauty rooted in care</h2>
          <p className="section-body">
            Elegance Beauty Salon was founded on a simple belief: that everyone deserves to feel
            their best. Our trained therapists bring years of expertise and a genuine passion for
            their craft to every appointment — no rushing, no shortcuts.
          </p>
          <div className="about-stats">
            <div>
              <p className="stat-value">2,400+</p>
              <p className="stat-label">Happy clients</p>
            </div>
            <div>
              <p className="stat-value">8 yrs</p>
              <p className="stat-label">In business</p>
            </div>
            <div>
              <p className="stat-value">12</p>
              <p className="stat-label">Expert therapists</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="testimonials">
        <p className="section-label">What clients say</p>
        <h2 className="section-title">Loved by real people</h2>
        <div className="testi-grid">
          {TESTIMONIALS.map(t => (
            <div className="testi-card" key={t.name}>
              <p className="testi-stars">★★★★★</p>
              <p className="testi-quote">"{t.quote}"</p>
              <p className="testi-name">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section className="booking" id="booking">
        <p className="section-label">Reserve your spot</p>
        <h2 className="section-title">Book a treatment</h2>
        <p className="section-body">We'll confirm your appointment within 2 hours.</p>
        <div className="booking-card">
          {booked ? (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <p style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🌸</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: COLORS.plum, marginBottom: "0.6rem" }}>You're booked in!</p>
              <p style={{ fontSize: "0.9rem", color: COLORS.muted }}>We'll send a confirmation to your email shortly.</p>
              <button className="btn-ghost" style={{ marginTop: "1.5rem" }} onClick={() => setBooked(false)}>Book another</button>
            </div>
          ) : (
            <>
              <div className="form-row">
                <div className="form-field">
                  <label>First name</label>
                  <input type="text" placeholder="Sophie" />
                </div>
                <div className="form-field">
                  <label>Last name</label>
                  <input type="text" placeholder="Miller" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Email</label>
                  <input type="email" placeholder="you@email.com" />
                </div>
                <div className="form-field">
                  <label>Phone</label>
                  <input type="tel" placeholder="07700 900000" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Treatment</label>
                  <select>
                    {SERVICES.map(s => <option key={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Preferred date</label>
                  <input type="date" />
                </div>
              </div>
              <button className="form-submit" onClick={() => setBooked(true)}>Request Appointment</button>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <p className="footer-brand">Elegance Beauty Salon</p>
          <p className="footer-tagline">Where beauty meets intention.</p>
        </div>
        <div className="footer-col">
          <h4>Treatments</h4>
          {SERVICES.slice(0,4).map(s => <a key={s.name} href="#services">{s.name}</a>)}
        </div>
        <div className="footer-col">
          <h4>Visit us</h4>
          <p>12 Blossom Lane</p>
          <p>London, W1B 4AA</p>
          <p>Mon–Sat · 9am – 7pm</p>
          <p>Sun · 10am – 5pm</p>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href="tel:02012345678">020 1234 5678</a>
          <a href="mailto:hello@elegancebeauty.co.uk">hello@elegancebeauty.co.uk</a>
        </div>
        <p className="footer-bottom">© 2026 Elegance Beauty Salon. All rights reserved.</p>
      </footer>
    </>
  );
}
