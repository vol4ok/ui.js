nlink = require 'nlink'

SRC_DIR =  "#{__dirname}/src"
DST_DIR =  "#{__dirname}/lib"

TARGETS = [
  'ui.coffee'
  'buttons.coffee'
  'modal.coffee'
  # 'tabs.coffee'
  # 'buttons.coffee'
  # 'popovers.coffee'
  # 'courousel.coffee' 
  ]

build = ->
  TARGETS.forEach (file) ->
    nlink "#{SRC_DIR}/#{file}", outdir: DST_DIR
  
    
task 'build', 'Builds UI lib modules form src', ->
  build()