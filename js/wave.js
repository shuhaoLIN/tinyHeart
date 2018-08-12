/**
 * Created by lenovo on 2018/8/11.
 */
var waveObj = function () {
    this.x = [];
    this.y = [];
    this.r = [] ;
    this.alive = [];
    this.aim = []; //aim表示是和那个物体相碰撞
}
waveObj.prototype.num = 20;
waveObj.prototype.init = function () {
    for(var i=0;i<this.num;i++){
        this.x[i] = 0;
        this.y[i] = 0;
        this.r[i] = 0;
        this.alive[i] = false;
        this.aim[i] = "";
    }
}
waveObj.prototype.draw = function () {
    ctx1.save();
    ctx1.lineWidth = 10;
    ctx1.shadowBlur = 10;
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            //draw
            this.r[i] += deltaTime * 0.05;
            if(this.r[i] > 100){
                this.alive[i] = false;
                break;
            }
            var aphla = 1 - this.r[i] / 100;

            //api
            ctx1.beginPath();
            if(this.aim[i] == "baby"){
                ctx1.shadowColor = "rgba(203,91,0,1)";
                ctx1.strokeStyle = "rgba(203,91,0,"+aphla+")";//橙色
            }
            else{
                ctx1.shadowColor = "white";
                ctx1.strokeStyle = "rgba(255,255,255,"+aphla+")";
            }
            ctx1.arc(this.x[i],this.y[i],this.r[i], 0 , 2*Math.PI );
            ctx1.closePath();

            ctx1.stroke();
            //console.log("draw");
        }
    }
    ctx1.restore();
}
waveObj.prototype.bron = function (x,y,aim) {
    for(var i=0;i<this.num;i++){
        if(!this.alive[i]) {
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            this.aim[i] = aim;
            break;
        }
    }
    //console.log("bron");
}