$.ns([ "./buttons", "ui.buttons" ], function(exports) {
  var UIButton, ui;
  ui = require("ui");
  UIButton = function(_super) {
    $.inherit(UIButton, _super);
    UIButton.name = "UIButton";
    UIButton.registerClass(UIButton.name);
    UIButton.mixin(ui.UIActivateMixin);
    UIButton.mixin(ui.UIDisableMixin);
    UIButton.mixin(ui.UIClickMixin);
    UIButton.mixin(ui.UIHoverMixin);
    UIButton.mixin(ui.UIFocusMixin);
    UIButton.mixin(ui.UIPressEnterMixin);
    function UIButton(options) {
      UIButton.__super__.constructor.apply(this, arguments);
    }
    return UIButton;
  }(ui.UIView);
  $.inherit(ui, {
    UIButton: UIButton
  });
});