import 'bulma-start/css/main.css'
import './css/main.css'

const axios = require('axios')
const marked = require('marked')
const stylecss = require('./js/stylecss')

window.onload = function() {
  let path = window.location.pathname
  
  path = path.charAt(path.length - 1) == '/' ? path.concat('index.md') : path.replace('.html', '.md')
  path = '/page' + path

  let article = document.getElementById("article")
  if (article == null) return // only when <article> exists then load a markdown file

  axios.get(path)
      .then(function(response) {
        article.innerHTML = marked(response.data)

        stylecss.addPaddingUl()
      })
      .catch(function(error) {
        // console.log(error)
        article.innerHTML = '<strong> 404 not found. </strong>'
      })
      .finally(function() {

      });
}