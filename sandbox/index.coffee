{View, Controller, Application} = require('mvc')

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
      
# ==============================================================================

class UIView extends View
  @registerClass @name
  constructor: (options = {}) -> super
    
    
class UIItem extends UIView
  @registerClass @name
  constructor: (options = {}) -> super
    
    
class UISelectableItem extends UIItem
  @registerClass @name
  @mixin UIActivateMixin
  @mixin UIDisableMixin
  constructor: (options = {}) -> super
 

class UIClickableItem extends UISelectableItem
  @registerClass @name
  @mixin UIClickMixin
  constructor: (options = {}) -> super
    
    
class UIClickableItemWithHover extends UIClickableItem
  @registerClass @name
  @mixin UIHoverMixin
  constructor: (options = {}) -> super
      
class UIItemList extends UIView
  @registerClass @name
  
  emittedEvents: ['click', 'dblclick', 'activate', 'deactivate', 'disable', 'enable', 'enter', 'leave']
  
  constructor: (options) ->
    super
    @itemByCid = {}
    @items = @itemByIndex = []
    @count = 0
    @_initItems()
    
  _passEvent: (event, src) ->
    fn = => @emit(event, arguments...)
    fn.ownerId = @cid
    src.on event, fn
    return
    
  _initItems: (list=@el) ->
    list.children().each (i, _el) =>
      el = $(_el)
      klass = @getClassByName(el.data('class'))
      item = new (klass)(el: _el)
      @addItem(item)
    return
    
  change: (id) ->
    item = @getItem(id)
    item.activate() if item
    return this
    
  getItem: (id) ->
    return @itemByCid[id]   if $.isString(id)
    return @itemByIndex[id] if $.isNumber(id)
  
  addItem: (item) ->
    @itemByCid[item.cid] = item
    @itemByIndex[@count] = item
    @count++
    for event in @emittedEvents
      @_passEvent(event, item)
    return this
  
  removeItem: (id) ->
    item = @getItem(id)
    index = @itemByIndex.indexOf(item)
    delete @itemByCid[item.cid]
    delete @itemByIndex[index]
    @itemByIndex.remove(index)
    @count--
    return unless item
    for ev in uiItemListEvents
      for fn in item.listeners(ev)
        if fn.ownerId is @cid
          item.off(ev, fn)
    item.release()
    return item
    
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
  
class UIButton extends UIView
  @registerClass @name
  @mixin UIActivateMixin
  @mixin UIDisableMixin
  @mixin UIClickMixin
  @mixin UIHoverMixin
  @mixin UIFocusMixin
  @mixin UIPressEnterMixin
  constructor: (options) -> super
  

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

# ==================================================================================

class ModalX extends UIModal
  @registerClass @name
  events:
    'click .x': 'hide'
  constructor: -> super
  
class Toolbar extends UIItemList
  @registerClass @name
  constructor: (options) ->
    super


class SidebarController extends Controller
  @registerClass @name
  
  imports:
    sidebar: 'sidebar'
    content: 'content-view'
    
  events:
    'sidebar click': 'on_sidebarItemClick'
    'sidebar activate': 'on_sidebarItemActivate'
    'content-view activate': 'on_tabActivate'
    
  constructor: (options) ->
    super
    $.on 'loaded', =>
      for item in @sidebar.items
        @content
          .getItem(item.data.tabId)
          .data.btnId = item.cid
    
  on_sidebarItemClick: (item) =>
    item.activate()
  
  on_sidebarItemActivate: (item) =>
    @activeButton?.deactivate()
    @activeButton = item
    @content.change(item.data.tabId)
    
  on_tabActivate: (tab) =>
    @activeTab?.deactivate()
    @activeTab = tab
    @sidebar.change(tab.data.btnId)


class ContentView extends UIItemList
  @registerClass @name
  constructor: (options) -> super
  

class ModalController extends Controller
  @registerClass @name
  
  constructor: (options) ->
    super
    $.on 'loaded', =>
      @modal    = @$$(options.modal)
      @button   = @$$(options.button)
      @backdrop = @$$(@modal.data.backdrop)
      @button.on('click', @on_buttonClick)
      @button.on('activate', @on_buttonActivate)
      @button.on('deactivate', @on_buttonDeactivate)
      @modal.on('hide', @on_modalHide)
      @backdrop?.on('click', @on_backdropClick)
    
  on_buttonClick: (item) => 
    item.toggle()
    
  on_buttonActivate: (item) =>
    @backdrop?.show()
    @modal.show()   
    
  on_backdropClick: =>
    @modal.hide()
    @button.deactivate()
    
  on_buttonDeactivate: =>
    @modal.hide()
    @backdrop?.hide()
    
  on_modalHide: =>
    @backdrop?.hide()
    @button.deactivate()
    
  

class App extends Application
  setup:
    'cr-sidebar': [ 'SidebarController', {} ]
    'cr-modal1': [ 'ModalController', {modal: 'modal1', button: 'modal1-btn'}]
    'cr-modal2': [ 'ModalController', {modal: 'modal2', button: 'modal2-btn'}]
    
  events:
    'modal2 show': 'carousel1 play'
    'modal2 hide': 'carousel1 pause'
    'next-button click': 'carousel1 next'
    'prev-button click': 'carousel1 prev'
  constructor: (options = {}) ->
    @cid = 'app'
    super

new App