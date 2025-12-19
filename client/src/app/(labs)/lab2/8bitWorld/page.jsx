import styles from './lab2.module.scss';
import Link from 'next/link';

export default function EightBitWorld() {
  return (
    <>
      <header>
        <h1 className={`${styles.title} text text--title text--titlePrimary`}>8-bit world</h1>
        <nav className={`${styles.navBar} text text--subtitle`}>
          <a href="#games">8-bit games</a>
          <a href="#graphics">8-bit graphics</a>
          <a href="#music">8-bit music</a>
        </nav>
      </header>

      <main>
        <section id="games" className={styles.article}>
          <header>
            <h2 className="text text--title text--titleSecondary">8-bit games</h2>
          </header>

          <p className='text text--paragraph'>
            {
              `
              In the history of video games, the third generation of game consoles, commonly
            referred to as the 8-bit era, began on July 15, 1983, with the Japanese release
            of two systems: Nintendo's Family Computer (commonly abbreviated to Famicom) and
            Sega's SG-1000. This generation marked the end of the video game crash of 1983,
            and a shift in the dominance of home video game manufacturers from the United
            States to Japan. The best-selling console of this generation was the NES/Famicom
            from Nintendo, followed by the Sega Master System (the improved successor to the
            SG-1000), and the Atari 7800. Although the previous generation of consoles had
            also used 8-bit processors, it was at the end of the third generation that home
            consoles were first labeled and marketed by their "bits".
              `
            }
          </p>

          <p className='text text--paragraph'>Here are some of the most popular games of that generation:</p>

          <ol className={`${styles.list} text text--paragraph`}>
            <li><Link href="/lab2/mario">Super Mario Bros</Link></li>
            <li>Legend Of Zelda</li>
            <li>Castlevania</li>
            <li>Final Fantasy</li>
            <li>Tetris</li>
            <li>Dragon Ball: Dragon Daihikyō</li>
          </ol>

          <h2 id="nes-title" className="text text--title text--titleTertiary">Programming for NES</h2>

          <p className="text text--paragraph">
            {
              `
              NES was shipped with only 4 KB of RAM, but "mapper" hardware on the cartridge
              expanded its capabilities, supporting games as large as 1 MB.
              `
            }
          </p>

          <p className="text text--paragraph">
            Try programming for NES using the platform below provided by
            <Link className={styles.link} href="https://8bitworkshop.com/"> https://8bitworkshop.com/</Link>.
          </p>

          <iframe
            title="8bitworkshop NES"
            src="https://8bitworkshop.com/"
            width="100%"
            height="700"
            loading="lazy"

            style={{ border: "none", borderRadius: "16px" }}
          />
        </section>

        <section id="graphics" className={styles.article}>
          <header>
            <h2 className="text text--title text--titleSecondary">8-bit graphics</h2>
          </header>

          <p className="text text--paragraph">
            8-bit color graphics are a method of storing image information in a computer&apos;s memory
            or in an image file, so that each pixel is represented by 8 bits (1 byte). The maximum
            number of colors that can be displayed at any one time is 256 or 2<sup>8</sup>.
          </p>

          <figure className={styles.figure}>
            <img src="/lab2/256colour.png" alt="8-bit color palette" className={styles.image}/>
            <div className={styles.palettePlaceholder} />
            <figcaption className={`text text--label`} style={{ marginTop: "1rem" }}>
              Fig. 1: 8-bit color, with three bits of red, three bits of green, and two bits of blue.
            </figcaption>
          </figure>

          <h3 className="text text--title text--titleTertiary">
            Usage
          </h3>

          <p className="text text--paragraph">
            Because of the low amount of memory and resultant higher speeds of 8-bit color images,
            8-bit color was a common ground among computer graphics development until more memory
            and higher CPU speeds became readily available to consumers. 8-bit color was used in
            many different applications including:
          </p>

          <ul className={`${styles.list} text text--paragraph`}>
            <li >The MSX2 series of personal computer</li>
            <li >The Atari Falcon</li>
            <li >Wearable OS smartwatches with ambient displays</li>
            <li >Many scanners use an 8-bit grey scale as their standard</li>
          </ul>

          <p className="text text--paragraph">
            Even though it is now outdated for most consumer applications, 8-bit color encoding can
            still be useful in imaging systems with limited data bandwidth or memory capacity. For
            example, both Mars Exploration Rovers used an 8-bit grayscale format for navigation imaging.
          </p>

          <h3 className="text text--title text--titleTertiary">
            Make some 8-bit art!
          </h3>
          <p className="text text--paragraph">
            Visit{` `}
            <a className={styles.link} href="https://make8bitart.com/" target="_blank" rel="noreferrer">
              https://make8bitart.com/
            </a>
            {` `}to make some 8-bit art from scratch, or try the tool from{` `}
            <a
              className={styles.link}
              href="https://8bitworkshop.com/dithertron"
              target="_blank"
              rel="noreferrer"
            >
              https://8bitworkshop.com/dithertron
            </a>
            {` `}to transform an image to an 8-bit drawing!
          </p>

          <h3 className="text text--title text--titleTertiary">
            Graphics in 8-bit games
          </h3>

          <p className="text text--paragraph">
            You can watch the two videos below to find out more about graphics in 8-bit games{` `}
          </p>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Tfh0ytz8S0k"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/_rsycfDliZU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>

        <section id="music" className={styles.article}>
          <header>
            <h2 className="text text--title text--titleSecondary">8-bit music</h2>
          </header>
          <p className="text text--paragraph">
            Chiptune, also known as chip music or 8-bit music, is a style of synthesized electronic music made using the programmable sound generator sound chips or synthesizers in vintage arcade machines, computers and video game consoles. The term is commonly used to refer to tracker format music which intentionally sounds similar to older PSG-created music (this is the original meaning of the term), as well as music that combines PSG sounds with modern musical styles. It has been described as “an interpretation of many genres” since any existing song can be arranged in a chiptune style defined more by choice of instrument and timbre than specific style elements.
          </p>

          <h3 className="text text--title text--titleTertiary">Technology</h3>

          <p className="text text--paragraph">
            A waveform generator is a fundamental module in a sound synthesis system. A waveform generator usually produces a basic geometrical waveform with a fixed or variable timbre and variable pitch. Common waveform generator configurations usually included two or three simple waveforms and often a single pseudo-random-noise generator. Available waveforms often included pulse wave (whose timbre can be varied by modifying the duty cycle), square wave (a symmetrical pulse wave producing only odd overtones), triangle wave (which has a fixed timbre containing only odd harmonics, but is softer than a square wave), and sawtooth wave (which has a bright raspy timbre and contains odd and even harmonics). Two notable examples of systems employing this technology were the Nintendo Game Boy portable game console and the Commodore 64 personal computer.
          </p>

          <p className="text text--paragraph">
            You can watch the video below to find out more about 8-bit music:
          </p>

          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/q_3d1x2VPxk"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />

          <h3 className="text text--title text--titleTertiary">
            Make some 8-bit music!
          </h3>

          <p className="text text--paragraph">
            Try the Comodore64 8-music player below:
          </p>

          <iframe
            title="8bitworkshop NES"
            src="https://www.igorski.nl/application/websid/"
            width="100%"
            height="700"
            loading="lazy"

            style={{ border: "0", borderRadius: "16px" }}
          />
        </section>
      </main>

      <footer className="text text--subtitle">
        page made by Predescu Teodor-Ioan
      </footer>
    </>
  )
}