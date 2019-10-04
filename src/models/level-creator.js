export default class LevelCreator {
  constructor(columns, rows, seed=123) {
    this.originalSeed = this.seed
    this.dirtProbabilities  = [0,0,0,0]
    this.waterProbabilities = [0,0,0,0]
    this.build()
  }

  build() {
    this.seed = this.originalSeed
    this.blocks = for x in [0...this.columns] by 1
                    for y in [0...this.rows] by 1
                      this.determineBlock(x,y)
    return this.blocks
  }

  blockAt(x, y) {
    try {
      return this.blocks[x][y];
    } catch {
      return null;
    }
  } 
    

  random() {
    x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }
  
  updateWaterProbability(index, value){
    this.waterProbabilities[index] = value
    return this.build();
  }
    

  updateDirtProbability(index, value){
    this.dirtProbabilities[index] = value
    return this.build()
  }
    
    
  determineBlock(x, y){
    lBlock = this.blockAt(x-1, y)
    uBlock = this.blockAt(x, y-1)

    dirtProbability  = 0.5
    waterProbability = 0.5

    if lBlock && lBlock.isDirt(){
      dirtProbability  += this.dirtProbabilities[0]
      waterProbability += this.waterProbabilities[0]
    } else {
      dirtProbability  += this.dirtProbabilities[1]
      waterProbability += this.waterProbabilities[1]
    }
      

    if(uBlock && uBlock.isDirt()) {
      dirtProbability  += this.dirtProbabilities[2]
      waterProbability += this.waterProbabilities[2]
    } else {
      dirtProbability  += this.dirtProbabilities[3]
      waterProbability += this.waterProbabilities[3]
    }

    if (this.random() + dirtProbability) > (this.random() + waterProbability){
      return new DirtBlock(x,y)
    } else {
      return new WaterBlock(x,y)
    }
  }
}
