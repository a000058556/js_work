let thisH1 =document.getElementById("mouh1");
let thisP =document.getElementById("moup");
let thiDiv =document.getElementById("mouse");
//用變數抓取要修改的物件

//建立修改函示
function mousrIn(){
    thisH1.innerHTML = "你到家了";
}

function mousrOut(){
    thisH1.innerHTML = "你出門了";
    thisP.innerHTML = "";
}

function mousrMove(e){
    thisP.innerHTML = "你現在位置: "+ e.clientX+","+e.clientY;
}

//設定事件發生與要帶入的修改函數
thiDiv.addEventListener("mouseover",mousrIn); 
//mouseover等為事件名稱,mousrIn為前面自訂的函式名稱
thiDiv.addEventListener("mouseout",mousrOut);
thiDiv.addEventListener("mousemove",mousrMove);
