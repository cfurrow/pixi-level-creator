class WaterBlock

  constructor: (@x,@y) ->
    @ui = new WaterBlockUI(@x, @y)

(exports ? this).WaterBlock = WaterBlock
