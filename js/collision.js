/**
 * Created by lenovo on 2018/8/10.
 */
function momFruitcollision() {
    if(!data.gameOver && StartGame ){
        for(var i=0;i<fruit.num;i++){
            if(fruit.alive[i]){
                //计算距离
                var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
                if(l <  900){
                    //果实死亡
                    fruit.dead(i);
                    data.fruitNum ++;
                    if(fruit.styleType[i] == "blue"){
                        data.double = 2;
                        data.getScore(data.double);
                    }
                    else data.getScore(data.double);
                    mom.bigBodyCount = mom.bigBodyCount + 1;
                    if(mom.bigBodyCount >= 8){
                        mom.bigBodyCount = 7;
                    }

                    wave.bron(fruit.x[i],fruit.y[i],"fruit");
                }
            }
        }
    }
}
function momBabyCollision() {
    if(!data.gameOver  && data.fruitNum!=0 && StartGame ){
        var l = calLength2(baby.x,baby.y,mom.x,mom.y);
        if( l < 900){
            wave.bron(baby.x,baby.y,"baby");
            data.feed();
            baby.babyBodyCount = 0;
            data.reset();
            mom.bigBodyCount = 0;


        }
    }

}