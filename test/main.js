$(function(){
    //儲存目前做到第幾題
    let crrentQuiz = null;
    //按下按鈕要做什麼
    $("#ster").on("click",function(){
        //還沒開始作答會從這開始
        if(crrentQuiz ==null){
            //設定從0開始作答
            crrentQuiz=0;
            //顯示題目
            $("#question").text(questions[0].question);
            $("#options").empty();//清空結果

            //將選項逐個帶入
            //陣列+forEach+function(存元素的變數([0]從第0個開始),元素索引值,)
            questions[0].answers.forEach(function(element,index,array){
                $("#options").append(
                    `<input name ='option' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
                });
                //按鈕文字換成Next
                $("#ster").attr("value","Next");
        }else{
        //已經開始作答從這開始
        //找哪一個被選到
        //$.each+要索引的type,傳入值(位置,元素)
            $.each($(":radio"),function(i,val){
                //如果元素有被點擊
                if(val.checked){
                    
                    if(isNaN(questions[crrentQuiz].answers[i][1])){
                            //isNaN 是否不是一個數字
                            //是否已走到最後要產生結果(A~D)
                            //.answers內被選到的選項[i]的第[1]位
                            let finalR = questions[crrentQuiz].answers[i][1];
                            $("#question").text(finalAnswers[finalR][0]);
                            $("#options").empty();
                            $("#options").append(`${finalAnswers[finalR][1]}<br><br>`);
                            crrentQuiz = null;
                            $("#ster").attr("value","再一次")
                    }else{
                            //正常跳下一提(原資料起始題目為1，程式起始為0，所以要先減1)
                            crrentQuiz = questions[crrentQuiz].answers[i][1]-1;
                            $("#question").text(questions[crrentQuiz].question);
                            $("#options").empty();
                            questions[crrentQuiz].answers.forEach(function(element,index,array){
                                $("#options").append(
                                    `<input name ='option' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
                                });
                    }
                    return false; //跳離迴圈
                }
            });

    } 

    });
});