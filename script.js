document.addEventListener('DOMContentLoaded', function () {
    const languageButton = document.querySelector('.frame-3');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    const body = document.body;
    const languageFlag = document.querySelector('.language-flag');
    const languageText = document.querySelector('.text-wrapper-2');

    // Функция для переключения языка
    function switchLanguage(language) {
        // Устанавливаем язык в body
        body.classList.remove('lang-en', 'lang-ru');
        body.classList.add(`lang-${language}`);

        // Обновляем флаг и текст кнопки
        if (language === 'ru') {
            languageFlag.style.backgroundImage = 'url("img/rus.svg")';
            languageText.textContent = 'Рус';
        } else {
            languageFlag.style.backgroundImage = 'url("img/eng.svg")';
            languageText.textContent = 'English';
        }

        // Скрываем/показываем элементы в зависимости от языка, кроме кнопок выбора языка
        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(element => {
            // Не скрываем кнопки выбора языка в дропдауне
            if (element.classList.contains('language-option')) {
                element.style.display = 'block';
            } else {
                if (element.getAttribute('data-lang') === language) {
                    element.style.display = 'block'; // Показываем элементы для выбранного языка
                } else {
                    element.style.display = 'none'; // Скрываем элементы для другого языка
                }
            }
        });

        // Закрываем меню
        languageDropdown.classList.remove('active');
    }

    // Открыть/закрыть меню при клике на кнопку в хедере
    languageButton.addEventListener('click', function() {
        // Переключаем класс active для показа/скрытия дропдауна
        languageDropdown.classList.toggle('active');
    });

    // Переключение языка при выборе из меню
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = option.getAttribute('data-lang');
            switchLanguage(selectedLang);
        });
    });

    // Инициализация языка по умолчанию (например, русский)
    switchLanguage('ru');
});
