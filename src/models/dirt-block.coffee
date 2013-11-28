class DirtBlock

  constructor: (@x,@y) ->
    @ui = new DirtBlockUI(@x, @y)

(exports ? this).DirtBlock = DirtBlock
