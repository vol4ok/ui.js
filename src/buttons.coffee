module 'ui.buttons'

ui = require 'ui'

class UIButton extends ui.UIView
  @registerClass @name
  @mixin ui.UIActivateMixin
  @mixin ui.UIDisableMixin
  @mixin ui.UIClickMixin
  @mixin ui.UIHoverMixin
  @mixin ui.UIFocusMixin
  @mixin ui.UIPressEnterMixin
  constructor: (options) -> super
  
ui extends {UIButton}