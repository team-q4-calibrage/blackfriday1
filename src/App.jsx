import { useEffect, useState } from "react";
import "./App.css";

const img = (id, w) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const PRODUCTS = [
  { id: "1505740420928-5e560c06d30e", name: "Wireless Headphones", alt: "Wireless headphones",
    desc: "Immersive sound, deep bass and all-day comfort for work and travel.", old: 199, price: 99 },
  { id: "1546868871-7041f2a55e12", name: "Smart Watch Pro", alt: "Smart watch",
    desc: "Track your day, stay connected and keep your goals within reach.", old: 249, price: 124 },
  { id: "1516961642265-531546e84af2", name: "Premium Camera", alt: "Premium camera",
    desc: "Capture sharp, detailed photos and memorable moments wherever you go.", old: 899, price: 449 },
  { id: "1523170335258-f5ed11844a49", name: "Classic Watch", alt: "Classic wrist watch",
    desc: "A timeless everyday design with a premium finish and refined details.", old: 299, price: 149 },
];

const REVIEWS = [
  { initials: "JM", name: "James M.", stars: 5, text: "The headphones arrived quickly and the sound quality is fantastic. The Black Friday price made it an easy decision." },
  { initials: "SA", name: "Sarah A.", stars: 5, text: "Exactly as described and beautifully packaged. I saved a lot compared with the normal price." },
  { initials: "DK", name: "Daniel K.", stars: 5, text: "Fast delivery, excellent product and a great discount. I would definitely shop here again." },
  { initials: "MO", name: "Maria O.", stars: 4, text: "The deal was even better than I expected. Everything arrived in perfect condition." },
];

const HERO_ITEMS = [
  { cls: "i1", product: PRODUCTS[0] },
  { cls: "i2", product: PRODUCTS[1] },
  { cls: "i3", product: PRODUCTS[2] },
  { cls: "i4", product: PRODUCTS[3] },
];

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

/* Change the sale duration here. Demo: 5 hours from first render. */
const SALE_MS = 5 * 60 * 60 * 1000;

function useCountdown(durationMs) {
  const [end] = useState(() => Date.now() + durationMs);
  const [remaining, setRemaining] = useState(durationMs);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, end - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [end]);

  const total = Math.floor(remaining / 1000);
  return {
    ended: remaining <= 0,
    days: pad(Math.floor(total / 86400)),
    hours: pad(Math.floor((total % 86400) / 3600)),
    minutes: pad(Math.floor((total % 3600) / 60)),
    seconds: pad(total % 60),
  };
}

function BuyButton({ ended, onBuy }) {
  return (
    <button className="cta buy" disabled={ended} onClick={onBuy}>
      {ended ? "Offer ended" : "Buy now"}
    </button>
  );
}

function Header() {
  return (
    <header className="brandbar">
      <div className="container brandbar-inner">
        <a href="#" className="brand" aria-label="VANTA home">
          <span className="brand-mark">V</span>
          <span className="brand-name">VANTA <em>STORE</em></span>
        </a>
        <nav className="brand-nav" aria-label="Main navigation">
          <a href="#products">Deals</a>
          <a href="#reviews">Reviews</a>
          <a className="header-cta" href="#products">Shop Now</a>
        </nav>
      </div>
    </header>
  );
}

function Timer({ time }) {
  const boxes = [
    ["Days", time.days], ["Hours", time.hours],
    ["Minutes", time.minutes], ["Seconds", time.seconds],
  ];
  return (
    <div className="timer-wrap" aria-live="polite">
      <div className="timer-label">{time.ended ? "Offer ended" : "Offer ends in"}</div>
      <div className="timer">
        {boxes.map(([label, value]) => (
          <div className="time-box" key={label}>
            <strong>{value}</strong>
            <small>{label}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ time }) {
  return (
    <section className="hero" style={{ padding: 0 }}>
      <div className="container hero-grid">
        <div>
          <div className="badge">Limited-time sale</div>
          <h1>50% off <span>Black Friday</span></h1>
          <p className="lead">
            Big savings on the gadgets you actually want. Grab your favourites before this offer disappears.
          </p>
          <div className="hero-actions">
            <a className="cta" href="#products">Shop the sale</a>
            <a className="cta ghost" href="#reviews">Read reviews</a>
          </div>
          <Timer time={time} />
        </div>
        <div className="hero-art" role="img" aria-label="Headphones, smart watch, camera and classic watch on sale">
          <div className="blob" />
          {HERO_ITEMS.map(({ cls, product }) => (
            <div className={`item ${cls}`} key={cls}>
              <img src={img(product.id, 600)} alt={product.alt} />
            </div>
          ))}
          <div className="sale-chip"><div><b>-50%</b><small>everything</small></div></div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <div className="trust">
      <div className="container trust-grid">
        <div><span>Free shipping</span> on every order</div>
        <div><span>30-day</span> easy returns</div>
        <div><span>Secure</span> checkout</div>
      </div>
    </div>
  );
}

function ProductCard({ product, ended, onBuy }) {
  return (
    <article className="product">
      <div className="product-img">
        <span className="tag">-50%</span>
        <img src={img(product.id, 700)} alt={product.alt} loading="lazy" />
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="desc">{product.desc}</p>
        <div className="price">
          <span className="new">${product.price}</span>
          <span className="old">${product.old}</span>
        </div>
        <BuyButton ended={ended} onBuy={() => onBuy(product)} />
      </div>
    </article>
  );
}

function Products({ ended, onBuy }) {
  return (
    <section className="products" id="products">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Black Friday deals</div>
          <h2>Shop the best deals</h2>
          <p>Premium picks at prices that won't last. Save 50% while the offer is active.</p>
        </div>
        <div className="grid">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.name} product={p} ended={ended} onBuy={onBuy} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Customer reviews</div>
          <h2>What our customers say</h2>
          <p>Real experiences from customers who took advantage of our deals.</p>
        </div>
        <div className="review-grid">
          {REVIEWS.map((r) => (
            <article className="review" key={r.name}>
              <div className="stars" aria-label={`${r.stars} out of 5 stars`}>
                {"★".repeat(r.stars) + "☆".repeat(5 - r.stars)}
              </div>
              <p>“{r.text}”</p>
              <div className="customer">
                <div className="avatar">{r.initials}</div>
                <div><strong>{r.name}</strong><br /><small>Verified customer</small></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ ended, onBuy }) {
  return (
    <section className="final">
      <div className="container">
        <div className="final-card">
          <h2>Save 50% before time runs out</h2>
          <p>Once the countdown reaches zero, these Black Friday prices will no longer be available.</p>
          <BuyButton ended={ended} onBuy={() => onBuy()} />
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const time = useCountdown(SALE_MS);

  // Connect this to your checkout or payment flow.
  const handleBuy = (product) => {
    alert(`Thanks!${product ? ` (${product.name})` : ""} Connect this button to your checkout or payment page.`);
  };

  return (
    <>
      <Header />
      <Hero time={time} />
      <TrustStrip />
      <main>
        <Products ended={time.ended} onBuy={handleBuy} />
        <Reviews />
        <FinalCta ended={time.ended} onBuy={handleBuy} />
      </main>
      <footer className="footer">© 2026 Black Friday Store. Limited-time promotional offer.</footer>
      <div className="mobile-cta">
        <BuyButton ended={time.ended} onBuy={() => handleBuy()} />
      </div>
    </>
  );
}
