exports = (exports ? this)

class App
  WORLD_WIDTH = 900
  WORLD_HEIGHT = 600
  BLOCK_WIDTH = BLOCK_HEIGHT = 30

  constructor: (@containerEl) ->
    @creator  = new LevelCreator(WORLD_WIDTH/BLOCK_WIDTH, WORLD_HEIGHT/BLOCK_HEIGHT)
    @renderer = new PIXI.WebGLRenderer(WORLD_WIDTH, WORLD_HEIGHT)
    @stage    = new PIXI.Stage()
    @buildBlockUI()

    document.body.appendChild(@renderer.view)
    
    requestAnimationFrame(@animate)

  sliderChanged: (event, ui) =>
    $ui = $(ui.handle)
    $slider = $ui.parents('li')
    isDirt  = $ui.parents('#dirt-sliders').length > 0
    index   = $slider.index()

    if isDirt
      @creator.updateDirtProbability(index, ui.value)
    else
      @creator.updateWaterProbability(index, ui.value)

    @stage = new PIXI.Stage()
    @buildBlockUI()

  buildBlockUI: () ->
    tag = 'div'
    for y in [0...@creator.rows] by 1
      for x in [0...@creator.columns] by 1
        ui            = @creator.blockAt(x, y).ui
        ui.position.x = x * BLOCK_WIDTH
        ui.position.y = y * BLOCK_HEIGHT
        ui.width      = BLOCK_WIDTH
        ui.height     = BLOCK_HEIGHT

        @stage.addChild(ui)

  animate: () =>
    @renderer.render(@stage)

    requestAnimationFrame(@animate)

exports.app = new App()

$ ->
  $('.slider').slider
    min: 0.0
    max: 1.0
    step: 0.01
    slide: exports.app.sliderChanged
