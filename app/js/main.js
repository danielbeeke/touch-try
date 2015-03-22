$(function() {
  var section = window.location.pathname.split('/')[1]
  var startSlide = 0

  if (section) {
    $('body').addClass('has-increased-main-menu')
    $('.mainmenu-link').css('transition', 'none')
    $('.mainmenuslide').css('transition', 'none')
    $('.mainmenu-link--' + section).addClass('mainmenu-link--is-dragged')
    startSlide = 2
  }

  setTimeout(function () {
    $('.mainmenu-link').removeAttr('style')
    $('.mainmenuslide').removeAttr('style')
  }, 100)

  $('.aboutme').dragscroll()

  $('#slides').aslider({
    startSlide: startSlide,
    cancelCallback: function (info) {
      if ($(info.dragElement).parents('.aboutslide').length && info.slideIndex == 1 && info.diff < 0) {
        return true
      }
    },
    endCallback: function (info) {
      if (info.slideIndex == 2) {
        $('body').addClass('has-increased-main-menu')

        if (section != $('.mainmenu-link--is-dragged').attr('data-category')) {
          $('.mainmenu-link--is-dragged').one('transitionend', function () {
            window.location = '/' + $('.mainmenu-link--is-dragged').attr('data-category')
          })
        }
      }
      else {
        $('body').removeClass('has--dragged-mainmenu-link')
        $('body').removeClass('has-increased-main-menu')
      }

      $('.mainmenu-link').removeAttr('style')

      if (info.slideIndex == 0 && section) {
        $('.slides-handle').one('transitionend', function () {
          window.location = '/'
        })
      }
    },

    dragCallback: function (info) {
      var $menuLink

      if ($(info.dragElement).hasClass('mainmenu-link')) {
        var $menuLink = $(info.dragElement)
      }
      else if ($(info.dragElement).parents('.mainmenu-link').length) {
        var $menuLink = $(info.dragElement).parents('.mainmenu-link')
      }

      if ($menuLink) {
        $('body').addClass('has--dragged-mainmenu-link')
        $('.mainmenu-link--is-dragged').removeClass('mainmenu-link--is-dragged')
        $menuLink.addClass('mainmenu-link--is-dragged')

        $('.mainmenu-link').css('transition', 'none')

        var menuItemCount = $('.mainmenu-link').length
        var defaultPercentage = 1 / menuItemCount
        var horizontalWidthToAnimate = $(window).width() / 2

        var percentageDragged = (1 / horizontalWidthToAnimate) * Math.abs(info.diff) * info.options.resistanceSpeed

        if (info.slideIndex == 2) {
          var percentageDragged = 1 - percentageDragged
        }

        var percentageToGive = 1 - defaultPercentage

        var dynamicDraggedHeight = percentageToGive * percentageDragged

        var draggedHeight = (dynamicDraggedHeight + defaultPercentage) * 100
        var othersHeight = (100 - draggedHeight) / (menuItemCount - 1)

        $('.mainmenu-link.mainmenu-link--is-dragged').css('height', draggedHeight + '%')
        $('.mainmenu-link:not(.mainmenu-link--is-dragged)').css('height', othersHeight + '%')
      }
    }
  })

});
