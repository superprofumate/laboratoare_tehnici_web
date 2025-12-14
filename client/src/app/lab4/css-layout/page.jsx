import styles from './layout-style.module.css';

export default function CssLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>header</header>
      <main className={styles.main}>
        <nav className={styles.nav}>nav</nav>
        <article className={styles.article}>article</article>
        <aside className={styles.aside}>aside</aside>
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
}