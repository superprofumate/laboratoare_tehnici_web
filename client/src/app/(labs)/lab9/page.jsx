"use client"

import { useEffect } from 'react';
import context from './form.js';

export default function Form() {
  useEffect(() => {
    const {
      handleForm,
      handleCreditScore,
      handleColors
    } = context();

    handleForm();
    handleCreditScore();
    handleColors();
  }, [])

  return (
    <div id='page'>
      <h3>FORMULAR PENTRU INTRAREA ÎN SISTEMUL SOLAR </h3>

      <div id="container">
        <form method="post"> {/* additional : action="/Earth" */}
          <fieldset>
            <legend>Date personale</legend>

            <p>
              <label htmlFor="name">Nume Complet:</label>
              <input type="text" id="name" name="nume" min="3" max="30" required={true} />
            </p>

            <p>
              <label htmlFor="id_unic">ID Unic:</label>
              <input type="text" id="id_unic" pattern="[0-9]{13}" min="8" max="20" required={true} />
            </p>

            <p>
              <label htmlFor="race">Rasa:</label>
              <select id="race" defaultValue="">
                <option value="" disabled>-- please select a race --</option>
                <option value="Autobot">Autobot</option>
                <option value="Daimons">Daimons</option>
                <option value="Deep Ones">Deep Ones</option>
                <option value="Experiment">Experiment</option>
                <option value="Goa'uld">{`Goa'uld`}</option>
                <option value="Hutt">Hutt</option>
                <option value="Jawa">Jawa</option>
                <option value="Kryptonian">Kryptonian</option>
                <option value="Mandalorians">Mandalorians</option>
              </select>
            </p>

            <p>
              <label htmlFor="birth">Data nasterii:</label>
              <input type="date" id="birth" name="birth" min="1800-1-1" max="2024-5-13" required={true} />
            </p>

            <p>
              <label htmlFor="credit">Credit score:</label>
              <input type="range" name="credit" id="credit" min="0" max="2000" step="50" required={true} />
            </p>

            <p>
              <label htmlFor="foto">Fotografie:</label>
              <input type="file" id="foto" name="foto" accept="image/png, image/jpeg" />
            </p>
          </fieldset>

          <fieldset>
            <legend>Contact</legend>

            <p>
              <label htmlFor="galaxie_mama">Galaxie de provenienta:</label>
              <input type="text" id="galaxie_mama" name="galaxie_mama" required={true} />
            </p>

            <p>
              <label htmlFor="planeta_mama">Planeta de provenienta:</label>
              <input type="text" id="planeta_mama" name="planeta_mama" required={true} />
            </p>

            <p>
              <label htmlFor="adress">Adresa:</label>
              <textarea name="adress" rows="5" cols="15" resize="none" required={true}></textarea>
            </p>

            <p>
              <label htmlFor="mail">Email:</label>
              <input type="email" name="mail" id="mail" required={true} />
            </p>

            <p>
              <label htmlFor="phone">Telefon:</label>
              <input type="text" name="phone" id="phone" pattern="[A-D]{3}[0-9]{6}" required={true} />
            </p>

            <p>
              <label htmlFor="url">URL:</label>
              <input type="url" name="url" id="url" patter="https:/.*" />
            </p>
          </fieldset>

          <fieldset>
            <legend>Semnalamente fizice</legend>

            <p>
              <label htmlFor="height">Inaltime (10-300cm):</label>
              <input type="number" name="height" id="height" min="10" max="300" required={true} />
            </p>

            <p>
              <label htmlFor="weight">Greutate (1-500kg):</label>
              <input type="number" name="weight" id="weight" min="1" max="500" required={true} />
            </p>

            <p>
              <label htmlFor="membre">Nr. membre:</label>
              <input type="number" name="membre" id="membre" required={true} />
            </p>

            <p>
              <label htmlFor="eyes">Nr. ochi:</label>
              <input type="number" name="eyes" id="eyes" required={true} />
            </p>

            <p>
              <label htmlFor="colors">Culoare:</label>
              <input type="color" name="colors" id="colors" />
            </p>
          </fieldset>

          <fieldset>
            <legend>Vizita</legend>

            <p>
              <label htmlFor="arrival">Data sosire</label>
              <input type="date" name="arrival" id="arrival" required={true} min="2024-5-13" />
            </p>

            <p>
              <label htmlFor="eta">Timp estimat sosire:</label>
              <input type="time" name="eta" id="eta" required={true} />
            </p>

            <div>
              <label htmlFor="stay">Sedere:</label>
              <p>
                <input type="radio" name="stay" id="op1" defaultChecked />
                <label htmlFor="stay">Temporara</label>
              </p>
              <p>
                <input type="radio" name="stay" id="op2" />
                <label htmlFor="stay">Permanenta</label>
              </p>
            </div>


            <div>
              <label htmlFor="scope">Scopul vizitei:</label>
              <p>
                <input type="checkbox" name="scope" id="opt1" />
                <label htmlFor="scope">Afaceri</label>
              </p>
              <p>
                <input type="checkbox" name="scope" id="opt2" />
                <label htmlFor="scope">Turism</label>
              </p>
              <p>
                <input type="checkbox" name="scope" id="opt3" />
                <label htmlFor="scope">Social (familie & prieteni)</label>
              </p>
              <p>
                <input type="checkbox" name="scope" id="opt4" defaultChecked />
                <label htmlFor="scope">Invazie</label>
              </p>
              <p>
                <input type="checkbox" name="scope" id="opt5" />
                <label htmlFor="scope">Altul</label>
              </p>
            </div>

            <p>
              <label htmlFor="comm">Comentarii:</label>
              <textarea name="comm" id="comm" rows="5" cols="15" resize="none"></textarea>
            </p>
          </fieldset>

          <button className='formButton' type='submit' id='submitButton'>
            Trimite cerere
          </button>
        </form>
      </div>
    </div>
  )
}