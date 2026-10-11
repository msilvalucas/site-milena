(function () {
  'use strict';

  var DESKTOP_MIN = 900;

  var header = document.getElementById('site-header');
  var menu = document.getElementById('menu-mobile');
  var menuToggle = document.getElementById('menu-toggle');
  var menuLabel = document.getElementById('menu-toggle-label');
  var faqButtons = document.querySelectorAll('.faq__btn');

  var scrolled = false;
  var menuOpen = false;

  function updateHeader() {
    header.classList.toggle('is-solid', scrolled || menuOpen);
  }

  function setMenu(open) {
    menuOpen = open;
    menu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuLabel.textContent = open ? 'Fechar' : 'Menu';
    document.body.classList.toggle('menu-open', open);
    updateHeader();
  }

  menuToggle.addEventListener('click', function () {
    setMenu(!menuOpen);
  });

  menu.querySelectorAll('.menu-mobile__nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (menuOpen && window.innerWidth >= DESKTOP_MIN) setMenu(false);
  });

  function onScroll() {
    var s = window.scrollY > 24;
    if (s !== scrolled) {
      scrolled = s;
      updateHeader();
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // FAQ: apenas uma resposta aberta por vez
  function setFaq(btn, open) {
    btn.setAttribute('aria-expanded', String(open));
    btn.querySelector('.faq__icon').textContent = open ? '–' : '+';
    document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
  }

  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var willOpen = btn.getAttribute('aria-expanded') !== 'true';
      faqButtons.forEach(function (other) {
        setFaq(other, false);
      });
      if (willOpen) setFaq(btn, true);
    });
  });
})();
