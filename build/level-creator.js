(function() {
  var BlockBase;

  BlockBase = (function() {
    function BlockBase() {}

    BlockBase.prototype.isDirt = function() {
      return false;
    };

    BlockBase.prototype.isWater = function() {
      return false;
    };

    return BlockBase;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).BlockBase = BlockBase;

}).call(this);

(function() {
  var DirtBlock,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DirtBlock = (function(_super) {
    __extends(DirtBlock, _super);

    function DirtBlock(x, y) {
      this.x = x;
      this.y = y;
      this.ui = new DirtBlockUI(this.x, this.y);
    }

    DirtBlock.prototype.isDirt = function() {
      return true;
    };

    return DirtBlock;

  })(BlockBase);

  (typeof exports !== "undefined" && exports !== null ? exports : this).DirtBlock = DirtBlock;

}).call(this);

(function() {
  var LevelCreator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  LevelCreator = (function() {
    function LevelCreator(columns, rows, seed) {
      this.columns = columns;
      this.rows = rows;
      this.seed = seed != null ? seed : 123;
      this.random = __bind(this.random, this);
      this.originalSeed = this.seed;
      this.dirtProbabilities = [0, 0, 0, 0];
      this.waterProbabilities = [0, 0, 0, 0];
      this.build();
    }

    LevelCreator.prototype.build = function() {
      var x, y;
      this.seed = this.originalSeed;
      this.blocks = (function() {
        var _i, _ref, _results;
        _results = [];
        for (x = _i = 0, _ref = this.columns; _i < _ref; x = _i += 1) {
          _results.push((function() {
            var _j, _ref1, _results1;
            _results1 = [];
            for (y = _j = 0, _ref1 = this.rows; _j < _ref1; y = _j += 1) {
              _results1.push(this.determineBlock(x, y));
            }
            return _results1;
          }).call(this));
        }
        return _results;
      }).call(this);
      return this.blocks;
    };

    LevelCreator.prototype.blockAt = function(x, y) {
      try {
        return this.blocks[x][y];
      } catch (_error) {
        return null;
      }
    };

    LevelCreator.prototype.random = function() {
      var x;
      x = Math.sin(this.seed++) * 10000;
      return x - Math.floor(x);
    };

    LevelCreator.prototype.updateWaterProbability = function(index, value) {
      this.waterProbabilities[index] = value;
      return this.build();
    };

    LevelCreator.prototype.updateDirtProbability = function(index, value) {
      this.dirtProbabilities[index] = value;
      return this.build();
    };

    LevelCreator.prototype.determineBlock = function(x, y) {
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
    };

    return LevelCreator;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).LevelCreator = LevelCreator;

}).call(this);

(function() {
  var WaterBlock,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  WaterBlock = (function(_super) {
    __extends(WaterBlock, _super);

    function WaterBlock(x, y) {
      this.x = x;
      this.y = y;
      this.ui = new WaterBlockUI(this.x, this.y);
    }

    WaterBlock.prototype.isWater = function() {
      return true;
    };

    return WaterBlock;

  })(BlockBase);

  (typeof exports !== "undefined" && exports !== null ? exports : this).WaterBlock = WaterBlock;

}).call(this);

(function() {
  var DirtBlockUI,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DirtBlockUI = (function(_super) {
    __extends(DirtBlockUI, _super);

    function DirtBlockUI() {
      var texture;
      texture = PIXI.Texture.fromImage("images/dirt.png");
      DirtBlockUI.__super__.constructor.call(this, texture);
    }

    return DirtBlockUI;

  })(PIXI.Sprite);

  (typeof exports !== "undefined" && exports !== null ? exports : this).DirtBlockUI = DirtBlockUI;

}).call(this);

(function() {
  var WaterBlockUI,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  WaterBlockUI = (function(_super) {
    __extends(WaterBlockUI, _super);

    function WaterBlockUI() {
      var texture;
      texture = PIXI.Texture.fromImage("images/water.png");
      WaterBlockUI.__super__.constructor.call(this, texture);
    }

    return WaterBlockUI;

  })(PIXI.Sprite);

  (typeof exports !== "undefined" && exports !== null ? exports : this).WaterBlockUI = WaterBlockUI;

}).call(this);

(function() {
  var App, exports,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  exports = exports != null ? exports : this;

  App = (function() {
    var BLOCK_HEIGHT, BLOCK_WIDTH, WORLD_HEIGHT, WORLD_WIDTH;

    WORLD_WIDTH = 900;

    WORLD_HEIGHT = 600;

    BLOCK_WIDTH = BLOCK_HEIGHT = 30;

    function App(containerEl) {
      this.containerEl = containerEl;
      this.animate = __bind(this.animate, this);
      this.sliderChanged = __bind(this.sliderChanged, this);
      this.creator = new LevelCreator(WORLD_WIDTH / BLOCK_WIDTH, WORLD_HEIGHT / BLOCK_HEIGHT);
      this.renderer = new PIXI.WebGLRenderer(WORLD_WIDTH, WORLD_HEIGHT);
      this.stage = new PIXI.Stage();
      this.buildBlockUI();
      document.body.appendChild(this.renderer.view);
      requestAnimationFrame(this.animate);
    }

    App.prototype.sliderChanged = function(event, ui) {
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
    };

    App.prototype.buildBlockUI = function() {
      var tag, ui, x, y, _i, _ref, _results;
      tag = 'div';
      _results = [];
      for (y = _i = 0, _ref = this.creator.rows; _i < _ref; y = _i += 1) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (x = _j = 0, _ref1 = this.creator.columns; _j < _ref1; x = _j += 1) {
            ui = this.creator.blockAt(x, y).ui;
            ui.position.x = x * BLOCK_WIDTH;
            ui.position.y = y * BLOCK_HEIGHT;
            ui.width = BLOCK_WIDTH;
            ui.height = BLOCK_HEIGHT;
            _results1.push(this.stage.addChild(ui));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    App.prototype.animate = function() {
      this.renderer.render(this.stage);
      return requestAnimationFrame(this.animate);
    };

    return App;

  })();

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
