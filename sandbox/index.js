(function() {
  var App, Application, ContentView, Controller, ModalController, ModalX, SidebarController, Toolbar, UIActivateMixin, UIButton, UICarousel, UIClickMixin, UIClickableItem, UIClickableItemWithHover, UIDisableMixin, UIFocusMixin, UIHoverMixin, UIItem, UIItemList, UIModal, UIModalBackdrop, UIPressEnterMixin, UISelectableItem, UISlide, UIView, View, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __slice = Array.prototype.slice;

  _ref = require('mvc'), View = _ref.View, Controller = _ref.Controller, Application = _ref.Application;

  UIActivateMixin = (function() {

    function UIActivateMixin(options) {
      this.toggle = __bind(this.toggle, this);
      this.deactivate = __bind(this.deactivate, this);
      this.activate = __bind(this.activate, this);
      var _this = this;
      this.active = false;
      $.defer(function() {
        if ((options != null ? options.active : void 0) || _this.el.hasClass('active')) {
          return _this.activate();
        }
      });
    }

    UIActivateMixin.prototype.activate = function() {
      if (this.active) return false;
      this.el.addClass('active');
      this.active = true;
      this.emit('activate', this);
      return true;
    };

    UIActivateMixin.prototype.deactivate = function() {
      if (!this.active) return false;
      this.el.removeClass('active');
      this.active = false;
      this.emit('deactivate', this);
      return true;
    };

    UIActivateMixin.prototype.toggle = function() {
      if (this.active) {
        this.deactivate();
      } else {
        this.activate();
      }
      return this;
    };

    return UIActivateMixin;

  })();

  UIDisableMixin = (function() {

    function UIDisableMixin(options) {
      this.enable = __bind(this.enable, this);
      this.disable = __bind(this.disable, this);
      var _this = this;
      this.disable = false;
      $.defer(function() {
        if ((options != null ? options.disabled : void 0) || _this.el.hasClass('disabled')) {
          return _this.disable();
        }
      });
    }

    UIDisableMixin.prototype.disable = function() {
      if (this.disabled) return false;
      this.el.addClass('disabled');
      this.disabled = true;
      this.emit('disable', this);
      return true;
    };

    UIDisableMixin.prototype.enable = function() {
      if (!this.disabled) return false;
      this.el.removeClass('disabled');
      this.disabled = false;
      this.emit('enable', this);
      return true;
    };

    return UIDisableMixin;

  })();

  UIClickMixin = (function() {
    var events;

    events = {
      'click': 'on_click',
      'dblclick': 'on_dblclick'
    };

    function UIClickMixin() {
      this.on_dblclick = __bind(this.on_dblclick, this);
      this.on_click = __bind(this.on_click, this);      this.delegateEvents(events);
    }

    UIClickMixin.prototype.on_click = function(e) {
      if (this.disabled) return false;
      return this.emit('click', this);
    };

    UIClickMixin.prototype.on_dblclick = function(e) {
      if (this.disabled) return false;
      return this.emit('dblclick', this);
    };

    return UIClickMixin;

  })();

  UIFocusMixin = (function() {
    var events;

    events = {
      'focus': 'on_focus',
      'blur': 'on_blur'
    };

    function UIFocusMixin() {
      this.on_blur = __bind(this.on_blur, this);
      this.on_focus = __bind(this.on_focus, this);      this.focus = false;
      this.delegateEvents(events);
    }

    UIFocusMixin.prototype.on_focus = function() {
      if (this.disabled) return false;
      return this.emit('focus', this);
    };

    UIFocusMixin.prototype.on_blur = function() {
      if (this.disabled) return false;
      return this.emit('blur', this);
    };

    return UIFocusMixin;

  })();

  UIHoverMixin = (function() {
    var events;

    events = {
      'mouseenter': 'on_enter',
      'mouseleave': 'on_leave'
    };

    function UIHoverMixin() {
      this.on_leave = __bind(this.on_leave, this);
      this.on_enter = __bind(this.on_enter, this);      this.hover = false;
      this.delegateEvents(events);
    }

    UIHoverMixin.prototype.on_enter = function(e) {
      if (this.disabled) return false;
      this.el.addClass('hover');
      this.hover = true;
      return this.emit('enter', this);
    };

    UIHoverMixin.prototype.on_leave = function(e) {
      if (this.disabled) return false;
      this.el.removeClass('hover');
      this.hover = false;
      return this.emit('leave', this);
    };

    return UIHoverMixin;

  })();

  UIPressEnterMixin = (function() {
    var events;

    events = {
      'keydown': 'on_keydown',
      'keyup': 'on_keyup'
    };

    function UIPressEnterMixin() {
      this.delegateEvents(events);
    }

    UIPressEnterMixin.prototype.on_keydown = function(e) {
      if (this.disabled) return false;
      if (e.keyCode === 13 || e.keyCode === 32) return this.el.addClass('active');
    };

    UIPressEnterMixin.prototype.on_keyup = function(e) {
      if (this.disabled) return false;
      if (e.keyCode === 13 || e.keyCode === 32) {
        return this.el.removeClass('active');
      }
    };

    return UIPressEnterMixin;

  })();

  UIView = (function(_super) {

    __extends(UIView, _super);

    UIView.registerClass(UIView.name);

    function UIView(options) {
      if (options == null) options = {};
      UIView.__super__.constructor.apply(this, arguments);
    }

    return UIView;

  })(View);

  UIItem = (function(_super) {

    __extends(UIItem, _super);

    UIItem.registerClass(UIItem.name);

    function UIItem(options) {
      if (options == null) options = {};
      UIItem.__super__.constructor.apply(this, arguments);
    }

    return UIItem;

  })(UIView);

  UISelectableItem = (function(_super) {

    __extends(UISelectableItem, _super);

    UISelectableItem.registerClass(UISelectableItem.name);

    UISelectableItem.mixin(UIActivateMixin);

    UISelectableItem.mixin(UIDisableMixin);

    function UISelectableItem(options) {
      if (options == null) options = {};
      UISelectableItem.__super__.constructor.apply(this, arguments);
    }

    return UISelectableItem;

  })(UIItem);

  UIClickableItem = (function(_super) {

    __extends(UIClickableItem, _super);

    UIClickableItem.registerClass(UIClickableItem.name);

    UIClickableItem.mixin(UIClickMixin);

    function UIClickableItem(options) {
      if (options == null) options = {};
      UIClickableItem.__super__.constructor.apply(this, arguments);
    }

    return UIClickableItem;

  })(UISelectableItem);

  UIClickableItemWithHover = (function(_super) {

    __extends(UIClickableItemWithHover, _super);

    UIClickableItemWithHover.registerClass(UIClickableItemWithHover.name);

    UIClickableItemWithHover.mixin(UIHoverMixin);

    function UIClickableItemWithHover(options) {
      if (options == null) options = {};
      UIClickableItemWithHover.__super__.constructor.apply(this, arguments);
    }

    return UIClickableItemWithHover;

  })(UIClickableItem);

  UIItemList = (function(_super) {

    __extends(UIItemList, _super);

    UIItemList.registerClass(UIItemList.name);

    UIItemList.prototype.emittedEvents = ['click', 'dblclick', 'activate', 'deactivate', 'disable', 'enable', 'enter', 'leave'];

    function UIItemList(options) {
      UIItemList.__super__.constructor.apply(this, arguments);
      this.itemByCid = {};
      this.items = this.itemByIndex = [];
      this.count = 0;
      this._initItems();
    }

    UIItemList.prototype._passEvent = function(event, src) {
      var fn,
        _this = this;
      fn = function() {
        return _this.emit.apply(_this, [event].concat(__slice.call(arguments)));
      };
      fn.ownerId = this.cid;
      src.on(event, fn);
    };

    UIItemList.prototype._initItems = function(list) {
      var _this = this;
      if (list == null) list = this.el;
      list.children().each(function(i, _el) {
        var el, item, klass;
        el = $(_el);
        klass = _this.getClassByName(el.data('class'));
        item = new klass({
          el: _el
        });
        return _this.addItem(item);
      });
    };

    UIItemList.prototype.change = function(id) {
      var item;
      item = this.getItem(id);
      if (item) item.activate();
      return this;
    };

    UIItemList.prototype.getItem = function(id) {
      if ($.isString(id)) return this.itemByCid[id];
      if ($.isNumber(id)) return this.itemByIndex[id];
    };

    UIItemList.prototype.addItem = function(item) {
      var event, _i, _len, _ref2;
      this.itemByCid[item.cid] = item;
      this.itemByIndex[this.count] = item;
      this.count++;
      _ref2 = this.emittedEvents;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        event = _ref2[_i];
        this._passEvent(event, item);
      }
      return this;
    };

    UIItemList.prototype.removeItem = function(id) {
      var ev, fn, index, item, _i, _j, _len, _len2, _ref2;
      item = this.getItem(id);
      index = this.itemByIndex.indexOf(item);
      delete this.itemByCid[item.cid];
      delete this.itemByIndex[index];
      this.itemByIndex.remove(index);
      this.count--;
      if (!item) return;
      for (_i = 0, _len = uiItemListEvents.length; _i < _len; _i++) {
        ev = uiItemListEvents[_i];
        _ref2 = item.listeners(ev);
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          fn = _ref2[_j];
          if (fn.ownerId === this.cid) item.off(ev, fn);
        }
      }
      item.release();
      return item;
    };

    return UIItemList;

  })(UIView);

  UIModal = (function(_super) {

    __extends(UIModal, _super);

    UIModal.registerClass(UIModal.name);

    function UIModal(options) {
      var _this = this;
      if (options == null) options = {};
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      UIModal.__super__.constructor.apply(this, arguments);
      this.shown = false;
      $.defer(function() {
        if (options.active || _this.el.hasClass('active')) return _this.show();
      });
    }

    UIModal.prototype._show = function() {
      return this.el.addClass('active');
    };

    UIModal.prototype._hide = function() {
      return this.el.removeClass('active');
    };

    UIModal.prototype.show = function() {
      if (this.shown) return false;
      this._show();
      this.shown = true;
      this.emit('show', this);
      return true;
    };

    UIModal.prototype.hide = function() {
      if (!this.shown) return false;
      this._hide();
      this.shown = false;
      this.emit('hide', this);
      return true;
    };

    return UIModal;

  })(UIView);

  UIModalBackdrop = (function(_super) {

    __extends(UIModalBackdrop, _super);

    UIModalBackdrop.registerClass(UIModalBackdrop.name);

    UIModalBackdrop.prototype.events = {
      click: 'on_click'
    };

    function UIModalBackdrop() {
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.on_click = __bind(this.on_click, this);      UIModalBackdrop.__super__.constructor.apply(this, arguments);
    }

    UIModalBackdrop.prototype.on_click = function() {
      return this.emit('click', this);
    };

    UIModalBackdrop.prototype.show = function() {
      $('#container').attr('style', '-webkit-filter: blur(3px);');
      return UIModalBackdrop.__super__.show.apply(this, arguments);
    };

    UIModalBackdrop.prototype.hide = function() {
      $('#container').removeAttr('style');
      return UIModalBackdrop.__super__.hide.apply(this, arguments);
    };

    return UIModalBackdrop;

  })(UIModal);

  UIButton = (function(_super) {

    __extends(UIButton, _super);

    UIButton.registerClass(UIButton.name);

    UIButton.mixin(UIActivateMixin);

    UIButton.mixin(UIDisableMixin);

    UIButton.mixin(UIClickMixin);

    UIButton.mixin(UIHoverMixin);

    UIButton.mixin(UIFocusMixin);

    UIButton.mixin(UIPressEnterMixin);

    function UIButton(options) {
      UIButton.__super__.constructor.apply(this, arguments);
    }

    return UIButton;

  })(UIView);

  UISlide = (function(_super) {

    __extends(UISlide, _super);

    UISlide.registerClass(UISlide.name);

    function UISlide(options) {
      this.deactivateEnd = __bind(this.deactivateEnd, this);
      this.deactivate = __bind(this.deactivate, this);
      this.activateEnd = __bind(this.activateEnd, this);
      this.activate = __bind(this.activate, this);
      this.on_transitionEnd = __bind(this.on_transitionEnd, this);      UISlide.__super__.constructor.apply(this, arguments);
      this.direction = 'left';
      this.type = 'next';
      this.active = options.active || this.el.hasClass('active');
      this.activating = false;
      this.deactivating = false;
      this.el.on('transitionEnd', this.on_transitionEnd);
    }

    UISlide.prototype.on_transitionEnd = function(e) {
      if (this.activating) this.activateEnd();
      if (this.deactivating) return this.deactivateEnd();
    };

    UISlide.prototype.activate = function() {
      if (this.active) return false;
      this.el.addClass(this.type);
      this.el[0].offsetWidth;
      this.el.addClass(this.direction);
      this.active = true;
      this.emit('activate', this);
      this.activating = true;
      return true;
    };

    UISlide.prototype.activateEnd = function() {
      this.el.addClass('active');
      this.el.removeClass(this.type);
      this.el.removeClass(this.direction);
      this.emit('activate-end', this);
      return this.activating = false;
    };

    UISlide.prototype.deactivate = function() {
      if (!this.active) return;
      this.el.addClass(this.direction);
      this.active = false;
      this.emit('deactivate', this);
      this.deactivating = true;
      return true;
    };

    UISlide.prototype.deactivateEnd = function() {
      this.el.removeClass('active');
      this.el.removeClass(this.direction);
      this.emit('activate-end', this);
      return this.deactivating = false;
    };

    return UISlide;

  })(UIItem);

  UICarousel = (function(_super) {

    __extends(UICarousel, _super);

    UICarousel.registerClass(UICarousel.name);

    UICarousel.prototype.defaults = {
      interval: 2000
    };

    UICarousel.prototype.elements = {
      'slideList': '.slide-list'
    };

    function UICarousel(options) {
      var _ref2;
      if (options == null) options = {};
      this.on_activate = __bind(this.on_activate, this);
      this.on_interval = __bind(this.on_interval, this);
      this.play = __bind(this.play, this);
      this.pause = __bind(this.pause, this);
      this.prev = __bind(this.prev, this);
      this.next = __bind(this.next, this);
      UICarousel.__super__.constructor.apply(this, arguments);
      this.options = $.extend({}, this.defaults, this.data, options);
      this.interval = this.options.interval;
      this.paused = (_ref2 = this.options.paused) != null ? _ref2 : true;
      if ((this.interval != null) && !this.options.paused) this.play();
      this.on('activate', this.on_activate);
    }

    UICarousel.prototype._initItems = function() {
      var active,
        _this = this;
      active = void 0;
      this.slideList.children().each(function(i, _el) {
        var el;
        el = $(_el);
        if (el.hasClass('active')) {
          if (active != null) {
            return el.removeClass('active');
          } else {
            return active = i;
          }
        }
      });
      UICarousel.__super__._initItems.call(this, this.slideList);
      return this.active = this.items[active];
    };

    UICarousel.prototype.addItem = function(item) {
      var prev;
      prev = this.items[this.count - 1];
      UICarousel.__super__.addItem.apply(this, arguments);
      if (prev != null) {
        item.next = prev.next;
        item.prev = prev;
        return prev.next.prev = prev.next = item;
      } else {
        return item.next = item.prev = item;
      }
    };

    UICarousel.prototype.removeItem = function(id) {
      var item;
      item = UICarousel.__super__.removeItem.apply(this, arguments);
      item.prev.next = item.next;
      return item.next.prev = item.prev;
    };

    UICarousel.prototype.next = function() {
      return this.active.next.activate();
    };

    UICarousel.prototype.prev = function() {
      return this.active.prev.activate();
    };

    UICarousel.prototype.pause = function() {
      var item, _i, _len, _ref2;
      if (this.paused) return;
      clearInterval(this.intervalId);
      this.paused = true;
      this.emit('pause', this);
      _ref2 = this.items;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        item = _ref2[_i];
        if (item.activating) item.activateEnd();
        if (item.deactivating) item.deactivateEnd();
      }
      return this;
    };

    UICarousel.prototype.play = function() {
      if (!this.paused) return;
      this.intervalId = setInterval(this.on_interval, this.interval);
      this.paused = false;
      this.emit('play', this);
      return this;
    };

    UICarousel.prototype.on_interval = function() {
      return this.next();
    };

    UICarousel.prototype.on_activate = function(item) {
      this.active.deactivate();
      return this.active = item;
    };

    return UICarousel;

  })(UIItemList);

  ModalX = (function(_super) {

    __extends(ModalX, _super);

    ModalX.registerClass(ModalX.name);

    ModalX.prototype.events = {
      'click .x': 'hide'
    };

    function ModalX() {
      ModalX.__super__.constructor.apply(this, arguments);
    }

    return ModalX;

  })(UIModal);

  Toolbar = (function(_super) {

    __extends(Toolbar, _super);

    Toolbar.registerClass(Toolbar.name);

    function Toolbar(options) {
      Toolbar.__super__.constructor.apply(this, arguments);
    }

    return Toolbar;

  })(UIItemList);

  SidebarController = (function(_super) {

    __extends(SidebarController, _super);

    SidebarController.registerClass(SidebarController.name);

    SidebarController.prototype.imports = {
      sidebar: 'sidebar',
      content: 'content-view'
    };

    SidebarController.prototype.events = {
      'sidebar click': 'on_sidebarItemClick',
      'sidebar activate': 'on_sidebarItemActivate',
      'content-view activate': 'on_tabActivate'
    };

    function SidebarController(options) {
      this.on_tabActivate = __bind(this.on_tabActivate, this);
      this.on_sidebarItemActivate = __bind(this.on_sidebarItemActivate, this);
      this.on_sidebarItemClick = __bind(this.on_sidebarItemClick, this);
      var _this = this;
      SidebarController.__super__.constructor.apply(this, arguments);
      $.on('loaded', function() {
        var item, _i, _len, _ref2, _results;
        _ref2 = _this.sidebar.items;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          item = _ref2[_i];
          _results.push(_this.content.getItem(item.data.tabId).data.btnId = item.cid);
        }
        return _results;
      });
    }

    SidebarController.prototype.on_sidebarItemClick = function(item) {
      return item.activate();
    };

    SidebarController.prototype.on_sidebarItemActivate = function(item) {
      var _ref2;
      if ((_ref2 = this.activeButton) != null) _ref2.deactivate();
      this.activeButton = item;
      return this.content.change(item.data.tabId);
    };

    SidebarController.prototype.on_tabActivate = function(tab) {
      var _ref2;
      if ((_ref2 = this.activeTab) != null) _ref2.deactivate();
      this.activeTab = tab;
      return this.sidebar.change(tab.data.btnId);
    };

    return SidebarController;

  })(Controller);

  ContentView = (function(_super) {

    __extends(ContentView, _super);

    ContentView.registerClass(ContentView.name);

    function ContentView(options) {
      ContentView.__super__.constructor.apply(this, arguments);
    }

    return ContentView;

  })(UIItemList);

  ModalController = (function(_super) {

    __extends(ModalController, _super);

    ModalController.registerClass(ModalController.name);

    function ModalController(options) {
      this.on_modalHide = __bind(this.on_modalHide, this);
      this.on_buttonDeactivate = __bind(this.on_buttonDeactivate, this);
      this.on_backdropClick = __bind(this.on_backdropClick, this);
      this.on_buttonActivate = __bind(this.on_buttonActivate, this);
      this.on_buttonClick = __bind(this.on_buttonClick, this);
      var _this = this;
      ModalController.__super__.constructor.apply(this, arguments);
      $.on('loaded', function() {
        var _ref2;
        _this.modal = _this.$$(options.modal);
        _this.button = _this.$$(options.button);
        _this.backdrop = _this.$$(_this.modal.data.backdrop);
        _this.button.on('click', _this.on_buttonClick);
        _this.button.on('activate', _this.on_buttonActivate);
        _this.button.on('deactivate', _this.on_buttonDeactivate);
        _this.modal.on('hide', _this.on_modalHide);
        return (_ref2 = _this.backdrop) != null ? _ref2.on('click', _this.on_backdropClick) : void 0;
      });
    }

    ModalController.prototype.on_buttonClick = function(item) {
      return item.toggle();
    };

    ModalController.prototype.on_buttonActivate = function(item) {
      var _ref2;
      if ((_ref2 = this.backdrop) != null) _ref2.show();
      return this.modal.show();
    };

    ModalController.prototype.on_backdropClick = function() {
      this.modal.hide();
      return this.button.deactivate();
    };

    ModalController.prototype.on_buttonDeactivate = function() {
      var _ref2;
      this.modal.hide();
      return (_ref2 = this.backdrop) != null ? _ref2.hide() : void 0;
    };

    ModalController.prototype.on_modalHide = function() {
      var _ref2;
      if ((_ref2 = this.backdrop) != null) _ref2.hide();
      return this.button.deactivate();
    };

    return ModalController;

  })(Controller);

  App = (function(_super) {

    __extends(App, _super);

    App.prototype.setup = {
      'cr-sidebar': ['SidebarController', {}],
      'cr-modal1': [
        'ModalController', {
          modal: 'modal1',
          button: 'modal1-btn'
        }
      ],
      'cr-modal2': [
        'ModalController', {
          modal: 'modal2',
          button: 'modal2-btn'
        }
      ]
    };

    App.prototype.events = {
      'modal2 show': 'carousel1 play',
      'modal2 hide': 'carousel1 pause',
      'next-button click': 'carousel1 next',
      'prev-button click': 'carousel1 prev'
    };

    function App(options) {
      if (options == null) options = {};
      this.cid = 'app';
      App.__super__.constructor.apply(this, arguments);
    }

    return App;

  })(Application);

  new App;

}).call(this);
