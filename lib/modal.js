$.ns([ "./modal", "ui.modal" ], function(exports) {
  var UIModal, UIModalBackdrop, ui;
  ui = require("ui");
  UIModal = function(_super) {
    $.inherit(UIModal, _super);
    UIModal.name = "UIModal";
    UIModal.registerClass(UIModal.name);
    function UIModal(options) {
      var _this = this;
      if (options == null) {
        options = {};
      }
      this.hide = $.bind(this.hide, this);
      this.show = $.bind(this.show, this);
      UIModal.__super__.constructor.apply(this, arguments);
      this.shown = false;
      $.defer(function() {
        if (options.active || _this.el.hasClass("active")) {
          return _this.show();
        }
      });
    }
    UIModal.prototype._show = function() {
      return this.el.addClass("active");
    };
    UIModal.prototype._hide = function() {
      return this.el.removeClass("active");
    };
    UIModal.prototype.show = function() {
      if (this.shown) {
        return false;
      }
      this._show();
      this.shown = true;
      this.emit("show", this);
      return true;
    };
    UIModal.prototype.hide = function() {
      if (!this.shown) {
        return false;
      }
      this._hide();
      this.shown = false;
      this.emit("hide", this);
      return true;
    };
    return UIModal;
  }(ui.UIView);
  UIModalBackdrop = function(_super) {
    $.inherit(UIModalBackdrop, _super);
    UIModalBackdrop.name = "UIModalBackdrop";
    UIModalBackdrop.registerClass(UIModalBackdrop.name);
    UIModalBackdrop.prototype.events = {
      click: "on_click"
    };
    function UIModalBackdrop() {
      this.hide = $.bind(this.hide, this);
      this.show = $.bind(this.show, this);
      this.on_click = $.bind(this.on_click, this);
      UIModalBackdrop.__super__.constructor.apply(this, arguments);
    }
    UIModalBackdrop.prototype.on_click = function() {
      return this.emit("click", this);
    };
    UIModalBackdrop.prototype.show = function() {
      $("#container").attr("style", "-webkit-filter: blur(3px);");
      return UIModalBackdrop.__super__.show.apply(this, arguments);
    };
    UIModalBackdrop.prototype.hide = function() {
      $("#container").removeAttr("style");
      return UIModalBackdrop.__super__.hide.apply(this, arguments);
    };
    return UIModalBackdrop;
  }(UIModal);
  $.inherit(ui, {
    UIModal: UIModal,
    UIModalBackdrop: UIModalBackdrop
  });
});