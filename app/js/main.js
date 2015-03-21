$(function() {

  $('#slides').aslider({
    endCallback: function (info) {
      if (info.slideIndex == 2) {
        $('body').addClass('has-increased-main-menu')
      }
      else {
        cleanUpMenuItem()
        $('body').removeClass('has-increased-main-menu')
      }
    },
    dragCallback: function (info) {
      if ($(info.dragElement).hasClass('mainmenu-link')) {
        $('body').addClass('has--dragged-mainmenu-link')
        $(info.dragElement).addClass('mainmenu-link--is-dragged')
      }
      else {
        cleanUpMenuItem()
      }
    }
  })

  function cleanUpMenuItem() {
    $('body').removeClass('has--dragged-mainmenu-link')
    $('.mainmenu-link--is-dragged').removeClass('mainmenu-link--is-dragged')
  }

});
