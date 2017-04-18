var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VELOCITY = 2; //x，y方向的帧速率都是2px/s
var PICTURECHANGERATE = 15; //1/4S改变一次图片和位置
var oneFaceNumber = 4;
var faceNumber = 4;
var MOVE = 0;
var offSetOfPlayer = 100; //人物相对一个格子的位移偏移量
var MoveState = (function () {
    function MoveState(player, path) {
        this.targetTile = 0;
        this.player = player;
        this.currentPicture = 0;
        this.count = 0;
        this.sequenceOver = false;
        this.path = path;
        this.targetX = path[path.length - 1].x;
        this.targetY = path[path.length - 1].y;
        var temp = ["run_01.png", "run_02.png", "run_03.png", "run_04.png",
            "run_05.png", "run_06.png", "run_07.png", "run_08.png",];
        this.movePicture = new Array();
        for (var i = 0; i < faceNumber; i++) {
            this.movePicture[i] = new Array();
        }
        for (var i = 0, count = 0; i < faceNumber; i++) {
            for (var j = 0; j < oneFaceNumber; j++) {
                this.movePicture[i][j] = temp[count];
                count++;
            }
        }
        this.currentFace = MOVE;
    }
    MoveState.prototype.OnEnter = function () {
        var _this = this;
        var dx = this.targetX - this.player.x;
        var dy = this.targetY - this.player.y;
        this.chooseFace(dx, dy);
        this.currentFace = this.targetFace;
        if (this.enter == null) {
            var enter = function () {
                _this.count++;
                if (_this.count % PICTURECHANGERATE == 0) {
                    _this.currentPicture %= _this.movePicture.length;
                    _this.player.MyPlayer.texture = engine.Resourse.getInstance().getRes(_this.movePicture[_this.targetFace][_this.currentPicture]);
                    _this.currentPicture++;
                    _this.count = 0;
                }
                if (_this.player.x < _this.path[_this.targetTile].x) {
                    _this.player.x += VELOCITY;
                }
                else if (_this.player.x > _this.path[_this.targetTile].x) {
                    _this.player.x -= VELOCITY;
                }
                if (_this.player.y < _this.path[_this.targetTile].y) {
                    _this.player.y += VELOCITY;
                }
                else if (_this.player.y > _this.path[_this.targetTile].y) {
                    _this.player.y -= VELOCITY;
                }
                if (_this.player.x == _this.path[_this.targetTile].x && _this.player.y == _this.path[_this.targetTile].y) {
                    if (_this.targetTile == _this.path.length - 1) {
                        GameScene.getCurrentScene().getCommandList().pass();
                    }
                    else {
                        _this.targetTile++;
                        var dx_1 = _this.path[_this.targetTile].x - _this.player.x;
                        var dy_1 = _this.path[_this.targetTile].y - _this.player.y;
                        _this.chooseFace(dx_1, dy_1);
                        _this.currentFace = _this.targetFace;
                    }
                }
            };
            this.enter = enter;
        }
        engine.Ticker.getInstance().register(this.enter);
    };
    MoveState.prototype.OnExit = function () {
        engine.Ticker.getInstance().unregister(this.enter);
        this.count = 0;
    };
    MoveState.prototype.chooseFace = function (dx, dy) {
        if (dy >= 0) {
            if (Math.abs(dy) >= Math.abs(dx)) {
                this.targetFace = 0;
            }
            else if (dx > 0) {
                this.targetFace = 0;
            }
            else {
                this.targetFace = 0;
            }
        }
        else {
            if (Math.abs(dy) >= Math.abs(dx)) {
                this.targetFace = 0;
            }
            else if (dx >= 0) {
                this.targetFace = 0;
            }
            if (dx < 0) {
                this.targetFace = 0;
            }
        }
    };
    MoveState.prototype.isSequenceOver = function () {
        return this.sequenceOver;
    };
    return MoveState;
}());
var IdleState = (function () {
    function IdleState(player) {
        this.player = player;
        this.CurrentPicture = 0;
        this.count = 0;
        this.sequenceOver = false;
        var temp = ["stand_01.png", "stand_02.png", "stand_03.png", "stand_04.png", "stand_05.png",
            "stand_06.png", "stand_07.png", "stand_08.png", "stand_09.png", "stand_10.png"];
        this.IdlePicture = new Array();
        for (var i = 0; i < temp.length; i++) {
            this.IdlePicture.push(temp[i]);
        }
    }
    IdleState.prototype.OnEnter = function () {
        var _this = this;
        if (this.enter == null) {
            var enter = function () {
                _this.count++;
                if (_this.count % PICTURECHANGERATE == 0) {
                    _this.CurrentPicture %= _this.IdlePicture.length;
                    _this.player.MyPlayer.texture = engine.Resourse.getInstance().getRes(_this.IdlePicture[_this.CurrentPicture]);
                    _this.CurrentPicture++;
                    _this.count = 0;
                }
            };
            this.enter = enter;
        }
        engine.Ticker.getInstance().register(this.enter);
    };
    IdleState.prototype.OnExit = function () {
        engine.Ticker.getInstance().unregister(this.enter);
        this.count = 0;
    };
    IdleState.prototype.isSequenceOver = function () {
        return this.sequenceOver;
    };
    return IdleState;
}());
//只有在战斗状态才使用了sequenceOver变量，用于判断该次攻击是否结束，其他状态默认为false
var FightState = (function () {
    function FightState(player, monster) {
        this.player = player;
        this.monster = monster;
        this.CurrentPicture = 0;
        this.count = 0;
        this.sequenceOver = false;
        var temp = ["f1.png", "f2.png", "f3.png", "f4.png"];
        this.FightPicture = new Array();
        for (var i = 0; i < temp.length; i++) {
            this.FightPicture.push(temp[i]);
        }
    }
    FightState.prototype.OnEnter = function () {
        var _this = this;
        if (this.enter == null) {
            var enter = function () {
                _this.count++;
                if (_this.count % PICTURECHANGERATE == 0) {
                    _this.sequenceOver = false;
                    _this.CurrentPicture %= _this.FightPicture.length;
                    // console.log(this.CurrentPicture);
                    _this.player.MyPlayer.texture = engine.Resourse.getInstance().getRes(_this.FightPicture[_this.CurrentPicture]);
                    if (_this.CurrentPicture == _this.FightPicture.length - 1) {
                        _this.sequenceOver = true;
                        console.log("hit!!!");
                        _this.monster.healthChange(-1);
                    }
                    _this.CurrentPicture++;
                    _this.count = 0;
                }
            };
            this.enter = enter;
        }
        engine.Ticker.getInstance().register(this.enter);
    };
    FightState.prototype.OnExit = function () {
        engine.Ticker.getInstance().unregister(this.enter);
        this.count = 0;
    };
    FightState.prototype.isSequenceOver = function () {
        return this.sequenceOver;
    };
    return FightState;
}());
var StateMacine = (function () {
    function StateMacine(x) {
        this.Myplayer = x;
        this.CurrentState = new IdleState(x);
        this.CurrentState.OnEnter();
    }
    StateMacine.prototype.ChangeState = function (e) {
        this.CurrentState.OnExit();
        e.OnEnter();
        this.CurrentState = e;
    };
    StateMacine.prototype.getCurrentState = function () {
        return this.CurrentState;
    };
    return StateMacine;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this.volocity = VELOCITY;
        this.MyPlayer = this.createBitmapByName("");
        this.Macine = new StateMacine(this);
        this.addChild(this.MyPlayer);
        this.MyPlayer.x = 0;
        this.MyPlayer.y = -40;
    }
    Player.prototype.createBitmapByName = function (name) {
        var result = new engine.Bitmap();
        result.texture = engine.Resourse.getInstance().getRes(name);
        return result;
    };
    return Player;
}(engine.DisplayObjectContainer));
