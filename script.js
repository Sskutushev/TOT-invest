document.addEventListener('DOMContentLoaded', function () {
    // Language Switcher Script
    const languageButton = document.querySelector('.frame-3');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    const body = document.body;
    const languageFlag = document.querySelector('.language-flag');
    const languageText = document.querySelector('.text-wrapper-2');

    // Switch language function
    function switchLanguage(language) {
        body.classList.remove('lang-en', 'lang-ru');
        body.classList.add(`lang-${language}`);

        if (language === 'ru') {
            languageFlag.style.backgroundImage = 'url("img/rus.svg")';
            languageText.textContent = 'Рус';
        } else {
            languageFlag.style.backgroundImage = 'url("img/eng.svg")';
            languageText.textContent = 'Eng';
        }

        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(element => {
            if (element.getAttribute('data-lang') === language) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
    }

    // Toggle language menu
    languageButton.addEventListener('click', function () {
        languageDropdown.classList.toggle('active');
    });

    // Language option selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function () {
            const selectedLang = option.getAttribute('data-lang');
            switchLanguage(selectedLang);
            languageDropdown.classList.remove('active');
        });
    });

    // Set default language (Russian)
    switchLanguage('ru');

    // Carousel Script
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const popup = document.getElementById('carouselPopup');
    const popupImg = popup.querySelector('.popup-image');
    const popupPrev = popup.querySelector('.popup-prev');
    const popupNext = popup.querySelector('.popup-next');
    const popupClose = popup.querySelector('.popup-close');

    let current = 0;
    let autoplay = setInterval(goNext, 3000);

    function update() {
        slides.forEach((s, i) => {
            s.classList.remove('prev', 'active', 'next');
            if (i === current) s.classList.add('active');
            else if (i === (current - 1 + slides.length) % slides.length) s.classList.add('prev');
            else if (i === (current + 1) % slides.length) s.classList.add('next');
        });
    }

    function goNext() {
        current = (current + 1) % slides.length;
        update();
    }

    function goPrev() {
        current = (current - 1 + slides.length) % slides.length;
        update();
    }

    // Next Button
    nextBtn.addEventListener('click', () => {
        clearInterval(autoplay);
        goNext();
        autoplay = setInterval(goNext, 3000);
    });

    // Previous Button
    prevBtn.addEventListener('click', () => {
        clearInterval(autoplay);
        goPrev();
        autoplay = setInterval(goNext, 3000);
    });

    // Popup
    slides.forEach((slide, i) => {
        slide.addEventListener('click', () => {
            popupImg.src = slide.querySelector('img').src;
            popup.classList.add('show');
            popupIndex = i;
        });
    });

    let popupIndex = 0;

    popupClose.addEventListener('click', () => popup.classList.remove('show'));
    popup.addEventListener('click', e => {
        if (e.target === popup) popup.classList.remove('show');
    });

    popupPrev.addEventListener('click', () => {
        popupIndex = (popupIndex - 1 + slides.length) % slides.length;
        popupImg.src = slides[popupIndex].querySelector('img').src;
    });

    popupNext.addEventListener('click', () => {
        popupIndex = (popupIndex + 1) % slides.length;
        popupImg.src = slides[popupIndex].querySelector('img').src;
    });

    // Initialize carousel
    update();
});
