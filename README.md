# Progetto di una progressive web app nel corso di Laboratorio di Applicazioni Web
## Requisiti funzionali
Si vuole realizzare una Progressive Web App (Music PWA), con funzionalità di base, costituita da una singola pagina Web, che consente di memorizzare video della piattaforma Youtube, incollando il link del video e il titolo all’interno di due campi input, creando, in questo modo, una sorta di “playlist” personale. Ogni video è salvato sulla pagina e visualizzato all’interno di una playlist di video. 
Inoltre:
- Ogni video può essere riprodotto premendo un apposito tasto “play” che avvia la visualizzazione originale di Youtube, sempre però all’interno della pagina. 
- Il video può essere interrotto tramite un apposito tasto “stop” che consente di tornare alla visualizzazione della galleria di video, inoltre possono essere utilizzate tutte le funzionalità originali di Youtube (pausa, stop, volume, schermo intero, etc.). 
- La riproduzione del video funziona solo in caso di collegamento con la rete internet, poiché il video viene riprodotto direttamente in streaming sulla piattaforma Youtube.
- La funzionalità di riproduzione consecutiva non è implementata, quindi ogni video deve essere riprodotto singolarmente.
- Su ogni video è anche presente un tasto ‘delete’ che consente di eliminarlo dalla galleria.
- Dalla pagina web, è possibile scaricare l’applicazione sul proprio dispositivo. Questo consente di avere una propria playlist di video, sempre disponibile, alla quale è possibile accedere utilizzando una specifica icona dell’applicazione.
- L’aggiunta o l’eliminazione di video dalla pagina web, causa l’aggiornamento della galleria anche sull’applicazione e viceversa. 

## Requisiti tecnici
L’applicazione deve rispettare i seguenti requisiti tecnici:
- Il layout è realizzato, utilizzando HTML, CSS3 e le classi del framework Bootstrap.
- Per implementare le varie funzionalità dell’applicazione e le parti dinamiche del layout si utilizza JavaScript.
- L’applicazione viene eseguita su un server locale realizzato utilizzando Node.js insieme al framework Express.js.
- Il file “manifest”, necessario al funzionamento della PWA in locale deve essere in formato JSON.
- Il file “service worker” necessario alla trasformazione di una semplice pagina web in PWA, è sviluppato usando JavaScript.
- Anche se la PWA è pensata come applicazione desktop, il suo layout è comunque “responsive”.
- Devono essere generate 3 icone: 2 icone per android-chrome formato 192x192 e 512x512 e 1 apple-touch-icon formato 180x180. (ad es. tramite la risorsa “favicon.io”)
- Per la memorizzazione delle informazioni riguardanti il video (link miniature dei video Youtube, titolo, url e id del video), si utilizza l' API Web Storage, in particolare window.localStorage , realizzando in questo modo una memorizzazione solo lato client. I dati verranno archiviati in formato JSON sul localStorage del browser del proprio dispositivo. L’utilizzo di localStorage rappresenta però una limitazione, poiché:
  - Archiviazione dati limitata: localStorage è limitata a 5 MB di dati per origine.
  - Memorizza solo stringhe: localStorage memorizza i dati come coppie chiave stringa e valore stringa. 
  - Nonostante questi limiti, per gli obiettivi didattici dell'applicazione e considerando le limitate prestazioni richieste, si è comunque scelto di utilizzare questa modalità di archiviazione dei dati.



