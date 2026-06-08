# PWAmusic
PWAmusic è una Progressive Web App sviluppata come progetto del corso di Laboratorio di Applicazioni Web. L'app consente di creare una playlist personale di video YouTube salvando titolo e link del video, con riproduzione integrata nella pagina e persistenza dei dati tramite `localStorage` del browser.

## Funzionalità

- Aggiunta di video YouTube tramite titolo e URL.
- Visualizzazione dei video salvati in una playlist personale.
- Riproduzione del video direttamente all'interno della pagina.
- Interruzione della riproduzione e ritorno alla galleria video.
- Eliminazione dei video dalla playlist.
- Installazione dell'app sul dispositivo come PWA.
- Sincronizzazione della galleria tra pagina web e app installata sullo stesso dispositivo tramite `localStorage`.

## Tecnologie utilizzate

- HTML5 per la struttura dell'interfaccia.
- CSS3 per la presentazione grafica.
- Bootstrap per il layout responsive.
- JavaScript per la logica applicativa e le funzionalità dinamiche.
- Node.js per l'esecuzione del server locale.
- Express.js per la gestione del server web.
- Web App Manifest in formato JSON per la configurazione PWA.
- Service Worker in JavaScript per le funzionalità Progressive Web App.
- `localStorage` per il salvataggio lato client dei dati dei video.
    
## Requisiti

Prima di installare il progetto, assicurati di avere:

- [Node.js](https://nodejs.org/) installato sul computer.
- `npm` disponibile, normalmente incluso con Node.js.
- Un browser moderno compatibile con PWA, come Chrome o Edge.


## Installazione

1. Clona il repository:

```bash
git clone https://github.com/alecsus1/PWAmusic.git
```

2. Entra nella cartella del progetto:

```bash
cd PWAmusic
```

3. Installa le dipendenze:

```bash
npm install
```

## Avvio del progetto

Per avviare il server locale esegui:

```bash
node server.js
```

In alternativa, se nel file `package.json` è presente uno script dedicato, puoi usare:

```bash
npm start
```

Dopo l'avvio, apri il browser all'indirizzo mostrato dal server locale, di solito qualcosa come:

```text
http://localhost:3000
```

## Installazione come PWA

Una volta aperta l'app nel browser:

1. Attendi il caricamento completo della pagina.
2. Usa l'opzione di installazione del browser.
3. Installa l'app sul dispositivo.
4. Avvia l'app dall'icona creata sul desktop o nel menu applicazioni.[page:1]

## Struttura del progetto

```text
PWAmusic/
├── public/
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

Questa struttura mostra che il progetto utilizza un server Node.js con file principale `server.js` e una cartella `public` per le risorse statiche dell'applicazione.[page:1]

## Note tecniche

- La riproduzione dei video richiede una connessione Internet, perché i contenuti vengono caricati in streaming da YouTube.[page:1]
- I dati della playlist vengono salvati nel `localStorage` del browser, quindi restano disponibili solo sul dispositivo e browser in cui sono stati memorizzati.[page:1]
- `localStorage` presenta limiti di capacità e salva i dati come stringhe, ma è stato scelto per semplicità e per gli obiettivi didattici del progetto.[page:1]


## Autore

Progetto sviluppato da [alecsus1](https://github.com/alecsus1).


