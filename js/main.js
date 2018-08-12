var can1;
var can2;

var canWidth;
var canHeight;
var ctx1;
var ctx2;

var lastTime; //上一帧结束的时间
var deltaTime; //上一帧使用的时间长度

var bgPic = new Image();
var ane;
var fruit;
var mom;
var baby;
var babyEye = [];
var babyBody = [];
var babyTail = [];
var bigEye = [];
var bigBodyOrg = [];
var bigBodyBlue = [];
var bigTail = [];
var data;

var dust;
var dustPic = [];
var wave;
var mx;
var my;//这两个值代表着鼠标移动的数值

document.body.onload = game; //在body加载完成后调用该函数
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}
function init(){
	//获得canvas context
	can1 = document.getElementById("canvas1");
	//can1 是用于作为前景图，将会存在鱼，灰尘，UI，圈等
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById("canvas2");
    //can2 是用于作为背景图，将会存在背景图，食物，海藻
    ctx2 = can2.getContext('2d'); //绘制2d场景画布
	canWidth = can1.width;
    canHeight = can1.height;
    bgPic.src = "./src/background.jpg";

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();
    for(var i=0;i<2;i++){
        bigEye[i] = new Image();
        bigEye[i].src = "./src/bigEye"+i+".png";
    }
    for(var i=0;i<8;i++){
        bigTail[i] = new Image();
        bigTail[i].src = "./src/bigTail"+i+".png";
        //console.log(i);
    }
    for(var i=0;i<8;i++){
        bigBodyBlue[i] = new Image();
        bigBodyBlue[i].src = "./src/bigSwimBlue"+i+".png";
        bigBodyOrg[i] = new Image();
        bigBodyOrg[i].src = "./src/bigSwim"+i+".png";
    }

    baby = new babyObj();
    baby.init();
    for(var i=0;i<2;i++){
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye"+i+".png";
    }
    for(var i=0;i<8;i++){
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail"+i+".png";
        //console.log(i);
    }
    for(var i=0;i<20;i++){
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade"+i+".png";
    }

    data = new dataObj();
    data.init();

    wave = new waveObj();
    wave.init();

    dust = new dustObj();
    dust.init();
    for(var i=0;i<7;i++){
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust" + i + ".png";
    }

    can1.addEventListener('mousemove', onMouseMove,false);  //这样就追踪到了鼠标
    mx = canWidth *0.5;
    my = canHeight * 0.5;//初始化在中间

    ctx1.font = "30px Vardana";
    ctx1.textAlign = "center";
}
function gameloop(){
	window.requestAnimFrame(gameloop); //循环调用
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	//console.log(deltaTime);
    drawBackground();
    ane.draw(); // 这个函数要在上面函数的后面，不然就会形成被覆盖
    fruitMonitor();
    fruit.draw();
	//因为现在鱼没有动，所以要清空，ctx1是覆盖在2上面，而且其他部分要做成透明的效果
    ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
    momFruitcollision();
    baby.draw();
    momBabyCollision();
    data.draw();
    wave.draw();
    dust.draw();
}
function onMouseMove(e) {
    if(!data.gameOver){
        if(e.offsetX || e.layerX){
            mx = e.offsetX == undefined ? e.layerX : e.offsetX;
            my = e.offsetY == undefined ? e.layerY : e.offsetY;
            //console.log(mx)
        }
    }

}