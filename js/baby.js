/**
 * Created by lenovo on 2018/8/10.
 */
var babyObj = function () {
    this.x ;
    this.y;
    this.angle;
    // this.babyEye = new Image();
    // this.babyBody = new Image();
    // this.babyTail = new Image();
    this.babyEyeTimer ;
    this.babyEyeCount;
    this.babyEyeInterval ;

    this.babyBodyTimer ;
    this.babyBodyCount ;

    this.babyTailTimer ;
    this.babyTailCount ;
}
babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;

    this.babyTailCount =0;
    this.babyTailTimer =0;
    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;
    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;

}
babyObj.prototype.draw = function () {
    //ctx1
    //lerp x,y 是将当前值趋向目标值 就是当前值- 目标值再乘以一个百分比
    this.x = lerpDistance(mom.x,this.x,0.99);
    this.y = lerpDistance(mom.y,this.y,0.99); //这个百分比越小运动越快

    //尾巴游动的动作
    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer > 50){
        this.babyTailCount = (this.babyTailCount + 1) %8;
        this.babyTailTimer %= 50;
    }
    //眼睛眨
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer > this.babyEyeInterval){
        //开始眼睛的动作
        this.babyEyeCount = (this.babyEyeCount + 1) %2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if(this.babyEyeCount == 0){
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        }
        else this.babyEyeInterval = 200;
    }
    //身体变色
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 300){
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 300;
        if(this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            //gameOver
            data.gameOver = true;
        }
    }
    //delta angle 计算目标的角度值
    //Math.atan2(y,x)
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY , deltaX) + Math.PI; //因为atan2返回的是-PI到PI
    //lerp angle
    this.angle = lerpAngle(beta,this.angle,0.6);
    ctx1.save();
    //改变画布原点 translate
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    ctx1.drawImage(babyTail[this.babyTailCount],-babyTail[this.babyTailCount].width * 0.5 + 25,-babyTail[this.babyTailCount].height * 0.5);
    ctx1.drawImage(babyBody[this.babyBodyCount],-babyBody[this.babyBodyCount].width * 0.5,-babyBody[this.babyBodyCount].height * 0.5);
    ctx1.drawImage(babyEye[this.babyEyeCount],-babyEye[this.babyEyeCount].width * 0.5,-babyEye[this.babyEyeCount].height * 0.5);
    ctx1.restore();
}