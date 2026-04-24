// Плавная прокрутка к меню
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Эффект смены прозрачности шапки при скролле
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 5%';
        navbar.style.borderBottom = '1px solid #333';
    } else {
        navbar.style.padding = '20px 5%';
        navbar.style.borderBottom = 'none';
    }
});

// Анимация появления карточек при скролле
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.menu-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = '0.6s ease-out';
    observer.observe(card);
});
const menuToggle = document.querySelector('#mobile-menu');
const navContainer = document.querySelector('.nav-container');

// Открытие/закрытие меню при тапе на "бургер"
menuToggle.addEventListener('click', () => {
    navContainer.classList.toggle('active');
    
    // Анимация бургера (превращение в крестик)
    menuToggle.classList.toggle('is-active');
});

// Закрытие меню при клике на любую ссылку (чтобы не перекрывало контент)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navContainer.classList.remove('active');
    });
});
window.addEventListener('scroll', () => {
    const widget = document.querySelector('.contact-widget');
    if (window.scrollY > 300) {
        widget.style.opacity = '1';
        widget.style.transform = 'translateY(0)';
    } else {
        widget.style.opacity = '0';
        widget.style.transform = 'translateY(20px)';
    }
});

// Добавьте это в начало CSS для плавности
// .contact-widget { transition: 0.5s; opacity: 0; transform: translateY(20px); }
function filterMenu(category) {
    // 1. Обновляем активную кнопку
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // 2. Фильтруем карточки
    const cards = document.querySelectorAll('.menu-card');
    
    cards.forEach(card => {
        card.style.opacity = '0'; // Плавное исчезновение
        
        setTimeout(() => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.display = 'none';
            }
        }, 300);
    });
}
// Функция тактильного отклика (для мобильных)
function vibrate() {
    if (navigator.vibrate) {
        navigator.vibrate(50); // Легкая вибрация 50мс
    }
}

// Добавляем обработчик на кнопки связи
document.querySelectorAll('.btn-call-styled, .icon, .btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        vibrate();
        
        // Можно добавить эффект "всплеска" или лог для аналитики
        console.log('Пользователь нажал кнопку действия');
    });
});
const modal = document.getElementById("food-modal");
const closeModal = document.querySelector(".close-modal");

// Используем делегирование: вешаем один клик на весь контейнер меню
document.getElementById('menu-container').addEventListener('click', (event) => {
    // Проверяем, что кликнули именно по карточке или её внутренностям
    const card = event.target.closest('.menu-card');
    
    if (card) {
        // Извлекаем данные
        const title = card.querySelector('h3').innerText;
        const desc = card.querySelector('p').innerText;
        const price = card.querySelector('.price').innerText;
        
        // Получаем путь к картинке правильно
        let imgSrc = card.querySelector('.card-img').style.backgroundImage;
        imgSrc = imgSrc.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

        // Заполняем модалку
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-desc').innerText = desc;
        document.getElementById('modal-price').innerText = price;
        document.getElementById('modal-img').src = imgSrc;

        // Показываем
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
});

// Закрытие
closeModal.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
};
