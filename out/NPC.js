var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(id, tex) {
        var _this = this;
        _super.call(this);
        this.myBitmap = new engine.Bitmap();
        this.myBitmap.texture = engine.Resourse.getInstance().getRes(tex);
        this.myBitmap.x = 0;
        this.myBitmap.y = 0;
        this.addChild(this.myBitmap);
        this.id = id;
        this.myTask = new Array();
        var taskService = TaskService.getInstance();
        taskService.addObserver(this);
        var flag = Task.UNACCEPTALBE;
        taskService.getTaskByCustomRole(function (taskList) {
            for (var i = 0; i < taskList.length; i++) {
                if (taskList[i].getToID().match(_this.id) || taskList[i].getFromID().match(_this.id)) {
                    _this.myTask.push(taskList[i]);
                    if (taskList[i].getStatus() == Task.CAN_SUBMIT && taskList[i].getToID().match(_this.id)) {
                        flag = Task.CAN_SUBMIT;
                    }
                    else if (taskList[i].getStatus() == Task.ACCEPTABLE && taskList[i].getFromID().match(_this.id)) {
                        flag = Task.ACCEPTABLE;
                    }
                    else if (taskList[i].getStatus() == Task.DURING) {
                        flag = Task.DURING;
                    }
                    else if (!taskList[i].getToID().match(_this.id) && !taskList[i].getFromID().match(_this.id)) {
                        ;
                    }
                }
            }
        });
        this.emoji = new engine.Bitmap();
        if (flag == Task.ACCEPTABLE) {
            this.emoji.texture = engine.Resourse.getInstance().getRes("ACCEPTABLE.png");
        }
        else if (flag == Task.CAN_SUBMIT) {
            this.emoji.texture = engine.Resourse.getInstance().getRes("CAN_SUBMIT.png");
        }
        else if (flag == Task.DURING) {
            this.emoji.texture = engine.Resourse.getInstance().getRes("DURING.png");
        }
        else {
            this.emoji.texture = engine.Resourse.getInstance().getRes("null");
        }
        this.emoji.x = 0;
        this.emoji.y = -50;
        this.addChild(this.emoji);
        this.touchEnabled = true;
    }
    NPC.prototype.onChange = function (task) {
        if (task.getStatus() == Task.ACCEPTABLE && task.getFromID().match(this.id)) {
            this.emoji.texture = engine.Resourse.getInstance().getRes("ACCEPTABLE.png");
        }
        else if (task.getStatus() == Task.CAN_SUBMIT && task.getToID().match(this.id)) {
            this.emoji.texture = engine.Resourse.getInstance().getRes("CAN_SUBMIT.png");
        }
        else if (task.getStatus() == Task.DURING && task.getToID().match(this.id)) {
            this.emoji.texture = engine.Resourse.getInstance().getRes("DURING.png");
        }
        else if (!task.getFromID().match(this.id) && !task.getToID().match(this.id)) {
            //与我无关
            ;
        }
        else {
            this.emoji.texture = engine.Resourse.getInstance().getRes("null");
        }
    };
    NPC.prototype.getMytask = function () {
        return this.myTask;
    };
    NPC.prototype.getId = function () {
        return this.id;
    };
    return NPC;
}(engine.DisplayObjectContainer));
