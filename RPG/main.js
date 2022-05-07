let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
// mapArray - 決定地圖中每個格子元素
// ctx - HTML5 Canvas用
// currentImgMainX, currentImgMainY -決定腳色位置
// imgMountain, imgMain, imgEnemy -障礙物, 主角, 敵人圖片

const gridLength =200;
// 設定畫面分割，每格200


// 網頁載入後完成初始化動作
$(function(){
    mapArray = [ //0:可走 1:障礙 2:終點 3:敵人
        [0,1,1],
        [0,0,0],
        [3,1,2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");
    // 找到canvas(畫布)元件，用getContext選擇2d的繪製方式

    //建立主角圖片物件
    imgMain = new Image();
    imgMain.src = "RPG/images/spriteSheet.png";
    currentImgMain = {
        "x":0,
        "y":0
    };

    //讓主角繪製到畫面上- 會有物件還沒載入完成的問題
    //所以用.onload讓預覽器載入完成後馬上執行
    imgMain.onload = function(){
        //在用.drawImage繪製到Canvas中，由0,0出發擷取w80,h130的範圍，
        //從currentImgMain的x,y(左上)開始放，放置gridLength:200*200的範圍。
        ctx.drawImage(imgMain, 0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    };



//     let sources = {
//         Mountain:"images/material.png",
//         Enemy:"images/Enemy.png"
//     };



//     function loadImages(sources, callback){
//         let images = {};
//         let loadedImages = 0;
//         let numImages = 0;
//         // get num of sources
//         for(let src in sources) {
//           numImages++;
//         }
//         for(let src in sources) {
//           images[src] = new Image();
//           images[src].onload = function() {
//             if(++loadedImages >= numImages) {
//               callback(images);
//             }
//           };
//           images[src].src = sources[src];
//         }
//     }

//     loadImages(sources,function(images){
//         for(let x in mapArray){
//         for(let y in mapArray[x]){
//             if(mapArray[x][y]==1){
//                 //Draw Mountain
//                 ctx.drawImage(images.Mountain, 32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
//             }else if(mapArray[x][y]==3){
//                 //Draw Enemy
//                 ctx.drawImage(images.Enemy, 7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
//             }
//         }
//     }
// });





    // 建立山的圖片物件
    imgMountain = new Image();
    imgMountain.src = "RPG/images/material.png";
    // 建立敵人的圖片物件
    imgEnemy = new Image();
    imgEnemy.src = "RPG/images/Enemy.png"

    imgMountain.onload = function(){
        imgEnemy.onload = function(){
            for(let x in mapArray){
                for(let y in mapArray[x]){
                    if(mapArray[x][y]==1){ //當mapArray是1時，放上山的圖片物件，由(x, y) = (y*gridLength, x*gridLength)出發擷取
                        ctx.drawImage(imgMountain, 32,65,32,32 ,y*gridLength,x*gridLength,gridLength,gridLength);
                    }else if(mapArray[x][y]==3){ //當mapArray是3時，放上敵人的圖片物件
                        ctx.drawImage(imgEnemy, 7,40,104,135 ,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                
                }    
            }
        }
    }
});


//處理使用者按下按鈕
$(document).on('keydown', function(event){
    let targetImg, targetBlock, cutImagePositionX;
    //3.cutImagePositionX -決定主角臉的方向

    //1.判斷使用者按了什麼
    //2.判斷目標位置那一格是什麼
    //3.決定要做的事(只轉頭/可過去/...)

    targetImg = { //目標座標Canvas(x, y)
        "x":-1,
        "y":-1
    }

    targetBlock = { //Data 2d array
        "x":-1,
        "y":-1
    }

    event.preventDefault();
    //preventDefault避免鍵盤的預設行為，例如/上下捲動/放大/換頁


    // 判斷使用者按下什麼(.code or keyCode)並推算座標
    // .code : 按鍵上(ArrowUp) 按鍵下(ArrowDown) 按鍵右(ArrowRight) 按鍵左(ArrowLeft)
    // keyCode : 按鍵編號
    switch(event.code){
        case "ArrowLeft": 
            targetImg.x = currentImgMain.x - gridLength; //往左 = x減一格(gridLength:200)
            targetImg.y = currentImgMain.y; //y沒動
            cutImagePositionX = 175; //臉朝左
            break;
            
        case "ArrowUp": 
            targetImg.x = currentImgMain.x; //x沒動
            targetImg.y = currentImgMain.y - gridLength; //往上 = y減一格(gridLength:200)
            cutImagePositionX = 355; //臉朝上
            break;

        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength; //往右 = x加一格(gridLength:200)
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540; //臉朝右
            break;
                
        case "ArrowDown": 
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength; //往下 = y加一格(gridLength:200)
            cutImagePositionX = 0; //臉朝下
            break;
        
        default: //其他按鍵不處理
            return;
    };


    // if (地圖中的範圍)
    if(targetImg.x<=400 && targetImg.x>=0 && targetImg.y<=400 && targetImg.y>=0){
        targetBlock.x =targetImg.y / gridLength; //換算至地圖陣列(Array)
        targetBlock.y =targetImg.x / gridLength;
    }else{ //如果超過地圖範圍，就不會走出去
        targetBlock.x = -1;
        targetBlock.y = -1;
    };
    //清空主角原本所在位置
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);


    if(targetBlock.x !=-1 && targetBlock.y !=-1){

        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0: //一搬道路可移動
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x; //把目標座標帶入
                currentImgMain.y = targetImg.y;
                break;
            
            case 1: //有障礙物
                $("#talkBox").text("有山");
                break;

            case 2: //終點
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            
            case 3: //有敵人
                $("#talkBox").text("哈摟");
                break;
        }
    }else{
        $("#talkBox").text("邊界");
    }

    //重新繪製主角
    ctx.drawImage(imgMain, cutImagePositionX,0,80,130,currentImgMain.x, currentImgMain.y, gridLength, gridLength);



});

