class DirtBlockUI extends PIXI.Sprite

  constructor: () ->
    texture = PIXI.Texture.fromImage("images/dirt.png")
    super(texture)

(exports ? this).DirtBlockUI = DirtBlockUI
