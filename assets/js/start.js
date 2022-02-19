function onSubmit(token) {
  document.getElementById("demo-form").submit();
}

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight)+"px";
}

function tryToFade(element) {
    txtRotate();
    element.remove();
    document.getElementById('fullscreen').style.backgroundColor = "white";
    document.body.style.backgroundColor = "white";
    document.documentElement.style.backgroundColor = "white";
    document.documentElement.style.overflow = "visible";
    document.body.style.overflow = "visible";
    fade(document.getElementById('fullscreen'))
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.01){
            clearInterval(timer);
            element.remove();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
}


  var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

function test()
{
   var val1 = document.getElementById('test1').value;
   var val2 = document.getElementById('test2').value;
   if(val1.includes("apple") || val2.includes("apple"))
   {
      document.getElementById('contact').style.backgroundColor = "#B5EAD7";
      setTimeout(() => {
         document.getElementById('contact').style.backgroundColor = "#f1f1f1";
      }, 1000);
      return true;
   }
   else
   {
      document.getElementById('contact').style.backgroundColor = "#FF9AA2";
      setTimeout(() => {
         document.getElementById('contact').style.backgroundColor = "#f1f1f1";
      }, 1000);
      return false;
   }
}

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

function txtRotate() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};