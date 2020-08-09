import 'bulma-start/css/main.css'
import './css/main.css'

const path = require('path')

const axios = require('axios')
const marked = require('marked')
const stylecss = require('./js/stylecss')

const TABMAP = { 'Home': 'index.md', 'Gadget': 'gadget.md', 'Blog': 'blog.md' }

window.onload = function () {
  let tabs = document.getElementById('tabs-ul')
  if (tabs != null) { // 是主页时才有 tabs-ul
    tabs = tabs.children
    for (let i = 0; i < tabs.length - 1; i++) {
      tabs[i].onclick = (e) => {
        clickTab(e, tabs, i)
      }
    }
  }

  let p = window.location.pathname
  if (p.split('/').length == 2) { // url 为主页的 url, 此时只加载第一个 tab
    console.log('tag')
    tabs[0].dispatchEvent(new MouseEvent('click', {}))
  } else { // 为其他 url 时，一般可能是 blog 的 url, 那么就加载 blog 的 md
    let md = p.charAt(p.length - 1) == '/' ? p.concat('index.md') : p.replace('.html', '.md')
    loadMD(md)
  }
}

function clickTab(e, tabs, index) {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('is-active')
  }
  tabs[index].classList.add('is-active')

  let md = tabs[index].innerText
  md = TABMAP[md]
  loadMD(md)
}

function loadMD(md) {
  let p = path.join('/page', md)

  let article = document.getElementById("article")
  if (article == null) return // only when <article> exists then load a markdown file

  axios.get(p)
    .then(function (response) {
      article.innerHTML = marked(response.data)
      stylecss.addPaddingUl()
    })
    .catch(function (error) {
      // console.log(error)
      article.innerHTML = '<strong> 404 not found. </strong>'
    })
    .finally(function () {

    })
}