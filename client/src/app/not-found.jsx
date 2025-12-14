import Button from '@/components/ui/button/button.jsx';
import styles from "./not-found.module.scss";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className={`section ${styles.wrap}`}>
      <article className={styles.card} aria-label="404 Page not found">
        <p className={`text text--label ${styles.kicker}`}>HO-HO-HOLD UP…</p>

        <div className={styles.heroRow}>
          {/* Santa */}
          <div className={styles.santa} aria-hidden="true">
            <span className={styles.hat} />
            <span className={styles.hatBall} />
            <span className={styles.face} />
            <span className={styles.santaEyeLeft} />
            <span className={styles.santaEyeRight} />
            <span className={styles.beard} />
          </div>

          {/* Big 404 */}
          <div className={styles.errorBlock}>
            <h1 className={`text text--title ${styles.errCode}`}>404</h1>

            <p className={`text text--title text--titleSecondary ${styles.errTitle}`}>
              Page not found
            </p>

            <p className={`text text--paragraph text--paragraphPrimary ${styles.errText}`}>
              Se pare că ai luat-o pe un drum înzăpezit. Înapoi la căldură?
            </p>
          </div>
        </div>

        {/* Bottom vibe row */}
        <div className={styles.vibeRow} aria-hidden="true">
          {/* Snowman */}
          <div className={styles.snowman}>
            <span className={styles.snowBallTop} />
            <span className={styles.snowBallMid} />
            <span className={styles.snowBallBot} />
            <span className={styles.snowEyeLeft} />
            <span className={styles.snowEyeRight} />
            <span className={styles.snowNose} />
            <span className={styles.snowScarf} />
          </div>

          {/* Tree */}
          <div className={styles.tree}>
            <span className={styles.treeStar} />
            <span className={styles.treeTop} />
            <span className={styles.treeMid} />
            <span className={styles.treeBot} />
            <span className={styles.treeTrunk} />

            <div className={styles.treeLights}>
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className={styles.treeLight}
                  style={{
                    "--i": i,
                    "--delay": `${(i % 12) * 0.08}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Gift */}
          <div className={styles.gift}>
            <span className={styles.giftBox} />
            <span className={styles.giftRibbon} />
            <span className={styles.giftBow} />
          </div>
        </div>

        <div className={styles.actions}>
          <Link href={"/"}>
            <Button label={"Back to home"} design={"ghost"} />
          </Link>
        </div>
      </article>
    </section>
  );
}
