import { useRef, useState } from "react";
import {
  motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useStyles } from "./styles.js";
import { tokens as t } from "./tokens.js";
import { ease, rise, stagger, item } from "./motionUtils.js";

const HOURS = [
  ["Sunday", "Closed"],
  ["Monday", "7:00am – 3:00pm"],
  ["Tuesday", "7:00am – 3:00pm"],
  ["Wednesday", "7:00am – 3:00pm"],
  ["Thursday", "7:00am – 3:00pm"],
  ["Friday", "7:00am – 3:00pm"],
  ["Saturday", "9:00am – 2:00pm"],
];

const DISHES = [
  { name: "Cappuccino", img: "images/menuImg1.png", alt: "Cappuccino with latte art" },
  { name: "Espresso Roast", img: "images/menuImg2.png", alt: "Dark coffee in a white cup" },
  { name: "Latte Art Special", img: "images/menuImg3.png", alt: "Cappuccino with bunny latte art" },
  { name: "Americano", img: "images/menuImg4.png", alt: "Black coffee in a teal cup" },
];

const REVIEWS = [
  "Your coffee hits the spot every time. Thank you for the experience of pure, delicious coffee masterfully roasted! I will never purchase any other and I will spread the word!",
  "Your coffee hits the spot every time. Thank you for the experience of pure, delicious coffee masterfully roasted! I will never purchase any other and I will spread the word!",
  "Your coffee hits the spot every time. Thank you for the experience of pure, delicious coffee masterfully roasted! I will never purchase any other and I will spread the word!",
];
const REVIEW_IMGS = ["images/profileImg2.jpg", "images/profileImg1.jpg", "images/profileImg3.jpg"];

/* ---------------- Hero: 3D tilt card, cursor glow, magnetic CTA, split-word reveal ---------------- */
export function Hero() {
  const s = useStyles();
  const reduce = useReducedMotion();
  const sceneRef = useRef(null);
  const heroRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gx = useMotionValue(-400);
  const gy = useMotionValue(-400);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 140, damping: 16 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 140, damping: 16 });
  const mbx = useSpring(useMotionValue(0), { stiffness: 220, damping: 14 });
  const mby = useSpring(useMotionValue(0), { stiffness: 220, damping: 14 });

  const onMove = (e) => {
    const hr = heroRef.current.getBoundingClientRect();
    gx.set(e.clientX - hr.left);
    gy.set(e.clientY - hr.top);
    if (reduce) return;
    const r = sceneRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); gx.set(-400); gy.set(-400); };

  const onBtnMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mbx.set((e.clientX - r.left - r.width / 2) * 0.25);
    mby.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const onBtnLeave = () => { mbx.set(0); mby.set(0); };

  const words = "Coffee beans with a perfect aroma.".split(" ");

  return (
    <section id="home" className={s.hero} ref={heroRef} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div className={s.heroGlow} style={{ x: gx, y: gy }} aria-hidden="true" />
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-6">
            <motion.p className={s.kicker} style={{ color: t.butter }} {...rise(reduce)}>
              We really like what we do.
            </motion.p>
            <h1 className={s.heroTitle} aria-label="Coffee beans with a perfect aroma.">
              {words.map((w, i) => (
                <span key={i} className={s.word} aria-hidden="true">
                  <motion.span
                    className={s.wordInner}
                    style={i >= 4 ? { color: t.butter } : undefined}
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.07 }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p className={s.heroLead} {...rise(reduce, 0.5)}>
              Classic recipes with a modern twist, served in a space designed to make you stay a little longer.
            </motion.p>
            <motion.div className={s.heroCtas} {...rise(reduce, 0.6)}>
              <motion.a
                href="#menu"
                className={s.btnPrimary}
                onMouseMove={onBtnMove}
                onMouseLeave={onBtnLeave}
                style={{ x: mbx, y: mby }}
                whileTap={{ scale: 0.97 }}
              >
                Explore the menu
                <svg className={s.ico} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.a>
              <a href="#about" className={s.btnGhost}>Our story</a>
            </motion.div>
          </div>

          <div className="col-12 col-lg-6">
            <div className={s.scene} ref={sceneRef}>
              <motion.div
                className={s.card3d}
                style={{ rotateX: reduce ? 0 : rotX, rotateY: reduce ? 0 : rotY, transformPerspective: 1200 }}
                initial={reduce ? false : { opacity: 0, rotateX: 25, y: 60 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.2 }}
              >
                <img className={s.cardImg} src="images/homeImg1.jpg" alt="Coffee beans spilling out of a white cup" />
                <motion.img
                  className={s.floatCup}
                  src="images/menuImg1.png"
                  alt=""
                  aria-hidden="true"
                  style={{ translateZ: 90 }}
                  animate={reduce ? undefined : { y: [0, -16, 0], rotate: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.svg
                  className={s.sticker}
                  viewBox="0 0 200 200"
                  aria-hidden="true"
                  style={{ translateZ: 120 }}
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                >
                  <defs><path id="sticker-circ" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" /></defs>
                  <circle cx="100" cy="100" r="98" fill={t.butter} />
                  <text fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" letterSpacing="2" fill={t.ink}>
                    <textPath href="#sticker-circ">ARABICA • LATTE • COCKTAILS •</textPath>
                  </text>
                  <g transform="translate(80 80)" fill={t.ink}><path d="M3 8h26v8a10 10 0 0 1-10 10h-6A10 10 0 0 1 3 16z" /><path d="M29 11h3a4 4 0 0 1 0 8h-3" fill="none" stroke={t.ink} strokeWidth="2.5" /></g>
                </motion.svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Marquee: endless loop, reverses on hover ---------------- */
export function Marquee() {
  const s = useStyles();
  const reduce = useReducedMotion();
  const words = ["Arabica", "Cappuccino", "Late", "Coffee & cocktails", "Classics, modernised"];
  const row = [...words, ...words];
  return (
    <div className={s.marquee} aria-hidden="true">
      <motion.div
        className={s.marqueeTrack}
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {row.map((w, i) => (
          <span key={i} className={s.marqueeItem}>{w}<span className={s.star}>✦</span></span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------------- About: scroll parallax image, staggered steps ---------------- */
export function About() {
  const s = useStyles();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yRound = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const steps = [
    ["Arabica beans", "Smooth, aromatic coffee brewed for a clean and balanced cup."],
    ["Classics, modernised", "Timeless recipes with a modern twist, from cappuccino to late."],
    ["Coffee and cocktails", "Exclusive coffee drinks and cocktails, all in one place."],
  ];
  return (
    <section id="about" className={s.section} ref={ref}>
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-12 col-lg-5">
            <div className={s.aboutImgWrap}>
              <motion.img className={s.aboutImg} src="images/aboutImg.jpg" alt="Espresso machine pouring a shot" style={{ y: reduce ? 0 : yImg }} />
              <motion.img className={s.aboutRound} src="images/menuImg3.png" alt="Cappuccino with latte art" style={{ y: reduce ? 0 : yRound }} />
            </div>
          </div>
          <div className="col-12 col-lg-6 offset-lg-1">
            <motion.p className={s.kicker} {...rise(reduce)}>Our coffee shop</motion.p>
            <motion.h2 className={s.h2} {...rise(reduce, 0.1)}>We combine classics and modernity.</motion.h2>
            <motion.p className={s.lead} {...rise(reduce, 0.2)}>
              We appreciate your trust greatly. Our clients choose us and our products because they know we are the best.
            </motion.p>
            <motion.ol className={s.steps} variants={stagger(0.12)} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.15 }}>
              {steps.map(([title, text], i) => (
                <motion.li key={title} className={s.step} variants={item}>
                  <span className={s.stepNum}>0{i + 1}</span>
                  <div>
                    <h3 className={s.stepTitle}>{title}</h3>
                    <p className={s.stepText}>{text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Menu: 3D tilt on hover, card flips on click ---------------- */
function Dish({ dish, index }) {
  const s = useStyles();
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 18 });

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      className="col-12 col-sm-6 col-lg-3"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease, delay: index * 0.1 }}
    >
      <motion.div
        className={s.dishScene}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformPerspective: 1000 }}
      >
        <motion.div
          className={s.dishInner}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
        >
          <div className={`${s.face} ${s.faceFront}`} aria-hidden={flipped}>
            <motion.img
              className={s.dishImg}
              src={dish.img}
              alt={dish.alt}
              whileHover={reduce ? undefined : { scale: 1.06, rotate: 4 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
            />
            <h3 className={s.dishName}>{dish.name}</h3>
            <p className={s.dishText}>It is a long established fact that a reader will be distracted by the readable.</p>
            <p className={s.price}>$18.99<s>$20.66</s></p>
            <button className={s.flipBtn} onClick={() => setFlipped(true)} tabIndex={flipped ? -1 : 0}>
              Details
            </button>
          </div>
          <div className={`${s.face} ${s.faceBack}`} aria-hidden={!flipped}>
            <h3 className={s.backTitle}>{dish.name}</h3>
            <p className={s.backText}>Ask our baristas for the best way to enjoy it today.</p>
            <button className={s.flipBtn} onClick={() => setFlipped(false)} tabIndex={flipped ? 0 : -1}>
              Back
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Menu() {
  const s = useStyles();
  const reduce = useReducedMotion();
  return (
    <section id="menu" className={`${s.section} ${s.menuSection}`}>
      <div className="container">
        <div className="row align-items-end g-4 mb-5">
          <div className="col-12 col-lg-7">
            <motion.p className={s.kicker} {...rise(reduce)}>Our menu</motion.p>
            <motion.h2 className={s.h2} {...rise(reduce, 0.1)}>Our popular menu.</motion.h2>
          </div>
          <div className="col-12 col-lg-5">
            <motion.p className={s.lead} {...rise(reduce, 0.2)}>
              Our place is designed by professional architects with psychologists to build the best place to suit you.
            </motion.p>
          </div>
        </div>
        <div className="row g-4">
          {DISHES.map((d, i) => <Dish key={d.name} dish={d} index={i} />)}
        </div>
        <Hours />
      </div>
    </section>
  );
}

/* ---------------- Hours: one shared "today" pill slides between rows ---------------- */
export function Hours() {
  const s = useStyles();
  const reduce = useReducedMotion();
  const today = new Date().getDay();
  return (
    <motion.div className={s.hours} {...rise(reduce)}>
      <h3 className={s.hoursTitle}>Opening hours</h3>
      <ul className={s.hoursList}>
        {HOURS.map(([day, time], i) => (
          <li key={day} className={s.hoursRow}>
            {i === today && <motion.span layoutId="today-pill" className={s.todayPill} transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
            <span className={s.hoursCell} style={i === today ? { color: t.ink, fontWeight: 700 } : undefined}>
              <span>{day}</span><span>{time}</span>
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ---------------- Brands: infinite logo loop ---------------- */
export function Brands() {
  const s = useStyles();
  const reduce = useReducedMotion();
  const logos = ["images/brandImg1.png", "images/brandImg2.png", "images/brandImg3.png", "images/brandImg4.png", "images/brandImg5.png"];
  const row = [...logos, ...logos];
  return (
    <section className={s.brands} aria-label="Our trusted brands">
      <div className="container">
        <p className={`${s.kicker} justify-content-center w-100`} style={{ justifyContent: "center" }}>Our trusted brands</p>
      </div>
      <motion.div
        className={s.brandTrack}
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {row.map((f, i) => (
          <img key={i} className={s.brandImg} src={f} alt={i < 5 ? `Brand logo ${i + 1}` : ""} aria-hidden={i >= 5 || undefined} />
        ))}
      </motion.div>
    </section>
  );
}

/* ---------------- Reviews: swipeable carousel with directional slide ---------------- */
export function Reviews() {
  const s = useStyles();
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState([0, 0]);
  const go = (d) => setState(([i]) => [(i + d + REVIEWS.length) % REVIEWS.length, d]);

  const variants = {
    enter: (d) => ({ x: reduce ? 0 : d * 80, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ x: reduce ? 0 : d * -80, opacity: 0, scale: 0.98 }),
  };

  return (
    <section id="review" className={`${s.section} ${s.reviews}`}>
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-12 col-lg-8">
            <motion.p className={s.kicker} style={{ justifyContent: "center" }} {...rise(reduce)}>Reviews</motion.p>
            <motion.h2 className={s.h2} {...rise(reduce, 0.1)}>What clients say.</motion.h2>
          </div>
        </div>

        <div className={s.reviewStage}>
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.figure
              key={index}
              className={s.reviewCard}
              style={{ margin: 0 }}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease }}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80 || info.velocity.x < -500) go(1);
                else if (info.offset.x > 80 || info.velocity.x > 500) go(-1);
              }}
            >
              <div className={s.quoteMark} aria-hidden="true">“</div>
              <blockquote className={s.reviewText} style={{ margin: 0 }}>{REVIEWS[index]}</blockquote>
              <figcaption className={s.reviewer}>
                <img className={s.reviewerImg} src={REVIEW_IMGS[index]} alt="Marnie Rotter" />
                <div>
                  <p className={s.reviewerName}>Marnie Rotter</p>
                  <p className={s.reviewerJob}>App Developer</p>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className={s.reviewNav}>
          <button className={s.navBtn} onClick={() => go(-1)} aria-label="Previous review">
            <svg className={s.ico} viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className={s.dots}>
            {REVIEWS.map((_, i) => (
              <button key={i} className={s.dot} onClick={() => setState([i, i > index ? 1 : -1])} aria-label={`Show review ${i + 1}`} aria-current={i === index}>
                {i === index && <motion.span layoutId="review-dot" className={s.dotActive} transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              </button>
            ))}
          </div>
          <button className={s.navBtn} onClick={() => go(1)} aria-label="Next review">
            <svg className={s.ico} viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

