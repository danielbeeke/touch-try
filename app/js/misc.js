$(function() {

  $('img').on('dragstart', function(event) { event.preventDefault(); });
  $('body').removeClass('is--transitioning-in')
  $('.aboutme').dragscroll()

});
