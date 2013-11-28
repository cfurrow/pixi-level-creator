class WaterBlockUI extends PIXI.Sprite

  constructor: () ->
    texture = PIXI.Texture.fromImage("images/water.png")
    super(texture)

(exports ? this).WaterBlockUI = WaterBlockUI
