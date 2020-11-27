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
    currency: "руб.",
    workExperience: "9",
    workExperiencePeriod: "месяцев",
    workConditionals: [
        "полная занятость",
        "удаленная работа"
    ],
       

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
        
    about: "!Люблю дизайн и делать круто, по-другому не умеем.",

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


const url = "https://picsum.photos/v2/list/?limit=8";
let currentUser = {};



function getData(url) {
    return fetch(url)
    .then((response) => {
        console.log("Данные (только фото) успешно загружены");
        return response.json()
    })   
    .catch((error) => alert(`Ошибка получения данных (фото) с сайта ${url}: ${error}`));
}




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
    }
    //конец заглушки
    fillPage();
    makeMainPageListeners();
    makeContentDependListeners();
}






function fillPage() {
    document.querySelectorAll(".user-logo").forEach(item => {
        item.style.backgroundImage = `url(${currentUser.photosUrl[0]})`;
    })
    document.getElementById("user-name").innerText = `${currentUser.nameFirst} ${currentUser.nameSecond}`;
    document.getElementById("responses").innerText = currentUser.responses;
    document.getElementById("views").innerText = currentUser.views;
    document.querySelectorAll(".user-occupation").forEach(item => {
        item.innerText = currentUser.occupation;
    });
    /* currentUser social*/
    document.getElementById("icon-vk").href = currentUser.social.vk;
    document.getElementById("icon-tg").href = currentUser.social.tg;
    document.getElementById("icon-youtube").href = currentUser.social.youtube;
    
    /* currentUser contacts*/
    document.getElementById("user-phone").innerText = currentUser.phone;
    document.getElementById("user-email").innerText = currentUser.email;
    document.getElementById("user-place").innerText = currentUser.place;
    document.getElementById("user-age").innerText = currentUser.age;
    
    /* currentUser center occupation*/
    document.getElementById("expected-salary").innerText = `${currentUser.expectedSalary} ${currentUser.currency}`;
    document.getElementById("work-experience").innerText = `${currentUser.workExperience} ${currentUser.workExperiencePeriod}`;
    document.getElementById("work-conditionals").innerText = 
    currentUser.workConditionals.join(", ")[0].toUpperCase() + 
    currentUser.workConditionals.join(", ").slice(1).toLowerCase();

    /* currentUser center experience*/
    document.getElementById("user-experience-center").innerText = ` (${currentUser.workExperience} ${currentUser.workExperiencePeriod})`;
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
    
    /* currentUser center study*/
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

 
    /* currentUser center skills*/
    document.getElementById("user-center-skills").innerHTML = 
    currentUser.skills.map(item => `
        <div>${item}</div>
        `)
    .join(" ") + `
        <a href="#" id="skill-icon-add" onclick="event.preventDefault()">
            <div></div>
        </a>`
    ;


    /* currentUser center about*/
    document.getElementById("user-center-about").innerHTML = currentUser.about;

 
    /* currentUser center portfolio*/
    document.getElementById("block-center-portfolio-list").innerHTML = 
    currentUser.portfolioLinks.map(item => `
        <a href="${item}" target="_blank">${item}</a>
        `)
    .join(" ");


    /* currentUser center portfolio photos*/
    document.getElementById("user-photos-list").innerHTML = 
    currentUser.photosUrl.map(item => `
        <div class="userPhoto" style="background-image: url('${item}')"></div>
        `)
    .join("");



    /* currentUser right blocks*/
    document.getElementById("views-week").innerText = currentUser.viewsWeek;
    document.getElementById("invites-week").innerText = currentUser.invitesWeek;
    document.getElementById("place-search").innerText = currentUser.placeSearch;

}



function acceptChahgesBlock(block) { //Применить изменения к пользователю
    if (block.id === "block-center-occupation-edit") { //Проверка блока user-occupation-center-change
        currentUser.expectedSalary = document.getElementById("new-salary-value").value;
        currentUser.currency = document.getElementById("new-salary-currency").value;
        currentUser.workExperience = document.getElementById("new-experience-value").value;
        currentUser.workExperiencePeriod = document.getElementById("new-experience-period").value;
        let selected = Array.from(document.getElementById("new-conditionals").options)
        .filter(option => option.selected)
        .map(option => option.value);
        currentUser.workConditionals = [...selected];
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
    if (block.id === "block-center-occupation-edit") { //Проверка блока user-occupation-center-change
        let inputOk = true; //Проверка корректности ввода все информации
         //Проверка введенной суммы зарплаты
        if (!document.getElementById("new-salary-value").value) {
            inputOk = false;
            changeElementStyle(document.getElementById("new-salary-value"), "color", "red");
            alert("Введенная сумма зарплаты некорректна или пуста!")
            document.getElementById("new-salary-value").addEventListener('click', () => {
                document.getElementById("new-salary-value").style.backgroundColor = "transparent";
            }, {once: true});
            
        };
        //Проверка введенного опыта
        if (!document.getElementById("new-experience-value").value) {
            inputOk = false;
            changeElementStyle(document.getElementById("new-experience-value"), "color", "red");
            alert("Введенный опыт работы некорректен или пуст!")
            document.getElementById("new-experience-value").addEventListener('click', () => {
                document.getElementById("new-experience-value").style.backgroundColor = "transparent";
            }, {once: true});
        };
        //Проверка введенных условий работы
        let selected = Array.from(document.getElementById("new-conditionals").options)
        .filter(option => option.selected)
        .map(option => option.value);
        if (selected.length === 0) {
            inputOk = false;
            changeElementStyle(document.getElementById("new-conditionals"), "color", "red");
            alert("Необходимо выбрать хотя бы одно условие работы!")
            document.getElementById("new-conditionals").addEventListener('click', () => {
                document.getElementById("new-conditionals").style.backgroundColor = "transparent";
            }, {once: true});
        };
        return inputOk;  //Проверка прошла успешно
    };


};



function fillBlockData(block) { //Первоначальное заполнение блока данными пользователя
    if (block.id === "block-center-occupation-edit") { //Заполнение блока user-occupation-center-change
        document.getElementById("new-salary-value").value = currentUser.expectedSalary;
        document.getElementById("new-salary-currency").value = currentUser.currency;
        document.getElementById("new-experience-value").value = currentUser.workExperience;
        document.getElementById("new-experience-period").value = currentUser.workExperiencePeriod;
        for (let i = 0; i < document.getElementById("new-conditionals").options.length; i++) {
            let exist = currentUser.workConditionals.some(item => {
                if (item.toLowerCase() === document.getElementById("new-conditionals").options[i].innerText.toLowerCase()) return true;
            });
            if (exist) {
                document.getElementById("new-conditionals").options[i].selected = true;
            }
        };
    };
};


function saveChangesLocal(data) {
    //let saveObject = JSON.stringify(data)
    //console.log(JSON.stringify(data));
    localStorage.setItem("currentUser", JSON.stringify(data));
};



function addListeners(block) { //Заполнение блока listeners
    if (block.id === "block-center-occupation-edit") { //Заполнение блока user-occupation-center-change
        //Кнопка отмена
        document.getElementById("block-center-occupation-deny").addEventListener('click', result = () => { 
            hideBlock(document.getElementById("block-center-occupation-edit"));
        });
        //Кнопка принять
        document.getElementById("block-center-occupation-accept").addEventListener('click', result = () => { 
            if (checkBlock(block)) {
            acceptChahgesBlock(block);
            hideBlock(block);
            fillPage();
            makeContentDependListeners();
            saveChangesLocal(currentUser);
            };
        });
    };

};


function removeListeners(block) { //Очищение блока от listeners
    if (block.id === "block-center-occupation-edit") {
        document.getElementById("block-center-occupation-deny").removeEventListener('click', result);
        document.getElementById("block-center-occupation-accept").removeEventListener('click', result);
    };
};


function resetStyles(block) {
    if (block.id === "block-center-occupation-edit") { //Очистка стилей блока user-occupation-center-change
        document.getElementById("new-salary-value").style.backgroundColor = "transparent";
        document.getElementById("new-experience-value").style.backgroundColor = "transparent";
        document.getElementById("new-conditionals").style.backgroundColor = "transparent";
    };
};




function fillBlock(block) { //Заполнение блока информацией и listeners
    fillBlockData(block);
    addListeners(block);
};



function showBlock(block) {    //Показ блока
    block.style.transform = "scaleY(1)";
    block.style.position = "relative";
    fillBlock(block);
};


function hideBlock(block) { //Скрытие блока и удаление listeners
    block.style.transform = "scaleY(0)";
    block.style.position = "absolute";
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




function newWindow(order, item) {
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








