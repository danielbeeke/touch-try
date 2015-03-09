$(function() {

  var slider = new Dragdealer('slides', {
    steps: 2,
    speed: 0.5,
    loose: true,
    handleClass: 'slides-handle',
    requestAnimationFrame: true,
  })

  $('.mainmenu-link').on('click', function (e) {
    $(this).addClass('mainmenu-link--is-active')
    $(this).doTransition('mainmenu-link', function () {
      console.log($(this).attr('href'))
    })

    return false
  })


  $('.mainmenu-link').on('mousedown', function (e) {
    console.log('test')
  })

  jQuery.fn.doTransition = function($className, $callback) {
    $('body').addClass('has--' + $className + '--transition')

    return this.hide(0, function() {
      $(this).show()
      $('body').addClass('is--' + $className + '--transition')

      $(this).one('transitionend', function () {
        if (typeof $callback == 'function') {
          $callback()
        }
      })
    })
  }

});
