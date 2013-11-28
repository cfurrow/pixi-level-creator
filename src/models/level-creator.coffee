class LevelCreator

  constructor: (@columns, @rows) ->
    @seed = 123456
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

  random: () =>
    x = Math.sin(@seed++) * 10000
    x - Math.floor(x)
    
  determineBlock: (x, y) ->
    #TODO: get surrounding blocks
    #TODO: get weights for next block
    #TODO: pick next block
    if x == 0 and y == 0
      new WaterBlock(x, y)
    else
      lBlock = @blockAt(x-1, y)
      uBlock = @blockAt(x, y-1)

      dirtProbability  = 0.5
      waterProbability = 0.5

      if lBlock and lBlock.isDirt()
        dirtProbability  += 0.1
        waterProbability += 0.2
      else
        dirtProbability  += 0.3
        waterProbability += 0.1 

      if uBlock and uBlock.isDirt()
        dirtProbability -= 0.1
        waterProbability += 0.3
      else
        dirtProbability += 0.3

      if (@random() + dirtProbability) > (@random() + waterProbability)
        new DirtBlock(x,y)
      else
        new WaterBlock(x,y)

(exports ? this).LevelCreator = LevelCreator
