/**
 * Created by lenovo on 2018/8/10.
 */
var fruitObj = function () {
    this.alive = []; //bool值，表明是否存活
    this.x = [];//果实的x
    this.y = [];//果实的y
    this.l = []; //果实的生长程度
    this.spd = []; //每一个果实自己的速度
    this.styleType = []; //每个果实对应的图片
    this.orange = new Image();
    this.blue = new Image();
    this.aneNo = [];
}
fruitObj.prototype.num = 30;
// fruitObj.prototype.orange = new Image();
// fruitObj.prototype.blue = new Image();
fruitObj.prototype.init = function () {
    this.orange.src = "./src/fruit.png";  //忘记加.src 导致一直报错
    this.blue.src = "./src/blue.png";  //这就很尴尬了。上一层目录居然是./
    for(var i=0;i<this.num;i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.spd[i] = Math.random() * 0.15 + 0.03; //[0.03 0.18)
        this.styleType[i] = "";
        this.aneNo[i] = 0;
    }

}
fruitObj.prototype.draw = function () {
        for(var i=0;i<this.num;i++){
            if(this.alive[i]){
                var pic;
                if(this.styleType[i] == "blue"){
                    pic = this.blue;
                }
                else pic = this.orange;
                if(this.l[i] < pic.width){
                    // this.l[i] += Math.random()*0.1 * deltaTime;
                    this.l[i] += this.spd[i] * deltaTime / 5;
                    this.x[i] = ane.headX[this.aneNo[i]];
                    this.y[i] = ane.headY[this.aneNo[i]];
                    if(this.l[i] > pic.width) this.l[i] = pic.width;
                }
                else{
                    // this.y[i] -= Math.random()*0.07 * deltaTime;
                    this.y[i] -= this.spd[i] * 0.9 * deltaTime;
                }
                if(this.y[i] <= 10) {
                    //表示果实飘出屏幕了
                    this.alive[i] = false;
                }
                //因为y和x 在果实成长成熟后就不再变化了，所以就可以只用一个drawImage
                ctx2.drawImage(pic,this.x[i]-this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);
            }
        }

}
//可以加一个判断进行判断是否是重叠在同一条海葵上面
fruitObj.prototype.born = function (i) {
    var aneID = Math.floor(Math.random() * ane.num);
    // this.x[i] = ane.rootX[aneID];
    // this.y[i] = ane.headY[aneID]; // 因为i的海葵一直在变，所以要记录下来其编号
    this.aneNo[i] = aneID;
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if(ran < 0.1){
        this.styleType[i] = "blue";
    }
    else this.styleType[i] = "orange";
}
fruitObj.prototype.dead = function (i) {
    this.alive[i] = false;
}
function fruitMonitor() {
    var num = 0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]) num++;
    }
    if(num < 15)
    {
        //send fruit
        sendFruit();
        return;
    }
}
function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}