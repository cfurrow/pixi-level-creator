class LevelCreator

  constructor: (@columns, @rows, @seed=123) ->
    @originalSeed = @seed
    @dirtProbabilities  = [0,0,0,0]
    @waterProbabilities = [0,0,0,0]
    @build()

  build: ->
    @seed = @originalSeed
    @blocks = for x in [0...@columns] by 1
                for y in [0...@rows] by 1
                  @determineBlock(x,y)
    @blocks
  
  blockAt: (x, y) ->
    try
      @blocks[x][y]
    catch
      null

  random: () =>
    x = Math.sin(@seed++) * 10000
    x - Math.floor(x)

  updateWaterProbability: (index, value) ->
    @waterProbabilities[index] = value
    @build()

  updateDirtProbability: (index, value) ->
    @dirtProbabilities[index] = value
    @build()
    
  determineBlock: (x, y) ->
    lBlock = @blockAt(x-1, y)
    uBlock = @blockAt(x, y-1)

    dirtProbability  = 0.5
    waterProbability = 0.5

    if lBlock and lBlock.isDirt()
      dirtProbability  += @dirtProbabilities[0]
      waterProbability += @waterProbabilities[0]
    else
      dirtProbability  += @dirtProbabilities[1]
      waterProbability += @waterProbabilities[1]

    if uBlock and uBlock.isDirt()
      dirtProbability  += @dirtProbabilities[2]
      waterProbability += @waterProbabilities[2]
    else
      dirtProbability  += @dirtProbabilities[3]
      waterProbability += @waterProbabilities[3]

    if (@random() + dirtProbability) > (@random() + waterProbability)
      new DirtBlock(x,y)
    else
      new WaterBlock(x,y)

(exports ? this).LevelCreator = LevelCreator
