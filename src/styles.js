import { createUseStyles } from "react-jss";
import { tokens as t } from "./tokens.js";

const pill = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
  minHeight: 48, padding: "0.8rem 1.5rem", borderRadius: 999, fontWeight: 700, fontSize: "1rem",
  textDecoration: "none", border: "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap",
};

export const useStyles = createUseStyles({
  progress: { position: "fixed", top: 0, left: 0, right: 0, height: 5, background: t.tomato, transformOrigin: "0 50%", zIndex: 2000 },
  skip: { position: "fixed", left: 16, top: 16, background: t.ink, color: t.cream, padding: "0.5rem 1rem", borderRadius: 8, zIndex: 3000, transform: "translateY(-200%)", "&:focus": { transform: "translateY(0)" } },

  // Header
  header: { position: "sticky", top: 12, zIndex: 1000, padding: "0 12px" },
  navWrap: {
    maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between",
    background: t.white, borderRadius: 999, padding: "0.5rem 0.5rem 0.5rem 1.25rem",
    boxShadow: "0 12px 30px rgba(20,33,61,.14)", minHeight: 64,
  },
  brand: { display: "inline-flex", alignItems: "center", gap: 10, color: t.ink, textDecoration: "none", fontFamily: t.displayFont, fontWeight: 900, fontSize: "1.2rem" },
  brandMark: { width: 40, height: 40, borderRadius: "50%", background: t.tomato, color: t.white, display: "inline-flex", alignItems: "center", justifyContent: "center" },
  links: { display: "flex", gap: 6, listStyle: "none", margin: 0, padding: 0, "@media (max-width: 991.98px)": { display: "none" } },
  link: { color: t.ink, textDecoration: "none", fontWeight: 600, padding: "0.6rem 0.9rem", borderRadius: 999, display: "inline-block", minHeight: 44, lineHeight: "24px", "&:hover": { background: t.mint } },
  navCta: Object.assign({}, pill, { background: t.butter, color: t.ink, padding: "0.6rem 1.1rem", minHeight: 48, "&:hover": { background: "#FFD65E" }, "@media (max-width: 575.98px)": { display: "none" } }),
  burger: { display: "none", width: 48, height: 48, borderRadius: "50%", background: t.ink, color: t.white, border: 0, alignItems: "center", justifyContent: "center", "@media (max-width: 991.98px)": { display: "inline-flex" } },
  mobileMenu: { maxWidth: 1180, margin: "10px auto 0", background: t.white, borderRadius: 28, padding: 12, boxShadow: "0 12px 30px rgba(20,33,61,.14)", overflow: "hidden", "& a": { display: "block", padding: "0.9rem 1rem", color: t.ink, fontWeight: 700, textDecoration: "none", borderRadius: 16, minHeight: 48, "&:hover": { background: t.mint } } },

  // Buttons
  btnPrimary: Object.assign({}, pill, { background: t.butter, color: t.ink, boxShadow: "0 10px 0 #E0A92A", "&:hover": { background: "#FFD65E" }, "&:active": { boxShadow: "0 4px 0 #E0A92A" } }),
  btnGhost: Object.assign({}, pill, { background: "transparent", color: t.cream, borderColor: t.cream, "&:hover": { background: t.cream, color: t.ink } }),
  btnInk: Object.assign({}, pill, { background: t.ink, color: t.cream, boxShadow: "0 10px 0 #0B1426" }),
  ico: { width: 18, height: 18, flexShrink: 0 },

  // Shared
  kicker: { display: "inline-flex", alignItems: "center", gap: 10, textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "0.78rem", fontWeight: 700, color: t.tomatoDeep, margin: "0 0 1rem" },
  h2: { fontFamily: t.displayFont, fontWeight: 900, fontSize: "clamp(2rem, 4.6vw, 3.6rem)", lineHeight: 1.08, letterSpacing: "-0.02em", margin: "0 0 1.1rem", color: t.ink },
  lead: { fontSize: "1.1rem", color: "#3B4663", maxWidth: "58ch" },
  section: { padding: "clamp(72px, 9vw, 128px) 0", position: "relative", overflow: "hidden" },

  // Hero
  hero: { background: t.ink, color: t.cream, padding: "clamp(48px, 7vw, 96px) 0 clamp(64px, 8vw, 110px)", position: "relative", overflow: "hidden" },
  heroGlow: { position: "absolute", width: 520, height: 520, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(255,201,60,.28), rgba(255,201,60,0) 65%)", transform: "translate(-50%, -50%)", top: 0, left: 0 },
  heroTitle: { fontFamily: t.displayFont, fontWeight: 900, fontSize: "clamp(2.4rem, 6.2vw, 5rem)", lineHeight: 1.02, letterSpacing: "-0.03em", margin: "0 0 1.4rem", color: t.cream },
  word: { display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.08em", marginRight: "0.22em" },
  wordInner: { display: "inline-block" },
  accent: { color: t.butter },
  heroLead: { fontSize: "1.12rem", color: "#C9D3EA", maxWidth: "46ch" },
  scene: { perspective: 1200, position: "relative", maxWidth: 560, marginLeft: "auto", padding: 24 },
  card3d: { position: "relative", borderRadius: 36, background: t.tomato, padding: 18, transformStyle: "preserve-3d", boxShadow: "0 40px 80px rgba(0,0,0,.35)" },
  cardImg: { width: "100%", display: "block", borderRadius: 26, aspectRatio: "4 / 5", objectFit: "cover" },
  floatCup: { position: "absolute", width: "42%", aspectRatio: "1", borderRadius: "50%", objectFit: "cover", left: -36, bottom: -32, "@media (max-width: 575.98px)": { left: -8, bottom: -24 }, boxShadow: "0 24px 40px rgba(0,0,0,.35)", border: `6px solid ${t.cream}` },
  sticker: { position: "absolute", right: -18, top: -24, width: 128, height: 128, zIndex: 2, "@media (max-width: 575.98px)": { right: 0, top: -30, width: 96, height: 96 } },
  heroCtas: { display: "flex", flexWrap: "wrap", gap: 14, marginTop: 28 },

  // Marquee
  marquee: { background: t.butter, color: t.ink, overflow: "hidden", padding: "1.1rem 0", whiteSpace: "nowrap" },
  marqueeTrack: { display: "inline-flex", fontFamily: t.displayFont, fontWeight: 700, fontSize: "clamp(1.2rem, 2.6vw, 1.8rem)" },
  marqueeItem: { padding: "0 1.4rem", display: "inline-flex", alignItems: "center", gap: 28 },
  star: { color: t.tomato, fontSize: "0.8em" },

  // About
  aboutImgWrap: { position: "relative", height: 560 },
  aboutImg: { width: "100%", height: "100%", objectFit: "cover", borderRadius: 36, display: "block" },
  aboutRound: { position: "absolute", right: -18, bottom: -26, width: "42%", aspectRatio: "1", borderRadius: "50%", objectFit: "cover", border: `8px solid ${t.cream}`, boxShadow: "0 18px 40px rgba(20,33,61,.22)" },
  steps: { listStyle: "none", padding: 0, margin: "2rem 0 0" },
  step: { display: "flex", gap: 20, padding: "1.3rem 0", borderTop: "2px solid rgba(20,33,61,.12)", position: "relative", "&:last-child": { borderBottom: "2px solid rgba(20,33,61,.12)" } },
  stepNum: { fontFamily: t.displayFont, fontWeight: 900, color: t.tomato, fontSize: "1.2rem", minWidth: 44 },
  stepTitle: { fontFamily: t.displayFont, fontWeight: 700, fontSize: "1.15rem", margin: "0 0 0.25rem" },
  stepText: { margin: 0, color: "#3B4663" },

  // Menu
  menuSection: { background: t.mint },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 24 },
  dishScene: { perspective: 1000, height: 430 },
  dishInner: { position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" },
  face: { position: "absolute", inset: 0, borderRadius: 28, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "1.6rem 1.4rem", boxSizing: "border-box" },
  faceFront: { background: t.white, boxShadow: "0 18px 40px rgba(20,33,61,.12)" },
  faceBack: { background: t.ink, color: t.cream, transform: "rotateY(180deg)", justifyContent: "center" },
  dishImg: { width: 170, height: 170, borderRadius: "50%", objectFit: "cover", marginTop: -70, boxShadow: "0 16px 30px rgba(20,33,61,.2)", border: `6px solid ${t.white}` },
  dishName: { fontFamily: t.displayFont, fontWeight: 700, fontSize: "1.05rem", margin: "1rem 0 0.4rem" },
  dishText: { color: "#3B4663", fontSize: "0.95rem", margin: "0 0 0.8rem" },
  price: { fontWeight: 700, color: t.tomatoDeep, fontSize: "1.1rem", marginTop: "auto", "& s": { color: "#6B7593", fontWeight: 400, marginLeft: 8, fontSize: "0.95rem" } },
  flipBtn: { marginTop: "auto", background: t.butter, color: t.ink, border: 0, borderRadius: 999, minHeight: 44, padding: "0.6rem 1.2rem", fontWeight: 700, cursor: "pointer" },
  backTitle: { fontFamily: t.displayFont, fontWeight: 700, fontSize: "1.2rem", margin: "0 0 0.6rem" },
  backText: { color: "#C9D3EA", margin: "0 0 1rem", fontSize: "0.95rem" },

  // Hours
  hours: { background: t.ink, color: t.cream, borderRadius: 36, padding: "clamp(24px, 4vw, 44px)", marginTop: 56 },
  hoursTitle: { fontFamily: t.displayFont, fontWeight: 900, fontSize: "1.7rem", margin: "0 0 1.25rem" },
  hoursList: { listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 },
  hoursRow: { position: "relative", display: "flex", justifyContent: "space-between", gap: 14, padding: "0.9rem 1.1rem", borderRadius: 18, background: t.ink2, whiteSpace: "nowrap", overflow: "hidden" },
  todayPill: { position: "absolute", inset: 0, background: t.butter, borderRadius: 18, zIndex: 0 },
  hoursCell: { position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", width: "100%", gap: 14 },

  // Fluid glass showcase
  fluidWrap: { position: "relative", borderRadius: 40, overflow: "hidden", height: "clamp(380px, 52vw, 560px)", background: "#14213D", boxShadow: "0 30px 60px rgba(20,33,61,.25)" },
  fluidCanvas: { position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "none", touchAction: "pan-y" },
  fluidCopy: { position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(24px, 4vw, 48px)", background: "linear-gradient(0deg, rgba(20,33,61,.85), rgba(20,33,61,0))", pointerEvents: "none", color: "#FFF6EA", "@media (min-width: 992px)": { maxWidth: 560 } },
  fluidTitle: { fontFamily: "'Unbounded', system-ui, sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3.6vw, 2.6rem)", lineHeight: 1.1, margin: 0, color: "#FFF6EA" },

  // Brands
  brands: { padding: "clamp(48px, 6vw, 80px) 0", borderTop: "2px solid rgba(20,33,61,.1)", borderBottom: "2px solid rgba(20,33,61,.1)", overflow: "hidden" },
  brandTrack: { display: "flex", width: "max-content", alignItems: "center", gap: 72 },
  brandImg: { height: 92, width: "auto", filter: "grayscale(1)", opacity: 0.7, transition: "filter .3s ease, opacity .3s ease", "&:hover": { filter: "none", opacity: 1 } },

  // Reviews
  reviews: { background: t.cream },
  reviewStage: { position: "relative", minHeight: 320, maxWidth: 860, margin: "0 auto" },
  reviewCard: { background: t.white, borderRadius: 36, padding: "clamp(28px, 5vw, 52px)", boxShadow: "0 24px 50px rgba(20,33,61,.1)", cursor: "grab", userSelect: "none", "&:active": { cursor: "grabbing" }, touchAction: "pan-y" },
  quoteMark: { fontFamily: t.displayFont, fontWeight: 900, fontSize: "4rem", lineHeight: 0.6, color: t.tomato, margin: "0 0 0.8rem" },
  reviewText: { fontFamily: t.displayFont, fontWeight: 500, fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)", lineHeight: 1.5, margin: "0 0 1.6rem", color: t.ink },
  reviewer: { display: "flex", alignItems: "center", gap: 14 },
  reviewerImg: { width: 60, height: 60, borderRadius: "50%", objectFit: "cover", border: `3px solid ${t.butter}` },
  reviewerName: { fontWeight: 700, margin: 0 },
  reviewerJob: { color: "#5A6585", margin: 0, fontSize: "0.92rem" },
  reviewNav: { display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 28 },
  navBtn: { width: 52, height: 52, borderRadius: "50%", border: `2px solid ${t.ink}`, background: t.white, color: t.ink, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", "&:hover": { background: t.ink, color: t.cream } },
  dots: { display: "flex", gap: 8, alignItems: "center" },
  dot: { position: "relative", width: 12, height: 12, borderRadius: 999, border: 0, background: "rgba(20,33,61,.2)", padding: 0, cursor: "pointer" },
  dotActive: { position: "absolute", inset: -4, borderRadius: 999, background: t.tomato },

  // Newsletter
  newsletter: { background: t.tomato, color: t.white, borderRadius: 40, padding: "clamp(32px, 5vw, 64px)", position: "relative", overflow: "hidden" },
  newsTitle: { fontFamily: t.displayFont, fontWeight: 900, fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)", lineHeight: 1.1, margin: "0 0 0.8rem", color: t.white },
  newsText: { color: "#FFE3DC", margin: 0, maxWidth: "44ch" },
  form: { display: "flex", flexWrap: "wrap", gap: 12 },
  input: { flex: "1 1 240px", minHeight: 54, borderRadius: 999, border: "2px solid transparent", padding: "0.8rem 1.4rem", font: "inherit", color: t.ink, background: t.white, "&:focus-visible": { outline: `3px solid ${t.ink}`, outlineOffset: 2 } },
  submit: Object.assign({}, pill, { background: t.ink, color: t.cream, minHeight: 54, boxShadow: "0 10px 0 #0B1426" }),
  formMsg: { minHeight: 26, marginTop: 14, fontWeight: 600, color: t.white, display: "flex", alignItems: "center", gap: 8 },

  // Footer
  footer: { background: t.ink, color: "#C9D3EA", padding: "clamp(64px, 8vw, 96px) 0 0" },
  footerBrand: { color: t.cream, fontFamily: t.displayFont, fontWeight: 900, fontSize: "1.5rem", display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 12 },
  footerTitle: { fontFamily: t.displayFont, fontWeight: 700, fontSize: "1rem", color: t.cream, margin: "0 0 1rem" },
  footerList: { listStyle: "none", padding: 0, margin: 0, "& li": { marginBottom: 8 } },
  footerLink: { color: "#C9D3EA", textDecoration: "none", minHeight: 36, display: "inline-flex", alignItems: "center", "&:hover": { color: t.butter, textDecoration: "underline" } },
  social: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: "50%", border: "2px solid rgba(255,246,234,.3)", color: t.cream, fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" },
  copy: { borderTop: "1px solid rgba(255,246,234,.14)", marginTop: 56, padding: "1.5rem 0", textAlign: "center", fontSize: "0.9rem", color: "#9AA6C4" },

  toTop: { position: "fixed", right: 18, bottom: 18, width: 56, height: 56, borderRadius: "50%", background: t.butter, color: t.ink, border: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 26px rgba(20,33,61,.3)", cursor: "pointer", zIndex: 1500 },
});
