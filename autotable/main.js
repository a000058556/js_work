$(function(){
    $("#tb").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    let topicC = topic.length;
    //一秒鐘有1000毫秒
    //每分鐘60秒 每小時60分 每天24小時
    //計算一天的秒數量
    let milsday = 24*60*60*1000;

    for(let x=0;x<topicC;x++){

        let thisdate = new Date(startD.getTime()+7*x*milsday);
        $("#tb").append(
            `<tr><td>${x+1}</td><td>${thisdate.getMonth()+1}/${thisdate.getDate()}</td><td>${topic[x]}</td></tr>`
            //new Date()支援毫秒轉日期
            //用getTime()將時間轉成毫秒
            //(7*x*milsday)將要加的時間轉成毫秒
            //將目前時間毫秒+要加的時間毫秒用new Date()還原成日期格式
            //用toLocaleDateString()變更日期呈現格式
            //單獨取出月份/日期，自己設定呈現方式
        )
    }



});
