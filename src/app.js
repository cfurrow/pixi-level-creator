import LevelCreator from './models/level-creator';

const WORLD_WIDTH = 900;
const WORLD_HEIGHT = 600;
const BLOCK_HEIGHT = 30;
const BLOCK_WIDTH  = 30;

class App {
  constructor(containerEl){
    this.containerEl = containerEl;
    this.creator = new LevelCreator(WORLD_WIDTH / BLOCK_WIDTH, WORLD_HEIGHT / BLOCK_HEIGHT);
    this.renderer = new PIXI.WebGLRenderer(WORLD_WIDTH, WORLD_HEIGHT);
    this.stage = new PIXI.Stage();
    this.buildBlockUI();

    document.body.appendChild(this.renderer.view);

    requestAnimationFrame(this.animate);
  }

  sliderChanged(event, ui){
    $ui = $(ui.handle);
    $slider = $ui.parents('li');
    $value = $slider.find('.value');
    isDirt = $ui.parents('#dirt-sliders').length > 0;
    index = $slider.index();

    $value.html(ui.value);

    if(isDirt){
      this.creator.updateDirtProbability(index, ui.value);
    } else {
      this.creator.updateWaterProbability(index, ui.value);
    }

    this.stage = new PIXI.Stage();
    this.buildBlockUI();
  }

  buildBlockUI(){
    let tag = 'div';
    for(let y=0; y < this.creator.rows; y++){
      for(let x=0; x < this.creator.columns; x++){
        ui = this.creator.blockAt(x, y).ui;
        ui.position.x = x * BLOCK_WIDTH;
        ui.position.y = y * BLOCK_HEIGHT;
        ui.width = BLOCK_WIDTH;
        ui.height = BLOCK_HEIGHT;

        this.stage.addChild(ui);
      }
    }
  }


  animate() {
    this.renderer.render(this.stage);
    requestAnimationFrame(this.animate);
  }
};


  
$(function(){
  let app = new App();
  $('.slider').slider({
    min: 0.0,
    max: 1.0,
    step: 0.01,
    slide: app.sliderChanged
  })
})
  