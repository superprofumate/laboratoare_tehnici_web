async function handleFetchXML() {
  const res = await fetch("/lab10/cinemateca.xml");
  const xmlText = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "application/xml");

  return doc;
}

async function XMLtoJavascriptObject (doc) {
  const getAttributes = (el) => {
    if (!el) return {};
    return Object.fromEntries([...el.attributes].map((a) => [a.name, a.value]));
  };

  const node = (el, transform = (s) => s) => ({
    text: el ? transform((el.textContent || "").trim()) : transform(""),
    attributes: getAttributes(el),
  });

  const films = [...doc.querySelectorAll("film")].map((film) => {
    const titlu = film.querySelector("titlu");
    const gen = film.querySelector("gen");
    const regizor = film.querySelector("regizor");
    const anLansare = film.querySelector("anLansare");
    const scenarist = film.querySelector("scenarist");
    const producator = film.querySelector("producator");
    const scor = film.querySelector("scor");
    const actori = film.querySelectorAll("actori > actor");

    return {
      id: film.getAttribute("id") || "",

      titlu: node(titlu),
      gen: node(gen),
      regizor: node(regizor),
      anLansare: node(anLansare, (v) => Number(v) || null),
      scenarist: node(scenarist),
      producator: node(producator),

      scor: node(scor, (v) => Number(v) || null),

      actori: [...actori].map((a) => (node(a))),
    };
  });

  return films;
}

function JavaScriptObjectToHTML(films) {
  const container = document.getElementById("container");
  if (!container) 
    return;

  const createEl = (tag, attrs = {}, text = "") => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined || v === "") continue;
      el.setAttribute(k, String(v));
    }
    if (text !== "") el.textContent = text;
    return el;
  };

  // pune atributele XML ca data-* (safe + inspectabil)
  const applyDataAttrs = (el, attrsObj = {}) => {
    for (const [k, v] of Object.entries(attrsObj)) {
      // data- keys must be lowercase-ish; convert safe
      const key = String(k).replace(/[^\w-]/g, "-").toLowerCase();
      el.dataset[key] = String(v);
    }
  };

  const ul = createEl("ul", { class: "films" });

  films.forEach((f) => {
    const li = createEl("li", { class: "film", "data-id": f.id });

    // Title
    const h3 = createEl("h3", { class: "text text--title text--titleTertiary" }, f.titlu?.text || "");
    applyDataAttrs(h3, f.titlu?.attributes);

    // Meta line
    const meta = createEl("div", { class: "meta" });
    meta.append(
      createEl("span", { class: "text text--paragraph text--paragraphPrimary" }, `An lansare: ${f.anLansare?.text ?? ""}`),
      createEl("span", { class: "text text--paragraph text--paragraphPrimary" }, `Gen: ${f.gen?.text || ""}`),
      createEl("span", { class: "text text--paragraph text--paragraphPrimary" }, `Scor: ${f.scor?.text ?? ""}`)
    );

    // Details
    const details = createEl("div", { class: "details" });
    details.append(
      createEl("div", { class: "text text--paragraph text--paragraphPrimary" }, `Regizor: ${f.regizor?.text || ""}`),
      createEl("div", { class: "text text--paragraph text--paragraphPrimary" }, `Scenarist: ${f.scenarist?.text || ""}`),
      createEl("div", { class: "text text--paragraph text--paragraphPrimary" }, `Producător: ${f.producator?.text || ""}`)
    );

    // Actors
    const actorsWrap = createEl("div", { class: "actors" });
    actorsWrap.append(createEl("b", { class: "text text--label" }, "Actori:"));
    const actorsUl = createEl("ul", { class: "actors-list" });

    (f.actori || []).forEach((a) => {
      const actorLi = createEl("li", { class: "text text--paragraph text--paragraphPrimary" }, a?.text || "");
      applyDataAttrs(actorLi, a?.attributes);
      actorsUl.appendChild(actorLi);
    });

    actorsWrap.appendChild(actorsUl);

    li.append(h3, meta, details, actorsWrap);
    ul.appendChild(li);
  });

  container.innerHTML = "";
  container.appendChild(ul);
}

async function saveJsonToFile(obj) {
  const json = JSON.stringify(obj, null, 2);
  console.log("Saving JSON to file:", json);
}

const obj = await XMLtoJavascriptObject(await handleFetchXML());
await saveJsonToFile(obj);

function context() {
  const context = {
    handleFetchXML,
    XMLtoJavascriptObject,
    JavaScriptObjectToHTML,
    saveJsonToFile
  };
  return context;
}

export default context;