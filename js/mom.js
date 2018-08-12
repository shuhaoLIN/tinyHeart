/**
 * Created by lenovo on 2018/8/10.
 */
var momObj = function () {
    this.x;
    this.y;
    this.angle; //大鱼的角度
    //this.bigEye = new Image();
    //this.bigBody = new Image();
    //this.bigTail = new Image();
    this.bigEyeTimer;
    this.bigEyeCount;
    this.bigEyeInterval;
    this.bigTailTimer;
    this.bigTailCount;
    this.bigBodyCount;

}
momObj.prototype.init = function () {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    //this.bigEye.src = "./src/bigEye0.png";
    //this.bigBody.src = "./src/bigSwim0.png";
    //this.bigTail.src = "./src/bigTail0.png";

    this.bigEyeTimer =0;
    this.bigEyeCount = 0;
    this.bigEyeInterval = 1000;
    this.bigTailTimer =0;
    this.bigTailCount =0;
    this.bigBodyCount = 0;
}
momObj.prototype.draw = function () {
    //lerp x,y 是将当前值趋向目标值 就是当前值- 目标值再乘以一个百分比
    this.x = lerpDistance(mx,this.x,0.9);
    this.y = lerpDistance(my,this.y,0.9); //这个百分比越小运动越快

    //delta angle 计算目标的角度值
    //Math.atan2(y,x)
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY , deltaX) + Math.PI; //因为atan2返回的是-PI到PI
    //lerp angle
    this.angle = lerpAngle(beta,this.angle,0.6);

    //尾巴动作
    this.bigTailTimer += deltaTime;
    if(this.bigTailTimer > 50){
        this.bigTailCount = (this.bigTailCount + 1)%8;
        this.bigTailTimer &= 50;
    }
    //眼睛动作
    this.bigEyeTimer += deltaTime;
    if(this.bigEyeTimer > this.bigEyeInterval){
        this.bigEyeCount = (this.bigEyeCount + 1) %2;
        this.bigEyeTimer %= this.bigEyeInterval;
        if(this.bigEyeCount == 0){
            this.bigEyeInterval = Math.random() * 2000 + 2000;
        }
        else this.bigEyeInterval = 200;
    }
    //身体的动作
    var midBigBody = new Image();
    if(data.double == 1){
        midBigBody = bigBodyOrg[this.bigBodyCount];
    }
    else midBigBody = bigBodyBlue[this.bigBodyCount];
    ctx1.save();
    //在save和restore中间，形成只作用于大鱼
    ctx1.translate(this.x,this.y); //将画布原点转至x,y，接下来画的就是相对于该原点的值了
    ctx1.rotate(this.angle);
    ctx1.drawImage(midBigBody,-midBigBody.width * 0.5,-midBigBody.height * 0.5);
    ctx1.drawImage(bigEye[this.bigEyeCount],-bigEye[this.bigEyeCount].width * 0.5,-bigEye[this.bigEyeCount].height * 0.5);
    ctx1.drawImage(bigTail[this.bigTailCount],-bigTail[this.bigTailCount].width * 0.5 + 30,-bigTail[this.bigTailCount].height * 0.5);
    ctx1.restore();
}