$.ns([ "./ui", "ui" ], function(exports) {
  var Application, Controller, View, _ref;
  _ref = require("mvc"), View = _ref.View, Controller = _ref.Controller, Application = _ref.Application;
  var UIActivateMixin, UIClickMixin, UIDisableMixin, UIFocusMixin, UIHoverMixin, UIPressEnterMixin;
  UIActivateMixin = function() {
    UIActivateMixin.name = "UIActivateMixin";
    function UIActivateMixin(options) {
      this.toggle = $.bind(this.toggle, this);
      this.deactivate = $.bind(this.deactivate, this);
      this.activate = $.bind(this.activate, this);
      var _this = this;
      this.active = false;
      $.defer(function() {
        if ((options != null ? options.active : void 0) || _this.el.hasClass("active")) {
          return _this.activate();
        }
      });
    }
    UIActivateMixin.prototype.activate = function() {
      if (this.active) {
        return false;
      }
      this.el.addClass("active");
      this.active = true;
      this.emit("activate", this);
      return true;
    };
    UIActivateMixin.prototype.deactivate = function() {
      if (!this.active) {
        return false;
      }
      this.el.removeClass("active");
      this.active = false;
      this.emit("deactivate", this);
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
  }();
  UIDisableMixin = function() {
    UIDisableMixin.name = "UIDisableMixin";
    function UIDisableMixin(options) {
      this.enable = $.bind(this.enable, this);
      this.disable = $.bind(this.disable, this);
      var _this = this;
      this.disable = false;
      $.defer(function() {
        if ((options != null ? options.disabled : void 0) || _this.el.hasClass("disabled")) {
          return _this.disable();
        }
      });
    }
    UIDisableMixin.prototype.disable = function() {
      if (this.disabled) {
        return false;
      }
      this.el.addClass("disabled");
      this.disabled = true;
      this.emit("disable", this);
      return true;
    };
    UIDisableMixin.prototype.enable = function() {
      if (!this.disabled) {
        return false;
      }
      this.el.removeClass("disabled");
      this.disabled = false;
      this.emit("enable", this);
      return true;
    };
    return UIDisableMixin;
  }();
  UIClickMixin = function() {
    var events;
    UIClickMixin.name = "UIClickMixin";
    events = {
      click: "on_click",
      dblclick: "on_dblclick"
    };
    function UIClickMixin() {
      this.on_dblclick = $.bind(this.on_dblclick, this);
      this.on_click = $.bind(this.on_click, this);
      this.delegateEvents(events);
    }
    UIClickMixin.prototype.on_click = function(e) {
      if (this.disabled) {
        return false;
      }
      return this.emit("click", this);
    };
    UIClickMixin.prototype.on_dblclick = function(e) {
      if (this.disabled) {
        return false;
      }
      return this.emit("dblclick", this);
    };
    return UIClickMixin;
  }();
  UIFocusMixin = function() {
    var events;
    UIFocusMixin.name = "UIFocusMixin";
    events = {
      focus: "on_focus",
      blur: "on_blur"
    };
    function UIFocusMixin() {
      this.on_blur = $.bind(this.on_blur, this);
      this.on_focus = $.bind(this.on_focus, this);
      this.focus = false;
      this.delegateEvents(events);
    }
    UIFocusMixin.prototype.on_focus = function() {
      if (this.disabled) {
        return false;
      }
      return this.emit("focus", this);
    };
    UIFocusMixin.prototype.on_blur = function() {
      if (this.disabled) {
        return false;
      }
      return this.emit("blur", this);
    };
    return UIFocusMixin;
  }();
  UIHoverMixin = function() {
    var events;
    UIHoverMixin.name = "UIHoverMixin";
    events = {
      mouseenter: "on_enter",
      mouseleave: "on_leave"
    };
    function UIHoverMixin() {
      this.on_leave = $.bind(this.on_leave, this);
      this.on_enter = $.bind(this.on_enter, this);
      this.hover = false;
      this.delegateEvents(events);
    }
    UIHoverMixin.prototype.on_enter = function(e) {
      if (this.disabled) {
        return false;
      }
      this.el.addClass("hover");
      this.hover = true;
      return this.emit("enter", this);
    };
    UIHoverMixin.prototype.on_leave = function(e) {
      if (this.disabled) {
        return false;
      }
      this.el.removeClass("hover");
      this.hover = false;
      return this.emit("leave", this);
    };
    return UIHoverMixin;
  }();
  UIPressEnterMixin = function() {
    var events;
    UIPressEnterMixin.name = "UIPressEnterMixin";
    events = {
      keydown: "on_keydown",
      keyup: "on_keyup"
    };
    function UIPressEnterMixin() {
      this.delegateEvents(events);
    }
    UIPressEnterMixin.prototype.on_keydown = function(e) {
      if (this.disabled) {
        return false;
      }
      if (e.keyCode === 13 || e.keyCode === 32) {
        return this.el.addClass("active");
      }
    };
    UIPressEnterMixin.prototype.on_keyup = function(e) {
      if (this.disabled) {
        return false;
      }
      if (e.keyCode === 13 || e.keyCode === 32) {
        return this.el.removeClass("active");
      }
    };
    return UIPressEnterMixin;
  }();
  var UIClickableItem, UIClickableItemWithHover, UIItem, UIItemList, UISelectableItem, UIView;
  UIView = function(_super) {
    $.inherit(UIView, _super);
    UIView.name = "UIView";
    UIView.registerClass(UIView.name);
    function UIView(options) {
      if (options == null) {
        options = {};
      }
      UIView.__super__.constructor.apply(this, arguments);
    }
    return UIView;
  }(View);
  UIItem = function(_super) {
    $.inherit(UIItem, _super);
    UIItem.name = "UIItem";
    UIItem.registerClass(UIItem.name);
    function UIItem(options) {
      if (options == null) {
        options = {};
      }
      UIItem.__super__.constructor.apply(this, arguments);
    }
    return UIItem;
  }(UIView);
  UISelectableItem = function(_super) {
    $.inherit(UISelectableItem, _super);
    UISelectableItem.name = "UISelectableItem";
    UISelectableItem.registerClass(UISelectableItem.name);
    UISelectableItem.mixin(UIActivateMixin);
    UISelectableItem.mixin(UIDisableMixin);
    function UISelectableItem(options) {
      if (options == null) {
        options = {};
      }
      UISelectableItem.__super__.constructor.apply(this, arguments);
    }
    return UISelectableItem;
  }(UIItem);
  UIClickableItem = function(_super) {
    $.inherit(UIClickableItem, _super);
    UIClickableItem.name = "UIClickableItem";
    UIClickableItem.registerClass(UIClickableItem.name);
    UIClickableItem.mixin(UIClickMixin);
    function UIClickableItem(options) {
      if (options == null) {
        options = {};
      }
      UIClickableItem.__super__.constructor.apply(this, arguments);
    }
    return UIClickableItem;
  }(UISelectableItem);
  UIClickableItemWithHover = function(_super) {
    $.inherit(UIClickableItemWithHover, _super);
    UIClickableItemWithHover.name = "UIClickableItemWithHover";
    UIClickableItemWithHover.registerClass(UIClickableItemWithHover.name);
    UIClickableItemWithHover.mixin(UIHoverMixin);
    function UIClickableItemWithHover(options) {
      if (options == null) {
        options = {};
      }
      UIClickableItemWithHover.__super__.constructor.apply(this, arguments);
    }
    return UIClickableItemWithHover;
  }(UIClickableItem);
  UIItemList = function(_super) {
    $.inherit(UIItemList, _super);
    UIItemList.name = "UIItemList";
    UIItemList.registerClass(UIItemList.name);
    UIItemList.prototype.emittedEvents = [ "click", "dblclick", "activate", "deactivate", "disable", "enable", "enter", "leave" ];
    function UIItemList(options) {
      UIItemList.__super__.constructor.apply(this, arguments);
      this.itemByCid = {};
      this.items = this.itemByIndex = [];
      this.count = 0;
      this._initItems();
    }
    UIItemList.prototype._passEvent = function(event, src) {
      var fn, _this = this;
      fn = function() {
        return _this.emit.apply(_this, [ event ].concat($.slice.call(arguments)));
      };
      fn.ownerId = this.cid;
      src.on(event, fn);
    };
    UIItemList.prototype._initItems = function(list) {
      var _this = this;
      if (list == null) {
        list = this.el;
      }
      list.children().each(function(i, _el) {
        var el, item, klass;
        el = $(_el);
        klass = _this.getClassByName(el.data("class"));
        item = new klass({
          el: _el
        });
        return _this.addItem(item);
      });
    };
    UIItemList.prototype.change = function(id) {
      var item;
      item = this.getItem(id);
      if (item) {
        item.activate();
      }
      return this;
    };
    UIItemList.prototype.getItem = function(id) {
      if ($.isString(id)) {
        return this.itemByCid[id];
      }
      if ($.isNumber(id)) {
        return this.itemByIndex[id];
      }
    };
    UIItemList.prototype.addItem = function(item) {
      var event, _i, _len, _ref;
      this.itemByCid[item.cid] = item;
      this.itemByIndex[this.count] = item;
      this.count++;
      _ref = this.emittedEvents;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        this._passEvent(event, item);
      }
      return this;
    };
    UIItemList.prototype.removeItem = function(id) {
      var ev, fn, index, item, _i, _j, _len, _len1, _ref;
      item = this.getItem(id);
      index = this.itemByIndex.indexOf(item);
      delete this.itemByCid[item.cid];
      delete this.itemByIndex[index];
      this.itemByIndex.remove(index);
      this.count--;
      if (!item) {
        return;
      }
      for (_i = 0, _len = uiItemListEvents.length; _i < _len; _i++) {
        ev = uiItemListEvents[_i];
        _ref = item.listeners(ev);
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          fn = _ref[_j];
          if (fn.ownerId === this.cid) {
            item.off(ev, fn);
          }
        }
      }
      item.release();
      return item;
    };
    return UIItemList;
  }(UIView);
  $.inherit(exports, {
    UIActivateMixin: UIActivateMixin,
    UIDisableMixin: UIDisableMixin,
    UIClickMixin: UIClickMixin,
    UIFocusMixin: UIFocusMixin,
    UIHoverMixin: UIHoverMixin,
    UIPressEnterMixin: UIPressEnterMixin,
    UIView: UIView,
    UIItem: UIItem,
    UISelectableItem: UISelectableItem,
    UIClickableItem: UIClickableItem,
    UIClickableItemWithHover: UIClickableItemWithHover,
    UIItemList: UIItemList
  });
});