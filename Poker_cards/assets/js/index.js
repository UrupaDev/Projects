// let card = document.getElementsByClassName('card')[0];

// card.addEventListener("click", function(e) {
//   card.classList.toggle('active');
// }, false);

var w = document.getElementById('wrapper');
var button = document.getElementById('randomize');
var quotes = w.children; // inner elements, your quotes divs

// a function to hide all divs
var hideDivs = function(divs) {
  for (var div of divs) {
    div.style.display = 'none';
  }
}

hideDivs(quotes); // hide all initially

// on click
button.addEventListener('click', function(event) {
  var rnd = Math.floor(Math.random() * quotes.length); // get random index
  hideDivs(quotes); // hide all quotes
  quotes[rnd].style.display = 'block'; // show random quote
  event.target.textContent = 'Magic future'; // set button text. event.target is the button you've clicked
})