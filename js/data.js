/**
 * Created by lenovo on 2018/8/11.
 */
var dataObj = function () {
    this.fruitNum;
    this.double; //为1时是orange，为2时是blue
    this.score; //鱼当前阶段吃的分数
    this.babyScore;
    this.gameOver;
    this.alpha;
}
dataObj.prototype.init = function () {
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    this.babyScore = 0;
    this.gameOver = false;
    this.alpha = 0;
}
dataObj.prototype.reset = function () {
    this.double = 1;
    this.fruitNum = 0;
}
dataObj.prototype.draw = function () {
    ctx1.save();
    ctx1.fillStyle = "white";
    // ctx1.font = "30px Vardana";
    // ctx1.textAlign = "center";
    //因为以上属性可以放在全局的，所以放在main
    ctx1.shadowBlur = "30";
    ctx1.shadowColor = "white";
    //ctx1.fillText("fruitNum " + this.fruitNum,canWidth*0.5,canHeight * 0.5);
    ctx1.fillText("double " + this.double,100,50);
    ctx1.fillText("score " + this.score,300,50);
    ctx1.fillText("babyScore " + this.babyScore,600,50);
    if(this.gameOver){
        this.alpha += deltaTime * 0.0005;
        if(this.alpha > 1){
            this.alpha = 1;
        }
        ctx1.fillStyle = "rgba(255,255,255,"+this.alpha+")";
        ctx1.fillText("GAMEOVER",canWidth*0.5,canHeight*0.5);
    }
    ctx1.restore();
}
dataObj.prototype.getScore = function (double) {
    this.score += 100 * double;
}
dataObj.prototype.feed = function () {
    this.babyScore += this.score;
    this.score = 0;
}
