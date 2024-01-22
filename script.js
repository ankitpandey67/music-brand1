console.log("Welcome to music brand");

let songIndex = 0;
let audioElement = new Audio();
let masterplay = document.getElementById("masterplay");
let myprogressBar = document.getElementById("myprogressBar");
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let isPlaying = false;

let songs = [
    { songname: "famous", filePath: "songs/Arjun Kanungo - Famous.mp3", coverPath: "cover/cover.jpg" },
    { songname: "rabba mehar kar", filePath: "songs/Darshan Raval - Rabba Mehar Kari.mp3", coverPath: "cover/cover1.jpg" },
    { songname: "dil nhi todna", filePath: "songs/Dil Nahin Todna (Sardar Ka Grandson)-(WapKing).mp3", coverPath: "cover/cover2.jpg" },
    { songname: "husnn hai suhaana", filePath: "songs/Husnn Hai Suhaana New - Coolie No 1.mp3", coverPath: "cover/cover3.jpg" },
    { songname: "lut gaye", filePath: "songs/Lut Gaye (Feat. Emraan Hashmi).mp3", coverPath: "cover/cover4.jpg" },
    { songname: "main jis din bhulaa", filePath: "songs/Main Jis Din Bhulaa Du.mp3", coverPath: "cover/cover5.jpg" },
    { songname: "yakken", filePath: "songs/Shaan - Yakeen.mp3", coverPath: "cover/cover6.jpg" },
    { songname: "titliya", filePath: "songs/Titliyaan - Afsana Khan Ft Hardy Sandhu 320 Kbps.mp3", coverPath: "cover/cover7.jpg" },
    { songname: "ydj mahe", filePath: "songs/VDJ Mahe - Dhvani Bhanushali Mashup (feat. Dj Dalal London).mp3", coverPath: "cover/cover8.jpg" },
    { songname: "top tucker", filePath: "songs/Yuvan Shankar Raja - Top Tucker.mp3", coverPath: "cover/cover9.jpg" },

];

// Add event listener to small play icons
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;

    // Add event listener to small play icons
    const playIcon = element.querySelector('.songItemplay');
    playIcon.addEventListener('click', () => {
        if (i === songIndex) {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                playSelectedSong();
            } else {
                audioElement.pause();
            }
            isPlaying = !audioElement.paused;
        } else {
            songIndex = i;
            playSelectedSong();
            isPlaying = true;
        }

        updatePlayPauseIcons();
    });
});

// Audio play/pause logic
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSelectedSong();
    } else {
        audioElement.pause();
    }
    isPlaying = !audioElement.paused;

    updatePlayPauseIcons();
});

// Update play/pause icons
function updatePlayPauseIcons() {
    const playIconClass = isPlaying ? 'fa-pause' : 'fa-play';

    // Update master play/pause icon
    masterplay.classList.remove('fa-play', 'fa-pause');
    masterplay.classList.add(playIconClass);

    // Update small play/pause icons
    songItems.forEach((element, i) => {
        const playIcon = element.querySelector('.songItemplay');
        playIcon.classList.remove('fa-play', 'fa-pause');
        playIcon.classList.add(i === songIndex && isPlaying ? 'fa-pause' : 'fa-play');
    });
}

// Listen to the 'timeupdate' event on the audio element
audioElement.addEventListener('timeupdate', () => {
    // Calculate the progress as a percentage of the total duration
    const progress = (audioElement.currentTime / audioElement.duration) * 100;

    // Update the value of the progress bar
    myprogressBar.value = progress;
});

// Listen to the 'input' event on the progress bar
myprogressBar.addEventListener('input', () => {
    // Calculate the new time based on the progress bar value
    const newTime = (myprogressBar.value / 100) * audioElement.duration;

    // Set the current time of the audio element to the new time
    audioElement.currentTime = newTime;
});

// Previous button logic
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSelectedSong();
});

// Next button logic
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSelectedSong();
});

// Play selected song
function playSelectedSong() {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;

    updatePlayPauseIcons();
}

// Initial load
playSelectedSong();
