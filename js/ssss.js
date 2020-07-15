/*jshint esversion: 6 */
/* jshint expr: true */
;(function () {
  'use strict';
  let bod = document.getElementsByClassName('wrp')[0];
  let header = document.getElementsByTagName("header")[0];
  let navwrap = document.getElementsByClassName("menu")[0];
  let active = document.getElementsByClassName("active");
  navwrap.focus(); // focus on menu for TAB naviga

  function getIds(el) {
    if (el.target.getAttribute("href"))
      return (el.target.getAttribute("href").substr(1) || false);
  }

  document.addEventListener("click", function (e) {
    if (!e.target.matches(".menu a") || !e.target.parentElement.getElementsByTagName("ul")[0]) {
      el();
      if (document.getElementById(getIds(e)))
        document.getElementById(getIds(e)).classList.add("blic");
      let kd = setTimeout(function () {
        clearTimeout(kd);
        if (document.getElementById(getIds(e)))
          document.getElementById(getIds(e)).classList.remove("blic");
      }, 1500);
      return;
    } else e.preventDefault();

    function el() {
      if (active[0] !== e.target && active.length !== 0) {
        active[0].parentElement.getElementsByTagName("ul")[0].classList.add('hid');
        active[0].classList.remove("active");
      }
      if (!e.target.nextElementSibling) {
        document.getElementsByClassName("bur")[0].classList.remove("act");
        document.getElementsByClassName("nav")[0].classList.add("hid");
      }
    }
    el();

    e.target.parentElement.getElementsByTagName("ul")[0].classList.toggle('hid');
    if (e.target.classList.contains("bur")) {
      e.target.classList.toggle('act');
    } else {
      e.target.classList.toggle('active');
    }
  }, true);


  //for spiner start
  function showPage() {
    setTimeout(() => document.getElementById('spiner').style.display = "none", 1500);
  }
  document.addEventListener("DOMContentLoaded", showPage);
  //for spiner end

  // //for window scroll strat
  // const addWillChange = (e) => {
  //   e.target.style.willChange = 'scroll-position';
  // };
  // const removeChange = (e) => {
  //   e.target.style.willChange = 'none';
  // };
  // wraper.addEventListener('mouseenter', addWillChange);
  // wraper.addEventListener('animationend', removeChange);
  // //for window scroll end



  let oldScroll = 0,
    ticking = !1;

  function doSomething() {
    header.style.height = (48< bod.scrollTop && 480 < navwrap.offsetWidth) ? 0 : null;
  }
  bod.addEventListener("scroll", function () {
    (oldScroll = this.scrollTop),
    ticking ||
      (window.requestAnimationFrame(function () {
          doSomething(oldScroll), (ticking = !1);
        }),
        (ticking = !0));
  });

}()); 
