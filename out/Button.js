var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(id) {
        _super.call(this);
        this.myButton = new engine.Bitmap();
        this.myButton.texture = engine.Resourse.getInstance().getRes(id);
        this.addChild(this.myButton);
        this.touchEnabled = true;
        this.touchEnabled = true;
        this.id = id;
    }
    Button.prototype.getId = function () {
        return this.id;
    };
    return Button;
}(engine.DisplayObjectContainer));
