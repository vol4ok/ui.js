class UIActivateMixin
  
  constructor: (options) ->
    @active = no
    $.defer => @activate() if options?.active or @el.hasClass('active')
    
  activate: =>
    return false if @active
    @el.addClass('active')
    @active = yes
    @emit('activate', this)
    return true
    
  deactivate: =>
    return false unless @active
    @el.removeClass('active')
    @active = no
    @emit('deactivate', this)
    return true
    
  toggle: =>
    if @active then @deactivate() else @activate()
    return this



class UIDisableMixin
  
  constructor: (options) ->
    @disable = no
    $.defer => @disable() if options?.disabled or @el.hasClass('disabled')

  disable: =>
    return false if @disabled
    @el.addClass('disabled')
    @disabled = yes
    @emit('disable', this)
    return true

  enable: =>
    return false unless @disabled
    @el.removeClass('disabled')
    @disabled = no
    @emit('enable', this)
    return true



class UIClickMixin
  
  events =
    'click':    'on_click'
    'dblclick': 'on_dblclick'
  
  constructor: ->
    @delegateEvents(events)
    
  on_click: (e) =>
    return false if @disabled
    @emit('click', this)

  on_dblclick: (e) =>
    return false if @disabled
    @emit('dblclick', this)



class UIFocusMixin
  
  events =
    'focus': 'on_focus'
    'blur': 'on_blur'
    
  constructor: ->
    @focus = no
    @delegateEvents(events)
    
  on_focus: =>
    return false if @disabled
    @emit('focus', this)
    
  on_blur: => 
    return false if @disabled
    @emit('blur', this)



class UIHoverMixin
  
  events =
    'mouseenter': 'on_enter'
    'mouseleave': 'on_leave'
    
  constructor: ->
    @hover = no
    @delegateEvents(events)
    
  on_enter: (e) =>
    return false if @disabled
    @el.addClass('hover')
    @hover = yes
    @emit('enter', this)

  on_leave: (e) =>
    return false if @disabled
    @el.removeClass('hover')
    @hover = no
    @emit('leave', this)



class UIPressEnterMixin
  
  events =
    'keydown': 'on_keydown'
    'keyup': 'on_keyup'
    
  constructor: ->
    @delegateEvents(events)
    
  on_keydown: (e) ->
    return false if @disabled
    if e.keyCode == 13 or e.keyCode == 32
      @el.addClass('active')
      
  on_keyup: (e) ->
    return false if @disabled
    if e.keyCode == 13 or e.keyCode == 32
      @el.removeClass('active')