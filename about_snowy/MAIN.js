const bgMusic = [
    // "Miss You",
    // "Somebody That I Used To Know",
    // "Bodies",
    // "Radioactive",
    // // "Free Bird",
    // // "Ice Cream Song Lyrics",
    // "I Don't Care Anymore",
    // "Ripped Pants",
    // "Monster",
    // "Lonely Day", //System Of A Down - Lonely Day (Official HD Video)
    "1. Down Under",
    "3. Danger Zone"
];

const chosenMusic = bgMusic[Math.floor(Math.random() * bgMusic.length)];
const audio = new Audio(`../../misc/snow/music/main/${chosenMusic}.mp3`);

switch (chosenMusic)
{
    case "Down Under":

    default:
        console.log("test log 295");
        console.log(chosenMusic)
}

audio.loop = true;


const audioplayer = document.getElementById("audio-player");
const audioplayerbottom = document.getElementById("audio-player-bottom");
const canvas = document.getElementById("visualizer");
const canvasbottom = document.getElementById("visualizerbottom");
const ctx = canvas.getContext("2d");
const ctxbottom = canvasbottom.getContext("2d");
const audioContext = new AudioContext();
const audioSource = audioContext.createMediaElementSource(audio);
const analyser = audioContext.createAnalyser();
                
audioSource.connect(analyser);
analyser.connect(audioContext.destination);

analyser.fftSize = 64;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
    requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxbottom.clearRect(0, 0, canvasbottom.width, canvasbottom.height);
    // console.log(dataArray);
    dataArray.forEach((value, index) => {
        const barHeight = value / 2;
        const x = index * 15;
        ctx.fillStyle = "rgba(0, 255, 0, 0.6)";
        ctx.fillRect(x, canvas.height - barHeight, 10, barHeight);
        ctxbottom.fillStyle = "rgba(0, 255, 0, 0.6)";
        ctxbottom.fillRect(x, canvas.height - barHeight, 10, barHeight);
    });
}


function pageLoad() {
    if (localStorage.getItem("snowy bg") == undefined || localStorage.getItem("snowy bg") == null || localStorage.getItem("snowy bg") == "true") {
        console.log(localStorage.getItem("snowy bg"));
        localStorage.setItem("snowy bg", "false");
    }

    if (localStorage.getItem("snowy bg") == "false" || !audio.paused) {
        localStorage.setItem("snowy bg", "true");
        audio.play();
        draw();
    }
}

window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') { // Tab is active
        if (localStorage.getItem("snowy bg") == "false" || !audio.paused) {
            localStorage.setItem("snowy bg", "true");
            audio.play();
            draw();
        }
    } else { // Tab is not active
        audio.pause();
        localStorage.setItem("snowy bg", "false")
    }
});

switch (chosenMusic) {
    case "1. Down Under":

    case "3. Danger Zone":
        audio.volume = 0.1;
}

if (chosenMusic == "Miss You") {
    audio.volume = 0.1;
} else if (chosenMusic == "Somebody That I Used To Know") {
    audio.volume = 0.2;
} else if (chosenMusic == "Bodies") {
    audio.volume = 0.2;
} else if (chosenMusic == "Radioactive") {
    audio.volume = 0.2;
} else if (chosenMusic == "Free Bird") {
    audio.volume = 0.2;
} else if (chosenMusic == "Ice Cream Song Lyrics") {
    audio.volume = 0.2;
} else if (chosenMusic == "I Don't Care Anymore") {
    audio.volume = 0.2;
} else if (chosenMusic == "Ripped Pants") {
    audio.volume = 0.2;
} else if (chosenMusic == "Monster") {
    audio.volume = 0.2;
} else if (chosenMusic == "Lonely Day") {
    audio.volume = 0.2;
// } else {
// 	audio.volume = 0.5;
}

window.onload = pageLoad;