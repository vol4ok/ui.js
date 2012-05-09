class UIModal extends UIView
  @registerClass @name
  
  constructor: (options = {}) ->
    super
    @shown = no
    $.defer => @show() if options.active or @el.hasClass('active')
    
  _show: -> @el.addClass('active')
  _hide: -> @el.removeClass('active')
    
  show: =>
    return false if @shown
    @_show()
    @shown = yes
    @emit('show', this)
    return true
    
  hide: =>
    return false unless @shown
    @_hide()
    @shown = no
    @emit('hide', this)
    return true


class UIModalBackdrop extends UIModal
  @registerClass @name
  events: click: 'on_click'
  constructor: -> super
  on_click: => @emit('click', this)
  show: =>
    $('#container').attr('style','-webkit-filter: blur(3px);')
    super
    
  hide: =>
    $('#container').removeAttr('style')
    super