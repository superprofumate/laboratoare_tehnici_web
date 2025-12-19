import styles from "./page.module.scss";

const COLORS = ["var(--text-secondary)", "#C23A3A", "var(--text-primary)"]; // alb, rosu, verde

function Bulbs({ count, side }) {
  return (
    <div className={`${styles.lightsSide} ${styles[side]}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const c = COLORS[i % COLORS.length];
        const delay = (i % 12) * 0.12;        // deterministic
        const dur = 1.15 + (i % 7) * 0.18;    // deterministic
        const sway = 1.6 + (i % 5) * 0.2;

        return (
          <span
            key={`${side}-${i}`}
            className={styles.bulb}
            style={{
              "--bulb": c,
              "--delay": `${delay}s`,
              "--dur": `${dur}s`,
              "--sway": `${sway}s`,
              "--i": i,
            }}
          />
        );
      })}
    </div>
  );
}

export default function Page() {
  return (
    <section className={`section ${styles.landing}`}>
      <div className={styles.hero}>
        {/* NINSOARE */}
        <div className={styles.snow} aria-hidden="true">
          <span className={styles.snowLayer}></span>
          <span className={`${styles.snowLayer} ${styles.snowLayer2}`}></span>
          <span className={`${styles.snowLayer} ${styles.snowLayer3}`}></span>
        </div>

        {/* LUMINIȚE PE TOATE MARGINILE */}
        <div className={styles.lightsFrame} aria-hidden="true">
          <Bulbs side="top" count={28} />
          <Bulbs side="right" count={16} />
          <Bulbs side="bottom" count={28} />
          <Bulbs side="left" count={16} />
        </div>

        {/* CARD */}
        <article className={styles.card} aria-label="Mesaj de Crăciun">
          <p className={`text text--label ${styles.kicker}`}>
            TEHNICI WEB • LAB WORK
          </p>

          <h1 className={styles.title}>
            <span className={`text text--titlePrimary ${styles.titleTop}`}>
              Crăciun
            </span>
            <span className={`text text--titlePrimary ${styles.titleBottom}`}>
              Fericit
            </span>
          </h1>

          <p className={`text text--paragraph${styles.subtitle}`}>
            Să-ți fie codul fără bug-uri, build-ul fără erori și vibe-ul 100% cozy
          </p>

          {/* extra “sparkles” */}
          <div className={styles.sparkles} aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className={styles.sparkle} style={{ "--i": i }} />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
