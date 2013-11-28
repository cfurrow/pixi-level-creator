class LevelCreator

  constructor: (@columns, @rows) ->
    @build()

  build: ->
    @blocks = for x in [0...@columns] by 1
                for y in [0...@rows] by 1
                  @determineBlock(x,y)
    @blocks
  
  blockAt: (x, y) ->
    #return null if x < 0 or y < 0 or x > @columns or y > @rows
    try
      @blocks[x][y]
    catch
      null


  determineBlock: (x, y) ->
    #TODO: get surrounding blocks
    #TODO: get weights for next block
    #TODO: pick next block
    if x == 0 and y == 0
      new WaterBlock(x, y)
    else
      lBlock = @blockAt(x-1, y)
      rBlock = @blockAt(x+1, y)
      uBlock = @blockAt(x, y-1)
      dBlock = @blockAt(x, y+1)

      dirtProbability  = 0.5
      waterProbability = 0.5

      if lBlock and lBlock.isDirt()
        dirtProbability  += 0.2
        waterProbability -= 0.1
      else
        dirtProbability  += 0.3

      if (Math.random() + dirtProbability) > (Math.random() + waterProbability)
        new DirtBlock(x,y)
      else
        new WaterBlock(x,y)

(exports ? this).LevelCreator = LevelCreator
