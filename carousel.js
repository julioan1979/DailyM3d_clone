// Carrossel simples para DailyMed
let currentIndex = 0;
const track = document.querySelector('.carousel-track');
const images = track ? Array.from(track.children) : [];
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const carousel = document.querySelector('.carousel');

let autoplayTimer = null;
let touchResumeTimeout = null;
const AUTOPLAY_INTERVAL_MS = 4500;
const TOUCH_RESUME_DELAY_MS = 200;

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

function stopAutoplay() {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    }
}

function startAutoplay() {
    if (!images.length || !track || document.hidden) return;

    stopAutoplay();
    autoplayTimer = setInterval(showNext, AUTOPLAY_INTERVAL_MS);
}

if (nextBtn && prevBtn && images.length) {
    nextBtn.addEventListener('click', () => {
        showNext();
        startAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        showPrev();
        startAutoplay();
    });

    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        carousel.addEventListener('touchstart', () => {
            if (touchResumeTimeout) {
                clearTimeout(touchResumeTimeout);
                touchResumeTimeout = null;
            }
            stopAutoplay();
        }, { passive: true });

        carousel.addEventListener('touchend', () => {
            if (touchResumeTimeout) {
                clearTimeout(touchResumeTimeout);
            }
            touchResumeTimeout = setTimeout(() => {
                startAutoplay();
                touchResumeTimeout = null;
            }, TOUCH_RESUME_DELAY_MS);
        }, { passive: true });
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
            return;
        }
        startAutoplay();
    });

    showImage(currentIndex);
    startAutoplay();
}
