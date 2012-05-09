module 'ui'
{View, Controller, Application} = require('mvc')

LINK_AND_EMBED('_mixins')
LINK_AND_EMBED('_base')

$.extend exports, {
  UIView
  UIItem
}