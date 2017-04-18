var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HeroDetailsPanel = (function (_super) {
    __extends(HeroDetailsPanel, _super);
    function HeroDetailsPanel() {
        var _this = this;
        _super.call(this);
        var bj = new engine.Bitmap();
        bj.x = 0;
        bj.y = 0;
        bj.texture = engine.Resourse.getInstance().getRes("heroDetails.jpg");
        this.addChild(bj);
        var myPlayer = new engine.Bitmap();
        myPlayer.texture = engine.Resourse.getInstance().getRes("run_01.png");
        myPlayer.x = 150;
        myPlayer.y = 200;
        myPlayer.scaleX = 2;
        myPlayer.scaleY = 2;
        this.addChild(myPlayer);
        this.hero = User.getInstance().heros;
        this.equipment = this.hero[0].equipments;
        this.desc = new engine.TextField();
        this.desc.x = 108;
        this.desc.y = 400;
        this.addChild(this.desc);
        this.fightPower = new engine.TextField();
        this.fightPower.x = 108;
        this.fightPower.y = 0;
        this.addChild(this.fightPower);
        this.imgChild = new Array();
        this.iconInit();
        this.closeButton = new Button("close.png");
        this.closeButton.x = 300;
        this.closeButton.y = 0;
        if (this.onClose == null) {
            var x = function () {
                _this.desc.text = "";
                UiManager.getCurrentUiManager().removePanel();
            };
            this.onClose = x;
        }
        this.closeButton.addEventListener("onclick", this.onClose, this.closeButton, false);
        this.addChild(this.closeButton);
        this.touchEnabled = true;
    }
    HeroDetailsPanel.prototype.iconInit = function () {
        for (var _i = 0, _a = this.imgChild; _i < _a.length; _i++) {
            var k = _a[_i];
            this.removeChild(k);
        }
        for (var i = 0; i < this.equipment.length; i++) {
            var img = this.equipment[i].img;
            img.x = 0;
            img.y = 120 * i;
            this.addChild(img);
            this.imgChild.push(img);
        }
        this.fightPower.text = "FightPower: " + User.getInstance().getFightPower().toString();
    };
    HeroDetailsPanel.prototype.setDesc = function (tf) {
        this.desc.text = tf.text;
    };
    return HeroDetailsPanel;
}(engine.DisplayObjectContainer));
