"use strict";

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelectorAll(".burger-ico").forEach(function (burger) {
    return burger.addEventListener("click", function (eBurger) {
      this.querySelector("span") ? this.querySelector("span").classList.toggle("burger-ico--active") : false;
    });
  });
});
document.addEventListener("DOMContentLoaded", function (e) {
  var inputDown = "ontouchstart" in document.documentElement ? "touchstart" : "mousedown";
  var inputMove = "ontouchmove" in document.documentElement ? "touchmove" : "mousemove";
  var inputUp = "ontouchend" in document.documentElement ? "touchend" : "mouseup";
  var slider = document.querySelector(".comparison-images-slider__images-block");
  var imgAfter = document.querySelector(".comparison-images-slider__img-after-wrapper");
  var imgBefore = document.querySelector(".comparison-images-slider__img-before-wrapper");
  var sliderRange = document.querySelector(".comparison-images-slider__range-block");
  var circle = document.querySelector(".comparison-images-slider__range-circle");
  var leftSide = circle.previousElementSibling;

  var changeWidth = function changeWidth(eventMove) {
    var pageX = eventMove.pageX ? eventMove.pageX : eventMove.touches[0].pageX;
    var newWidthImg = (slider.offsetWidth - (pageX - slider.getBoundingClientRect().left)) / slider.offsetWidth * 100;
    var newWidthRange = (pageX - sliderRange.getBoundingClientRect().left - circle.offsetWidth / 2) / sliderRange.offsetWidth * 100;
    leftSide.style.width = "".concat(Math.min(Math.max(newWidthRange, 0), 100), "%");
    imgAfter.style.width = "".concat(Math.min(Math.max(newWidthImg, 0), 100), "%");
    imgBefore.style.width = "".concat(Math.min(Math.max(100 - newWidthImg, 0), 100), "%");
  };

  var MouseMoveHandler = function MouseMoveHandler(eventMove) {
    changeWidth(eventMove);
  };

  var MouseUpHandler = function MouseUpHandler(eventUp) {
    this.removeEventListener(inputMove, MouseMoveHandler);
    this.removeEventListener(inputUp, MouseUpHandler);
  };

  var DownHandler = function DownHandler(eventDown) {
    if (this === slider) {
      changeWidth(eventDown);
      slider.addEventListener(inputMove, MouseMoveHandler);
      slider.addEventListener(inputUp, MouseUpHandler);
    } else {
      document.addEventListener(inputMove, MouseMoveHandler);
      document.addEventListener(inputUp, MouseUpHandler);
    }
  };

  slider.addEventListener(inputDown, DownHandler);
  circle.addEventListener(inputDown, DownHandler); // circle.addEventListener('focus', (event) => {
  // 	comparisonImage.style.transition = "width 2s"
  // 	document.addEventListener('keypress', (event) => {})
  // 	circle.addEventListener('focusout', (event) => {})
  // })
});

if (document.querySelector('#YMapsID')) {
  YMaps.jQuery(function () {
    var map = new YMaps.Map(YMaps.jQuery("#YMapsID")[0]);
    map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  var btnToggle = document.querySelector(".header__toggle-nav");
  var pageNavList = document.querySelector(".navigation__list");
  var pageNavItems = document.querySelectorAll(".navigation__list-item a");

  if (pageNavList && pageNavList && pageNavItems) {
    btnToggle.addEventListener("click", function () {
      if (pageNavList.classList.toggle("navigation__list--active")) {
        btnToggle.attributes["aria-label"].value = "Закрыть меню";
        pageNavItems.forEach(function (el) {
          return el.tabIndex = 0;
        });
      } else {
        btnToggle.attributes["aria-label"].value = "Открыть меню";
        pageNavItems.forEach(function (el) {
          return el.tabIndex = -1;
        });
      }
    });
  }

  var navLine = document.querySelector(".navigation__line");
  var navItems = document.querySelectorAll(".navigation__link");
  var lastActive = document.querySelector(".navigation__link--active");

  if (navLine && navItems) {
    var changePositionLine = function changePositionLine(width, left) {
      if (window.innerWidth > 768) {
        navLine.style.width = "".concat(width, "px");
        navLine.style.left = "".concat(left, "px");
      }
    };

    setTimeout(function () {
      changePositionLine(lastActive.offsetWidth, lastActive.offsetLeft);
    }, 1000);
    navItems.forEach(function (navItem) {
      navItem.addEventListener("mouseenter", function (e) {
        changePositionLine(e.currentTarget.offsetWidth, e.currentTarget.offsetLeft);
      });
      navItem.addEventListener("mouseleave", function () {
        changePositionLine(lastActive.offsetWidth, lastActive.offsetLeft);
      });
      navItem.addEventListener("focus", function (e) {
        changePositionLine(e.currentTarget.offsetWidth, e.currentTarget.offsetLeft);
      });
      navItem.addEventListener("click", function (e) {
        lastActive.classList.toggle(".navigation__link--active");
        lastActive = e.currentTarget;
        lastActive.classList.toggle(".navigation__link--active");
      });
    });
  }
});