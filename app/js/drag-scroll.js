/*
 * Author Daniel Beeke
 */

;(function ( $, window, document, undefined ) {
  var pluginName = "dragscroll",
  defaults = {
    resistanceSpeed: 0.7,
    overleapSpeed: 0.2,
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
      this.startY = 0
      this.endY = 0
      this.diff = 0

      that = this

      var transformX = 0

      $(that.element)
      .on('mousedown', this.onStart)
      .on('mouseup', this.onEnd)
      .on('mousemove', this.onDrag)
    },

    onStart: function (e) {
      that.dragging = true
      that.startY = e.screenY
    },

    onEnd: function (e) {
      that.dragging = false
      that.endY = e.screenY
    },

    onDrag: function(e) {
      if (that.dragging) {
        that.diff = that.startY - e.screenY

        if (that.diff) {
          var scrollTop = 0
          $(that.element).scrollTop(scrollTop)
        }
      }
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
