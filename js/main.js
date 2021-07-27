$(document).ready(function () {

const navIcon = document.querySelector('.nav-icon'); /* гамбургер иконка */
const mobMenu = document.querySelector('.mobile-menu'); /* мобильное меню */
const overlay = document.querySelector('#overlay'); /* overlay */
const bodyEl = document.body; /* noscroll - body */

// Прослушиваем событие клик по гамбургер-меню.
navIcon.addEventListener('click', function () {
    this.classList.toggle('nav-icon--active');
    mobMenu.classList.toggle('mob-menu--active');
    overlay.classList.toggle('active');
    bodyEl.classList.toggle('noscroll');
});

// Прослушиваем событие клик по моб-меню.
mobMenu.addEventListener('click', function () {
    this.classList.remove('mob-menu--active');
    navIcon.classList.remove('nav-icon--active');
    overlay.classList.remove('active');
    bodyEl.classList.remove('noscroll');
})

// Прослушиваем событие клик по overlay
overlay.addEventListener('click', function () {
    this.classList.remove('active');
    navIcon.classList.remove('nav-icon--active');
    mobMenu.classList.remove('mob-menu--active');
    bodyEl.classList.remove('noscroll');
})

// Page-nav
$('#page-nav').onePageNav({
	currentClass: 'active',
	changeHash: false,
	scrollSpeed: 750,
	scrollThreshold: 0.5,
	filter: '',
	easing: 'swing',
	begin: function () {},
	end: function () {},
	scrollChange: function ($currentListItem) {}
});

// Form placeholder
	const formItems = document.querySelectorAll('.form-field');
	
	for(let item of formItems){
		const thisParent = item.closest('.form-item');
		const thisPlaceholder = thisParent.querySelector('.fake-placeholder');
		// Если инпут в фокусе		
		item.addEventListener('focus', function(){
			thisPlaceholder.classList.add('active');
		});

		// Если инпут теряет фокус
		item.addEventListener('blur', function(){

			if(item.value.length > 0){
				thisPlaceholder.classList.add('active');
			}
			else{
				thisPlaceholder.classList.remove('active');
			}
		})
	}

    //Form validate
	$('.contact-form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			subject: {
				required: true
			},
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите Ваш email',
				email: 'Отсутсвует символ @'
			},
			subject: {
				required: 'Введите тему сообщения'
			},
			message: {
				required: 'Введите текст сообщения'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}
	})

    // Функция AJAX запрса на сервер
	function ajaxFormSubmit() {

		let string = $(".contact-form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$('.contact-form').slideUp(800); // Закрыть форму
				$('.form-field').val(''); // Очитить инпуты
				$('#answer').html(html); // Отправить пользователю ответ
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепочку срабатывания остальных функций
		return false;
	}

    //Параллакс движения за мышкой
	let prxScene = document.querySelector('.section-contacts');
	let prxItem = document.querySelectorAll('.move-quot');
	prxScene.addEventListener('mousemove', function(e) {
		let x = e.clientX / window.innerWidth;
		let y = e.clientY / window.innerHeight;
		for (let item of prxItem) {
			item.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
		}
	});
})

