import styles from './lab2.module.scss';

export default function Mario() {
  return (
    <>
      <header>
        <h1 className={`${styles.title} "text text--titlePrimary"`}>
          Super Mario Brothers
        </h1>
      </header>
      <main>
        <article className={styles.article}>
          <section className={styles.section}  id="description">
            <p className={`${styles.paragraph} text text--paragraph`}>
              Super Mario Bros is a platform game developed and published by Nintendo for the Nintendo Entertainment System (NES). The successor to the 1983 arcade game Mario Bros and the first game in the Super Mario series, it was first released in 1985 for the Famicom in Japan.
            </p>
            <p className={`${styles.paragraph} text text--paragraph`}>
              The game was designed by Shigeru Miyamoto and Takashi Tezuka as a grand culmination of the Famicom team's three years of game mechanics and programming, drawing from their experiences working on Devil World and the side-scrollers Excitebike and Kung Fu.
            </p>
            <figure className={styles.figure}>
              <img src="designers.jpg" className={styles.image} />
              <figcaption className="text text--label" style={{ marginTop: "1rem" }}>
                From left: designers Takashi Tezuka and Shigeru Miyamoto, and composer Koji Kondo, in 2015
              </figcaption>
            </figure>
          </section>

          <section className={styles.section}  id="gameplay">
            <h2 className={`${styles.title} "text text--titleSecondry"`}>
              Gameplay
            </h2>
            <p className={`${styles.paragraph} text text--paragraph`}>
              Players control Mario, or his brother Luigi in the multiplayer mode, as they traverse the Mushroom Kingdom to rescue Princess Toadstool from King Koopa (later named Bowser). They traverse side-scrolling stages while avoiding hazards such as enemies and pits with the aid of power-ups such as the Super Mushroom, Fire Flower, and Starman.
            </p>
          </section>

          <section className={styles.section}  id="reception">
            <h2 className={`${styles.title} "text text--titleSecondry"`}>
              Reception
            </h2>
            <p className={`${styles.paragraph} text text--paragraph`}>
              Super Mario Bros is frequently cited as one of the greatest video games of all time, with praise for its precise controls. It is one of the best-selling games of all time, with more than 58 million copies sold worldwide.
            </p>
            <p className={`${styles.paragraph} text text--paragraph`}>
              Koji Kondo's soundtrack is one of the earliest and most popular in video games, making music a centerpiece of game design.
            </p>
            <audio controls autoPlay loop muted>
              <source src="/lab2/mario.mp3" type="audio/mpeg" />
            </audio>
          </section>

          <section className={styles.section}  id="contemporary reception">
            <h2 className={`${styles.title} "text text--titleSecondry"`}>
              Contemporary Reception
            </h2>
            <table>
              <thead>
                <tr>
                  <th colSpan="3">Review scores</th>
                </tr>

                <tr>
                  <th rowSpan="2" scope="col">Publication</th>
                  <th colSpan="2" scope="colgroup">Score</th>
                </tr>

                <tr>
                  <th scope="col">Arcade</th>
                  <th scope="col">NES</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>ACE</td>
                  <td></td>
                  <td>955/1000</td>
                </tr>
                <tr>
                  <td>Computer and Video Games</td>
                  <td>Positive</td>
                  <td>95%</td>
                </tr>
                <tr>
                  <td>The Games Machine (UK)</td>
                  <td></td>
                  <td>89%</td>
                </tr>
                <tr>
                  <td>Computer Entertainer</td>
                  <td></td>
                  <td>9.5</td>
                </tr>
                <tr>
                  <td>Top Score</td>
                  <td>Positive</td>
                  <td>4 stars</td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <th colSpan="3">Award</th>
                </tr>
                <tr>
                  <th scope="col">Publication</th>
                  <th scope="col" colSpan="2">Award</th>
                </tr>
                <tr>
                  <td>Amusement Players Association</td>
                  <td colSpan="2">Best Video Game of 1986</td>
                </tr>
              </tbody>
            </table>

          </section>

          <section className={styles.section} >
            <h2 className={`${styles.title} "text text--titleSecondry"`}>
              Play it!
            </h2>
            <iframe
              src="https://supermarioplay.com/"
              title="Super Mario Play"
              loading="lazy"
              allow="fullscreen; gamepad"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ width: "100%", height: "40rem"}}
            />
          </section>
        </article>
      </main>
    </>
  );
}