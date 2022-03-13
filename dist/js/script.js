document.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader');

    const hideContent = function () {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    const showContent = function (i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    };

    hideContent();
    showContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {

            tabs.forEach((item, i) => {
                if (target == item) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });

    //Timer 

    const deadline = '2022-02-18',
        dayOfStart = deadline.slice(8, 10),
        numOfMonth = deadline.slice(5, 7),
        monthName = ["января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"];

    let month = 0;

    for (let i = 0; i <= monthName.length; i++) {
        if (i == numOfMonth) {
            month = monthName[i - 1];
        }
    }

    //Альтернативне присвоювання місяців 
    //const monthName = {
    //     [01]: 'January',
    //     [02]: 'February',
    //     [03]: 'March',
    //     [04]: 'April',
    //     [05]: 'May',
    //     [06]: 'June',
    //     [07]: 'July',
    //     [08]: 'August',
    //     [09]: 'September',
    //     [10]: 'October',
    //     [11]: 'November',
    //     [12]: 'December',
    //   };


    // for (let key in monthName){
    //     if(key == numOfMonth){
    //          month = monthName[key];
    //          console.log(month);
    //     }
    // }


    const dataOfPromoution = document.querySelector('#messageAboutPromotion');
    dataOfPromoution.textContent = `Акция закончится ${dayOfStart} ${month} в 00:00`;

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000 % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else if (num < 0) {
            return 0 + '0';
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); //Запобігає морганню таймера при пере

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    getTimeRemaining(deadline);
    setClock('.timer', deadline);


    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    function openModal (){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        //modal.classList.toggle('show'); - як альтернатива, за замовчуванням присвоъти .hidden, а перемикачем додавати .show
    }


    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });


    const closeModal = function(){

        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = ''; 
    };

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target === modal){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    //const setTimer = setTimeout(openModal, 10000);

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);




    //menu__item
 
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH (); //додаємо до об'єкту класа, якщо потрібно щоб спрацьовувала функція
        }

        changeToUAH (){
            this.price = this.price * this.transfer;
        }

        render (){
            const element = document.createElement('div');
                element.innerHTML = `
                <div class="menu__item">
                        <img data-image src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
            `;
            this.parent.append(element);
        }
    }

    // const div  new MenuCard(..., ..., ...,);
    // div.render(); - також правильний варіант


new MenuCard (
    "img/tabs/vegy.jpg",
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container'
).render();

new MenuCard (
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container'
).render();

new MenuCard (
    "img/tabs/post.jpg",
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
    '.menu .container'
).render();

});