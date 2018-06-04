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
        player:{
            default: null,
            type: cc.Node
        },
        dici:{
            default: null,
            type: cc.Prefab
        },
        diciCount: 0,
        bgAudio:{
            default: null,
            url: cc.AudioClip
        },
        bgAudioId:0,
        jumpAudio:{
            default: null,
            url: cc.AudioClip
        },
        playTime: 60,
        timeLable:{
            default: null,
            type: cc.Label
        },
        scoreLable:{
            default: null,
            type: cc.Label
        },
        score: 0,
        dc_duration:140,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.score = 0
        this.bgAudioId = cc.audioEngine.play(this.bgAudio, true)
        cc.log("bgAudioId: " + this.bgAudioId)
        cc.director.preloadScene("over")
        this.setInputControl()
        this.player.setPosition(-this.node.width/2+80, this.node.height/2-175)

        this.scoreLable.string = "得分：" + this.score
        this.timeLable.string = "倒计时：" + this.playTime

        for(var i=0; i<8; ++i)
        {
            this.newDici()
        }

        this.schedule(function(){
            this.playTime--
            this.timeLable.string = "倒计时：" + this.playTime
            if(this.playTime <= 0)
            {
                cc.audioEngine.pauseMusic()
                cc.director.loadScene("over")
            }
        }, 1)
    },
    start () {

    },

    // update (dt) {},

    playerMoveLeft(){
        
        this.player.rotationY = 0
        if(this.player.rotationY == 0)
        {
            var goL1 = cc.moveTo(0.1, cc.p(-this.node.width/2+80+30,this.player.getPositionY()))
            var goL2 = cc.moveTo(0.1, cc.p(-this.node.width/2+80, this.player.getPositionY()))
            var sequence = cc.sequence(goL1, goL2)
            this.player.runAction(sequence)
        }
        else
        {
            var goLeft = cc.moveTo(0.2, cc.p(-this.node.width/2+80,this.player.getPositionY()))
            this.player.runAction(goLeft)
        }
    },
    playerMoveRight(){
        
        this.player.rotationY = 180
        if(this.player.rotationY == 180)
        {
            var goR1= cc.moveTo(0.1,cc.p(this.node.width/2-80-30,this.player.getPositionY()));
            var goR2= cc.moveTo(0.1,cc.p(this.node.width/2-80,this.player.getPositionY()));
            var sque=cc.sequence(goR1,goR2);
            this.player.runAction(sque)
        }
        else
        {
            var goRight = cc.moveTo(0.2, cc.p(this.node.width/2-80, this.player.getPositionY()))
            this.player.runAction(goRight)
        }
    },
    newDici(){
        this.diciCount += 1
        var newDici = cc.instantiate(this.dici)
        this.node.addChild(newDici)
        var randD = cc.random0To1()
        if (randD >= 0.5)
        {
            newDici.rotationY = 0
        }
        else
        {
            newDici.rotationY = 180
        }
        newDici.setPosition(this.diciPosition(randD))
        var temp = newDici.getComponent("Dici")
        temp.main = this
    },
    diciPosition(randD){
        var randX = 0
        var randY = 0
        if (randD >= 0.5)
        {
            randX = this.node.width / 2 - 80
        }
        else
        {
            randX = -this.node.width/2+80
        }
        if(this.diciCount <= 8)
        {
            randY = (this.node.height/2) - (this.dc_duration*this.diciCount) - this.dc_duration * 1
        }
        else
        {
            randY = (this.node.height/2) - (this.dc_duration * 8) - this.dc_duration * 1
        }
        return cc.p(randX, randY)
    },
    setInputControl(){
        var self = this
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touches, event){
                cc.audioEngine.playEffect(self.jumpAudio, false)
                var target = event.getCurrentTarget()
                var locationInNode = target.convertToNodeSpace(touches.getLocation())
                if(locationInNode.x > self.node.width/2)
                    self.playerMoveRight()
                else
                    self.playerMoveLeft()

                self.score += 1
                cc.sys.localStorage.setItem("score", self.score)

                self.scoreLable.string = "得分：" + self.score
                self.newDici()
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
    stopAudioBg(){
        cc.audioEngine.stop(this.bgAudioId)
    }
});
