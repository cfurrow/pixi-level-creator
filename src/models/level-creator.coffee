class LevelCreator

  constructor: (@columns, @rows) ->
    @build()

  build: ->
    @blocks = for x in [0...@columns] by 1
                for y in [0...@rows] by 1
                  @determineBlock(x,y)
    @blocks
  
  blockAt: (x, y) ->
    @blocks[x][y]

  determineBlock: (x, y) ->
    #TODO: get surrounding blocks
    #TODO: get weights for next block
    #TODO: pick next block
    if x == 10 && y == 10
      new DirtBlock(x,y)
    else
      new WaterBlock(x, y)



(exports ? this).LevelCreator = LevelCreator
