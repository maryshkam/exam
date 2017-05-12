// ================================================ slider init ======================
slidr.create('slidr-one').start();
slidr.create('slidr-two').start();
slidr.create('slidr-three').start();

// ======================================= Ajax amd masonry ===========================

function Idea() {
  var url = "https://pixabay.com/api/?key=5018958-ed49ccd90878e6614abdf24a6&image_type=photo&min_width=700&min_height=700&page=" + this.randomPage() + "&per_page=7&editors_choice=true";
  this.build(url);
}


Idea.prototype.randomPage = function() {
  var number = Math.floor((Math.random() * 50) + 1);
  return number;
};


Idea.prototype.request = function(data) {
  this.ideaRequest = new XMLHttpRequest();
  this.ideaRequest.open('GET', data);
  this.ideaRequest.send();
};


Idea.prototype.ready = function() {
  this.ideaRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var result = JSON.parse(this.responseText);
      var html = document.getElementById('code').innerHTML;
      var tmpl = _.template(html);
      var container = document.querySelector('.holiday');

      container.innerHTML = tmpl({
        list: result
      });
      var msnry = new Masonry(container, {
        // Настройки
        columnWidth: '.holiday__sizer',
        itemSelector: '.holiday__item',
        gutter: 20,
      });
    }
  };
};


Idea.prototype.build = function(data) {
  this.randomPage();
  this.request(data);
  this.ready();
};


Idea.prototype.search = function() {
  var req = document.querySelector('.search__field').value;
  var mySearch = "https://pixabay.com/api/?key=5018958-ed49ccd90878e6614abdf24a6&q=" + req + "&image_type=photo&min_width=300&min_height=300&page=" + runIdea.randomPage() + "&per_page=7";
  this.build(mySearch);
};


var runIdea = new Idea();

// ========================================= search =============================

var start = document.querySelector('.promo-btn_search');
if (start.addEventListener) {
  start.addEventListener('click', function() {
    runIdea.search();
  });
} else {
  start.attachEvent('onclick', function() {
    runIdea.search();
  });
}
