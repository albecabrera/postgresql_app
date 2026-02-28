# 🎬 SQL Trainer – DVD Rental

Interaktiver SQL-Übungstrainer auf Basis der klassischen **dvdrental**-Datenbank.
Läuft komplett im Browser – keine Installation, kein Backend.

---

## <div align="center"><a href="https://albecabrera.github.io/postgresql_app/" style="font-size:2em; font-weight:bold; padding:16px 32px; background:#5b8dee; color:#fff; border-radius:12px; text-decoration:none;">▶ App direkt öffnen</a></div>

---

## Features

- **20+ geführte Übungen** in 6 Kategorien
  - SELECT Grundlagen
  - WHERE & Filtern
  - ORDER BY & LIMIT
  - Aggregation & GROUP BY
  - JOINs
  - Subqueries
- **Freier SQL-Editor** – eigene Abfragen schreiben und ausführen
- **Schema-Übersicht** aller 15 Tabellen mit Primary Keys & Foreign Keys
- **Hinweise & Lösungen** per Klick
- **Fortschrittsanzeige** – erledigte Aufgaben werden markiert
- `Ctrl+Enter` / `Cmd+Enter` zum Ausführen
- Komplett **offline-fähig** nach erstem Laden

## Datenbankschema (Auszug)

```
actor ──── film_actor ──── film ──── film_category ──── category
                              └──── language
customer ── rental ──── inventory ──── film
        └── payment
```

## Lokales Öffnen

```bash
# Einfach die index.html im Browser öffnen:
open index.html

# oder mit einem lokalen Server:
python3 -m http.server 8080
```

## Technologien

| Tech | Zweck |
|------|-------|
| [SQL.js](https://sql.js.org) | SQLite-Engine im Browser (WebAssembly) |
| Vanilla HTML/CSS/JS | UI ohne Frameworks |
| GitHub Pages | Hosting |

---

*Datenbank basiert auf der [dvdrental PostgreSQL Sample Database](https://www.postgresqltutorial.com/postgresql-getting-started/postgresql-sample-database/)*
