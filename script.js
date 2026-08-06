const gallery = document.getElementById("gallery");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");
const downloadBtn = document.getElementById("downloadBtn");

const totalImages = 90;

let currentImage = 1;

// Zoom Variables
let scale = 1;
let startDistance = 0;

// =========================
// Load Gallery Images
// =========================

for (let i = 1; i <= totalImages; i++) {

    const img = document.createElement("img");

    img.src = `images/${i}.JPG`;

    img.loading = "lazy";
    img.decoding = "async";

    img.onclick = function () {
        openImage(i);
    };

    gallery.appendChild(img);
}

// =========================
// Open Image
// =========================

function openImage(index){

    currentImage = index;

    popup.style.display = "flex";

    popupImg.src = `images/${currentImage}.JPG`;

    downloadBtn.href = `images/${currentImage}.JPG`;

    // Reset Zoom
    scale = 1;
    popupImg.style.transform = "scale(1)";
}

// =========================
// Close
// =========================

function closeImage(){

    popup.style.display="none";

}

// =========================
// Next
// =========================

function nextImage(){

    currentImage++;

    if(currentImage>totalImages){

        currentImage=1;

    }

    popupImg.classList.remove("slide-right");
    popupImg.classList.add("slide-left");

    popupImg.src=`images/${currentImage}.JPG`;

    popupImg.onload=function(){

        popupImg.classList.remove("slide-left");

    };

    downloadBtn.href=`images/${currentImage}.JPG`;

    scale=1;

    popupImg.style.transform="scale(1)";
}

// =========================
// Previous
// =========================

function prevImage(){

    currentImage--;

    if(currentImage<1){

        currentImage=totalImages;

    }

    popupImg.classList.remove("slide-left");
    popupImg.classList.add("slide-right");

    popupImg.src=`images/${currentImage}.JPG`;

    popupImg.onload=function(){

        popupImg.classList.remove("slide-right");

    };

    downloadBtn.href=`images/${currentImage}.JPG`;

    scale=1;

    popupImg.style.transform="scale(1)";
}

// =========================
// Keyboard
// =========================

document.addEventListener("keydown",function(event){

    if(popup.style.display!=="flex") return;

    switch(event.key){

        case "ArrowRight":
            nextImage();
            break;

        case "ArrowLeft":
            prevImage();
            break;

        case "Escape":
            closeImage();
            break;

    }

});

// =========================
// Swipe
// =========================

let touchStartX=0;
let touchEndX=0;

popup.addEventListener("touchstart",function(e){

    if(e.touches.length===1){

        touchStartX=e.changedTouches[0].screenX;

    }

});

popup.addEventListener("touchend",function(e){

    if(e.changedTouches.length===1){

        touchEndX=e.changedTouches[0].screenX;

        if(touchStartX-touchEndX>50){

            nextImage();

        }

        if(touchEndX-touchStartX>50){

            prevImage();

        }

    }

});

// =========================
// Music
// =========================

const music=document.getElementById("bgMusic");
const musicBtn=document.getElementById("musicBtn");

function toggleMusic(){

    if(music.paused){

        music.play();

        musicBtn.innerHTML="🔇 Music OFF";

    }else{

        music.pause();

        musicBtn.innerHTML="🔊 Music ON";

    }

}

// =========================
// Gold Glitter
// =========================

const goldContainer=document.getElementById("goldParticles");

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

// =========================
// Pinch Zoom
// =========================

function getDistance(touches){

    const dx=touches[0].clientX-touches[1].clientX;

    const dy=touches[0].clientY-touches[1].clientY;

    return Math.sqrt(dx*dx+dy*dy);

}

popupImg.addEventListener("touchstart",function(e){

    if(e.touches.length===2){

        startDistance=getDistance(e.touches);

    }

},{passive:false});

popupImg.addEventListener("touchmove",function(e){

    if(e.touches.length===2){

        e.preventDefault();

        const newDistance=getDistance(e.touches);

        scale*=newDistance/startDistance;

        scale=Math.max(1,Math.min(scale,4));

        popupImg.style.transform=`scale(${scale})`;

        startDistance=newDistance;

    }

},{passive:false});

popupImg.addEventListener("touchend",function(){

    if(scale<1){

        scale=1;

        popupImg.style.transform="scale(1)";

    }

});