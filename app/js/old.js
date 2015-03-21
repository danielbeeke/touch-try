$(function() {

  $('body')
  .on('mousedown', startDrag)
  .on('mouseup', endDrag)
  .on('mousemove', doDrag)

  var dragging = false
  var startX = 0
  var endX = 0
  var windowWidth = $(window).width()
  var element = $('.slides-handle')
  var slideIndex = 0
  var slideCount = 2
  var flipPoint = 400
  var resistancePoint = 800
  var resistanceSpeed = .3
  var menuItemCount = $('.mainmenu-link').length
  var elementStartedWith
  var slideOffset = 0

  function startDrag(e) {
    removeTransition()
    dragging = true
    startX = e.screenX
    elementStartedWith = e.target
  }

  function endDrag(e) {
    elementStartedWith = null
    element.css('transition', 'all .5s ease')
    dragging = false
    $('body').removeClass('is--dragging')
    endX = e.screenX

    var newPoint = 0
    var diff = startX - endX

    if (diff > flipPoint && slideIndex < (slideCount - 1)) {
      slideIndex = slideIndex + 1
    }
    else if (diff < -flipPoint  && slideIndex > 0) {
      slideIndex = slideIndex - 1
    }

    element.css('transform', 'translate3d(' + ((((slideIndex * -1) + slideOffset) * windowWidth) + newPoint) + 'px, 0, 0)')

    if ($('.mainmenu-link--is-dragged').length && diff > flipPoint) {
      $('.mainmenu-link--is-dragged').addClass('mainmenu-link--is-active')
      $('body').addClass('has--active-mainmenu-link')
      $('.mainmenu-link').removeAttr('style')
      element.css('transform', 'translate3d(-150vw, 0, 0)')
    }
    else {
      $('.mainmenu-link').removeAttr('style').css('height', (100 / menuItemCount) + '%')
      $('.mainmenu-link--is-dragged').removeClass('mainmenu-link--is-dragged')
    }

  }

  function removeTransition() {
    element.css('transition', 'none')
  }

  function doDrag(e) {
    if (dragging) {

      currentX = e.screenX

      var newPoint = 0
      var diff = startX - currentX

      if (diff > 0 && slideIndex < (slideCount - 1) || diff < 0  && slideIndex > 0) {
        element.css('transform', 'translate3d(' + ((((slideIndex * -1) + slideOffset) * windowWidth) + e.screenX - startX) + 'px, 0, 0)')
      }
      else {
        element.css('transform', 'translate3d(' + ((((slideIndex * -1) + slideOffset) * windowWidth) + (e.screenX - startX) * resistanceSpeed) + 'px, 0, 0)')
      }

      if ($(elementStartedWith).hasClass('mainmenu-link')) {
        $('body').addClass('is--dragging')

        $('.mainmenu-link').css('transition', 'opacity .5s ease-in-out')

        $('.mainmenu-link--is-dragged').removeClass('mainmenu-link--is-dragged')
        $(elementStartedWith).addClass('mainmenu-link--is-dragged')

        var maxPercentageToGive = 1 - (1 / menuItemCount)
        var dragPercentage = (diff * resistanceSpeed) / (resistancePoint / 100)

        var defaultHeight = 100 / menuItemCount

        var draggedHeight = ((dragPercentage * maxPercentageToGive) + defaultHeight) + '%'
        var othersHeight = ((100 - dragPercentage) / menuItemCount) + '%'

        $('.mainmenu-link.mainmenu-link--is-dragged').css('height', draggedHeight)
        $('.mainmenu-link:not(.mainmenu-link--is-dragged)').css('height', othersHeight)
      }

    }
  }

});
