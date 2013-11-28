class WaterBlock extends BlockBase

  constructor: (@x,@y) ->
    @ui = new WaterBlockUI(@x, @y)

  isWater: () -> true

(exports ? this).WaterBlock = WaterBlock
