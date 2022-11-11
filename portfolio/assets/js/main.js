const wow = new WOW({
  boxClass: 'wow', 
  animateClass: 'animate__animated', 
  offset: 30, 
  mobile: true, 
})
wow.init(); 

// burger menu
let burger = document.getElementsByClassName('header__burger-menu')[0];
let header__items = document.getElementsByClassName('header__wrapper')[0];

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