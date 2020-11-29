(function () {
  'use strict'
  const resource = document.createElement('link')
  resource.setAttribute('rel', 'stylesheet')
  resource.setAttribute('href', 'https://fonts.googleapis.com/css?family=K2D:400,400i&amp;subset=latin-ext&display=swap')
  resource.setAttribute('type', 'text/css')
  document.getElementsByTagName('head')[0].appendChild(resource)

  const debounce = function debounce (fn, delay) {
    let timoutID
    let args
    return function () {
      for (let _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key]
      timoutID && clearTimeout(timoutID)
      timoutID = setTimeout(function () {
        fn.apply(undefined, args)
      }, delay)
    }
  }

  function ready (fn) {
    document.readyState !== 'loading'
      ? fn()
      : document.addEventListener
        ? document.addEventListener('DOMContentLoaded', fn)
        : document.attachEvent('onreadystatechange', function () {
          document.readyState !== 'loading' && fn()
        })
  }
  ready(function () {
    const allcon = document.getElementsByClassName('wrp')[0]
    const header = document.getElementsByTagName('header')[0]
    const menus = document.getElementsByClassName('exp')

    function menu (e) {
      if ((e.target.className !== 'act') && ((menus.length > 0 && e.target.getAttribute('role') !== 'button') || (document.documentElement.offsetWidth > 481))) {
        document.getElementsByClassName('act').length && document.getElementsByClassName('act')[0].classList.remove('act')
      }
      if (e.target.getAttribute('role') === 'button') {
        e.preventDefault()
        e.target.classList.toggle('act')
        document.getElementsByClassName('wraper')[0].scrollTop = menus[0].parentElement.scrollHeight
      }
    }
    setTimeout(function () {
      document.getElementById('spiner').style.display = 'none'
    }, 66)

    document.addEventListener('click', menu.bind(this))

    allcon.addEventListener('scroll', debounce(function () {
      allcon.scrollTop > 48 && allcon.offsetWidth > 480 ? header.classList.add('zero') : header.classList.remove('zero')
    }, 100))

    if (document.addEventListener) {
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault()
      }, false)
    } else {
      document.attachEvent('oncontextmenu', function () {
        window.event.returnValue = false
      })
    }
  })
}())
