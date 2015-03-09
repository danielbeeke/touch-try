$(function() {

  new Dragdealer('slides', {
    steps: 2,
    speed: 0.3,
    loose: true,
    handleClass: 'slides-handle',
    requestAnimationFrame: true
  })

  $('.mainmenu-link').on('click', function () {
    $('body').doTransition('mainmenu-link', '.slides')


    return false
  })

  jQuery.fn.doTransition = function($className, $object) {
    $(this).addClass('has--' + $className + '--transition')

    return this.hide(0, function() {
      $(this).show()
      $(this).addClass('is--' + $className + '--transition')

      $($object).one('transitionend', function () {
        alert('test')
      })
    })
  }

});
