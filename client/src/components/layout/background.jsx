import styles from './background.module.scss';

export default function Background() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.snow} />
        <div className={styles.garland}>
          {Array.from({ length: 56 }).map((_, i) => (
            <span key={i} className={styles.bulb} style={{ "--i": i }} />
          ))}
        </div>
      </div>
    </section>
  );
}