import { useState, useEffect } from "react";

const IMG = {
  logo:   "/images/logo.jpg",
  nail1:  "/images/nail1.jpg",
  nail2:  "/images/nail2.jpg",
  nail3:  "/images/nail3.jpg",
  nail4:  "/images/nail4.jpg",
  nail5:  "/images/nail5.jpg",
  nail6:  "/images/nail6.jpg",
  nail7:  "/images/nail7.jpg",
  lash1:  "/images/lash1.jpg",
  lash2:  "/images/lash2.jpg",
  lash3:  "/images/lash3.jpg",
  lash4:  "/images/lash4.jpg",
};

const C = {
  dark:     "#09060F",
  darker:   "#060409",
  card:     "#100D1A",
  cardHov:  "#16112A",
  border:   "#241840",
  plum:     "#7B35B8",
  violet:   "#A560E8",
  lav:      "#C9A8E8",
  gold:     "#C9A84C",
  muted:    "#9B8FAF",
  white:    "#F0EAF8",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Inter',sans-serif;background:${C.dark};color:${C.white};-webkit-font-smoothing:antialiased}
  img{display:block;max-width:100%}

  /* ANIMATED SHINE TEXT */
  .shine{background:linear-gradient(90deg,${C.lav},${C.violet},#fff,${C.violet},${C.lav});background-size:300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shine 5s linear infinite}
  @keyframes shine{0%{background-position:0%}100%{background-position:300%}}

  /* NAV */
  .nav{position:fixed;top:0;left:0;right:0;z-index:200;height:70px;display:flex;align-items:center;justify-content:space-between;padding:0 5vw;background:rgba(9,6,15,0.88);backdrop-filter:blur(18px);border-bottom:1px solid ${C.border};transition:box-shadow .3s}
  .nav.scrolled{box-shadow:0 4px 40px ${C.plum}33}
  .nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none}
  .nav-logo img{width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid ${C.violet};box-shadow:0 0 14px ${C.plum}99}
  .nav-logo-text{display:flex;flex-direction:column;line-height:1.1}
  .nav-logo-text span:first-child{font-family:'Playfair Display',serif;font-size:1rem;color:${C.lav};letter-spacing:.02em}
  .nav-logo-text span:last-child{font-size:.65rem;color:${C.muted};letter-spacing:.12em;text-transform:uppercase}
  .nav-links{display:flex;gap:1.8rem;list-style:none}
  .nav-links a{font-size:.78rem;font-weight:500;letter-spacing:.07em;text-transform:uppercase;color:${C.muted};text-decoration:none;transition:color .2s;position:relative}
  .nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:1px;background:${C.violet};transform:scaleX(0);transition:transform .2s}
  .nav-links a:hover{color:${C.lav}}
  .nav-links a:hover::after{transform:scaleX(1)}
  .nav-right{display:flex;align-items:center;gap:1rem}
  .nav-socials{display:flex;gap:.6rem}
  .nav-socials a{font-size:.75rem;color:${C.muted};text-decoration:none;transition:color .2s}
  .nav-socials a:hover{color:${C.violet}}
  .nav-cta{background:linear-gradient(135deg,${C.plum},${C.violet});color:#fff;border:none;border-radius:20px;padding:.5rem 1.2rem;font-size:.75rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;cursor:pointer;box-shadow:0 0 18px ${C.plum}55;transition:opacity .2s,box-shadow .2s}
  .nav-cta:hover{opacity:.85;box-shadow:0 0 28px ${C.violet}88}
  .nav-hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px}
  .nav-hamburger span{display:block;width:22px;height:2px;background:${C.lav};transition:all .25s;border-radius:2px}
  .mobile-menu{display:none;position:fixed;top:70px;left:0;right:0;background:rgba(9,6,15,.97);border-bottom:1px solid ${C.border};padding:1.5rem 5vw 2rem;z-index:199;flex-direction:column;gap:1.2rem}
  .mobile-menu.open{display:flex}
  .mobile-menu a{font-size:.85rem;font-weight:500;letter-spacing:.07em;text-transform:uppercase;color:${C.muted};text-decoration:none;padding:.4rem 0;border-bottom:1px solid ${C.border}}
  .mobile-menu a:hover{color:${C.lav}}
  .mobile-menu-cta{margin-top:.5rem;background:linear-gradient(135deg,${C.plum},${C.violet});color:#fff;border:none;border-radius:20px;padding:.7rem 1.5rem;font-size:.8rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;cursor:pointer;width:100%}

  /* HERO */
  .hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:100px 5vw 80px;background:radial-gradient(ellipse 90% 70% at 50% 0%,${C.plum}44 0%,${C.dark} 65%);position:relative;overflow:hidden}
  .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 40% 40% at 85% 85%,${C.violet}18,transparent);pointer-events:none}
  .hero-logo-wrap{position:relative;display:inline-block;margin-bottom:1.6rem}
  .hero-logo{width:140px;height:140px;border-radius:50%;object-fit:cover;border:3px solid ${C.violet};box-shadow:0 0 40px ${C.plum}99,0 0 80px ${C.plum}44}
  .hero-logo-ring{position:absolute;inset:-8px;border-radius:50%;border:1px solid ${C.violet}44;animation:spin 10s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  .hero-eyebrow{font-size:.7rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:${C.violet};margin-bottom:1rem}
  .hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.6rem,6vw,5rem);line-height:1.08;margin-bottom:.5rem}
  .hero-tagline{font-size:1rem;color:${C.muted};letter-spacing:.1em;margin-bottom:1.2rem}
  .hero-sub{font-size:clamp(.92rem,1.8vw,1.05rem);font-weight:300;color:${C.muted};max-width:460px;margin:0 auto 1.6rem;line-height:1.8}
  .hero-contact{display:flex;gap:1.2rem;justify-content:center;flex-wrap:wrap;margin-bottom:2rem}
  .hero-contact a{font-size:.85rem;color:${C.lav};text-decoration:none;font-weight:500;transition:color .2s;display:flex;align-items:center;gap:.4rem}
  .hero-contact a:hover{color:#fff}
  .hero-actions{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
  .hero-socials{display:flex;gap:1rem;justify-content:center;margin-top:2rem}
  .hero-socials a{display:flex;align-items:center;gap:.4rem;font-size:.8rem;color:${C.muted};text-decoration:none;border:1px solid ${C.border};border-radius:20px;padding:.4rem .9rem;transition:all .2s}
  .hero-socials a:hover{border-color:${C.violet};color:${C.lav}}
  .btn-primary{background:linear-gradient(135deg,${C.plum},${C.violet});color:#fff;border:none;border-radius:24px;padding:.85rem 2rem;font-size:.85rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;box-shadow:0 0 22px ${C.plum}66;transition:opacity .2s,transform .15s,box-shadow .2s}
  .btn-primary:hover{opacity:.88;transform:translateY(-2px);box-shadow:0 0 36px ${C.violet}88}
  .btn-ghost{background:transparent;color:${C.lav};border:1.5px solid ${C.violet};border-radius:24px;padding:.85rem 2rem;font-size:.85rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:all .2s}
  .btn-ghost:hover{background:${C.plum}22;border-color:${C.lav}}

  /* SECTION SHARED */
  section{padding:90px 5vw}
  .section-top{margin-bottom:3rem}
  .section-label{font-size:.68rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${C.violet};margin-bottom:.5rem}
  .section-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.8rem);color:${C.white};line-height:1.2;margin-bottom:.8rem}
  .section-body{font-size:.94rem;color:${C.muted};line-height:1.8;max-width:500px}

  /* TAB GALLERY */
  .gallery{background:${C.darker}}
  .gallery-tabs{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:2rem}
  .tab-btn{background:transparent;border:1px solid ${C.border};border-radius:20px;padding:.45rem 1.1rem;font-size:.78rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:${C.muted};cursor:pointer;transition:all .2s}
  .tab-btn.active,.tab-btn:hover{background:${C.plum};border-color:${C.plum};color:#fff;box-shadow:0 0 14px ${C.plum}55}
  .gallery-grid{display:grid;gap:10px}
  .gallery-grid.nails{grid-template-columns:repeat(3,1fr)}
  .gallery-grid.lashes{grid-template-columns:repeat(2,1fr)}
  .gallery-grid.all{grid-template-columns:repeat(3,1fr)}
  .g-item{position:relative;overflow:hidden;border-radius:6px;border:1px solid ${C.border};cursor:pointer}
  .g-item img{width:100%;object-fit:cover;display:block;filter:brightness(.7) saturate(.85);transition:filter .35s,transform .35s}
  .g-item.portrait img{aspect-ratio:3/4}
  .g-item.square img{aspect-ratio:1/1}
  .g-item:hover img{filter:brightness(.92) saturate(1.05);transform:scale(1.04)}
  .g-item-label{position:absolute;bottom:0;left:0;right:0;padding:.6rem .8rem;background:linear-gradient(to top,${C.dark}CC,transparent);font-size:.72rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${C.lav};opacity:0;transition:opacity .25s}
  .g-item:hover .g-item-label{opacity:1}

  /* LIGHTBOX */
  .lightbox{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:500;display:flex;align-items:center;justify-content:center;padding:2rem}
  .lightbox img{max-width:90vw;max-height:85vh;object-fit:contain;border-radius:4px;box-shadow:0 0 60px ${C.plum}44}
  .lightbox-close{position:absolute;top:1.5rem;right:1.5rem;background:none;border:1px solid ${C.border};border-radius:50%;width:40px;height:40px;color:${C.white};font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s}
  .lightbox-close:hover{background:${C.plum}44}

  /* SERVICES / PRICE */
  .services{background:${C.card}}
  .price-tabs{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:2.5rem}
  .services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem}
  .price-box{background:${C.dark};border:1px solid ${C.border};border-radius:8px;padding:1.6rem;transition:border-color .25s,box-shadow .25s}
  .price-box:hover{border-color:${C.violet}66;box-shadow:0 0 24px ${C.plum}22}
  .price-box-title{font-family:'Playfair Display',serif;font-size:1rem;color:${C.lav};margin-bottom:1rem;padding-bottom:.5rem;border-bottom:1px solid ${C.border};display:flex;align-items:center;gap:.5rem}
  .price-row{display:flex;justify-content:space-between;align-items:center;padding:.32rem 0;font-size:.85rem;color:rgba(240,234,248,.72);border-bottom:1px dotted ${C.border}33}
  .price-row:last-child{border:none}
  .price-val{font-weight:500;color:${C.violet};white-space:nowrap;margin-left:1rem}
  .price-note{background:${C.darker};border:1px solid ${C.border};border-radius:6px;padding:1rem 1.2rem;margin-top:2rem;font-size:.8rem;color:${C.muted};line-height:1.75;max-width:600px}
  .price-note strong{color:${C.lav}}

  /* WHY */
  .why{background:radial-gradient(ellipse 80% 60% at 50% 50%,${C.plum}33,${C.dark})}
  .why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.2rem;margin-top:2.5rem}
  .why-card{background:rgba(255,255,255,.03);border:1px solid ${C.border};border-radius:8px;padding:1.8rem 1.4rem;transition:border-color .25s,box-shadow .25s,transform .2s}
  .why-card:hover{border-color:${C.violet}88;box-shadow:0 0 28px ${C.plum}33;transform:translateY(-3px)}
  .why-icon{font-size:2rem;margin-bottom:.9rem}
  .why-title{font-family:'Playfair Display',serif;font-size:1rem;color:${C.white};margin-bottom:.4rem}
  .why-desc{font-size:.83rem;color:${C.muted};line-height:1.7}

  /* BOOKING */
  .booking{background:${C.darker};text-align:center}
  .booking .section-body{margin:0 auto;text-align:center}
  .booking-card{margin:2.5rem auto 0;max-width:580px;background:${C.card};border:1px solid ${C.border};border-radius:10px;padding:2.5rem 2rem;box-shadow:0 0 50px ${C.plum}1A}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
  .form-field{display:flex;flex-direction:column;gap:.4rem;text-align:left}
  .form-field label{font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${C.muted}}
  .form-field input,.form-field select,.form-field textarea{border:1px solid ${C.border};border-radius:6px;padding:.65rem .85rem;font-size:.88rem;font-family:inherit;color:${C.white};background:${C.dark};outline:none;transition:border-color .2s,box-shadow .2s;resize:none}
  .form-field input:focus,.form-field select:focus,.form-field textarea:focus{border-color:${C.violet};box-shadow:0 0 10px ${C.plum}33}
  .form-field select option{background:${C.dark}}
  .form-submit{width:100%;margin-top:1rem;background:linear-gradient(135deg,${C.plum},${C.violet});color:#fff;border:none;border-radius:24px;padding:.95rem;font-size:.9rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;cursor:pointer;box-shadow:0 0 22px ${C.plum}55;transition:opacity .2s,box-shadow .2s}
  .form-submit:hover{opacity:.85;box-shadow:0 0 36px ${C.violet}77}

  /* FOOTER */
  footer{background:${C.darker};border-top:1px solid ${C.border};padding:3.5rem 5vw 2rem;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:2rem}
  .footer-brand-logo{width:60px;height:60px;border-radius:50%;object-fit:cover;border:2px solid ${C.violet}66;margin-bottom:1rem;box-shadow:0 0 16px ${C.plum}44}
  .footer-brand-name{font-family:'Playfair Display',serif;font-size:1.1rem;color:${C.lav};margin-bottom:.3rem}
  .footer-tagline{font-size:.78rem;color:${C.muted};margin-bottom:1rem}
  .footer-socials{display:flex;gap:.6rem;flex-wrap:wrap}
  .footer-socials a{font-size:.72rem;color:${C.muted};text-decoration:none;border:1px solid ${C.border};border-radius:14px;padding:.3rem .7rem;transition:all .2s}
  .footer-socials a:hover{border-color:${C.violet};color:${C.lav}}
  .footer-col h4{font-size:.68rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${C.violet};margin-bottom:.9rem}
  .footer-col p,.footer-col a{font-size:.82rem;line-height:2.1;color:rgba(255,255,255,.42);text-decoration:none;display:block;transition:color .2s}
  .footer-col a:hover{color:${C.lav}}
  .footer-bottom{grid-column:1/-1;border-top:1px solid ${C.border};padding-top:1.2rem;font-size:.74rem;text-align:center;color:rgba(255,255,255,.28)}

  /* MOBILE */
  @media(max-width:900px){
    footer{grid-template-columns:1fr 1fr}
    .footer-bottom{grid-column:1/-1}
  }
  @media(max-width:768px){
    .nav-links,.nav-right{display:none}
    .nav-hamburger{display:flex}
    .gallery-grid.nails,.gallery-grid.all{grid-template-columns:repeat(2,1fr)}
    .gallery-grid.lashes{grid-template-columns:1fr 1fr}
    .services-grid{grid-template-columns:1fr}
    .form-row{grid-template-columns:1fr}
    footer{grid-template-columns:1fr}
  }
  @media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;

const NAIL_GALLERY = [
  { src: IMG.nail1, label: "" },
  { src: IMG.nail2, label: "" },
  { src: IMG.nail3, label: "" },
  { src: IMG.nail4, label: "" },
  { src: IMG.nail5, label: "" },
  { src: IMG.nail6, label: "" },
  { src: IMG.nail7, label: "" },
];

const LASH_GALLERY = [
  { src: IMG.lash1, label: "Classic" },
  { src: IMG.lash2, label: "Hybrid" },
  { src: IMG.lash3, label: "Wispy" },
  { src: IMG.lash4, label: "Volume" },
];

const PRICE_CATS = [
  {
    icon: "💅", title: "Gel Extensions",
    items: [
      { name: "Short", price: "₦4,000" },
      { name: "Medium", price: "₦5,000" },
      { name: "Long", price: "₦7,000" },
      { name: "XLong", price: "₦9,000" },
    ]
  },
  {
    icon: "✨", title: "Acrylic Extensions",
    items: [
      { name: "Short", price: "₦7,000" },
      { name: "Medium", price: "₦8,000" },
      { name: "Long", price: "₦10,000" },
      { name: "XLong", price: "₦12,000" },
      { name: "Overlay", price: "₦10,000" },
      { name: "Refill", price: "₦10,000" },
      { name: "Soak Off", price: "₦3,000" },
    ]
  },
  {
    icon: "💎", title: "Gel-X Extensions",
    items: [
      { name: "Short", price: "₦5,000" },
      { name: "Medium", price: "₦7,000" },
      { name: "Long", price: "₦9,000" },
      { name: "XLong", price: "₦10,000" },
    ]
  },
  {
    icon: "🔮", title: "BIAB / Builder Gel",
    items: [
      { name: "Overlay", price: "₦8,000" },
      { name: "Added Tips", price: "₦10,000" },
    ]
  },
  {
    icon: "🦶", title: "Toes",
    items: [
      { name: "Gel Polish", price: "₦1,500" },
      { name: "Gel + Big Toe", price: "₦2,000" },
      { name: "Full Toes", price: "₦3,000" },
      { name: "Acrylic Toes (Plain)", price: "₦5,000" },
      { name: "Acrylic Toes Refill", price: "₦6,000" },
    ]
  },
  {
    icon: "🎨", title: "Design Add-Ons",
    items: [
      { name: "French Tips", price: "₦1,000" },
      { name: "Double French Tips", price: "₦1,500" },
      { name: "Chrome / 3D Design", price: "₦2,000" },
      { name: "Cat Eye", price: "₦2,000" },
      { name: "Ombré / Aura Effect", price: "₦1,000" },
      { name: "Blooming Gel", price: "₦1,000" },
      { name: "Marble Design", price: "₦1,000" },
      { name: "Foil Design / Glitters", price: "₦1,500" },
      { name: "Nail Art", price: "₦1,000" },
      { name: "Nail Charms", price: "₦500 each" },
    ]
  },
  {
    icon: "👁️", title: "Eyelash Extensions",
    items: [
      { name: "Classic", price: "₦10,000" },
      { name: "Hybrid", price: "₦12,000" },
      { name: "Volume", price: "₦15,000" },
      { name: "Wispy", price: "₦5,000" },
    ]
  },
  {
    icon: "✂️", title: "Lash Refill",
    items: [
      { name: "Volume", price: "₦7,000" },
      { name: "Hybrid / Classic", price: "₦5,000" },
      { name: "Lash Removal", price: "₦2,000" },
    ]
  },
  {
    icon: "🖌️", title: "Eyebrows",
    items: [
      { name: "Ombré Brows", price: "₦25,000" },
      { name: "Micro Blading", price: "₦20,000" },
      { name: "Brow Lamination & Tint", price: "₦10,000" },
      { name: "Brow Touch-up", price: "₦15,000" },
      { name: "Eyebrow Tint Only", price: "₦5,000" },
      { name: "Combo Brows", price: "₦30,000" },
    ]
  },
  {
    icon: "💅", title: "Press-on Nails",
    items: [
      { name: "Press-on Nails", price: "On request" },
    ]
  },
];

const WHY = [
  { icon: "💅", title: "Neat & Professional", desc: "Every set finished with precision - no shortcuts, no rushing." },
  { icon: "⏳", title: "Long-Lasting Results", desc: "Premium products chosen for durability and a flawless finish." },
  { icon: "✨", title: "Quality Products Only", desc: "Only trusted nail and lash brands used on every client." },
  { icon: "💜", title: "Affordable Prices", desc: "Luxury results without the luxury price tag." },
];

const NAV_LINKS = ["gallery", "services", "why", "booking"];

export default function AsaWinkAndTip() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState<"all"|"nails"|"lashes">("all");
  const [lightbox, setLightbox] = useState<string|null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [lightbox]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const allGallery = [
    ...NAIL_GALLERY.map(i => ({ ...i, type: "nails" })),
    ...LASH_GALLERY.map(i => ({ ...i, type: "lashes" })),
  ];
  const filtered = galleryTab === "all" ? allGallery
    : galleryTab === "nails" ? allGallery.filter(i => i.type === "nails")
    : allGallery.filter(i => i.type === "lashes");

  return (
    <>
      <style>{css}</style>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Gallery" onClick={e => e.stopPropagation()} />
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
        </div>
      )}

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a className="nav-logo" href="#">
          <img src={IMG.logo} alt="ASA. WinkandTip" />
          <div className="nav-logo-text">
            <span>ASA. Wink&Tip</span>
            <span>Beauty · Perfection</span>
          </div>
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map(s => (
            <li key={s}><a href={`#${s}`} onClick={e => { e.preventDefault(); scrollTo(s); }}>
              {s === "why" ? "Why Us" : s.charAt(0).toUpperCase() + s.slice(1)}
            </a></li>
          ))}
        </ul>
        <div className="nav-right">
          <div className="nav-socials">
            <a href="https://www.tiktok.com/@asa.winkandtip" target="_blank" rel="noreferrer">TikTok</a>
            <a href="https://www.instagram.com/asa.winkandtip" target="_blank" rel="noreferrer">Instagram</a>
          </div>
          <button className="nav-cta" onClick={() => scrollTo("booking")}>Book Now</button>
        </div>
        <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(s => (
          <a key={s} href={`#${s}`} onClick={e => { e.preventDefault(); scrollTo(s); }}>
            {s === "why" ? "Why Us" : s.charAt(0).toUpperCase() + s.slice(1)}
          </a>
        ))}
        <a href="https://www.tiktok.com/@asa.winkandtip" target="_blank" rel="noreferrer">🎵 TikTok</a>
        <a href="https://www.instagram.com/asa.winkandtip" target="_blank" rel="noreferrer">📸 Instagram</a>
        <button className="mobile-menu-cta" onClick={() => scrollTo("booking")}>Book Now</button>
      </div>

      {/* HERO */}
      <section className="hero" id="hero">
        <div>
          <div className="hero-logo-wrap">
            <img src={IMG.logo} alt="ASA. WinkandTip" className="hero-logo" />
            <div className="hero-logo-ring" />
          </div>
          <p className="hero-eyebrow">Nails · Lashes · Brows · Chikas, Old Karu Rd, Abuja</p>
          <h1 className="hero-title">
            <span className="shine">ASA. WinkandTip</span>
          </h1>
          <p className="hero-tagline">Beauty. Perfection.</p>
          <p className="hero-sub">
            Premium nail art, lash extensions, microblading and more -
            crafted with care, built to last.
          </p>
          <div className="hero-contact">
            <a href="tel:09049216479">📞 09049216479</a>
            <a href="https://wa.me/2349049216479" target="_blank" rel="noreferrer">💬 WhatsApp</a>
          </div>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("booking")}>Book a Treatment</button>
            <button className="btn-ghost" onClick={() => scrollTo("gallery")}>View Our Works</button>
          </div>
          <div className="hero-socials">
            <a href="https://www.tiktok.com/@asa.winkandtip" target="_blank" rel="noreferrer">🎵 @asa.winkandtip</a>
            <a href="https://www.instagram.com/asa.winkandtip" target="_blank" rel="noreferrer">📸 @asa.winkandtip</a>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery" id="gallery">
        <div className="section-top">
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Our Works</h2>
          <p className="section-body">Every set is hand-crafted. Tap any image to view in full.</p>
        </div>
        <div className="gallery-tabs">
          {(["all","nails","lashes"] as const).map(t => (
            <button key={t} className={`tab-btn${galleryTab === t ? " active" : ""}`} onClick={() => setGalleryTab(t)}>
              {t === "all" ? "All Work" : t === "nails" ? "💅 Nails" : "👁️ Lashes & Brows"}
            </button>
          ))}
        </div>
        <div className={`gallery-grid ${galleryTab}`}>
          {filtered.map((item, i) => (
            <div
              key={i}
              className={`g-item ${item.type === "lashes" ? "square" : "portrait"}`}
              onClick={() => setLightbox(item.src)}
            >
              <img src={item.src} alt={item.label} loading="lazy" />
              <div className="g-item-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="section-top">
          <p className="section-label">Pricing</p>
          <h2 className="section-title">Transparent Pricing</h2>
          <p className="section-body">No hidden fees. All prices listed clearly - design add-ons subject to style & time.</p>
        </div>
        <div className="services-grid">
          {PRICE_CATS.map(cat => (
            <div className="price-box" key={cat.title}>
              <h3 className="price-box-title">{cat.icon} {cat.title}</h3>
              {cat.items.map(item => (
                <div className="price-row" key={item.name}>
                  <span>{item.name}</span>
                  <span className="price-val">{item.price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="price-note">
          <strong>Please note:</strong> Design prices are subject to style & time of service. A deposit secures your slot and is non-refundable. 50% deposit required for custom bookings.
        </div>
      </section>

      {/* WHY */}
      <section className="why" id="why">
        <div className="section-top">
          <p className="section-label">Why Choose Us</p>
          <h2 className="section-title">What Sets Us Apart</h2>
        </div>
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
        <div className="section-top">
          <p className="section-label">Reserve Your Slot</p>
          <h2 className="section-title">Book an Appointment</h2>
          <p className="section-body">We'll confirm within a few hours via WhatsApp. A deposit secures your spot.</p>
        </div>
        <div className="booking-card">
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
                <option>Gel-X Extensions</option>
                <option>BIAB / Builder Gel</option>
                <option>Toes</option>
                <option>Classic Lashes</option>
                    <option>Hybrid Lashes</option>
                    <option>Volume Lashes</option>
                    <option>Wispy Lashes</option>
                    <option>Lash Refill</option>
                    <option>Lash Removal</option>
                    <option>Ombré Brows</option>
                    <option>Micro Blading</option>
                    <option>Brow Lamination & Tint</option>
                    <option>Brow Touch-up</option>
                    <option>Eyebrow Tint Only</option>
                    <option>Combo Brows</option>
                
                
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
            <label>Design ideas / notes</label>
            <textarea rows={3} placeholder="e.g. Chrome with marble add-on, or reference a style…" />
          </div>
          <button className="form-submit" onClick={() => alert("Thanks! We'll contact you on WhatsApp to confirm. 💜")}>
            Request Appointment
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <img src={IMG.logo} alt="ASA. WinkandTip" className="footer-brand-logo" />
          <p className="footer-brand-name">ASA. WinkandTip</p>
          <p className="footer-tagline">Beauty. Perfection.</p>
          <div className="footer-socials">
            <a href="https://www.tiktok.com/@asa.winkandtip" target="_blank" rel="noreferrer">🎵 TikTok</a>
            <a href="https://www.instagram.com/asa.winkandtip" target="_blank" rel="noreferrer">📸 Instagram</a>
            <a href="https://wa.me/2349049216479" target="_blank" rel="noreferrer">💬 WhatsApp</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <p>Gel & Acrylic Extensions</p>
          <p>Gel-X · BIAB</p>
          <p>Lash Extensions</p>
          <p>Micro-blading</p>
          <p>Toes & Pedicure</p>
        </div>
        <div className="footer-col">
          <h4>Visit Us</h4>
          <p>Chikas, Old Karu Rd.</p>
          <p>Abuja, Nigeria</p>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href="tel:09049216479">09049216479</a>
          <a href="https://wa.me/2349049216479">WhatsApp Us</a>
          <a href="https://www.instagram.com/asa.winkandtip">@asa.winkandtip</a>
        </div>
        <p className="footer-bottom">© 2026 ASA. WinkandTip · All rights reserved · Abuja, Nigeria</p>
      </footer>
    </>
  );
}
