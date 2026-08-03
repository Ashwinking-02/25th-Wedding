const gallery = document.getElementById("gallery");
const totalImages = 22; // Change to 332 later if needed

let currentImage = 1;

// Load Images
for (let i = 1; i <= totalImages; i++) {

    const img = document.createElement("img");

    img.src = `images/${i}.jpg`;

    img.onclick = function () {
        openImage(i);
    };

    gallery.appendChild(img);
}

function openImage(index) {

    currentImage = index;

    document.getElementById("popup").style.display = "flex";

    document.getElementById("popupImg").src = `images/${currentImage}.jpg`;
}

function closeImage() {

    document.getElementById("popup").style.display = "none";
}

function nextImage() {

    currentImage++;

    if (currentImage > totalImages) {
        currentImage = 1;
    }

    document.getElementById("popupImg").src = `images/${currentImage}.jpg`;
}

function prevImage() {

    currentImage--;

    if (currentImage < 1) {
        currentImage = totalImages;
    }

    document.getElementById("popupImg").src = `images/${currentImage}.jpg`;
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
            document.getElementById("popupImg").src = `images/${currentImage}.jpg`;
            break;

        case "End":
            currentImage = totalImages;
            document.getElementById("popupImg").src = `images/${currentImage}.jpg`;
            break;
    }

});