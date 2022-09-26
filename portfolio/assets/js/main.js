const wow = new WOW({
  boxClass: 'wow', 
  animateClass: 'animate__animated', 
  offset: 30, 
  mobile: true, 
})
wow.init(); 



// window.onscroll = function() {myFunction()};
  
// var menu = document.getElementById("my-header");
// var sticky = menu.offsetTop;
      
//   function myFunction() {
//     if (window.pageYOffset > sticky) {
//       menu.classList.add("sticky");
//     } else {
//       menu.classList.remove("sticky");
//     }
  // }


// burger menu
let burger = document.getElementsByClassName('header__burger-menu')[0];
let header__items = document.getElementsByClassName('header__wrapper')[0];
let body = document.getElementsByClassName('body')[0];
// let menu = document.querySelectorAll('.header__menu-item')[0];

burger.addEventListener("click", function(e) {
    burger.classList.toggle('header__burger-menu_active');
    header__items.classList.toggle('header__items_active');
}, false);


