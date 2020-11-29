let plug = {
    nameFirst: "Андрей",
    nameSecond: "Снигирёв",
    occupation: "UX/UI designer",
    responses: 7,
    views: 12,
    social: {
        youtube: "https://www.youtube.com/watch?v=2ZFCXV7w9NM",
        vk: "https://vk.com/durov",
        tg: "https://web.telegram.org/#/login"
    },
    phone: "8 (902) 839-1121",
    email: "andrei-1902va@mail.ru",
    place: "г. Пермь",
    age: "19 лет, 19 сентября 2001",

    expectedSalary: 35000,
    currency: [
        "0"
    ],
       /*
       currency hint: 
       0 - руб.
       1 - $
       2 - €
       3 - £
       4 - ￥
       */

    workExperience: "9",
    workExperiencePeriod: [
        "1"
    ],
   
    /*
       workExperiencePeriod hint: 
       0 - дней
       1 - месяцев
       2 - лет
       */


    workConditionals: [
        "0",
        "2"
    ],
       /*
       workConditionals hint: 
       0 - полная занятость
       1 - частичная занятость
       2 - удаленная работа
       3 - командировки
       4 - ненормированный рабочий день
       */

    jobs: [
        {
            profession: "Веб дизайнер",
            experience: "4 месяцев",
            company: "Фриланс",
            time: "Февраль 2020 - Май 2020"
        },
        {
            profession: "Product designer",
            experience: "5 месяцев",
            company: "LPMotor",
            time: "Июнь 2020 - Октябрь 2020"
        }        
    ],

    study: [
        {
            school: "Skillbox",
            experience: "3 месяцев",
            specialty: "Product designer",
            time: "Сентябрь 2020 - ..."
        },
        {
            school: "Contended",
            experience: "1 месяцев",
            specialty: "CX designer",
            time: "Октябрь 2020 - ..."
        },
        {
            school: "Курс Максима Солдаткина",
            experience: "3 месяцев",
            specialty: "UX/UI designer",
            time: ""
        }
    ],

    skills: [
        "Figma / XD", 
        "Principle",
        "HTML/CSS",
        "пакет Adobe",
        "Проектирование пользовательских интерфейсов",
        "Axure RP",
        "English - Intermediate",
        "UX Writing",
        "Ux аналитика"
    ],
        
    about: "Люблю дизайн и делать круто, по-другому не умеем.",

    portfolioLinks: [
        "https://www.behance.net/andrei-1901895",
        "https://www.behance.net/andrei-1901895",
        "https://www.behance.net/andrei-1901895",
        "https://www.behance.net/andrei-1901895",
        "https://www.behance.net/andrei-1901895"
    ],

    photosUrl: [
    ],

    viewsWeek: 8,
    invitesWeek: 4,
    placeSearch: 19876
};



const url = "https://picsum.photos/v2/list/?limit=8"; //количество фоток пользователя
let currentUser = {};


function getData(url) {
    return fetch(url)
    .then((response) => {
        console.log("Данные (только фото) успешно загружены");
        return response.json()
    })
    .catch((error) => alert(`Ошибка получения данных (фото) с сайта ${url}: ${error}`));
};


async function pageLoaded() {
    let obj = await getData(url); //Здесь должна быть вся загрузка данных с сайта.
    
    //Заглушка, берем данные из plug, кроме фоток портфолио либо загружаем данные с локального хранилища
    let photos = obj.map(item => item.download_url); //Список url фотографий
    if (!localStorage.getItem("currentUser")) {
        currentUser = JSON.parse(JSON.stringify(plug));
        currentUser.photosUrl = photos.map(item => item);
        console.log("Пользователь не найден в локальном хранилище и создан по шаблону");
    } else {
        currentUser = JSON.parse(localStorage.getItem("currentUser"));
        console.log("Пользователь загружен из локального хранилища");
    };
    //конец заглушки
    fillPage();
    makeMainPageListeners();
    makeContentDependListeners();
};


function fillElementFromSelectByArray(element, array) {
    return array.map(item => {
        for (i = 0; i < document.getElementById(element).options.length; i++) {
            if (item===document.getElementById(element).options[i].value) {
                return document.getElementById(element).options[i].innerText;
            };
        };
    });
};


function fillPage() { //Заплнение страницы данными
    //Left column
    /*User profile block*/
    document.querySelectorAll(".user-logo").forEach(item => { //header & User profile photos
        item.style.backgroundImage = `url(${currentUser.photosUrl[0]})`;
    });
    document.getElementById("user-name").innerText = `${currentUser.nameFirst} ${currentUser.nameSecond}`;
    document.getElementById("responses").innerText = currentUser.responses;
    document.getElementById("views").innerText = currentUser.views;
    document.querySelectorAll(".user-occupation").forEach(item => {
        item.innerText = currentUser.occupation;
    });
    
    /*social block*/
    document.getElementById("icon-vk").href = currentUser.social.vk;
    document.getElementById("icon-tg").href = currentUser.social.tg;
    document.getElementById("icon-youtube").href = currentUser.social.youtube;
 
    /*contacts block*/
    document.getElementById("user-phone").innerText = currentUser.phone;
    document.getElementById("user-email").innerText = currentUser.email;
    document.getElementById("user-place").innerText = currentUser.place;
    document.getElementById("user-age").innerText = currentUser.age;
 
    //Center column
    /*occupation block*/
    document.getElementById("expected-salary").innerText = 
    currentUser.expectedSalary + " " + 
    fillElementFromSelectByArray("new-salary-currency", currentUser.currency);
    
    document.getElementById("work-experience").innerText = 
    currentUser.workExperience + " " +
    fillElementFromSelectByArray("new-experience-period",  currentUser.workExperiencePeriod);
    
    document.getElementById("work-conditionals").innerText = 
    fillElementFromSelectByArray("new-conditionals", currentUser.workConditionals).join(", ")[0].toUpperCase()+
    fillElementFromSelectByArray("new-conditionals", currentUser.workConditionals).join(", ").slice(1).toLowerCase();

    /*experience block*/
    document.getElementById("user-experience-center").innerText = " (" + 
        currentUser.workExperience + " " +
        fillElementFromSelectByArray("new-experience-period",  currentUser.workExperiencePeriod) + 
    ")";
    
    document.getElementById("user-experience-center-list").innerHTML = 
    currentUser.jobs.map(item => `
        <div>
            <div>
                <p>${item.profession}</p>
                <div>${item.experience}</div>
            </div>
            <div>
                <p>${item.company}</p>
                <div>${item.time}</div>
            </div>
        </div>
        `)
    .join(" ");
 
    /*study block*/
    document.getElementById("user-study-center-list").innerHTML = 
    currentUser.study.map(item => `
        <div>
            <div>
                <p>${item.school}</p>
                <div>${item.experience}</div>
            </div>
            <div>
                <p>${item.specialty}</p>
                <div>${item.time}</div>
            </div>
        </div>
        `)
    .join(" ");
 
    /*skills block*/
    document.getElementById("user-center-skills").innerHTML = 
    currentUser.skills.map(item => `
        <div>${item}</div>
        `)
    .join(" ") + `
        <a href="#" id="skill-icon-add" onclick="event.preventDefault()">
            <div></div>
        </a>`
    ;

    /*about block*/
    document.getElementById("user-center-about").innerHTML = currentUser.about;
 
    /* currentUser center portfolio*/
    document.getElementById("block-center-portfolio-list").innerHTML = 
    currentUser.portfolioLinks.map(item => `
        <a href="${item}" target="_blank">${item}</a></br>
        `)
    .join(" ");

    /*portfolio photos block*/
    document.getElementById("user-photos-list").innerHTML = 
    currentUser.photosUrl.map(item => `
        <div class="userPhoto" style="background-image: url('${item}')"></div>
        `)
    .join("");

    //Right column
    /*All blocks*/
    document.getElementById("views-week").innerText = currentUser.viewsWeek;
    document.getElementById("invites-week").innerText = currentUser.invitesWeek;
    document.getElementById("place-search").innerText = currentUser.placeSearch;
};


function getRound(number, dights) {
    if (number != Math.round(number)) {
        return Math.round(number * Math.pow(10, dights))/Math.pow(10, dights);
    } else return number;
};


function acceptChahgesBlock(block) { //Применить изменения к пользователю
    if (block.id === "block-center-occupation-edit") { //Проверка блока
        currentUser.expectedSalary = getRound(+document.getElementById("new-salary-value").value, 2);
        currentUser.currency = Array.from(document.getElementById("new-salary-currency").value);
        currentUser.workExperience = getRound(+document.getElementById("new-experience-value").value, 1);
        currentUser.workExperiencePeriod = Array.from(document.getElementById("new-experience-period").value);
        currentUser.workConditionals = Array.from(document.getElementById("new-conditionals").options)
        .filter(option => option.checked)
        .map(option => option.value);
    };
};


function changeElementStyle(element, type, value) { //Выделение элемента стилистически
    if (type === "color") {
        element.style.backgroundColor = value; //Изменение элементу нужного свойства
    };
    if (type === "changeMainWindowOpacity") { //Изменение прозрачности главного окна
        element.style.opacity = value;
    };
    if (type === "showPhoto") { //Раскрытие второго окна и установка фона
        element.style.display = "block";
        element.style.transition = "0.8s cubic-bezier(.19,1.01,.5,1)";
        element.style.transform = "scale(1, 1)";
        element.style.backgroundRepeat = "no-repeat";
        element.style.backgroundPosition = "center";
        element.style.backgroundSize = "contain";
        element.style.backgroundImage = value;
    };
};


function checkBlock(block) { //Проверка корректности введенной информации в блоке
    if (block.id === "block-center-occupation-edit") { //Проверка блока
        let inputOk = true; //Проверка корректности ввода все информации
         //Проверка введенной суммы зарплаты
        if (document.getElementById("new-salary-value").value < 0 || !document.getElementById("new-salary-value").value) {
            inputOk = false;
            changeElementStyle(document.getElementById("new-salary-value"), "color", "red");
            alert("Введенная сумма зарплаты отрицательна или пуста!")
            document.getElementById("new-salary-value").addEventListener('click', () => {
                document.getElementById("new-salary-value").style.backgroundColor = "transparent";
            }, {once: true});        
        };
        //Проверка введенного опыта
        if (document.getElementById("new-experience-value").value < 0 || !document.getElementById("new-experience-value").value) {
            inputOk = false;
            changeElementStyle(document.getElementById("new-experience-value"), "color", "red");
            alert("Введенный опыт работы отрицателен или пуст!")
            document.getElementById("new-experience-value").addEventListener('click', () => {
                document.getElementById("new-experience-value").style.backgroundColor = "transparent";
            }, {once: true});
        };
        //Проверка выбранных условий работы
        let checked = Array.from(document.getElementById("new-conditionals").options)
        .filter(option => option.checked)
        .map(option => option.value);
        if (checked.length === 0) {
            inputOk = false;
            changeElementStyle(document.getElementById("new-conditionals"), "color", "red");
            alert("Необходимо выбрать хотя бы одно условие работы!")
            document.getElementById("new-conditionals").addEventListener('click', () => {
                document.getElementById("new-conditionals").style.backgroundColor = "transparent";
            }, {once: true});
        };
        return inputOk;  
    };
};


function fillBlockData(block) { //Первоначальное заполнение блока данными пользователя
    if (block.id === "block-center-occupation-edit") { //Заполнение блока 
        document.getElementById("new-salary-value").value = currentUser.expectedSalary;
        document.getElementById("new-salary-currency").value = currentUser.currency;
        document.getElementById("new-experience-value").value = currentUser.workExperience;
        document.getElementById("new-experience-period").value = currentUser.workExperiencePeriod;
        fillElementConditional("new-conditionals", currentUser.workConditionals);
    };
};


function fillElementConditional(element, conditionalsToDraw) { //Заполнение переданного select в соответствии с массивом значений conditionalsToDraw
    for (let i = 0; i < document.getElementById(element).options.length; i++) {
        if (conditionalsToDraw.includes(document.getElementById(element).options[i].value, 0)) {
            document.getElementById(element).options[i].checked = true;
            document.getElementById(element).options[i].style.color = "green";
            document.getElementById(element).options[i].style.outline = "none";

        } else { 
            document.getElementById(element).options[i].checked = false;
            document.getElementById(element).options[i].style.background = "transparent";
            document.getElementById(element).options[i].style.color = "grey";
        };
        document.getElementById(element).selectedIndex = -1;
    };
};


function saveChangesLocal(data) {
    localStorage.setItem("currentUser", JSON.stringify(data));
};


function addListeners(block) { //Заполнение блока listeners
    if (block.id === "block-center-occupation-edit") { //Заполнение блока
        //Кнопка отмена
        document.getElementById("block-center-occupation-deny").addEventListener('click', resultDeny1 = function() { 
            hideBlock(document.getElementById("block-center-occupation-edit"));
        });
        //Кнопка принять
        document.getElementById("block-center-occupation-accept").addEventListener('click', resultAccept1 = function() { 
            if (checkBlock(block)) {
            acceptChahgesBlock(block);
            hideBlock(block);
            fillPage();
            makeContentDependListeners();
            saveChangesLocal(currentUser);
            };
        });
        // Блок conditionals -> select
        let lastConditionals = [...currentUser.workConditionals];
        document.getElementById("new-conditionals").addEventListener('click', resultSelect1 = function() { 
            redrawSelect(lastConditionals);
        });
    };
};


function redrawSelect(conditionalsToDraw) {
    let currentOptionValue = document.getElementById("new-conditionals").value; //Текущий выбранный элемент
    if (conditionalsToDraw.indexOf(currentOptionValue) === -1) { //Проверка, есть ли элемент в массиве и удаление, если есть; добавление если нет
        conditionalsToDraw.push(currentOptionValue)
    } else conditionalsToDraw.splice(conditionalsToDraw.indexOf(currentOptionValue), 1);
    fillElementConditional("new-conditionals", conditionalsToDraw);
    lastConditionals = conditionalsToDraw;
};


function removeListeners(block) { //Очищение блока от listeners
    if (block.id === "block-center-occupation-edit") {
        document.getElementById("block-center-occupation-deny").removeEventListener('click', resultDeny1);
        document.getElementById("block-center-occupation-accept").removeEventListener('click', resultAccept1);
        document.getElementById("new-conditionals").removeEventListener('click', resultSelect1);
    };
};


function resetStyles(block) {
    if (block.id === "block-center-occupation-edit") { //Очистка стилей блока
        document.getElementById("new-salary-value").style.backgroundColor = "transparent";
        document.getElementById("new-experience-value").style.backgroundColor = "transparent";
        document.getElementById("new-conditionals").style.backgroundColor = "transparent";
        block.style.transform = "scaleY(0)";
        block.style.position = "absolute";
    };
};


function applyStyleBlock(block) {
    if (block.id === "block-center-occupation-edit") { //Очистка стилей блока
        block.style.transition = "0.6s cubic-bezier(.19,1.01,.5,1)";
        block.style.transform = "scaleY(1)";
        block.style.position = "relative";
    };
};


function fillBlock(block) { //Заполнение блока информацией и listeners
    fillBlockData(block);
    addListeners(block);
};


function showBlock(block) {    //Показ блока
    applyStyleBlock(block);
    fillBlock(block);
};


function hideBlock(block) { //Скрытие блока и удаление listeners
    removeListeners(block);
    resetStyles(block);
    fillPage();
    makeContentDependListeners();
};


function changeViewBlock(block) { // Переключение режима отображения блока
    block.style.position === "relative" ? hideBlock(block) : showBlock(block);
};


function makeMainPageListeners() {
    document.getElementById("social-icon-add").addEventListener('click', () => {
        alert("Вы добавили соцсеть");
    });
    document.getElementById("edit-profile").addEventListener('click', () => {
        alert("Вы отредактировали профиль");
    });
    document.getElementById("user-occupation-center-change").addEventListener('click', () => { //center-occupation-edit
        changeViewBlock(document.getElementById("block-center-occupation-edit"));
    });
    document.getElementById("user-experience-center-change").addEventListener('click', () => {
        alert("Вы изменили блок опыта");
        alert("Вы удалили пользователя из локального хранилища, обновите страницу");
        localStorage.clear();
    });
    document.getElementById("user-study-center-change").addEventListener('click', () => {
        alert("Вы изменили блок обучения");
    });
    document.getElementById("user-skills-center-change").addEventListener('click', () => {
        alert("Вы изменили блок навыков");
    });
     document.getElementById("user-about-center-change").addEventListener('click', () => {
        alert("Вы изменили блок обо мне");
    });
    document.getElementById("user-portfolio-center-change").addEventListener('click', () => {
        alert("Вы изменили блок портфолио");
    });
    document.getElementById("portfolio-link-add").addEventListener('click', () => {
        alert("Вы добавили ссылку портфолио");
    });
    document.getElementById("photo-add").addEventListener('click', () => {
        alert("Вы добавили фотографию в портфолио");
    });
};



function makeContentDependListeners() {
    document.getElementById("user-center-skills").lastElementChild.addEventListener('click', () => {
        alert("Вы добавили навык");
    });;
    document.querySelectorAll(".user-logo").forEach(item => {
        item.addEventListener('click', () => {
            newWindow("showUserPhoto", item);
        });
    });
    document.querySelectorAll(".userPhoto").forEach(item => {
        item.addEventListener('click', () => {
            newWindow("showUserPhoto", item);
        });
    });
};


function newWindow(order, item) { //Работа со вторым окном
    if (order === "showUserPhoto") {
        let window2 = document.getElementById("window-2");
        //Делаем главное окно полупрозрачным
        changeElementStyle(document.getElementById("root"), "changeMainWindowOpacity", "0.2"); 
        //Раскукоживаем второе окно и заодно передаем url фона, чтобы 2 раза не вставать
        changeElementStyle(window2, "showPhoto", item.style.backgroundImage);
        //Делаем listener для выхода обратно
        window2.addEventListener('click', () => {
            window2.style.transform = "scale(0, 0)"; //Скукоживаем второе окно 
            changeElementStyle(document.getElementById("root"), "changeMainWindowOpacity", "1"); //Делаем главное окно видимым
        }, {once: true});
    };
};


document.addEventListener("DOMContentLoaded", pageLoaded);
