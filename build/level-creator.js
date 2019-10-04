(function() {
  var BlockBase;

  BlockBase = class BlockBase {
    isDirt() {
      return false;
    }

    isWater() {
      return false;
    }

  };

  (typeof exports !== "undefined" && exports !== null ? exports : this).BlockBase = BlockBase;

}).call(this);

(function() {
  var DirtBlock;

  DirtBlock = class DirtBlock extends BlockBase {
    constructor(x, y) {
      super();
      this.x = x;
      this.y = y;
      this.ui = new DirtBlockUI(this.x, this.y);
    }

    isDirt() {
      return true;
    }

  };

  (typeof exports !== "undefined" && exports !== null ? exports : this).DirtBlock = DirtBlock;

}).call(this);

(function() {
  var LevelCreator;

  LevelCreator = class LevelCreator {
    constructor(columns, rows, seed = 123) {
      this.random = this.random.bind(this);
      this.columns = columns;
      this.rows = rows;
      this.seed = seed;
      this.originalSeed = this.seed;
      this.dirtProbabilities = [0, 0, 0, 0];
      this.waterProbabilities = [0, 0, 0, 0];
      this.build();
    }

    build() {
      var x, y;
      this.seed = this.originalSeed;
      this.blocks = (function() {
        var i, ref, results;
        results = [];
        for (x = i = 0, ref = this.columns; i < ref; x = i += 1) {
          results.push((function() {
            var j, ref1, results1;
            results1 = [];
            for (y = j = 0, ref1 = this.rows; j < ref1; y = j += 1) {
              results1.push(this.determineBlock(x, y));
            }
            return results1;
          }).call(this));
        }
        return results;
      }).call(this);
      return this.blocks;
    }

    blockAt(x, y) {
      try {
        return this.blocks[x][y];
      } catch (error) {
        return null;
      }
    }

    random() {
      var x;
      x = Math.sin(this.seed++) * 10000;
      return x - Math.floor(x);
    }

    updateWaterProbability(index, value) {
      this.waterProbabilities[index] = value;
      return this.build();
    }

    updateDirtProbability(index, value) {
      this.dirtProbabilities[index] = value;
      return this.build();
    }

    determineBlock(x, y) {
      var dirtProbability, lBlock, uBlock, waterProbability;
      lBlock = this.blockAt(x - 1, y);
      uBlock = this.blockAt(x, y - 1);
      dirtProbability = 0.5;
      waterProbability = 0.5;
      if (lBlock && lBlock.isDirt()) {
        dirtProbability += this.dirtProbabilities[0];
        waterProbability += this.waterProbabilities[0];
      } else {
        dirtProbability += this.dirtProbabilities[1];
        waterProbability += this.waterProbabilities[1];
      }
      if (uBlock && uBlock.isDirt()) {
        dirtProbability += this.dirtProbabilities[2];
        waterProbability += this.waterProbabilities[2];
      } else {
        dirtProbability += this.dirtProbabilities[3];
        waterProbability += this.waterProbabilities[3];
      }
      if ((this.random() + dirtProbability) > (this.random() + waterProbability)) {
        return new DirtBlock(x, y);
      } else {
        return new WaterBlock(x, y);
      }
    }

  };

  (typeof exports !== "undefined" && exports !== null ? exports : this).LevelCreator = LevelCreator;

}).call(this);

(function() {
  var WaterBlock;

  WaterBlock = class WaterBlock extends BlockBase {
    constructor(x, y) {
      super();
      this.x = x;
      this.y = y;
      this.ui = new WaterBlockUI(this.x, this.y);
    }

    isWater() {
      return true;
    }

  };

  (typeof exports !== "undefined" && exports !== null ? exports : this).WaterBlock = WaterBlock;

}).call(this);

(function() {
  var DirtBlockUI;

  DirtBlockUI = class DirtBlockUI extends PIXI.Sprite {
    constructor() {
      var texture;
      texture = PIXI.Texture.fromImage("images/dirt.png");
      super(texture);
    }

  };

  (typeof exports !== "undefined" && exports !== null ? exports : this).DirtBlockUI = DirtBlockUI;

}).call(this);

(function() {
  var WaterBlockUI;

  WaterBlockUI = class WaterBlockUI extends PIXI.Sprite {
    constructor() {
      var texture;
      texture = PIXI.Texture.fromImage("images/water.png");
      super(texture);
    }

  };

  (typeof exports !== "undefined" && exports !== null ? exports : this).WaterBlockUI = WaterBlockUI;

}).call(this);

(function() {
  var App, exports;

  exports = exports != null ? exports : this;

  App = (function() {
    var BLOCK_HEIGHT, BLOCK_WIDTH, WORLD_HEIGHT, WORLD_WIDTH;

    class App {
      constructor(containerEl) {
        this.sliderChanged = this.sliderChanged.bind(this);
        this.animate = this.animate.bind(this);
        this.containerEl = containerEl;
        this.creator = new LevelCreator(WORLD_WIDTH / BLOCK_WIDTH, WORLD_HEIGHT / BLOCK_HEIGHT);
        this.renderer = new PIXI.WebGLRenderer(WORLD_WIDTH, WORLD_HEIGHT);
        this.stage = new PIXI.Stage();
        this.buildBlockUI();
        document.body.appendChild(this.renderer.view);
        requestAnimationFrame(this.animate);
      }

      sliderChanged(event, ui) {
        var $slider, $ui, $value, index, isDirt;
        $ui = $(ui.handle);
        $slider = $ui.parents('li');
        $value = $slider.find('.value');
        isDirt = $ui.parents('#dirt-sliders').length > 0;
        index = $slider.index();
        $value.html(ui.value);
        if (isDirt) {
          this.creator.updateDirtProbability(index, ui.value);
        } else {
          this.creator.updateWaterProbability(index, ui.value);
        }
        this.stage = new PIXI.Stage();
        return this.buildBlockUI();
      }

      buildBlockUI() {
        var i, ref, results, tag, ui, x, y;
        tag = 'div';
        results = [];
        for (y = i = 0, ref = this.creator.rows; i < ref; y = i += 1) {
          results.push((function() {
            var j, ref1, results1;
            results1 = [];
            for (x = j = 0, ref1 = this.creator.columns; j < ref1; x = j += 1) {
              ui = this.creator.blockAt(x, y).ui;
              ui.position.x = x * BLOCK_WIDTH;
              ui.position.y = y * BLOCK_HEIGHT;
              ui.width = BLOCK_WIDTH;
              ui.height = BLOCK_HEIGHT;
              results1.push(this.stage.addChild(ui));
            }
            return results1;
          }).call(this));
        }
        return results;
      }

      animate() {
        this.renderer.render(this.stage);
        return requestAnimationFrame(this.animate);
      }

    };

    WORLD_WIDTH = 900;

    WORLD_HEIGHT = 600;

    BLOCK_WIDTH = BLOCK_HEIGHT = 30;

    return App;

  }).call(this);

  exports.app = new App();

  $(function() {
    return $('.slider').slider({
      min: 0.0,
      max: 1.0,
      step: 0.01,
      slide: exports.app.sliderChanged
    });
  });

}).call(this);
