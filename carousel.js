// Carrossel simples para DailyMed
let currentIndex = 0;
const track = document.querySelector('.carousel-track');
const images = track ? Array.from(track.children) : [];
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

function showImage(index) {
    if (!images.length) return;
    images.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
    });
}

function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

if (nextBtn && prevBtn && images.length) {
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
    showImage(currentIndex);
}
