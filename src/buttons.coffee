module 'ui.buttons'
{UIView} = require 'ui'

class UIButton extends UIView
  @registerClass @name
  @mixin UIActivateMixin
  @mixin UIDisableMixin
  @mixin UIClickMixin
  @mixin UIHoverMixin
  @mixin UIFocusMixin
  @mixin UIPressEnterMixin
  constructor: (options) -> super
  
exports extends {UIButton}