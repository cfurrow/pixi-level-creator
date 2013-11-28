class DirtBlock extends BlockBase

  constructor: (@x,@y) ->
    @ui = new DirtBlockUI(@x, @y)

  isDirt: () -> true

(exports ? this).DirtBlock = DirtBlock
