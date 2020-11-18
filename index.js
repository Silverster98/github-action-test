let app;

window.onload = function () {
  app = new Vue({
    el: '#app',
    data: {
      firstname: 'Foo',
      lastname: 'Bar',
    },
    computed: {
      fullname: {
        get: function() {
          return this.firstname + ' ' + this.lastname
        },

        set: function(newValue) {
          var names = newValue.split(' ')
          this.firstname = names[0]
          this.lastname = names[names.length - 1]
        }
      }
    },
  })
}