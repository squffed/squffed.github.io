// Modal Image Gallery
function onClick(element) {
  document.documentElement.style.overflow = "hidden";
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

var number = 1;

function slideshow() {
  var text = document.getElementById("caption").innerHTML
  if(text.includes("Aria Disconnect"))
  {
    ariaDisconnectSlideshow();
  }
  if(text.includes("Untitled Seagull Simulator"))
  {
    untitledSeagullSimSlideshow();
  }
  if(text.includes("Untitled Hat Adventure"))
  {
    untitledHatAdvSlideshow();
  }
  if(text.includes("Too Many Bullets"))
  {
    tooManyBulletsSlideshow();
  }
}

function getTemplate()
{
  var url = document.getElementById("img01").src;
  return url.substring(0, url.lastIndexOf('/')) + "/";
}

function ariaDisconnectSlideshow()
{
  var max = 14;
  number++;
  number = number % (max + 1);
  number = (number <= 0) ? 1 : number;
  document.getElementById("img01").src = getTemplate() + number + ".jpg";
}

function untitledSeagullSimSlideshow()
{
  var max = 5;
  number++;
  number = number % (max + 1);
  number = (number <= 0) ? 1 : number;
  document.getElementById("img01").src = getTemplate() + number + ".jpg";
}

function untitledHatAdvSlideshow()
{
  var max = 4;
  number++;
  number = number % (max + 1);
  number = (number <= 0) ? 1 : number;
  document.getElementById("img01").src = getTemplate() + number + ".jpg";
}

function tooManyBulletsSlideshow()
{
  var max = 5;
  number++;
  number = number % (max + 1);
  number = (number <= 0) ? 1 : number;
  document.getElementById("img01").src = getTemplate() + number + ".jpg";
}

// Toggle between showing and hiding the sidebar when clicking the menu icon
var mySidebar = document.getElementById("mySidebar");

function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
  } else {
    mySidebar.style.display = 'block';
  }
}

// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
}