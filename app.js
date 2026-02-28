// ── CodeMirror 6 imports ──────────────────────────────────────────────────────
import { EditorView, keymap, placeholder } from 'https://esm.sh/@codemirror/view@6'
import { EditorState }                     from 'https://esm.sh/@codemirror/state@6'
import { basicSetup }                      from 'https://esm.sh/codemirror@6'
import { sql }                             from 'https://esm.sh/@codemirror/lang-sql@6'
import { syntaxHighlighting, HighlightStyle } from 'https://esm.sh/@codemirror/language@6'
import { tags }                            from 'https://esm.sh/@lezer/highlight@1'
import { indentWithTab }                   from 'https://esm.sh/@codemirror/commands@6'

// ── Custom Theme ──────────────────────────────────────────────────────────────
const myTheme = EditorView.theme({
  '&': {
    background: '#161b27',
    color: '#e2e8f0',
  },
  '.cm-content': {
    caretColor: '#5b8dee',
    padding: '10px 0',
  },
  '.cm-gutters': {
    background: '#1e2535',
    color: '#4a5a7a',
    border: 'none',
    borderRight: '1px solid #2a3347',
    userSelect: 'none',
  },
  '.cm-lineNumbers .cm-gutterElement': {
    padding: '0 10px 0 14px',
    minWidth: '2.6em',
  },
  '.cm-activeLine': { background: '#1c243880' },
  '.cm-activeLineGutter': { background: '#1c2438' },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: '#5b8dee', borderLeftWidth: '2px' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    background: '#2d4070 !important',
  },
  '.cm-matchingBracket': {
    background: '#2d4070',
    outline: '1px solid #5b8dee60',
    borderRadius: '2px',
  },
  // Autocomplete dropdown
  '.cm-tooltip': {
    background: '#1e2535',
    border: '1px solid #2a3347',
    borderRadius: '8px',
    boxShadow: '0 8px 24px rgba(0,0,0,.5)',
    color: '#e2e8f0',
  },
  '.cm-tooltip-autocomplete ul li[aria-selected]': {
    background: '#5b8dee',
    color: '#fff',
  },
  '.cm-completionLabel': { fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' },
  '.cm-completionDetail': { color: '#8b9ab5', fontSize: '11px', fontStyle: 'italic' },
  // Search panel
  '.cm-panels': { background: '#1e2535', borderTop: '1px solid #2a3347' },
  '.cm-panel': { padding: '6px 10px' },
  '.cm-textfield': {
    background: '#0f1117', border: '1px solid #2a3347',
    borderRadius: '5px', color: '#e2e8f0', padding: '3px 7px',
  },
  '.cm-button': {
    background: '#5b8dee', color: '#fff', border: 'none',
    borderRadius: '5px', padding: '3px 10px', cursor: 'pointer',
  },
  '.cm-foldPlaceholder': { background: '#2a3347', border: 'none', color: '#8b9ab5' },
}, { dark: true });

// ── Syntax Highlighting ───────────────────────────────────────────────────────
const myHighlight = HighlightStyle.define([
  { tag: tags.keyword,         color: '#5b8dee', fontWeight: '700' },
  { tag: tags.operatorKeyword, color: '#5b8dee', fontWeight: '700' },
  { tag: tags.definitionKeyword, color: '#5b8dee', fontWeight: '700' },
  { tag: tags.string,          color: '#3ecf6c' },
  { tag: tags.number,          color: '#f6c90e' },
  { tag: tags.bool,            color: '#f6c90e' },
  { tag: tags.null,            color: '#f56565' },
  { tag: tags.comment,         color: '#4a6080', fontStyle: 'italic' },
  { tag: tags.lineComment,     color: '#4a6080', fontStyle: 'italic' },
  { tag: tags.blockComment,    color: '#4a6080', fontStyle: 'italic' },
  { tag: tags.operator,        color: '#f9a03f' },
  { tag: tags.punctuation,     color: '#cbd5e1' },
  { tag: tags.separator,       color: '#cbd5e1' },
  { tag: tags.name,            color: '#e2e8f0' },
  { tag: tags.typeName,        color: '#a78bfa' },
  { tag: tags.propertyName,    color: '#93c5fd' },
  { tag: tags.special(tags.name), color: '#a78bfa' },
  { tag: tags.function(tags.name), color: '#60a5fa' },
  { tag: tags.meta,            color: '#8b9ab5' },
]);

// ── dvdrental schema for autocomplete ────────────────────────────────────────
const dvdSchema = {
  film:          ['film_id','title','description','release_year','language_id','rental_duration','rental_rate','length','replacement_cost','rating'],
  actor:         ['actor_id','first_name','last_name'],
  film_actor:    ['actor_id','film_id'],
  film_category: ['film_id','category_id'],
  category:      ['category_id','name'],
  language:      ['language_id','name'],
  customer:      ['customer_id','store_id','first_name','last_name','email','address_id','active'],
  rental:        ['rental_id','rental_date','inventory_id','customer_id','return_date','staff_id'],
  payment:       ['payment_id','customer_id','staff_id','rental_id','amount','payment_date'],
  inventory:     ['inventory_id','film_id','store_id'],
  staff:         ['staff_id','first_name','last_name','address_id','email','store_id','active','username'],
  store:         ['store_id','manager_staff_id','address_id'],
  address:       ['address_id','address','district','city_id','postal_code','phone'],
  city:          ['city_id','city','country_id'],
  country:       ['country_id','country'],
};

// ── Editor factory ────────────────────────────────────────────────────────────
function createEditor(parent, initialDoc, onRun, placeholderText) {
  const runKeys = keymap.of([
    { key: 'Ctrl-Enter', run() { onRun(); return true; } },
    { key: 'Mod-Enter',  run() { onRun(); return true; } },
  ]);
  return new EditorView({
    state: EditorState.create({
      doc: initialDoc,
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        sql({ schema: dvdSchema, upperCaseKeywords: false }),
        syntaxHighlighting(myHighlight),
        myTheme,
        runKeys,
        ...(placeholderText ? [placeholder(placeholderText)] : []),
        EditorView.lineWrapping,
      ],
    }),
    parent,
  });
}

function getDoc(view)       { return view.state.doc.toString(); }
function setDoc(view, text) {
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } });
}

// ── Exercises ─────────────────────────────────────────────────────────────────
const EXERCISES = [
  {
    category: 'SELECT Grundlagen',
    badge: 'SELECT',
    items: [
      {
        title: 'Alle Filme anzeigen',
        desc: 'Zeige alle Spalten aller Filme aus der <code>film</code>-Tabelle an. Limitiere auf 10 Ergebnisse.',
        hint: 'Nutze <code>SELECT * FROM tabelle LIMIT n;</code>',
        solution: 'SELECT * FROM film LIMIT 10;',
        starter: 'SELECT * FROM film LIMIT 10;'
      },
      {
        title: 'Filmtitel & Bewertung',
        desc: 'Zeige nur <code>title</code> und <code>rating</code> aller Filme an.',
        hint: 'Nenne die gewünschten Spalten nach SELECT: <code>SELECT spalte1, spalte2 FROM ...</code>',
        solution: 'SELECT title, rating FROM film;',
        starter: 'SELECT ... FROM film;'
      },
      {
        title: 'Alle Schauspieler',
        desc: 'Zeige Vor- und Nachname aller Schauspieler aus <code>actor</code> an.',
        hint: 'Spalten: <code>first_name</code>, <code>last_name</code>',
        solution: 'SELECT first_name, last_name FROM actor;',
        starter: 'SELECT ... FROM actor;'
      },
      {
        title: 'Eindeutige Bewertungen',
        desc: 'Welche einzigartigen Bewertungen (<code>rating</code>) gibt es in der Filmtabelle? Nutze <code>DISTINCT</code>.',
        hint: '<code>SELECT DISTINCT spalte FROM tabelle;</code>',
        solution: 'SELECT DISTINCT rating FROM film;',
        starter: 'SELECT DISTINCT ... FROM film;'
      },
    ]
  },
  {
    category: 'WHERE & Filtern',
    badge: 'WHERE',
    items: [
      {
        title: 'Nur PG-Filme',
        desc: 'Zeige Titel aller Filme mit Bewertung <code>PG</code>.',
        hint: '<code>WHERE rating = \'PG\'</code>',
        solution: "SELECT title FROM film WHERE rating = 'PG';",
        starter: "SELECT title FROM film WHERE rating = '...';"
      },
      {
        title: 'Lange Filme',
        desc: 'Finde alle Filme, die länger als 120 Minuten sind. Zeige Titel und Länge.',
        hint: '<code>WHERE length > 120</code>',
        solution: 'SELECT title, length FROM film WHERE length > 120;',
        starter: 'SELECT title, length FROM film WHERE ...;'
      },
      {
        title: 'Günstige Miete',
        desc: 'Zeige Titel und Mietpreis (<code>rental_rate</code>) von Filmen, die weniger als 1,00 € kosten.',
        hint: '<code>WHERE rental_rate < 1.00</code>',
        solution: 'SELECT title, rental_rate FROM film WHERE rental_rate < 1.00;',
        starter: 'SELECT title, rental_rate FROM film WHERE ...;'
      },
      {
        title: 'Filmsuche mit LIKE',
        desc: 'Finde alle Filme, deren Titel mit "A" beginnt. Zeige Titel und Jahr.',
        hint: '<code>WHERE title LIKE \'A%\'</code>',
        solution: "SELECT title, release_year FROM film WHERE title LIKE 'A%';",
        starter: "SELECT title, release_year FROM film WHERE title LIKE '...';"
      },
      {
        title: 'Mehrere Bedingungen',
        desc: 'Zeige Titel von Filmen, die die Bewertung <code>G</code> haben UND kürzer als 80 Minuten sind.',
        hint: 'Verknüpfe Bedingungen mit <code>AND</code>',
        solution: "SELECT title FROM film WHERE rating = 'G' AND length < 80;",
        starter: "SELECT title FROM film WHERE rating = 'G' AND ...;"
      },
    ]
  },
  {
    category: 'ORDER BY & LIMIT',
    badge: 'ORDER',
    items: [
      {
        title: 'Teuerste Filme',
        desc: 'Zeige die 5 teuersten Filme nach <code>replacement_cost</code>, absteigend sortiert.',
        hint: '<code>ORDER BY spalte DESC LIMIT 5</code>',
        solution: 'SELECT title, replacement_cost FROM film ORDER BY replacement_cost DESC LIMIT 5;',
        starter: 'SELECT title, replacement_cost FROM film ORDER BY ... DESC LIMIT 5;'
      },
      {
        title: 'Schauspieler alphabetisch',
        desc: 'Liste alle Schauspieler alphabetisch nach Nachname sortiert.',
        hint: '<code>ORDER BY last_name ASC</code>',
        solution: 'SELECT first_name, last_name FROM actor ORDER BY last_name ASC;',
        starter: 'SELECT first_name, last_name FROM actor ORDER BY ...;'
      },
      {
        title: 'Kürzeste Filme',
        desc: 'Zeige die 10 kürzesten Filme (Titel + Länge), aufsteigend nach Länge.',
        hint: '<code>ORDER BY length ASC LIMIT 10</code>',
        solution: 'SELECT title, length FROM film ORDER BY length ASC LIMIT 10;',
        starter: 'SELECT title, length FROM film ORDER BY ... LIMIT 10;'
      },
    ]
  },
  {
    category: 'Aggregation & GROUP BY',
    badge: 'GROUP',
    items: [
      {
        title: 'Anzahl Filme',
        desc: 'Wie viele Filme gibt es insgesamt in der Datenbank?',
        hint: '<code>SELECT COUNT(*) FROM film;</code>',
        solution: 'SELECT COUNT(*) AS anzahl_filme FROM film;',
        starter: 'SELECT COUNT(*) ... FROM film;'
      },
      {
        title: 'Durchschnittliche Länge',
        desc: 'Berechne die durchschnittliche Filmlänge.',
        hint: '<code>AVG(spalte)</code>',
        solution: 'SELECT AVG(length) AS durchschnittliche_laenge FROM film;',
        starter: 'SELECT AVG(...) FROM film;'
      },
      {
        title: 'Filme pro Bewertung',
        desc: 'Zeige, wie viele Filme es pro Bewertungskategorie (<code>rating</code>) gibt.',
        hint: '<code>GROUP BY rating</code> mit <code>COUNT(*)</code>',
        solution: 'SELECT rating, COUNT(*) AS anzahl FROM film GROUP BY rating ORDER BY anzahl DESC;',
        starter: 'SELECT rating, COUNT(*) FROM film GROUP BY ...;'
      },
      {
        title: 'Teuerste Kategorie',
        desc: 'Berechne den durchschnittlichen Mietpreis (<code>rental_rate</code>) pro Bewertung. Sortiere absteigend.',
        hint: '<code>AVG(rental_rate)</code> mit <code>GROUP BY rating</code>',
        solution: 'SELECT rating, AVG(rental_rate) AS avg_preis FROM film GROUP BY rating ORDER BY avg_preis DESC;',
        starter: 'SELECT rating, AVG(rental_rate) FROM film GROUP BY ... ORDER BY ...;'
      },
      {
        title: 'HAVING – Viele Filme',
        desc: 'Zeige nur Bewertungskategorien, die mehr als 10 Filme haben.',
        hint: '<code>HAVING COUNT(*) > 10</code>',
        solution: 'SELECT rating, COUNT(*) AS anzahl FROM film GROUP BY rating HAVING COUNT(*) > 10;',
        starter: 'SELECT rating, COUNT(*) FROM film GROUP BY rating HAVING ...;'
      },
    ]
  },
  {
    category: 'JOINs',
    badge: 'JOIN',
    items: [
      {
        title: 'Filme mit Sprache',
        desc: 'Zeige Filmtitel zusammen mit dem Sprachnamen. Verbinde <code>film</code> und <code>language</code>.',
        hint: '<code>JOIN language ON film.language_id = language.language_id</code>',
        solution: 'SELECT f.title, l.name AS sprache FROM film f JOIN language l ON f.language_id = l.language_id LIMIT 15;',
        starter: 'SELECT f.title, l.name FROM film f JOIN language l ON ... LIMIT 15;'
      },
      {
        title: 'Schauspieler & Filme',
        desc: 'Zeige Schauspielernamen und die Filmtitel, in denen sie gespielt haben. Nutze <code>film_actor</code> als Verbindungstabelle.',
        hint: 'Verbinde: <code>actor → film_actor → film</code>',
        solution: `SELECT a.first_name, a.last_name, f.title
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
JOIN film f ON fa.film_id = f.film_id
LIMIT 20;`,
        starter: `SELECT a.first_name, a.last_name, f.title
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
JOIN film f ON ...
LIMIT 20;`
      },
      {
        title: 'Filme mit Kategorie',
        desc: 'Zeige Filmtitel mit ihrer Kategorie. Nutze <code>film_category</code> und <code>category</code>.',
        hint: 'Verbinde: <code>film → film_category → category</code>',
        solution: `SELECT f.title, c.name AS kategorie
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
LIMIT 20;`,
        starter: `SELECT f.title, c.name
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON ...
LIMIT 20;`
      },
      {
        title: 'Kunden mit Zahlungen',
        desc: 'Zeige Kundenname und Zahlungsbetrag. Verbinde <code>customer</code> und <code>payment</code>.',
        hint: '<code>JOIN payment ON customer.customer_id = payment.customer_id</code>',
        solution: `SELECT c.first_name || ' ' || c.last_name AS kunde, p.amount
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
LIMIT 20;`,
        starter: `SELECT c.first_name, c.last_name, p.amount
FROM customer c
JOIN payment p ON ...
LIMIT 20;`
      },
    ]
  },
  {
    category: 'Subqueries',
    badge: 'SUB',
    items: [
      {
        title: 'Über Durchschnitt',
        desc: 'Finde alle Filme, deren Mietpreis über dem Durchschnitt liegt.',
        hint: '<code>WHERE rental_rate > (SELECT AVG(rental_rate) FROM film)</code>',
        solution: `SELECT title, rental_rate
FROM film
WHERE rental_rate > (SELECT AVG(rental_rate) FROM film)
ORDER BY rental_rate DESC;`,
        starter: `SELECT title, rental_rate FROM film
WHERE rental_rate > (SELECT AVG(...) FROM film);`
      },
      {
        title: 'Teuerster Film',
        desc: 'Finde den/die Film(e) mit dem höchsten <code>replacement_cost</code> via Subquery.',
        hint: '<code>WHERE replacement_cost = (SELECT MAX(replacement_cost) FROM film)</code>',
        solution: `SELECT title, replacement_cost
FROM film
WHERE replacement_cost = (SELECT MAX(replacement_cost) FROM film);`,
        starter: `SELECT title, replacement_cost FROM film
WHERE replacement_cost = (SELECT MAX(...) FROM film);`
      },
    ]
  },
];

// ── DB Engine ─────────────────────────────────────────────────────────────────
let db = null;

async function initDB() {
  const SQL = await window.initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${file}`
  });
  db = new SQL.Database();
  db.run(window.DVD_RENTAL_SQL);
  document.getElementById('loading-screen').classList.add('hidden');
}

function runQuery(sql) {
  try {
    const results = db.exec(sql.trim());
    return { ok: true, results };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// ── Render Results ────────────────────────────────────────────────────────────
function renderResults(container, outcome) {
  if (!outcome.ok) {
    container.innerHTML = `<div class="result-error">❌ ${escHtml(outcome.error)}</div>`;
    return;
  }
  if (!outcome.results || outcome.results.length === 0) {
    container.innerHTML = `<div class="result-success">✓ Abfrage erfolgreich ausgeführt. Keine Zeilen zurückgegeben.</div>`;
    return;
  }
  const { columns, values } = outcome.results[0];
  const totalRows = values.length;
  let html = `<div class="result-wrap">
    <div class="result-meta">
      <span class="rows-count">${totalRows} Zeile${totalRows !== 1 ? 'n' : ''}</span>
      <span>${columns.length} Spalte${columns.length !== 1 ? 'n' : ''}</span>
    </div>
    <div class="result-scroll">
      <table class="result-table">
        <thead><tr>${columns.map(c => `<th>${escHtml(c)}</th>`).join('')}</tr></thead>
        <tbody>`;
  for (const row of values) {
    html += '<tr>' + row.map(cell => {
      if (cell === null) return '<td class="null-val">NULL</td>';
      return `<td>${escHtml(String(cell))}</td>`;
    }).join('') + '</tr>';
  }
  html += `</tbody></table></div></div>`;
  container.innerHTML = html;
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ── Exercise Editor ───────────────────────────────────────────────────────────
const exEditorView = createEditor(
  document.getElementById('ex-editor-container'),
  '',
  () => document.getElementById('ex-run-btn').click(),
  '-- Schreib dein SQL hier…\nSELECT …'
);

// ── Free Editor ───────────────────────────────────────────────────────────────
const freeEditorView = createEditor(
  document.getElementById('free-editor-container'),
  'SELECT * FROM film LIMIT 10;',
  () => document.getElementById('free-run-btn').click(),
  '-- Schreib beliebige SQL-Abfragen\nSELECT * FROM film LIMIT 10;'
);

document.getElementById('free-run-btn').addEventListener('click', () => {
  if (!db) return;
  renderResults(document.getElementById('free-result'), runQuery(getDoc(freeEditorView)));
});
document.getElementById('free-clear-btn').addEventListener('click', () => {
  setDoc(freeEditorView, '');
  document.getElementById('free-result').innerHTML = '';
});

// ── Exercise List ─────────────────────────────────────────────────────────────
const completedSet = new Set();
let currentEx = null;

function buildExerciseList() {
  const container = document.getElementById('exercise-categories');
  let html = '';
  let idx = 0;
  EXERCISES.forEach(cat => {
    html += `<div class="cat-label">${cat.category}</div>`;
    cat.items.forEach(ex => {
      html += `<div class="ex-item" data-id="${idx}" id="item-${idx}">
        <span class="ex-num" id="num-${idx}">${idx + 1}</span>
        <span class="ex-name">${ex.title}</span>
      </div>`;
      idx++;
    });
  });
  container.innerHTML = html;
  container.querySelectorAll('.ex-item').forEach(el => {
    el.addEventListener('click', () => loadExercise(parseInt(el.dataset.id)));
  });
}

function getAllExercises() {
  const all = [];
  EXERCISES.forEach(cat => cat.items.forEach(ex => all.push({ ...ex, badge: cat.badge })));
  return all;
}

function loadExercise(idx) {
  const all = getAllExercises();
  const ex = all[idx];
  currentEx = { ...ex, idx };

  document.querySelectorAll('.ex-item').forEach(el => el.classList.remove('active'));
  document.getElementById(`item-${idx}`)?.classList.add('active');

  document.getElementById('ex-badge').textContent = ex.badge;
  document.getElementById('ex-title').textContent = ex.title;
  document.getElementById('ex-desc').innerHTML = ex.desc;
  setDoc(exEditorView, ex.starter || '');
  document.getElementById('ex-hint-box').style.display = 'none';
  document.getElementById('ex-result').innerHTML = '';
  document.getElementById('ex-hint-btn').style.display = '';
  document.getElementById('ex-solution-btn').style.display = '';
  document.getElementById('ex-run-btn').style.display = '';
  exEditorView.focus();
}

document.getElementById('ex-hint-btn').addEventListener('click', () => {
  if (!currentEx) return;
  const box = document.getElementById('ex-hint-box');
  box.style.display = box.style.display === 'none' ? '' : 'none';
  box.innerHTML = `💡 <strong>Hinweis:</strong> ${currentEx.hint}`;
});

document.getElementById('ex-solution-btn').addEventListener('click', () => {
  if (!currentEx) return;
  setDoc(exEditorView, currentEx.solution);
  exEditorView.focus();
});

document.getElementById('ex-run-btn').addEventListener('click', () => {
  if (!currentEx || !db) return;
  const outcome = runQuery(getDoc(exEditorView));
  renderResults(document.getElementById('ex-result'), outcome);
  if (outcome.ok) {
    completedSet.add(currentEx.idx);
    const numEl = document.getElementById(`num-${currentEx.idx}`);
    if (numEl) { numEl.style.background = 'var(--green)'; numEl.style.color = '#0a1a0f'; }
  }
});

// ── Schema Tab ────────────────────────────────────────────────────────────────
function buildSchema() {
  const grid = document.getElementById('schema-grid');
  grid.innerHTML = window.SCHEMA_INFO.map(tbl => `
    <div class="schema-card">
      <div class="schema-card-header">
        <h4>${tbl.name}</h4>
        <span class="row-count">${tbl.rows} rows</span>
      </div>
      ${tbl.fields.map(f => `
        <div class="schema-field">
          ${f.pk ? '<span class="pk-icon" title="Primary Key">🔑</span>' : f.fk ? '<span class="fk-icon" title="Foreign Key → ' + f.fk + '">🔗</span>' : '<span style="width:16px;display:inline-block"></span>'}
          <span class="field-name">${f.name}</span>
          <span class="field-type" style="margin-left:auto">${f.type}</span>
        </div>`).join('')}
    </div>`).join('');
}

// ── Init ──────────────────────────────────────────────────────────────────────
buildExerciseList();
buildSchema();
initDB().then(() => {
  loadExercise(0);
}).catch(err => {
  document.getElementById('loading-screen').innerHTML = `
    <div class="loader-box">
      <p style="color:var(--red)">Fehler beim Laden: ${err.message}</p>
    </div>`;
});
