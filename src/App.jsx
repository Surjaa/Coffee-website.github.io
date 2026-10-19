import { useState } from "react";
import {
  motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent, useReducedMotion,
} from "motion/react";
import { useStyles } from "./styles.js";
import { tokens as t } from "./tokens.js";
import { rise, stagger, item, ease } from "./motionUtils.js";
import { Hero, Marquee, About, Menu, Brands, Reviews } from "./sections.jsx";
import FluidShowcase from "./FluidShowcase.jsx";

const NAV = [["Home", "#home"], ["About", "#about"], ["Menu", "#menu"], ["Reviews", "#review"]];

function Header() {
  const s = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <header className={s.header}>
      <motion.nav
        className={s.navWrap}
        aria-label="Main"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
      >
        <a className={s.brand} href="#home" aria-label="Coffee. home">
          <span className={s.brandMark} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 8h13v5a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6V8z" fill="currentColor" /><path d="M16 10h2a2.5 2.5 0 0 1 0 5h-2.2" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
          </span>
          Coffee.
        </a>
        <ul className={s.links}>
          {NAV.map(([label, href]) => (
            <li key={href}><a className={s.link} href={href}>{label}</a></li>
          ))}
        </ul>
        <div className="d-flex align-items-center gap-2">
          <motion.a className={s.navCta} href="tel:0123456789" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            0123456789
          </motion.a>
          <button className={s.burger} onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div
            className={s.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            {NAV.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Newsletter() {
  const s = useStyles();
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const submit = (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) { setStatus("invalid"); return; }
    setStatus("ok");
    setEmail("");
  };
  return (
    <section className={s.section} style={{ paddingTop: 0 }}>
      <div className="container">
        <motion.div className={s.newsletter} {...rise(reduce)}>
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <h2 className={s.newsTitle}>Get the latest from Coffee.</h2>
              <p className={s.newsText}>The perfect place to find a nice spot to sip. Find the Jungle, Coffee Bean and more shops right on this website.</p>
            </div>
            <div className="col-12 col-lg-6">
              <form className={s.form} onSubmit={submit} noValidate>
                <label htmlFor="email" className="visually-hidden">Email address</label>
                <input id="email" type="email" className={s.input} placeholder="email@example.com" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <motion.button className={s.submit} type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>Subscribe</motion.button>
              </form>
              <div className={s.formMsg} role="status" aria-live="polite">
                <AnimatePresence mode="wait">
                  {status === "ok" && (
                    <motion.span key="ok" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} style={{ display: "inline-flex", gap: 8 }}>
                      <span aria-hidden="true">✓</span> Thanks for subscribing!
                    </motion.span>
                  )}
                  {status === "invalid" && (
                    <motion.span key="bad" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: [0, 6, -6, 0] }} transition={{ duration: 0.4 }}>
                      Please enter a valid email address.
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const s = useStyles();
  const reduce = useReducedMotion();
  const cols = [
    ["Facility", ["Private Room", "Meeting Room", "Event Room", "Creative Studio", "Custom Room"]],
    ["Menu", ["Coffee", "Beverages", "Dishes"]],
    ["Support", ["About us", "FAQs", "Privacy policy", "Help us"]],
  ];
  return (
    <footer className={s.footer}>
      <div className="container">
        <motion.div className="row g-5" variants={stagger(0.1)} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          <motion.div className="col-12 col-lg-4" variants={item}>
            <a className={s.footerBrand} href="#home">
              <span className={s.brandMark} aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 8h13v5a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6V8z" fill="currentColor" /></svg></span>
              Coffee.
            </a>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, vero!</p>
            <p className="d-flex gap-2 align-items-start mb-0">
              <svg className={s.ico} viewBox="0 0 24 24" aria-hidden="true" style={{ color: t.butter, marginTop: 4 }}><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="currentColor" /></svg>
              <span>65 South Fifth St., Sicklerville, NJ 08081, USA</span>
            </p>
          </motion.div>
          {cols.map(([title, links]) => (
            <motion.div key={title} className="col-6 col-md-4 col-lg-2" variants={item}>
              <h3 className={s.footerTitle}>{title}</h3>
              <ul className={s.footerList}>
                {links.map((l) => (
                  <li key={l}><a className={s.footerLink} href="#">{l}</a></li>
                ))}
              </ul>
            </motion.div>
          ))}
          <motion.div className="col-12 col-lg-2" variants={item}>
            <h3 className={s.footerTitle}>Follow</h3>
            <div className="d-flex flex-wrap gap-2">
              {["f", "X", "IG", "YT"].map((x) => (
                <motion.a key={x} className={s.social} href="#" aria-label={x} whileHover={{ y: -4, scale: 1.08 }} whileTap={{ scale: 0.95 }}>{x}</motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        <div className={s.copy}>&copy; {new Date().getFullYear()} Coffee. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default function App() {
  const s = useStyles();
  const reduce = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [showTop, setShowTop] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShowTop(v > 500));

  return (
    <>
      <a className={s.skip} href="#main">Skip to content</a>
      <motion.div className={s.progress} style={{ scaleX: reduce ? 1 : progress }} aria-hidden="true" />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Menu />
        <FluidShowcase />
        <Brands />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
      <AnimatePresence>
        {showTop && (
          <motion.button
            className={s.toTop}
            onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
