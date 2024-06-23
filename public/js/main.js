document.getElementById('add-song').addEventListener('click', () => {
    const url = document.getElementById('youtube-url').value;
    if (url) {
      const videoId = url.split('v=')[1];
      const thumbUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`; // Medium quality thumbnail
      const title = 'YouTube Song'; // In a real application, you would fetch the title dynamically
      const song = { url, videoId, thumbUrl, title };
      saveSong(song);
      displaySongs();
      document.getElementById('youtube-url').value = '';
    }
  });
  
  function saveSong(song) {
    let songs = JSON.parse(localStorage.getItem('songs')) || [];
    songs.push(song);
    localStorage.setItem('songs', JSON.stringify(songs));
  }
  
  function deleteSong(videoId) {
    let songs = JSON.parse(localStorage.getItem('songs')) || [];
    songs = songs.filter(song => song.videoId !== videoId);
    localStorage.setItem('songs', JSON.stringify(songs));
    displaySongs();
  }
  
  function displaySongs() {
    const songList = document.getElementById('song-list');
    songList.innerHTML = '';
    const songs = JSON.parse(localStorage.getItem('songs')) || [];
    const row = document.createElement('div');
    row.className = 'row';
    songList.appendChild(row);
  
    songs.forEach(song => {
      const songItem = document.createElement('div');
      songItem.className = 'card mb-2 col-lg-3 col-md-4 col-sm-6';
      songItem.innerHTML = `
        <img src="${song.thumbUrl}" class="card-img-top thumbnail" alt="${song.title}">
        <div class="card-body">
          <h5 class="card-title">${song.title}</h5>
          <button class="btn btn-primary play-song" id="play" data-url="${song.url}">Play</button>
          <button class="btn btn-danger delete-song" data-videoid="${song.videoId}">Delete</button>
        </div>
      `;
      row.appendChild(songItem);
    });
  
    document.querySelectorAll('.play-song').forEach(button => {
      button.addEventListener('click', (e) => {
        const url = e.target.getAttribute('data-url');
        const videoId = url.split('v=')[1];
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        const playerContainer = document.createElement('div');
        playerContainer.className = 'col-12';
        playerContainer.innerHTML = `
          <div class="cont">
          <iframe width="560" height="315" src="${embedUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          <button class="btn btn-danger mt-2 stop-song btnPlay">Stop</button>
          </div>
        `;
        songList.innerHTML = '';
        songList.appendChild(playerContainer);
  
        document.querySelector('.stop-song').addEventListener('click', () => {
          displaySongs();
        });
      });
    });
  
    
    document.querySelectorAll('.delete-song').forEach(button => {
      button.addEventListener('click', (e) => {
        const videoId = e.target.getAttribute('data-videoid');
        deleteSong(videoId);
      });
    });
  }

  
  displaySongs();
  

  