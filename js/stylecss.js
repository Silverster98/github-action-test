module.exports = {
  addPaddingUl: function() {
    let uls = document.getElementsByTagName('ul')
    for (let ul of uls) {
      if (ul.parentNode.nodeName == 'LI') {
        let faPadding = ul.parentNode.style.paddingInlineStart
        faPadding = faPadding.replace('px', '') >>> 0
        ul.style.paddingInlineStart = 15 + faPadding + 'px'
      }
    }
  }
}
