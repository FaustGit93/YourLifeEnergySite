# 📖 Guida all'Aggiornamento delle Immagini del Sito

Benvenuta! 👋

Questa guida ti permetterà di aggiornare autonomamente le immagini presenti sul sito web utilizzando il repository del progetto.

---

# 🚀 1. Clonare il Repository

Apri il terminale e spostati nella cartella in cui desideri scaricare il progetto.

```bash
git clone https://github.com/USERNAME/NOME-REPOSITORY.git
```

Successivamente entra nella cartella del progetto:

```bash
cd NOME-REPOSITORY
```

---

# 📂 2. Dove si Trovano le Immagini

Le immagini del sito sono archiviate nelle seguenti cartelle:

```text
/public/images
```

oppure

```text
/src/assets/images
```

> ⚠️ I percorsi indicati sono esempi e potrebbero differire leggermente dal progetto finale.

Esempio di struttura:

```text
project/
│
├── public/
│   └── images/
│       ├── hero.jpg
│       ├── logo.png
│       ├── about.jpg
│       └── gallery/
│           ├── image1.jpg
│           └── image2.jpg
```

---

# 🖼️ 3. Sostituire un'Immagine Esistente

Per sostituire un'immagine già presente sul sito:

1. Aprire la cartella che contiene l'immagine.
2. Individuare il file da sostituire.
3. Preparare la nuova immagine.
4. Rinominare la nuova immagine con lo **stesso nome** del file esistente.
5. Copiare il file nella stessa cartella.
6. Confermare la sostituzione del file quando richiesto.

## Esempio

Immagine esistente:

```text
/public/images/hero.jpg
```

Nuova immagine:

```text
hero.jpg
```

✅ Mantenendo lo stesso nome non sarà necessario modificare il codice del sito.

---

# ➕ 4. Aggiungere una Nuova Immagine

Per aggiungere una nuova immagine:

1. Aprire la cartella desiderata.
2. Copiare il file all'interno.
3. Utilizzare nomi semplici e descrittivi.

### Consigli

✅ Corretto

```text
team-photo.jpg
nuovo-prodotto.png
servizio-consulenza.webp
```

❌ Da evitare

```text
Foto Team Estate 2025.jpg
Immagine Finale Definitiva.png
```

---

# 📏 5. Formati Consigliati

| Utilizzo                 | Formato    |
| ------------------------ | ---------- |
| Fotografie               | JPG / WEBP |
| Loghi                    | PNG        |
| Immagini con trasparenza | PNG        |
| Immagini ottimizzate     | WEBP       |

### Peso consigliato

* ✅ Inferiore a 500 KB
* ⚠️ Preferibilmente non oltre 1 MB

Immagini troppo pesanti possono rallentare il caricamento del sito.

---

# 🔍 6. Verifica delle Modifiche

Dopo aver aggiornato le immagini, avvia il progetto localmente.

```bash
npm install
npm run dev
```

oppure

```bash
npm start
```

Apri il browser all'indirizzo:

```text
http://localhost:3000
```

oppure

```text
http://localhost:5173
```

Verifica che:

* ✅ Le immagini siano visibili.
* ✅ Le proporzioni siano corrette.
* ✅ Non siano presenti immagini mancanti.

---

# 💾 7. Salvare le Modifiche

Una volta verificato che tutto funzioni correttamente:

## Aggiungere i file modificati

```bash
git add .
```

## Creare un commit

```bash
git commit -m "Aggiornamento immagini"
```

## Inviare le modifiche al repository

```bash
git push
```

---

# ⚠️ Problemi Comuni

## L'immagine non viene visualizzata

Controllare che:

* Il file sia nella cartella corretta.
* Il nome sia identico a quello richiesto.
* L'estensione sia corretta (`.jpg`, `.png`, `.webp`).
* Non siano presenti spazi o caratteri speciali nel nome.

---

## L'immagine appare deformata

Possibili cause:

* Dimensioni differenti rispetto all'originale.
* Rapporto larghezza/altezza diverso.
* Ritaglio non corretto.

---

## L'immagine è sfocata

Possibili cause:

* Risoluzione troppo bassa.
* Compressione eccessiva.

---

# 📍 Percorsi Principali del Progetto

> Sostituire i seguenti percorsi con quelli effettivi del progetto.

## Logo

```text
/percorso/logo
```

## Homepage

```text
/percorso/homepage
```

## Sezione "Chi Siamo"

```text
/percorso/about
```

## Galleria

```text
/percorso/gallery
```

## Banner

```text
/percorso/banner
```

---

# 📞 Supporto

In caso di problemi durante l'aggiornamento dei contenuti:

**Sviluppatore:** Tuo Nome

**Email:** [tua-email@example.com](mailto:tua-email@example.com)

---

## 💡 Suggerimento

Prima di sostituire qualsiasi immagine, conserva sempre una copia dell'originale. In questo modo sarà possibile ripristinarla rapidamente in caso di necessità.
