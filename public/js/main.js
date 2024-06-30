// Aggiunge un ascoltatore di eventi al pulsante con ID 'add-song'
document.getElementById('add-song').addEventListener('click', () => {
  // Ottiene il valore dell'input con ID 'youtube-url'
  let url = document.getElementById('youtube-url').value;
  
  if (url) {
    // Estrae l'ID del video di YouTube dall'URL
    let videoId = url.split('v=')[1];
    // estrae il singolo video dagli URL delle compilation
    if (videoId.length > 11) {
      videoId = videoId.substring(0,11);
      url = "https://www.youtube.com/watch?v="+videoId;
    }
    // Costruisce l'URL della miniatura di YouTube di qualità media
    const thumbUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    // Assegna un titolo fisso al video (in una vera applicazione, il titolo dovrebbe essere estratto dinamicamente)
    const title = document.getElementById('youtube-title').value;
    // Crea un oggetto canzone con le informazioni raccolte
    const song = { url, videoId, thumbUrl, title };
    // Salva la canzone nel localStorage
    saveSong(song);
    // Visualizza la lista aggiornata delle canzoni
    displaySongs();
    // Svuota il campo dell'input
    document.getElementById('youtube-url').value = '';
    document.getElementById('youtube-title').value = '';
  }
});

// Funzione per salvare una canzone nel localStorage
function saveSong(song) {
  // Recupera l'array di canzoni dal localStorage o crea un array vuoto se non esiste
  let songs = JSON.parse(localStorage.getItem('songs')) || [];
  // Aggiunge la nuova canzone all'array
  songs.push(song);
  // Salva l'array aggiornato nel localStorage
  localStorage.setItem('songs', JSON.stringify(songs));
}

// Funzione per eliminare una canzone dal localStorage
function deleteSong(videoId) {
  // Recupera l'array di canzoni dal localStorage o crea un array vuoto se non esiste
  let songs = JSON.parse(localStorage.getItem('songs'));
  // Filtra l'array rimuovendo la canzone con l'ID specificato
  songs = songs.filter(song => song.videoId !== videoId);
  // Salva l'array aggiornato nel localStorage
  localStorage.setItem('songs', JSON.stringify(songs));
  // Visualizza la lista aggiornata delle canzoni
  displaySongs();
}

// Funzione per visualizzare la lista delle canzoni
function displaySongs() {
  // Ottiene il contenitore della lista delle canzoni con ID 'song-list'
  const songList = document.getElementById('song-list');
  // Svuota il contenuto del contenitore
  songList.innerHTML = '';
  // Recupera l'array di canzoni dal localStorage o crea un array vuoto se non esiste
  const songs = JSON.parse(localStorage.getItem('songs')) || [];
  // Crea un contenitore per le righe di canzoni
  const row = document.createElement('div');
  row.className = 'row';
  // Aggiunge la riga al contenitore della lista delle canzoni
  songList.appendChild(row);

  // Per ogni canzone nell'array
  songs.forEach(song => {
    // Crea un elemento div per la canzone con classi di Bootstrap per il layout
    const songItem = document.createElement('div');
    songItem.className = 'card mb-2 col-lg-3 col-md-4 col-sm-6';
    // Imposta il contenuto HTML del div della canzone
    songItem.innerHTML = `
      <img src="${song.thumbUrl}" class="card-img-top thumbnail" alt="${song.title}">
      <div class="card-body">
        <h5 class="card-title">${song.title}</h5>
        <button class="btn btn-primary play-song" id="play" data-url="${song.url}">Play</button>
        <button class="btn btn-danger delete-song" data-videoid="${song.videoId}">Delete</button>
      </div>
    `;
    // Aggiunge il div della canzone alla riga
    row.appendChild(songItem);
  });

  // Aggiunge ascoltatori di eventi a tutti i pulsanti di riproduzione
  document.querySelectorAll('.play-song').forEach(button => { //foreach è un metodo che itera su ogni elemento della NodeList selezionata
    button.addEventListener('click', (e) => { //funzione di callback che viene eseguita quando viene rilevato evento di click
     
      // Ottiene l'URL del video dal pulsante cliccato
      const url = e.target.getAttribute('data-url');
      // Estrae l'ID del video dall'URL
      const videoId = url.split('v=')[1];
      // Costruisce l'URL di embed di YouTube con autoplay
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      // Crea un contenitore per il player del video
      const playerContainer = document.createElement('div');
      playerContainer.className = 'col-12';
      // Imposta il contenuto HTML del contenitore del player
      playerContainer.innerHTML = `
        <div class="cont">
          <iframe width="560" height="315" src="${embedUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          <button class="btn btn-danger mt-2 stop-song btnPlay">Stop</button>
        </div>
      `;
      // Svuota il contenitore della lista delle canzoni e aggiunge il player del video
      songList.innerHTML = '';
      songList.appendChild(playerContainer);
      
       
      // Aggiunge un ascoltatore di eventi al pulsante di stop del player
      document.querySelector('.stop-song').addEventListener('click', () => {
        // Quando il pulsante di stop viene cliccato, visualizza di nuovo la lista delle canzoni
        displaySongs();
      });
    });
  });

  // Aggiunge ascoltatori di eventi a tutti i pulsanti di eliminazione
  document.querySelectorAll('.delete-song').forEach(button => {
    button.addEventListener('click', (e) => {
      // Ottiene l'ID del video dal pulsante cliccato
      const videoId = e.target.getAttribute('data-videoid');
      // Elimina la canzone con l'ID specificato
      deleteSong(videoId);
    });
  });
}


// Visualizza la lista delle canzoni al caricamento della pagina
displaySongs();
