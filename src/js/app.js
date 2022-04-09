require('../css/reset.css');
require('../css/app.css');

// import './parallax.js';
import './pace.min.js';
import './skrollr.min.js';

import codeImg1 from '../images/8.png';
import codeImg2 from '../images/9.png';
import codeImg3 from '../images/7.jpg';
import codeImg4 from '../images/xky.png';
import codeImg5 from '../images/lb.png';
import codeImg6 from '../images/ylm.png';
import codeImg7 from '../images/999ysf.png';

let app = document.getElementById('app');
let pace = document.querySelector('.pace');
let home = document.getElementById('home');
let about = document.getElementById('about');
let scrollTop1 = document.getElementById('banner-1').offsetTop;
let scrollTop2 = document.getElementById('banner-2').offsetTop;
let scrollTop3 = document.getElementById('banner-3').offsetTop;
let scrollTop4 = document.getElementById('banner-4').offsetTop;
let down = app.querySelector('.down');
let parallaxImg1 = document.getElementById('parallax-img-1');
let parallaxImg2 = document.getElementById('parallax-img-2');
let parallaxImg3 = document.getElementById('parallax-img-3');
let parallax1 = document.getElementById('parallax-1');
let parallax2 = document.getElementById('parallax-2');
let parallax3 = document.getElementById('parallax-3');
let manImg = app.querySelector('.man');
let popup = document.querySelector('.popup');
let codeImgArr = [codeImg1, codeImg2, codeImg3, codeImg4, codeImg5, codeImg6, codeImg7]

Pace.on('done', function () {
  setTimeout(function () {
    document.querySelector('.pace').classList.add('hide');
    home.classList.add('active');
  }, 200);
});

function __resize() {
  home.style.height = pace.scrollHeight + 'px';
  manImg.style.width = pace.scrollWidth * 0.26 + 'px';
}
__resize();
window.addEventListener('resize', __resize, false);

setTimeout(function () {
  (function () {
    // WRITTEN BY TRUMAN HEBERLE
    var COLOR = "#dddddd"
    var MESSAGE = '       PengMengdong';

    var FONT_SIZE = 100;
    var AMOUNT = 3000;
    var CLEAR_AMOUNT = 2;
    var SIZE = 2;
    var INITIAL_DISPLACEMENT =100;
    var INITIAL_VELOCITY = 5;
    var VELOCITY_RETENTION = 0.95;
    var SETTLE_SPEED = 1;
    var FLEE_SPEED = 2;
    var FLEE_DISTANCE = 50;
    var FLEE = true;
    var SCATTER_VELOCITY = 3;
    var SCATTER = true;

    // MAIN
    FLEE_SPEED /= 10;
    SETTLE_SPEED /= 100;
    SCATTER_VELOCITY *= 10;
    var CLEAR_RADIUS = Math.round(CLEAR_AMOUNT + SIZE);
    var MOVED_O = Array.apply(null, Array(AMOUNT)).map(function () { return null; });

    const canvas = document.getElementById("spring-text");
    const ctx = canvas.getContext("2d");
    var POINTS = [];
    var MOVED = [];
    var moved_length = 0;
    var MOUSE = {
      x: 0,
      y: 0
    }

    function Point(x, y, r, g, b, a) {
      var angle = Math.random() * 6.28;
      this.dest_x = x;
      this.dest_y = y;
      this.original_r = r;
      this.original_g = g;
      this.original_a = a;
      this.lastx = 0;
      this.lasty = 0;
      this.x = canvas.width / 2 - x + (Math.random() - 0.5) * INITIAL_DISPLACEMENT;
      this.y = canvas.height / 2 - y + (Math.random() - 0.5) * INITIAL_DISPLACEMENT;
      this.velx = INITIAL_VELOCITY * Math.cos(angle);
      this.vely = INITIAL_VELOCITY * Math.sin(angle);
      this.target_x = canvas.width / 2 - x;
      this.target_y = canvas.height / 2 - y;
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      this.moved = false;
      MOVED[moved_length] = this;
      moved_length++;

      this.getX = function () {
        return this.x;
      }

      this.getY = function () {
        return this.y;
      }

      this.fleeFrom = function (x, y) {
        this.velx -= ((MOUSE.x - this.x) * FLEE_SPEED);
        this.vely -= ((MOUSE.y - this.y) * FLEE_SPEED);
      }

      this.settleTo = function (x, y) {
        this.velx = VELOCITY_RETENTION * (this.velx + (this.target_x - this.x) * SETTLE_SPEED);
        this.vely = VELOCITY_RETENTION * (this.vely + (this.target_y - this.y) * SETTLE_SPEED);
      }

      this.scatter = function () {
        var unit = this.unitVecTo(MOUSE.x, MOUSE.y);
        var vel = SCATTER_VELOCITY * (0.5 + Math.random() / 2);
        this.velx = -unit.x * vel;
        this.vely = -unit.y * vel;
      }

      this.checkMove = function () {
        this.moved = (!Math.abs(Math.round(this.target_x - this.x)) == 0 || !Math.abs(Math.round(this.target_y - this.y)) == 0 || !Math.abs(Math.round(this.velx)) == 0 || !Math.abs(Math.round(this.vely)) == 0);
      }

      this.simpleMove = function () {
        this.checkMove();
        if (!this.moved) {
          return;
        }

        this.lastx = this.x;
        this.lasty = this.y;
        this.x += this.velx;
        this.y += this.vely;
        MOVED[moved_length] = this;
        moved_length++;
      }

      this.move = function () {
        if (this.distanceTo(MOUSE.x, MOUSE.y) <= FLEE_DISTANCE) {
          this.fleeFrom(MOUSE.x, MOUSE.y);
        }
        else {
          this.settleTo(this.target_x, this.target_y);
        }
        this.simpleMove();
      }

      this.distanceTo = function (x, y) {
        var dx = x - this.x;
        var dy = y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
      }

      this.unitVecTo = function (x, y) {
        var dx = x - this.x;
        var dy = y - this.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        return {
          x: dx / d,
          y: dy / d
        };
      }

      this.inMotion = function () {
        return this.moved;
      }

      this.clear = function () {
        ctx.clearRect(this.lastx - CLEAR_RADIUS, this.lasty - CLEAR_RADIUS, CLEAR_RADIUS * 2, CLEAR_RADIUS * 2);
      }

      this.draw = function () {
        ctx.fillStyle = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
        ctx.beginPath();
        ctx.arc(this.x, this.y, SIZE, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    window.addEventListener("resize", function () {
      resizeCanvas()
      adjustText()
    });

    if (FLEE) {
      window.addEventListener("mousemove", function (event) {
        MOUSE.x = event.clientX;
        MOUSE.y = event.clientY;
      });
    }

    if (SCATTER) {
      window.addEventListener("click", function (event) {
        MOUSE.x = event.clientX;
        MOUSE.y = event.clientY;
        for (var i = 0; i < POINTS.length; i++) {
          POINTS[i].scatter();
        }
      });
    }

    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    function adjustText() {
      ctx.fillStyle = COLOR;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center"
      ctx.font = FONT_SIZE + "px Arial";
      ctx.fillText(MESSAGE, canvas.width / 2, canvas.height / 2);
      var textWidth = ctx.measureText(MESSAGE).width;
      if (textWidth == 0) {
        return;
      }
      var minX = canvas.width / 2 - textWidth / 2;
      var minY = canvas.height / 2 - FONT_SIZE / 2;
      var data = ctx.getImageData(minX, minY, textWidth, FONT_SIZE).data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var isBlank = true;
      for (var i = 0; i < data.length; i++) {
        if (data[i] != 0) {
          isBlank = false;
          break;
        }
      }

      if (!isBlank) {
        var count = 0;
        var curr = 0;
        var num = 0;
        var x = 0;
        var y = 0;
        var w = Math.floor(textWidth);
        POINTS = [];
        while (count < AMOUNT) {
          while (curr == 0) {
            num = Math.floor(Math.random() * data.length);
            curr = data[num];
          }
          num = Math.floor(num / 4);
          x = w / 2 - num % w;
          y = FONT_SIZE / 2 - Math.floor(num / w);
          POINTS.push(new Point(x, y, data[num * 4], data[num * 4 + 1], data[num * 4 + 2], data[num * 4 + 3]));
          curr = 0;
          count++;
        }
      }
    }

    function init() {
      resizeCanvas()
      adjustText()
      window.requestAnimationFrame(animate);
    }

    function animate() {
      update();
      draw();
    }

    function update() {
      for (var i = 0; i < POINTS.length; i++) {
        POINTS[i].move()
      }
    }

    function draw() {
      for (var i = 0; i < moved_length; i++) {
        MOVED[i].clear();
      }
      MOVED = MOVED_O;
      moved_length = 0;

      for (var i = 0; i < POINTS.length; i++) {
        POINTS[i].draw()
      }

      window.requestAnimationFrame(animate);
    }

    init();
  })();
}, 3000)

window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.addEventListener('scroll', function () {
  let nowScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  if (nowScrollTop > scrollTop1 * .8) {
    down.classList.add('hide');
  }
  return;
});

down.addEventListener('click', function () {
  let scrollTop = document.documentElement.scrollTop;

  this.classList.add('hide');
  function render() {
    window.scrollTo(0, scrollTop);
    if (scrollTop < about.offsetTop) {
      scrollTop += 30;
      requestAnimationFrame(render);
    } else {
      window.scrollTo(0, about.offsetTop);
    }
  }
  requestAnimationFrame(render);
});

app.querySelector('.resume-fr').addEventListener('click', function (e) {
  if (e.target.className == 'to-popup') {
    let src = e.target.getAttribute('data-src');

    popup.querySelector('.popup-img').setAttribute('src', codeImgArr[src]);
    popup.classList.add('active');
  }
  return;
})
popup.querySelector('.mask').addEventListener('click', function () {
  popup.classList.remove('active');
});

parallax1.setAttribute(`data-${scrollTop1 * 1.1}`, 'top: 0%');
parallax1.setAttribute(`data-${scrollTop2}`, 'top: 40%');
parallaxImg1.setAttribute(`data-${scrollTop1 * 1.1}`, 'top: 0%');
parallaxImg1.setAttribute(`data-${scrollTop2}`, 'top: 16%');
parallax2.setAttribute(`data-${scrollTop2 * 1.1}`, 'top: 0%');
parallax2.setAttribute(`data-${scrollTop3}`, 'top: 40%');
parallaxImg2.setAttribute(`data-${scrollTop2 * 1.1}`, 'top: 0%');
parallaxImg2.setAttribute(`data-${scrollTop3}`, 'top: 30%');
parallax3.setAttribute(`data-${scrollTop3 * 1.1}`, 'top: 0%');
parallax3.setAttribute(`data-${scrollTop4}`, 'top: 40%');
parallaxImg3.setAttribute(`data-${scrollTop3 * 1.1}`, 'top: 0%');
parallaxImg3.setAttribute(`data-${scrollTop4}`, 'top: 30%');

skrollr.init();