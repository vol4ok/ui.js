doctype 5
html ->
  head ->
    meta charset: "utf-8"
    title "UI-SANDBOX"
    script src: "core.js", type: "text/javascript"
    script src: "mvc.js", type: "text/javascript"
    script src: "index.js", type: "text/javascript"
    link rel: "stylesheet", href: "index.css"
  body ->
    div '#modal-backdrop.modal-backdrop.autoload', data: class: 'UIModalBackdrop'
    div '.modal-holder-wrap', ->
      div '#modal-holder.modal-holder', ->
        div '#modal1.modal.autoload', data: {class: 'ModalX', backdrop: 'modal-backdrop'}, ->
          h3 -> "Modal"
          div "#button1.button.autoload", data: class: 'UIButton', -> "OK"
          div "x", ->
        div '#modal2.modal.autoload', data: {class: 'UIModal', backdrop: 'modal-backdrop'}, ->
          div "#carousel1.carousel.autoload", data: {class: 'UICarousel', paused: "true", interval: "5000"}, ->
            ul 'slide-list', ->
              li '#slide1.slide.active', data: class: 'UISlide', ->
                img src: "imgs/1.jpg"
              li '#slide2.slide', data: class: 'UISlide', ->
                img src: "imgs/2.jpg"
              li '#slide3.slide', data: class: 'UISlide', ->
                img src: "imgs/3.jpg"
              li '#slide4.slide', data: class: 'UISlide', ->
                img src: "imgs/4.jpg"
            div "#next-button.button.autoload", data: class: 'UIButton', -> "next"
            div "#prev-button.button.autoload", data: class: 'UIButton', -> "prev"
    div '#container.container-absolute', ->
      ul '#toolbar.autoload', data: class: 'UIItemList', ->
        li '#modal1-btn', data: {class: 'UIClickableItem'}, 'Item1'
        li '#modal2-btn', data: {class: 'UIClickableItem'}, 'Item2'
        li data: {class: 'UIClickableItem'}, 'Item3'
        li data: {class: 'UIClickableItem'}, 'Item4'
        li data: {class: 'UIClickableItem'}, 'Item5'
      ul '#sidebar.autoload', data: class: 'UIItemList', ->
        li 'active', data: {class: 'UIClickableItem', 'tab-id': 'tab1'}, 'Item1'
        li data: {class: 'UIClickableItem', 'tab-id': 'tab2'}, 'Item2'
        li data: {class: 'UIClickableItem', 'tab-id': 'tab3'}, 'Item3'
        li data: {class: 'UIClickableItem', 'tab-id': 'tab4'}, 'Item4'
        li data: {class: 'UIClickableItem', 'tab-id': 'tab5'}, 'Item5'
      ul '#content-view.autoload', data: class: 'UIItemList', ->
        li '#tab1', data: {class: 'UISelectableItem'}, 'View1'
        li "#tab2", data: {class: 'UISelectableItem'}, 'View2'
        li "#tab3", data: {class: 'UISelectableItem'}, 'View3'
        li "#tab4", data: {class: 'UISelectableItem'}, 'View4'
        li "#tab5", data: {class: 'UISelectableItem'}, 'View5'