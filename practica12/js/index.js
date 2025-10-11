// ===== LÓGICA DEL TEMA AL INICIO DE TODO =====
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

// Función para cambiar el tema
function toggleTheme() {
    body.classList.toggle('light-theme');
    // Guardar la preferencia en localStorage
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
}

// Cargar el tema guardado al iniciar la página
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
}

// --- ELEMENTOS DEL DOM ---
const playlistSongsContainer = document.getElementById("playlist-songs");
const audioPlayer = document.getElementById("audio-player");
const nowPlayingCover = document.getElementById("now-playing-cover");
const nowPlayingTitle = document.getElementById("now-playing-title");
const nowPlayingArtist = document.getElementById("now-playing-artist");
const prevBtn = document.getElementById("prev-btn");
const mainPlayPauseBtn = document.getElementById("main-play-pause-btn");
const nextBtn = document.getElementById("next-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");
const nowPlayingModal = document.getElementById("now-playing-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalCover = document.getElementById("modal-cover");
const modalTitle = document.getElementById("modal-title");
const modalArtist = document.getElementById("modal-artist");
const volumeSlider = document.getElementById("volume-slider");

// --- DATOS Y ESTADO ---
const originalSongs = [
    { cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSENux-hE-e3oGgcqstd5R4s7M-s2nQd2xI5Q&s", title: "Without A Warning", artist: "The Weeknd", album: "Hurry Up Tomorrow", audioSrc: "audio/without-a-warning.mp3" },
    { cover: "https://i1.sndcdn.com/artworks-fGoGjYsC8ETS-0-t500x500.jpg", title: "Petrichor", artist: "Klangkarussell", album: "Petrichor - Single", audioSrc: "audio/petrichor.mp3" },
    { cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0llmF3haKj08CC9NXNT5b7aoERPHoFpRBEw&s", title: "I Hope You Change Your Mind", artist: "The Chainsmokers", album: "So Far So Good", audioSrc: "audio/i-hope-you-change-your-mind.mp3" },
    { cover: "https://images.genius.com/9d01c078e5da7555ca2a5ce1dfa24118.1000x1000x1.jpg", title: "We Still Don't Trust You", artist: "Future, Metro Boomin & The Weeknd", album: "WE STILL DON'T TRUST YOU", audioSrc: "audio/we-still-dont-trust-you.mp3" },
    { cover: "https://i.scdn.co/image/ab67616d0000b2736b8a4828e057b7dc1c4a4d39", title: "places to be", artist: "Fred again.. ", album: "places to be - Single", audioSrc: "audio/places-to-be.mp3" }
];
let songs = [...originalSongs];
let currentSongIndex = null;
let isPlaying = false;
let isShuffleActive = false;
let menuCloseTimer;

// --- ICONOS SVG ---
const playIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5.13965V18.8604L18.3333 12L8 5.13965Z" fill="currentColor"/></svg>`;
const pauseIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 19V5H6V19H8ZM18 5V19H16V5H18Z" fill="currentColor"/></svg>`;

// --- FUNCIONES DE REPRODUCCIÓN ---

function playSong(index) {
    if (index < 0 || index >= songs.length) return;
    if (index === currentSongIndex && isPlaying) {
        togglePlayPause();
        return;
    }
    if (index === currentSongIndex && !isPlaying) {
        togglePlayPause();
        return;
    }

    currentSongIndex = index;
    const song = songs[index];
    audioPlayer.src = song.audioSrc;
    audioPlayer.play().catch(error => console.error("Error al reproducir:", error));
    isPlaying = true;
    updateUI();
}

function togglePlayPause() {
    if (currentSongIndex === null) {
        playSong(0);
        return;
    }
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
    updateUI();
}

function playNextSong() {
    if (currentSongIndex === null) return;
    let nextIndex = currentSongIndex + 1;
    if (nextIndex >= songs.length) nextIndex = 0;
    playSong(nextIndex);
}

function playPreviousSong() {
    if (currentSongIndex === null) return;
    if (audioPlayer.currentTime > 3) {
        audioPlayer.currentTime = 0;
    } else {
        let prevIndex = currentSongIndex - 1;
        if (prevIndex < 0) prevIndex = songs.length - 1;
        playSong(prevIndex);
    }
}

function toggleShuffle() {
    isShuffleActive = !isShuffleActive;
    shuffleBtn.classList.toggle('active', isShuffleActive);
    
    const currentSongObject = songs[currentSongIndex];

    if (isShuffleActive) {
        shuffleSongs();
    } else {
        songs = [...originalSongs];
        currentSongIndex = songs.findIndex(song => song.audioSrc === currentSongObject?.audioSrc);
    }
    renderPlaylist();
}

function shuffleSongs() {
    const currentSongObject = songs[currentSongIndex];
    let remainingSongs = originalSongs.filter(song => song.audioSrc !== currentSongObject?.audioSrc);

    for (let i = remainingSongs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingSongs[i], remainingSongs[j]] = [remainingSongs[j], remainingSongs[i]];
    }
    
    songs = currentSongObject ? [currentSongObject, ...remainingSongs] : remainingSongs;
    currentSongIndex = 0;
}

function setVolume() {
    audioPlayer.volume = volumeSlider.value;
}

// --- FUNCIONES DE UI Y AUXILIARES ---

function updateUI() {
    if (currentSongIndex !== null) {
        const song = songs[currentSongIndex];
        nowPlayingCover.src = song.cover;
        nowPlayingTitle.textContent = song.title;
        nowPlayingArtist.textContent = song.artist;
        mainPlayPauseBtn.innerHTML = isPlaying ? pauseIcon : playIcon;
        modalCover.src = song.cover;
        modalTitle.textContent = song.title;
        modalArtist.textContent = song.artist;
    } else {
        mainPlayPauseBtn.innerHTML = playIcon;
    }
    renderPlaylist();
}

function renderPlaylist() {
    playlistSongsContainer.innerHTML = "";
    songs.forEach((song, index) => {
        const isThisSongPlaying = (index === currentSongIndex && isPlaying);
        playlistSongsContainer.innerHTML += `
            <div class="row song-row g-0 ${index === currentSongIndex ? 'playing' : ''}" id="song-${index}" onmouseleave="hideMenuWithDelay(${index})">
                <div class="col-1 text-center d-flex align-items-center justify-content-center position-relative">
                    <span class="song-index">${index + 1}</span>
                    <button class="btn-play" onclick="playSong(${index})">${isThisSongPlaying ? '❚❚' : '▶'}</button>
                </div>
                <div class="col-4 d-flex align-items: center">
                    <img src="${song.cover}" alt="${song.album} Cover" class="song-cover">
                    <div class="song-title-artist"><span class="song-title">${song.title}</span></div>
                </div>
                <div class="col-3 d-flex align-items-center song-artist">${song.artist}</div>
                <div class="col-3 d-flex align-items: center song-album">${song.album}</div>
                <div class="col-1 text-center d-flex align-items-center justify-content-center">
                    <div class="action-container">
                        <button class="btn-context" onclick="toggleContextMenu(event, ${index})">&hellip;</button>
                        <div class="context-menu" id="menu-${index}" onmouseenter="cancelHideMenu()">
                            <button class="context-menu-btn" onclick="removeSong(${index})">Eliminar de la playlist</button>
                        </div>
                    </div>
                </div>
            </div>`;
    });
}

function removeSong(songIndex) {
    closeAllContextMenus();
    if (confirm(`¿Seguro que quieres eliminar "${songs[songIndex].title}" de tu playlist?`)) {
        const songToRemove = songs[songIndex];
        const originalIndex = originalSongs.findIndex(s => s.audioSrc === songToRemove.audioSrc);
        if (originalIndex > -1) {
            originalSongs.splice(originalIndex, 1);
        }

        if (songIndex === currentSongIndex) {
            audioPlayer.pause();
            audioPlayer.src = "";
            currentSongIndex = null;
            isPlaying = false;
            nowPlayingTitle.textContent = "Elige una canción";
            nowPlayingArtist.textContent = "";
            nowPlayingCover.src = "https://via.placeholder.com/64x64.png?text=♪";
        }
        
        songs = [...originalSongs];
        if(isShuffleActive) shuffleSongs();
        
        if (songIndex < currentSongIndex) {
            currentSongIndex--;
        }

        updateUI();
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return isNaN(minutes) || isNaN(secs) ? "0:00" : `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgress() {
    const { duration, currentTime } = audioPlayer;
    if (duration) {
        progressBar.style.width = `${(currentTime / duration) * 100}%`;
        totalDurationEl.textContent = formatTime(duration);
        currentTimeEl.textContent = formatTime(currentTime);
    }
}

function setProgress(e) {
    const duration = audioPlayer.duration;
    if (duration) {
        audioPlayer.currentTime = (e.offsetX / this.clientWidth) * duration;
    }
}

function toggleContextMenu(event, index) {
    event.stopPropagation();
    const menu = document.getElementById(`menu-${index}`);
    const isActive = menu.classList.contains('active');
    closeAllContextMenus();
    if (!isActive) {
        menu.classList.add('active');
    }
}

function closeAllContextMenus() {
    document.querySelectorAll('.context-menu').forEach(menu => {
        menu.classList.remove('active');
    });
}

function hideMenuWithDelay(index) {
    menuCloseTimer = setTimeout(() => {
        const menu = document.getElementById(`menu-${index}`);
        if (menu) {
            menu.classList.remove('active');
        }
    }, 500);
}

function cancelHideMenu() {
    clearTimeout(menuCloseTimer);
}

function openNowPlayingModal() {
    if (currentSongIndex !== null) nowPlayingModal.classList.add('active');
}

function closeNowPlayingModal() {
    nowPlayingModal.classList.remove('active');
}

// --- EVENT LISTENERS ---
themeSwitcher.addEventListener('click', toggleTheme);
mainPlayPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPreviousSong);
shuffleBtn.addEventListener('click', toggleShuffle);
volumeSlider.addEventListener('input', setVolume);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', playNextSong);
progressContainer.addEventListener('click', setProgress);
nowPlayingCover.addEventListener('click', openNowPlayingModal);
modalCloseBtn.addEventListener('click', closeNowPlayingModal);
window.addEventListener('click', closeAllContextMenus);

// --- INICIALIZACIÓN ---
renderPlaylist();
mainPlayPauseBtn.innerHTML = playIcon;