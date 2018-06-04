// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var tmpPlayer = require("Player")
cc.Class({
    extends: cc.Component,

    properties: {
        dieAudio:{
            default: null,
            url: cc.AudioClip
        },
        main: {
            default: null,
            serializable: false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touches, event){
                var goAction = cc.moveBy(0.2, cc.p(0, 140))
                self.node.runAction(goAction)
                return true
            },
            onTouchMoved: function (touches, event) {
              
            },
            onTouchEnded: function (touches, event) {
           
            },
            onTouchCancelled: function (touches, event) {
            }
        }
        cc.eventManager.addListener(listener, self.node)
    },
    start () {

    },
    update (dt) {
        var player = cc.find("Canvas/player").getComponent(tmpPlayer)
        if (player != null)
        {
            if(cc.rectIntersectsRect(player.node.getBoundingBoxToWorld(), this.noteBox()))
            {
                cc.audioEngine.playEffect(this.dieAudio, false)
                cc.log(this.main)
                this.main.stopAudioBg()
                cc.director.loadScene("over")
            }
        }
    },
    noteBox(){
        return this.node.getBoundingBoxToWorld()
    }
});
