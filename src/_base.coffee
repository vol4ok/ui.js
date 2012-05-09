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