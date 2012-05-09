$.ns([ "./ui", "ui" ], function(exports) {
  require("mvc");
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
  var UIItem, UIView;
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
  $.extend(exports, {
    UIView: UIView,
    UIItem: UIItem
  });
});