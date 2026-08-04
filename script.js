 const gallery = document.getElementById("gallery");
const totalImages = 88; // Change to 332 later if needed

let currentImage = 1;

// Load Images
for (let i = 1; i <= totalImages; i++) {

    const img = document.createElement("img");

    img.src = `images/${i}.JPG`;

    img.onclick = function () {
        openImage(i);
    };

    gallery.appendChild(img);
}

function openImage(index){

    currentImage = index;

    document.getElementById("popup").style.display = "flex";

    document.getElementById("popupImg").src =
        `images/${currentImage}.JPG`;

    document.getElementById("downloadBtn").href =
        `images/${currentImage}.JPG`;
}
function closeImage() {

    document.getElementById("popup").style.display = "none";
}

function nextImage() {

    currentImage++;

    if (currentImage > totalImages) {
        currentImage = 1;
    }

    const img = document.getElementById("popupImg");

    img.classList.remove("slide-right");
    img.classList.add("slide-left");

    img.src = `images/${currentImage}.JPG`;

    img.onload = () => {
        img.classList.remove("slide-left");
    };
    document.getElementById("downloadBtn").href= `images/${currentImage}.JPG`;
}
function prevImage() {

    currentImage--;

    if (currentImage < 1) {
        currentImage = totalImages;
    }

    const img = document.getElementById("popupImg");

    img.classList.remove("slide-left");
    img.classList.add("slide-right");

    img.src = `images/${currentImage}.JPG`;

    img.onload = () => {
        img.classList.remove("slide-right");
    };
    document.getElementById("downloadBtn").href=`images/${currentImage}.JPG`;
}

// Keyboard Controls
document.addEventListener("keydown", function (event) {

    // Only work when popup is open
    if (document.getElementById("popup").style.display !== "flex") return;

    switch (event.key) {

        case "ArrowRight":
            nextImage();
            break;

        case "ArrowLeft":
            prevImage();
            break;

        case "Escape":
            closeImage();
            break;

        case " ":
            event.preventDefault();
            nextImage();
            break;

        case "Home":
            currentImage = 1;
            document.getElementById("popupImg").src = `images/${currentImage}.JPG`;
            break;

        case "End":
            currentImage = totalImages;
            document.getElementById("popupImg").src = `images/${currentImage}.JPG`;
            break;
    }

});
// =========================
// Mobile Swipe Navigation
// =========================

let touchStartX = 0;
let touchEndX = 0;

const popup = document.getElementById("popup");

popup.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
});

popup.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;

    // Swipe Left → Next Photo
    if (touchStartX - touchEndX > 50) {
        nextImage();
    }

    // Swipe Right → Previous Photo
    if (touchEndX - touchStartX > 50) {
        prevImage();
    }
});
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

function toggleMusic(){

    if(music.paused){

        music.play();

        musicBtn.innerHTML="Music";

    }else{

        music.pause();

        musicBtn.innerHTML="🔊 Music ON";

    }

}
window.addEventListener("load", function () {

    setTimeout(function () {

        const loader = document.getElementById("loader");

        loader.style.opacity = "0";

        setTimeout(function () {

            loader.style.display = "none";

        },800);

    },3000);

});
// =========================
// Gold Glitter Animation
// =========================

const goldContainer = document.getElementById("goldParticles");

for(let i=0;i<80;i++){

    const particle=document.createElement("div");

    particle.className="gold";

    particle.style.left=Math.random()*100+"vw";

    particle.style.animationDuration=(5+Math.random()*8)+"s";

    particle.style.animationDelay=Math.random()*8+"s";

    particle.style.width=(4+Math.random()*8)+"px";

    particle.style.height=particle.style.width;

    goldContainer.appendChild(particle);

}