const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Songs title
const songs = ['hey', 'summer', 'ukulele'];

// Song index 
let songIndex = 1;

// Initially loading data to the DOM
loadSong(songs[songIndex]);








// Functions
// 1. Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// 2. Pause the playing song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

// 3. Playing the paused song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// 4. Play the previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    
    loadSong(songs[songIndex]);
    playSong();
}

// 5. Playing the next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    
    loadSong(songs[songIndex]);
    playSong();
}

// 6. For  Updating progress bar with song playing
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// 7. For  Updating progress bar by click
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}


// Event Listeners
// 1. Play button
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
})

// 2. For next song
nextBtn.addEventListener('click',  nextSong);

// 3. For prev song
prevBtn.addEventListener('click', prevSong);

// 4. For progress bar update
audio.addEventListener('timeupdate',  updateProgress);

// 5. For progress container
progressContainer.addEventListener('click', setProgress);

// 6. For when audio ends
audio.addEventListener('ended', nextSong);