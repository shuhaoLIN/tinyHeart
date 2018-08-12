/**
 * Created by lenovo on 2018/8/9.
 */
var aneObj = function () {
    // 需要起始点 root ，控制点 ,结束点 head
    this.rootX = [];
    this.headX = [];
    this.headY = [];
    this.amp = []; //振幅大小
    this.aphla;//摆动的角度，用于计算sin值
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function () {
    this.aphla = 0;
    for(var i=0;i <this.num;i++){
        this.rootX[i] = i*20+Math.random()*20;
        this.headX[i] = this.rootX[i];
        this.headY[i] = canHeight - 200 -Math.random()*50;
        this.amp[i] = Math.random() * 50 + 60;
    }
    console.log("aaa");
}
aneObj.prototype.draw = function () {
    // //绘制在can2中
    this.aphla += deltaTime * 0.001 ;
    var sinL = Math.sin(this.aphla);
    ctx2.save();
    ctx2.globalAlpha = 0.6; //设置透明度
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3bd";
    for(var i=0 ;i<this.num;i++){
        ctx2.beginPath();
        ctx2.moveTo(this.rootX[i],canHeight);
        this.headX[i] = this.rootX[i] + sinL * this.amp[i];
        ctx2.quadraticCurveTo(this.rootX[i],canHeight - 80,this.headX[i],this.headY[i]);
        ctx2.stroke();
    }
    ctx2.restore();
    //save和restore函数是将这中间的画画动作局限在这里而已
}