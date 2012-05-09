module 'ui.carousel'
{UIItem, UIItemList} = require 'ui'

class UISlide extends UIItem
  @registerClass @name
  
  constructor: (options) -> 
    super
    @direction = 'left'
    @type = 'next'
    @active = options.active or @el.hasClass('active')
    @activating = no
    @deactivating = no
    @el.on 'transitionEnd', @on_transitionEnd
  
  on_transitionEnd: (e) =>
    @activateEnd() if @activating
    @deactivateEnd() if @deactivating
  
  activate: =>
    return false if @active
    @el.addClass(@type)
    @el[0].offsetWidth
    @el.addClass(@direction)
    @active = yes
    @emit('activate', this)
    @activating = yes
    return true
    
  activateEnd: =>
    @el.addClass('active')
    @el.removeClass(@type)
    @el.removeClass(@direction)
    @emit('activate-end', this)
    @activating = no
    
  deactivate: =>
    return unless @active
    @el.addClass(@direction)
    @active = no
    @emit('deactivate', this)
    @deactivating = yes
    return true
    
  deactivateEnd: =>
    @el.removeClass('active')
    @el.removeClass(@direction)
    @emit('activate-end', this)
    @deactivating = no
    
    
    
class UICarousel extends UIItemList
  @registerClass @name
  
  defaults:
    interval: 2000
    
  elements:
    'slideList': '.slide-list'
    
  constructor: (options = {}) -> 
    super
    @options = $.extend {}, @defaults, @data, options
    @interval = @options.interval
    @paused = @options.paused ? yes
    @play() if @interval? and not @options.paused
    @on('activate', @on_activate)
    
  _initItems: ->
    active = undefined
    @slideList.children().each (i, _el) =>
      el = $(_el)
      if el.hasClass('active')
        if active? then el.removeClass('active') else active = i
    super(@slideList)
    @active = @items[active]
    
  addItem: (item) ->
    prev = @items[@count-1]
    super
    if prev?
      item.next = prev.next
      item.prev = prev
      prev.next.prev = prev.next =  item
    else
      item.next = item.prev = item

  removeItem: (id) ->
    item = super
    item.prev.next = item.next
    item.next.prev = item.prev
    
  next: => 
    @active.next.activate()
    
  prev: => 
    @active.prev.activate()
  
  pause: =>
    return if @paused
    clearInterval(@intervalId)
    @paused = yes
    @emit('pause', this)
    for item in @items
      item.activateEnd() if item.activating
      item.deactivateEnd() if item.deactivating
    return this
    
  play: =>
    return unless @paused
    @intervalId = setInterval(@on_interval, @interval) 
    @paused = no
    @emit('play', this)
    return this
    
  on_interval: =>
    @next()

  on_activate: (item) =>
    @active.deactivate()
    @active = item
    
exports extends {UISlide, UICarousel}