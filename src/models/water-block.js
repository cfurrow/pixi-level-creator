export default class WaterBlock extends BlockBase {
  constructor(x,y) {
    super()
    this.x = x;
    this.y = y;
    this.ui = new WaterBlockUI(x, y);
  }
  
  isWater() { return true; }
}
