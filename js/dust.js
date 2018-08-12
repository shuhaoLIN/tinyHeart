/**
 * Created by lenovo on 2018/8/12.
 */
var dustObj = function () {
    this.x = [];
    this.y = [];
    this.amp = [] ; //摆动的幅度
    this.picNum = [];
    this.aphla ; //角度，计算sin值
}
dustObj.prototype.num = 30;
dustObj.prototype.init = function () {
    for(var i=0;i<this.num;i++){
        this.x[i] = Math.random() * canWidth;
        this.y[i] = Math.random() * canHeight;
        this.amp[i] = Math.random() * 50 + 60;
        this.picNum[i] = Math.floor(Math.random() * 7); //【0,6）
    }
    this.aphla = 0;
}
dustObj.prototype.draw = function () {
    this.aphla += deltaTime * 0.001 ;
    var sinL = Math.sin(this.aphla); //计算出来的sinL值
    ctx1.save()
    for(var i=0;i<this.num;i++){
        ctx1.drawImage(dustPic[this.picNum[i]],this.x[i] +  + sinL * this.amp[i],this.y[i]);
    }
    ctx1.restore();
}