var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var monsterJason = [
    { id: "tree.png", health: 5 }
];
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(id, health) {
        _super.call(this);
        this.id = id;
        this.health = health;
        this.healthMax = health;
        this.bitmap = new engine.Bitmap();
        this.bitmap.texture = engine.Resourse.getInstance().getRes(id);
        this.addChild(this.bitmap);
        this.touchEnabled = true;
    }
    Monster.prototype.healthChange = function (change) {
        this.health += change;
        if (this.health == 0) {
            GameScene.getCurrentScene().killMonster(this);
            GameScene.getCurrentScene().getCommandList().pass();
        }
    };
    Monster.prototype.getId = function () {
        return this.id;
    };
    Monster.prototype.getHealth = function () {
        return this.health;
    };
    return Monster;
}(engine.DisplayObjectContainer));
var MonsterFactory = (function () {
    function MonsterFactory() {
    }
    MonsterFactory.createOneMonster = function (id) {
        for (var i = 0; i < monsterJason.length; i++) {
            if (monsterJason[i].id.match(id)) {
                return new Monster(monsterJason[i].id, monsterJason[i].health);
            }
        }
    };
    return MonsterFactory;
}());
