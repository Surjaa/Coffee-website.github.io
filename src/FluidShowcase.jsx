import { motion, useReducedMotion } from "motion/react";
import FluidGlass from "./FluidGlass.jsx";
import { useStyles } from "./styles.js";
import { rise } from "./motionUtils.js";

export default function FluidShowcase() {
  const s = useStyles();
  const reduce = useReducedMotion();
  return (
    <section className={s.section} style={{ paddingTop: 0 }} aria-labelledby="fluid-title">
      <div className="container">
        <motion.div className={s.fluidWrap} {...rise(reduce)}>
          <FluidGlass
            src="/images/homeImg2.jpg"
            alt="Coffee drinks served in a cafe, seen through a glass lens"
            reduce={reduce}
            className={s.fluidCanvas}
          />
          <div className={s.fluidCopy}>
            <p className={s.kicker} style={{ color: "#FFC93C" }}>Move your cursor</p>
            <h2 id="fluid-title" className={s.fluidTitle}>Enjoy our exclusive coffee and cocktails.</h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
