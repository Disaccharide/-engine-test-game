var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel() {
        var _this = this;
        _super.call(this);
        this.myPanel = new engine.Bitmap();
        this.myPanel.texture = engine.Resourse.getInstance().getRes("dialog.png");
        this.addChild(this.myPanel);
        var taskService = TaskService.getInstance();
        taskService.addObserver(this);
        taskService.getTaskByCustomRole(function (taskList) {
            _this.taskList = taskList;
        });
        this.textField = new engine.TextField();
        // this.textField.size=20;
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].getStatus() != Task.UNACCEPTALBE) {
                this.textField.text += this.taskList[i].getID() + "\n" + this.taskList[i].toString() + "\n";
            }
        }
        this.textField.x = 0;
        this.textField.y = 0;
        this.addChild(this.textField);
        this.closeButton = new Button("close.png");
        this.closeButton.x = 300;
        this.closeButton.y = 0;
        this.closeButton.addEventListener("onclick", this.onButtonClick, this.closeButton, false);
        this.addChild(this.closeButton);
        this.touchEnabled = true;
    }
    TaskPanel.prototype.onChange = function (task) {
        this.textField.text = "";
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].getStatus() != Task.UNACCEPTALBE) {
                this.textField.text += this.taskList[i].getID() + "\n" + this.taskList[i].toString() + "\n";
            }
        }
    };
    TaskPanel.prototype.onButtonClick = function () {
        UiManager.getCurrentUiManager().removePanel();
    };
    return TaskPanel;
}(engine.DisplayObjectContainer));
