// create html files in dist folder 

const fs = require('fs')
const path = require('path')

let index = './templete/index.html'
let templete = './templete/templete.html'

let indexContent = fs.readFileSync(index, 'utf8')
let templeteContent = fs.readFileSync(templete, 'utf8')

let src = './page'
let tar = './dist'
let indexPath = path.join(tar, 'index.html')

let copyTempleteFolder = function(src, tar) {
  fs.readdir(src, function(err, files) {
    if (err) console.log(err)
    
    files.forEach(function(file) {
      let srcP = path.join(src, file)
      let tarP = path.join(tar, file.replace('.md', '.html'))
      
      fs.stat(srcP, function(err, stats) {
        if (err) console.log(err)

        if (stats.isDirectory()) {
          fs.mkdir(tarP, function(err) {
            if (err) console.log(err)
            copyTempleteFolder(srcP, tarP)
          })
        } else {
          if (tarP == indexPath) fs.writeFile(tarP, indexContent, (err) => {}) // index page
          else fs.writeFile(tarP, templeteContent, (err) => {}) // templete page
        }
      })
    })
  })
}

copyTempleteFolder(src, tar)