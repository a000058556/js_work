let topic = [
    "尚未開學",
    "國定假日",
    "環境準備",
    "隨機性",
    "重複性",
    "條件判斷"
];


// let startD = $("#mydate").val();
let startD = new Date();



function setMonthAndDay(stM,stD){
//一次設定好月份與日期
    startD.setMonth(stM-1,stD);
    startD.setHours(0);
    startD.setMinutes(0);
    startD.setSeconds(0);
}

setMonthAndDay(4,21);