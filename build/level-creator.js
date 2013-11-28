(function() {
  var LevelCreator;

  LevelCreator = (function() {
    function LevelCreator(columns, rows) {
      this.columns = columns;
      this.rows = rows;
      this.build();
    }

    LevelCreator.prototype.build = function() {
      var x, y;
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
      return this.blocks[x][y];
    };

    LevelCreator.prototype.determineBlock = function(x, y) {
      return new WaterBlock(x, y);
    };

    return LevelCreator;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).LevelCreator = LevelCreator;

}).call(this);

(function() {
  var WaterBlock;

  WaterBlock = (function() {
    function WaterBlock(x, y) {
      this.x = x;
      this.y = y;
      this.ui = new WaterBlockUI(this.x, this.y);
    }

    return WaterBlock;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).WaterBlock = WaterBlock;

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
      this.creator = new LevelCreator(WORLD_WIDTH / BLOCK_WIDTH, WORLD_HEIGHT / BLOCK_HEIGHT);
      this.renderer = new PIXI.WebGLRenderer(WORLD_WIDTH, WORLD_HEIGHT);
      this.stage = new PIXI.Stage();
      this.buildBlockUI();
      document.body.appendChild(this.renderer.view);
      requestAnimationFrame(this.animate);
    }

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

}).call(this);
