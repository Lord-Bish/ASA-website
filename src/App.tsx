import { useState, useEffect } from "react";

// Image paths - place these in your /public/images/ folder
const IMG = {
  logo:  "/images/logo.jpg",
  nail1: "/images/nail1.jpg",   // blue swirl stiletto nails
  nail2: "/images/nail2.jpg",   // yellow french square nails
  nail3: "/images/nail3.jpg",   // red/white mixed stiletto
  nail4: "/images/nail4.jpg",   // multicolour artistic stiletto
  nail5: "/images/nail5.jpg",   // green floral stiletto
  nail6: "/images/nail6.jpg",   // pink & gold coffin nails
};

const COLORS = {
  plum:     "#5B2580",
  violet:   "#8B4FBA",
  lavender: "#C9A8E8",
  blush:    "#F3EAFB",
  ivory:    "#FAF7FC",
  charcoal: "#2C2C2C",
  muted:    "#6B6275",
  gold:     "#C9A84C",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',sans-serif;background:${COLORS.ivory};color:${COLORS.charcoal};-webkit-font-smoothing:antialiased}

  /* NAV */
  .nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 5vw;height:72px;background:rgba(250,247,252,0.93);backdrop-filter:blur(10px);border-bottom:1px solid ${COLORS.lavender}44;transition:box-shadow 0.3s}
  .nav.scrolled{box-shadow:0 2px 24px ${COLORS.plum}18}
  .nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none}
  .nav-logo img{width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid ${COLORS.lavender}}
  .nav-logo span{font-family:'Playfair Display',serif;font-size:1.1rem;color:${COLORS.plum};letter-spacing:0.02em}
  .nav-links{display:flex;gap:2rem;list-style:none}
  .nav-links a{font-size:0.82rem;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;color:${COLORS.charcoal};text-decoration:none;transition:color 0.2s}
  .nav-links a:hover{color:${COLORS.violet}}
  .nav-cta{background:${COLORS.plum};color:#fff;border:none;border-radius:2px;padding:0.55rem 1.3rem;font-size:0.78rem;font-weight:500;letter-spacing:0.07em;text-transform:uppercase;cursor:pointer;transition:background 0.2s}
  .nav-cta:hover{background:${COLORS.violet}}
  .nav-hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px}
  .nav-hamburger span{display:block;width:24px;height:2px;background:${COLORS.plum};transition:all 0.25s}

  /* HERO */
  .hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:100px 5vw 60px;background:linear-gradient(155deg,${COLORS.blush} 0%,${COLORS.ivory} 65%);position:relative;overflow:hidden}
  .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 70% 25%,${COLORS.lavender}55,transparent);pointer-events:none}
  .hero-eyebrow{font-size:0.72rem;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.violet};margin-bottom:1rem}
  .hero-logo{width:120px;height:120px;border-radius:50%;object-fit:cover;border:3px solid ${COLORS.lavender};margin:0 auto 1.4rem;display:block;box-shadow:0 8px 32px ${COLORS.plum}22}
  .hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.4rem,5.5vw,4.8rem);line-height:1.1;color:${COLORS.plum};margin-bottom:0.6rem}
  .hero-title em{font-style:italic;background:linear-gradient(90deg,${COLORS.violet},${COLORS.lavender});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .hero-tagline{font-size:1.05rem;font-weight:400;color:${COLORS.muted};margin:0.6rem auto 0;letter-spacing:0.05em}
  .hero-sub{font-size:clamp(0.95rem,2vw,1.1rem);font-weight:300;color:${COLORS.muted};margin:1.2rem auto 0;max-width:480px;line-height:1.75}
  .hero-contact{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:1.2rem}
  .hero-contact a{font-size:0.85rem;color:${COLORS.violet};text-decoration:none;font-weight:500;letter-spacing:0.04em}
  .hero-actions{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:2rem}
  .btn-primary{background:${COLORS.plum};color:#fff;border:none;border-radius:2px;padding:0.9rem 2rem;font-size:0.88rem;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;transition:background 0.2s,transform 0.15s}
  .btn-primary:hover{background:${COLORS.violet};transform:translateY(-1px)}
  .btn-ghost{background:transparent;color:${COLORS.plum};border:1.5px solid ${COLORS.plum};border-radius:2px;padding:0.9rem 2rem;font-size:0.88rem;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;transition:all 0.2s}
  .btn-ghost:hover{background:${COLORS.blush}}

  /* SECTION SHARED */
  section{padding:80px 5vw}
  .section-label{font-size:0.7rem;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.violet};margin-bottom:0.5rem}
  .section-title{font-family:'Playfair Display',serif;font-size:clamp(1.7rem,3.2vw,2.6rem);color:${COLORS.plum};line-height:1.2;margin-bottom:0.9rem}
  .section-body{font-size:0.96rem;color:${COLORS.muted};line-height:1.78;max-width:520px}

  /* GALLERY */
  .gallery{background:${COLORS.ivory}}
  .gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:2.5rem}
  .gallery-grid img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:3px;transition:transform 0.3s,box-shadow 0.3s;cursor:pointer}
  .gallery-grid img:hover{transform:scale(1.03);box-shadow:0 12px 40px ${COLORS.plum}22}

  /* SERVICES */
  .services{background:${COLORS.blush}}
  .services-layout{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;margin-top:2.5rem}
  .price-category{margin-bottom:2rem}
  .price-cat-title{font-family:'Playfair Display',serif;font-size:1rem;color:${COLORS.plum};border-bottom:1px solid ${COLORS.lavender}99;padding-bottom:0.4rem;margin-bottom:0.8rem}
  .price-row{display:flex;justify-content:space-between;align-items:center;padding:0.3rem 0;font-size:0.87rem;color:${COLORS.charcoal};border-bottom:1px dotted ${COLORS.lavender}66}
  .price-row:last-child{border-bottom:none}
  .price-val{font-weight:500;color:${COLORS.violet};white-space:nowrap;margin-left:1rem}
  .services-note{background:#fff;border:1px solid ${COLORS.lavender}66;border-radius:4px;padding:1.2rem 1.4rem;margin-top:1.5rem;font-size:0.82rem;color:${COLORS.muted};line-height:1.7}
  .services-note strong{color:${COLORS.plum}}

  /* WHY */
  .why{background:${COLORS.plum}}
  .why .section-label{color:${COLORS.lavender}}
  .why .section-title{color:#fff}
  .why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-top:2.5rem}
  .why-card{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:4px;padding:1.6rem 1.4rem}
  .why-icon{font-size:1.8rem;margin-bottom:0.8rem}
  .why-title{font-family:'Playfair Display',serif;font-size:1rem;color:#fff;margin-bottom:0.4rem}
  .why-desc{font-size:0.85rem;color:rgba(255,255,255,0.75);line-height:1.65}

  /* BOOKING */
  .booking{background:${COLORS.ivory};text-align:center}
  .booking .section-body{margin:0 auto;text-align:center}
  .booking-card{margin:2.5rem auto 0;max-width:560px;background:#fff;border:1px solid ${COLORS.lavender}66;border-radius:4px;padding:2.5rem 2rem}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
  .form-field{display:flex;flex-direction:column;gap:0.4rem;text-align:left}
  .form-field label{font-size:0.72rem;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.muted}}
  .form-field input,.form-field select,.form-field textarea{border:1px solid ${COLORS.lavender}99;border-radius:2px;padding:0.65rem 0.8rem;font-size:0.88rem;font-family:inherit;color:${COLORS.charcoal};background:${COLORS.ivory};outline:none;transition:border-color 0.2s;resize:none}
  .form-field input:focus,.form-field select:focus,.form-field textarea:focus{border-color:${COLORS.violet}}
  .form-submit{width:100%;margin-top:1rem;background:${COLORS.plum};color:#fff;border:none;border-radius:2px;padding:0.9rem;font-size:0.9rem;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;transition:background 0.2s}
  .form-submit:hover{background:${COLORS.violet}}

  /* FOOTER */
  footer{background:${COLORS.charcoal};color:rgba(255,255,255,0.6);padding:3rem 5vw 2rem;display:flex;flex-wrap:wrap;justify-content:space-between;gap:2rem}
  .footer-brand{font-family:'Playfair Display',serif;font-size:1.15rem;color:#fff;margin-bottom:0.4rem}
  .footer-tagline{font-size:0.8rem}
  .footer-col h4{font-size:0.7rem;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:${COLORS.lavender};margin-bottom:0.8rem}
  .footer-col p,.footer-col a{font-size:0.83rem;line-height:2;color:rgba(255,255,255,0.55);text-decoration:none;display:block;transition:color 0.2s}
  .footer-col a:hover{color:${COLORS.lavender}}
  .footer-bottom{width:100%;border-top:1px solid rgba(255,255,255,0.08);margin-top:2rem;padding-top:1.2rem;font-size:0.76rem;text-align:center}

  /* MOBILE */
  @media(max-width:768px){
    .nav-links,.nav-cta{display:none}
    .nav-hamburger{display:flex}
    .nav-links.open{display:flex;flex-direction:column;position:fixed;top:72px;left:0;right:0;background:${COLORS.ivory};padding:1.5rem 5vw 2rem;border-bottom:1px solid ${COLORS.lavender}44;gap:1.2rem}
    .gallery-grid{grid-template-columns:repeat(2,1fr)}
    .services-layout{grid-template-columns:1fr}
    .form-row{grid-template-columns:1fr}
    footer{flex-direction:column}
  }
  @media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;

const SERVICES_DATA = [
  {
    cat: "Gel Extensions",
    items: [
      { name: "Short", price: "₦4,000" },
      { name: "Medium", price: "₦6,000" },
      { name: "Long", price: "₦9,000" },
      { name: "XLong", price: "₦11,000" },
    ]
  },
  {
    cat: "Acrylic Extensions",
    items: [
      { name: "Short", price: "₦8,000" },
      { name: "Medium", price: "₦10,000" },
      { name: "Long", price: "₦13,000" },
      { name: "XLong", price: "₦15,000" },
      { name: "Overlay", price: "₦10,000" },
      { name: "Refill", price: "₦10,000" },
      { name: "Soak Off", price: "₦3,000" },
    ]
  },
  {
    cat: "BIAB",
    items: [
      { name: "Overlay", price: "₦10,000" },
      { name: "With Tips", price: "₦12,000" },
    ]
  },
  {
    cat: "Toes",
    items: [
      { name: "Gel Polish", price: "₦1,500" },
      { name: "Gel + Big Toe", price: "₦2,000" },
      { name: "Full Toes", price: "₦3,000" },
      { name: "Acrylic Toes (Plain)", price: "₦8,000" },
      { name: "Acrylic Toes Refill", price: "₦6,000" },
    ]
  },
  {
    cat: "Design Add-Ons",
    items: [
      { name: "French Tips", price: "₦2,000" },
      { name: "Double French Tips", price: "₦2,500" },
      { name: "Chrome / 3D Design", price: "₦3,000" },
      { name: "Cat Eye", price: "₦2,000" },
      { name: "Ombré / Aura Effect", price: "₦2,000" },
      { name: "Blooming Gel", price: "₦1,000" },
      { name: "Marble Design", price: "₦1,000" },
      { name: "Foil Design / Glitters", price: "₦1,500" },
      { name: "Nail Art", price: "₦1,500" },
      { name: "Nail Charms", price: "₦500 each" },
    ]
  },
  {
    cat: "Other Services",
    items: [
      { name: "Lash Extension", price: "On request" },
      { name: "Micro-blading", price: "On request" },
      { name: "Cluster Lashes", price: "On request" },
      { name: "Press-on Nails", price: "On request" },
    ]
  },
];

const WHY = [
  { icon: "💅", title: "Neat & Professional Work", desc: "Every set is finished with precision — no shortcuts, no rushing." },
  { icon: "⏳", title: "Long-Lasting Nails", desc: "Premium products chosen for durability and a flawless finish." },
  { icon: "✨", title: "Quality Products", desc: "Only trusted nail brands used on every client, every time." },
  { icon: "💜", title: "Affordable Prices", desc: "Luxury results without the luxury price tag." },
];

const NAIL_PHOTOS = [IMG.nail1, IMG.nail2, IMG.nail3, IMG.nail4, IMG.nail5, IMG.nail6];

export default function AsaWinkAndTip() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a className="nav-logo" href="#">
          <img src={IMG.logo} alt="Asa's Wink & Tip logo" />
          <span>Asa's Wink & Tip</span>
        </a>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {["gallery","services","why","booking"].map(s => (
            <li key={s}><a href={`#${s}`} onClick={e => { e.preventDefault(); scrollTo(s); }}>
              {s === "why" ? "Why Us" : s.charAt(0).toUpperCase()+s.slice(1)}
            </a></li>
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
          <img src={IMG.logo} alt="Asa's Wink & Tip" className="hero-logo" />
          <p className="hero-eyebrow">Nails · Lashes · Brows · Chikas, Old Karu Rd</p>
          <h1 className="hero-title">
            Asa's <em>Wink</em><br />& Tip
          </h1>
          <p className="hero-tagline">Beauty. Perfection.</p>
          <p className="hero-sub">
            Premium nail art, lash extensions, microblading and more —
            crafted with care, built to last.
          </p>
          <div className="hero-contact">
            <a href="tel:09049216479">📞 09049216479</a>
            <a href="https://wa.me/2349049216479" target="_blank" rel="noreferrer">💬 WhatsApp us</a>
          </div>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("booking")}>Book a Treatment</button>
            <button className="btn-ghost" onClick={() => scrollTo("services")}>See Prices</button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery" id="gallery">
        <p className="section-label">Our Work</p>
        <h2 className="section-title">Fresh from the salon</h2>
        <p className="section-body">Every set is hand-crafted. Here's a look at what we've been creating.</p>
        <div className="gallery-grid">
          {NAIL_PHOTOS.map((src, i) => (
            <img key={i} src={src} alt={`Nail art example ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </section>

      {/* SERVICES / PRICE LIST */}
      <section className="services" id="services">
        <p className="section-label">Price List</p>
        <h2 className="section-title">Transparent pricing</h2>
        <p className="section-body">No hidden fees. All prices below — design add-ons are subject to style & time.</p>
        <div className="services-layout">
          <div>
            {SERVICES_DATA.slice(0, 3).map(cat => (
              <div className="price-category" key={cat.cat}>
                <h3 className="price-cat-title">{cat.cat}</h3>
                {cat.items.map(item => (
                  <div className="price-row" key={item.name}>
                    <span>{item.name}</span>
                    <span className="price-val">{item.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div>
            {SERVICES_DATA.slice(3).map(cat => (
              <div className="price-category" key={cat.cat}>
                <h3 className="price-cat-title">{cat.cat}</h3>
                {cat.items.map(item => (
                  <div className="price-row" key={item.name}>
                    <span>{item.name}</span>
                    <span className="price-val">{item.price}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="services-note">
              <strong>Please note:</strong> Design prices subject to style & time. A deposit secures your slot and is non-refundable. 50% deposit required for custom bookings.
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why" id="why">
        <p className="section-label">Why choose us</p>
        <h2 className="section-title">What sets us apart</h2>
        <div className="why-grid">
          {WHY.map(w => (
            <div className="why-card" key={w.title}>
              <div className="why-icon">{w.icon}</div>
              <h3 className="why-title">{w.title}</h3>
              <p className="why-desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section className="booking" id="booking">
        <p className="section-label">Reserve your slot</p>
        <h2 className="section-title">Book an appointment</h2>
        <p className="section-body">We'll confirm within a few hours. A deposit secures your spot.</p>
        <div className="booking-card">
          {booked ? (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <p style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>💜</p>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", color: "#5B2580", marginBottom: "0.6rem" }}>You're booked in!</p>
              <p style={{ fontSize: "0.9rem", color: "#6B6275" }}>We'll reach out on WhatsApp to confirm and arrange your deposit.</p>
              <button className="btn-ghost" style={{ marginTop: "1.5rem" }} onClick={() => setBooked(false)}>Book another</button>
            </div>
          ) : (
            <>
              <div className="form-row">
                <div className="form-field">
                  <label>First name</label>
                  <input type="text" placeholder="Amara" />
                </div>
                <div className="form-field">
                  <label>Last name</label>
                  <input type="text" placeholder="Okonkwo" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Phone / WhatsApp</label>
                  <input type="tel" placeholder="09049216479" />
                </div>
                <div className="form-field">
                  <label>Preferred date</label>
                  <input type="date" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Service</label>
                  <select>
                    <option>Gel Extensions</option>
                    <option>Acrylic Extensions</option>
                    <option>BIAB</option>
                    <option>Toes</option>
                    <option>Lash Extension</option>
                    <option>Micro-blading</option>
                    <option>Cluster Lashes</option>
                    <option>Press-on Nails</option>
                    <option>Other / Multiple</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Nail length (if applicable)</label>
                  <select>
                    <option>Short</option>
                    <option>Medium</option>
                    <option>Long</option>
                    <option>XLong</option>
                    <option>N/A</option>
                  </select>
                </div>
              </div>
              <div className="form-field" style={{ marginBottom: "1rem" }}>
                <label>Any notes or design ideas?</label>
                <textarea rows={3} placeholder="e.g. I'd love chrome with marble add-on…" />
              </div>
              <button className="form-submit" onClick={() => setBooked(true)}>Request Appointment</button>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <p className="footer-brand">Asa's Wink & Tip</p>
          <p className="footer-tagline">Beauty. Perfection.</p>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <p>Gel & Acrylic Extensions</p>
          <p>BIAB · Press-on Nails</p>
          <p>Lash Extensions</p>
          <p>Micro-blading · Cluster Lashes</p>
          <p>Pedicure & Toes</p>
        </div>
        <div className="footer-col">
          <h4>Visit us</h4>
          <p>Chikas, Old Karu Rd.</p>
          <p>Abuja, Nigeria</p>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href="tel:09049216479">09049216479</a>
          <a href="https://wa.me/2349049216479">WhatsApp</a>
        </div>
        <p className="footer-bottom">© 2026 Asa's Wink & Tip. All rights reserved.</p>
      </footer>
    </>
  );
}
