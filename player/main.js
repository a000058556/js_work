let player; //youtube player
let currentPlay = 0; //紀錄目前撥到第幾首 

// youtube載入framework後會自動呼叫

// youtube api 準備
function onYouTubeIframeAPIReady(){
    //當youtube api 準備好後設定撥放器
    player = new YT.Player("player",{  //YT.Player(id名稱, 物件)
        height:"390",
        width:"640",
        videoId:playList[currentPlay], //撥放清單中的[第幾首]
        playerVars:{
            autoplay:0, //是否自動撥放 0=否
            controls:0, //是否顯示控制項 0=否
            start:playTime[currentPlay][0], //playTime中的[第幾首][開始秒數]
            end:playTime[currentPlay][1], //playTime中的[第幾首][結束秒數]
            iv_load_policy:3, //显示视频注释，设置为 3=默认不显示。默认值为 1。
            rel:0, //影片結束時只會出現該頻道的影片
        },
        events:{
            onReady:onPlayerReady,
            onStateChange:onPlayerStateChange //onStateChange影片撥放完後觸發onPlayerStateChange下一首哥
        }
    });


};

// youtube player 準備好時設定按鈕事件
function onPlayerReady(event){
    $("#playButton").on('click', function(){
        $("#nameh2").text(player.getVideoData().title); //取得影片title放到h2中
        player.playVideo();
    });

};


// Player State Change 一首播完跳下一首
function onPlayerStateChange(event){
    if(Math.floor(player.getCurrentTime())== playTime[currentPlay][1]){
        //當撥放時間player.getCurrentTime()=結束時間時playTime[currentPlay][-1]
        if(currentPlay<playList.length-1){ //還有下一首時
            currentPlay++;
            player.loadVideoById({ //撥下一首時
                videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        }else{//沒有下一首時 停止並撥第一首
            currentPlay = 0;
            player.cueVideoById({ //載入
                videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        }
    }
    
    // if(event.date == 1){ //當影片開始撥放時，更新標題
    $("#nameh2").text(player.getVideoData().title); 
    // }

};