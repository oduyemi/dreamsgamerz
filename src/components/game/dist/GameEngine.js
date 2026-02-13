"use strict";
exports.__esModule = true;
exports.GameEngine = void 0;
var EventBus_1 = require("./EventBus");
var ScoreSystem_1 = require("./ScoreSystem");
var DifficultySystem_1 = require("./DifficultySystem");
var AntiCheat_1 = require("./AntiCheat");
var Ball_1 = require("./Ball");
var BossBall_1 = require("./BossBall");
var GameEngine = /** @class */ (function () {
    function GameEngine() {
        var _this = this;
        this.entities = new Map();
        this.running = false;
        this.loopId = null;
        this.scoreSystem = new ScoreSystem_1.ScoreSystem();
        this.difficulty = new DifficultySystem_1.DifficultySystem();
        this.antiCheat = new AntiCheat_1.AntiCheat();
        this.events = new EventBus_1.EventBus();
        this.lives = 5;
        this.gameLoop = function () {
            if (!_this.running)
                return;
            _this.entities.forEach(function (entity) {
                entity.update();
                if (entity.reachedTarget()) {
                    _this.handleMiss(entity.id);
                }
            });
            _this.loopId = requestAnimationFrame(_this.gameLoop);
        };
    }
    GameEngine.prototype.start = function () {
        this.running = true;
        this.spawnLoop();
        this.gameLoop();
    };
    GameEngine.prototype.stop = function () {
        this.running = false;
        if (this.loopId)
            cancelAnimationFrame(this.loopId);
    };
    GameEngine.prototype.spawnLoop = function () {
        var _this = this;
        setInterval(function () {
            if (!_this.running)
                return;
            var level = _this.difficulty.level;
            if (level % 10 === 0) {
                _this.spawnBoss();
            }
            else {
                _this.spawnBall();
            }
        }, this.difficulty.getSpawnRate());
    };
    GameEngine.prototype.spawnBall = function () {
        var ball = new Ball_1.Ball(this.difficulty.getSpeed());
        this.entities.set(ball.id, ball);
        this.events.emit("spawn", ball);
    };
    GameEngine.prototype.spawnBoss = function () {
        var boss = new BossBall_1.BossBall(this.difficulty.getSpeed());
        this.entities.set(boss.id, boss);
        this.events.emit("spawn", boss);
    };
    GameEngine.prototype.hit = function (id) {
        if (!this.antiCheat.validateClick())
            return;
        var entity = this.entities.get(id);
        if (!entity)
            return;
        var points = entity.getPoints();
        this.scoreSystem.registerHit(points);
        this.difficulty.increaseProgress();
        this.entities["delete"](id);
        this.events.emit("hit", entity);
    };
    GameEngine.prototype.handleMiss = function (id) {
        this.entities["delete"](id);
        this.scoreSystem.resetCombo();
        this.lives -= 1;
        this.events.emit("miss", id);
        if (this.lives <= 0) {
            this.endGame();
        }
    };
    GameEngine.prototype.endGame = function () {
        this.running = false;
        this.events.emit("gameOver", {
            finalScore: this.scoreSystem.getTournamentScore(this.difficulty.level)
        });
    };
    return GameEngine;
}());
exports.GameEngine = GameEngine;
