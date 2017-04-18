var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DialogPanel = (function (_super) {
    __extends(DialogPanel, _super);
    function DialogPanel() {
        var _this = this;
        _super.call(this);
        var bj = new engine.Bitmap();
        bj.texture = engine.Resourse.getInstance().getRes("dialog.png");
        bj.x = 0;
        bj.y = 0;
        this.addChild(bj);
        this.dialog = new engine.TextField();
        // this.dialog.size=20;
        this.dialog.x = 0;
        this.dialog.y = 0;
        this.addChild(this.dialog);
        this.finishButton = new Button("buttonFinish.png");
        this.finishButton.x = 0;
        this.finishButton.y = 200;
        if (this.onButtonClick == null) {
            var x = function () {
                //此处有几个任务完成，接受就需要点击几次按钮，如需优化，请为每一个任务添加一个按钮，同时删去break
                for (var i = 0; i < _this.taskList.length; i++) {
                    if (_this.taskList[i].getStatus() == Task.CAN_SUBMIT && _this.taskList[i].getToID().match(_this.currentNPCID)) {
                        _this.taskList[i].onSubmit();
                        break;
                    }
                    else if (_this.taskList[i].getStatus() == Task.ACCEPTABLE && _this.taskList[i].getFromID().match(_this.currentNPCID)) {
                        _this.taskList[i].onAccept();
                        break;
                    }
                }
                GameScene.getCurrentScene().getCommandList().pass();
            };
            this.onButtonClick = x;
        }
        if (this.onClose == null) {
            var x = function () {
                GameScene.getCurrentScene().getCommandList().pass();
            };
            this.onClose = x;
        }
        this.finishButton.addEventListener("onclick", this.onButtonClick, this.finishButton, false);
        this.addChild(this.finishButton);
        this.touchEnabled = true;
        this.closeButton = new Button("close.png");
        this.closeButton.x = 300;
        this.closeButton.y = 0;
        this.closeButton.addEventListener("onclick", this.onClose, this.closeButton, false);
        this.addChild(this.closeButton);
    }
    DialogPanel.prototype.addTask = function (taskList, id) {
        this.taskList = taskList;
        this.refreash(id);
    };
    DialogPanel.prototype.refreash = function (id) {
        this.dialog.text = "";
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].getStatus() != Task.UNACCEPTALBE) {
                this.dialog.text += this.taskList[i].getID() + "\n" + this.taskList[i].toString() + "\n";
            }
        }
        this.currentNPCID = id;
    };
    return DialogPanel;
}(engine.DisplayObjectContainer));
