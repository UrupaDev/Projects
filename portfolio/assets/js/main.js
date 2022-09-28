const wow = new WOW({
  boxClass: 'wow', 
  animateClass: 'animate__animated', 
  offset: 30, 
  mobile: true, 
})
wow.init(); 



// window.onscroll = function() {myFunction()};
  
// var menu = document.getElementById("header__burger-menu");
// var sticky = menu.offsetTop;
      
//   function myFunction() {
//     if (window.pageYOffset > sticky) {
//       menu.classList.add("sticky");
//     } else {
//       menu.classList.remove("sticky");
//     }
//   }



// burger menu
let burger = document.getElementsByClassName('header__burger-menu')[0];
let header__items = document.getElementsByClassName('header__wrapper')[0];
// let menu1 = document.querySelectorAll('.nav__item')[0];
// let menu2 = document.querySelectorAll('.nav__item')[1];
// let menu3 = document.querySelectorAll('.nav__item')[2];
// let menu4 = document.querySelectorAll('.nav__item')[3];

burger.addEventListener("click", function(e) {
    burger.classList.toggle('header__burger-menu_active');
    header__items.classList.toggle('header__items_active');
}, false);

// close mobile menu on click items
let menu_items = document.querySelectorAll('.nav__item');
console.log(menu_items);

menu_items.forEach(function(menu_item){
	console.log(menu_item);
  
	menu_item.addEventListener('click', function() {
		menu_items.forEach(function(menu_item) {
			menu_item.classList.remove('header__burger-menu_active')
      burger.classList.toggle('header__burger-menu_active');
      header__items.classList.toggle('header__items_active');
		});
			menu_item.classList.add('header__burger-menu_active');
	})
})

//працює але не на клік
// document.querySelectorAll('.nav__item').forEach(function (elem) {
// 	elem.classList.add('header__burger-menu_active');
// });


// menu1.addEventListener("click", function(e) {
//   burger.classList.toggle('header__burger-menu_active');
//   header__items.classList.toggle('header__items_active');
//   menu1.classList.toggle('header__burger-menu_active');
// }, false);

// menu2.addEventListener("click", function(e) {
//   burger.classList.toggle('header__burger-menu_active');
//   header__items.classList.toggle('header__items_active');
//   menu2.classList.toggle('header__burger-menu_active');
// }, false);

// menu3.addEventListener("click", function(e) {
//   burger.classList.toggle('header__burger-menu_active');
//   header__items.classList.toggle('header__items_active');
//   menu3.classList.toggle('header__burger-menu_active');
// }, false);

// menu4.addEventListener("click", function(e) {
//   burger.classList.toggle('header__burger-menu_active');
//   header__items.classList.toggle('header__items_active');
//   menu4.classList.toggle('header__burger-menu_active');
// }, false);


