// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bgAudio: {
            default: null,
            url: cc.AudioClip
        },
        startBtn: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var bgAudioId = cc.audioEngine.play(this.bgAudio, true)
        cc.director.preloadScene("game")
        var scaleTo = cc.scaleTo(0.8,0.9)
        var reverse = cc.scaleTo(0.8, 1)
        var seq = cc.sequence(scaleTo, reverse)
        var repeat = cc.repeatForever(seq)
        this.startBtn.runAction(repeat)
        this.startBtn.on("touchstart", function(){
            cc.audioEngine.stop(bgAudioId)
            cc.director.loadScene("game")
        })
    },

    start () {

    },

    // update (dt) {},
});
