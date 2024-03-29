/*
 * Author Daniel Beeke
 */

;(function ( $, window, document, undefined ) {
  var pluginName = "aslider",
  defaults = {
    resistanceSpeed: 0.7,
    overleapSpeed: 0.2,
    flipPoint: 400,
    transitionString: "all .5s ease",
    startSlide: 0
  };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend( {}, defaults, options)

    this._defaults = defaults
    this._name = pluginName

    this.init()
  }

  var that

  Plugin.prototype = {
    init: function() {
      this.dragging = false
      this.startX = 0
      this.endX = 0
      this.windowWidth = $(window).width()
      this.slideIndex = this.options.startSlide
      this.diff = 0

      this.slideCount = $(this.element).find('.slides-slide').length
      this.dragElement = false

      that = this

      var $currentSlide = $(that.element).find('.slides-slide:nth-child(' + (that.slideIndex + 1) + ')')
      var currentSlidePositionLeft = $currentSlide.position().left
      var transformX = currentSlidePositionLeft

      $('.slides-handle', that.element).css('transform', 'translate3d(' + -transformX + 'px, 0, 0)')

      $('body')
      .on('mousedown', this.onStart)
      .on('mouseup', this.onEnd)
      .on('mousemove', this.onDrag)
    },

    onStart: function (e) {
      that.dragging = true
      that.startX = e.screenX
      that.dragElement = e.target
      that.removeTransition()
      if (that.options.startCallback) {
        that.options.startCallback(that)
      }
    },

    onEnd: function (e) {
      that.dragging = false
      that.endX = e.screenX
      that.addTransition()

      that.diff = that.endX - that.startX

      var cancelled = false
      if (that.options.cancelCallback) {
        cancelled = that.options.cancelCallback(that)
      }

      if (!cancelled) {
        if (that.diff < -that.options.flipPoint && that.slideIndex < (that.slideCount - 1)) {
          that.slideIndex = that.slideIndex + 1
        }
        else if (that.diff > that.options.flipPoint  && that.slideIndex > 0) {
          that.slideIndex = that.slideIndex - 1
        }
      }

      var $currentSlide = $(that.element).find('.slides-slide:nth-child(' + (that.slideIndex + 1) + ')')
      var currentSlidePositionLeft = $currentSlide.position().left
      var transformX = currentSlidePositionLeft

      $('.slides-handle', that.element).css('transform', 'translate3d(' + -transformX + 'px, 0, 0)')

      that.dragElement = false
      if (that.options.endCallback) {
        that.options.endCallback(that)
      }
    },

    onDrag: function(e) {
      if (that.dragging) {

        that.diff = e.screenX - that.startX

        if (that.diff) {
          var $currentSlide = $(that.element).find('.slides-slide:nth-child(' + (that.slideIndex + 1) + ')')
          var currentSlidePositionLeft = $currentSlide.position().left
          var currentSlideEnd = $currentSlide.width() + currentSlidePositionLeft

          // Add resistance if last or first slide.
          if (that.diff > 0 && currentSlidePositionLeft == 0 || that.diff < 0 && currentSlideEnd > $(that.element).width()) {
            var transformX = (that.diff * that.options.overleapSpeed) - currentSlidePositionLeft
          }
          else {
            var transformX = (that.diff * that.options.resistanceSpeed) - currentSlidePositionLeft
          }

          $('.slides-handle', that.element).css('transform', 'translate3d(' + transformX + 'px, 0, 0)')

          if (that.options.dragCallback) {
            that.options.dragCallback(that)
          }
        }
      }
    },

    addTransition: function () {
      $('.slides-handle', that.element).css('transition', that.options.transitionString)
    },

    removeTransition: function () {
      $('.slides-handle', that.element).css('transition', 'none')
    }
  }

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName,
        new Plugin( this, options ))
      }
    })
  }

})(jQuery, window, document);
