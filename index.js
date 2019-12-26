import 'bulma-start/css/main.css'
import './css/main.css'

const axios = require('axios')
const marked = require('marked')
const stylecss = require('./js/stylecss')

window.onload = function() {
  let article = document.getElementById("article")

  axios.get('/page/index.md')
      .then(function(response) {
        article.innerHTML = marked(response.data)

        stylecss.addPaddingUl()
      })
      .catch(function(error) {
        console.log(error)
      })
      .finally(function() {

      });
}