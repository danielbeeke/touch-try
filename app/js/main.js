$(function() {

  $('body')
  .on('mousedown', startDrag)
  .on('mouseup', endDrag)
  .on('mousemove', doDrag)
  .on('transitionend', removeTransition)

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

  function startDrag(e) {
    removeTransition()
    dragging = true
    startX = e.clientX
  }

  function endDrag(e) {
    dragging = false
    endX = e.clientX

    $('.mainmenu-link').removeAttr('style').css('height', (100 / menuItemCount) + '%')

    $('.mainmenu-link--is-currently-dragged').removeClass('mainmenu-link--is-currently-dragged')

    var newPoint = 0
    var diff = startX - endX

    if (diff > flipPoint && slideIndex < (slideCount - 1)) {
      slideIndex = slideIndex + 1
    }
    else if (diff < -flipPoint  && slideIndex > 0) {
      slideIndex = slideIndex - 1
    }

    element.css('transition', 'all .5s ease')
    element.css('transform', 'translate3d(' + (((slideIndex * -1) * windowWidth) + newPoint) + 'px, 0, 0)')

  }

  function removeTransition() {
    element.css('transition', 'none')
  }

  function doDrag(e) {
    if (dragging) {

      currentX = e.clientX

      var newPoint = 0
      var diff = startX - currentX

      if (diff > 0 && slideIndex < (slideCount - 1) || diff < 0  && slideIndex > 0) {
        element.css('transform', 'translate3d(' + (((slideIndex * -1) * windowWidth) + e.clientX - startX) + 'px, 0, 0)')
      }
      else if (resistancePoint > Math.abs(diff)) {
        element.css('transform', 'translate3d(' + (((slideIndex * -1) * windowWidth) + (e.clientX - startX) * resistanceSpeed) + 'px, 0, 0)')
      }


      if ($(e.target).hasClass('mainmenu-link') && diff > 0) {
        $('.mainmenu-link').css('transition', 'none')

        $('.mainmenu-link--is-currently-dragged').removeClass('mainmenu-link--is-currently-dragged')
        $(e.target).addClass('mainmenu-link--is-currently-dragged')

        var maxPercentageToGive = 1 - (1 / menuItemCount)
        var dragPercentage = diff / (resistancePoint / 100)

        var defaultHeight = 100 / menuItemCount

        var draggedHeight = ((dragPercentage * maxPercentageToGive) + defaultHeight) + '%'
        var othersHeight = ((100 - dragPercentage) / menuItemCount) + '%'

        $('.mainmenu-link.mainmenu-link--is-currently-dragged').css('height', draggedHeight)
        $('.mainmenu-link:not(.mainmenu-link--is-currently-dragged)').css('height', othersHeight)
      }

    }
  }

});
