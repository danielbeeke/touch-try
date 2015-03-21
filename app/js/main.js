$(function() {

  $('body').addClass('has-increased-main-menu')
  $('.mainmenu-link').css('transition', 'none')
  $('.mainmenuslide').css('transition', 'none')
  $('.mainmenu-link--blog').addClass('mainmenu-link--is-dragged')

  setTimeout(function () {
    $('.mainmenu-link').removeAttr('style')
    $('.mainmenuslide').removeAttr('style')
  }, 100)

  $('#slides').aslider({
    startSlide: 2,
    endCallback: function (info) {
      if (info.slideIndex == 2) {
        $('body').addClass('has-increased-main-menu')
      }
      else {
        $('body').removeClass('has--dragged-mainmenu-link')
        $('body').removeClass('has-increased-main-menu')
      }

      $('.mainmenu-link').removeAttr('style')
    },

    dragCallback: function (info) {
      // TODO make sure to also work when dragging a child of the menu link.
      if ($(info.dragElement).hasClass('mainmenu-link')) {
        $('body').addClass('has--dragged-mainmenu-link')
        $('.mainmenu-link--is-dragged').removeClass('mainmenu-link--is-dragged')
        $(info.dragElement).addClass('mainmenu-link--is-dragged')

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
