export default class DirtBlock extends BlockBase {
  constructor(x,y) {
    super()
    this.x = x;
    this.y = y;
    this.ui = new DirtBlockUI(x, y)
  }
  isDirt() { return true; }
}

