let fimgs = [
    "https://storage.googleapis.com/www-cw-com-tw/article/202101/article-5ff76e12dff12.jpg"
    ,"https://cw1.tw/CH/club/images/article/201609/article-57e8d40589385.jpg"
    ,"https://rs.joo.com.tw/website/uploads_product/website_771/P0077100065111_3_242833.jpg?_5777"
];

$(function(){
    $("input").on("click",function(){
        // alert("HI");
        //li:first 抓第一個li元素
        //.eq(1) 抓第一個li元素
        let nblit =$("#choices li").length; //抓取li算有幾個li
        let nbedm =Math.floor(Math.random()*nblit); //用li數量作為亂數最大值
        $("h1").text($("#choices li").eq(nbedm).text()); //抓取h1置換為亂數的li內容
        $("img").attr("src",fimgs[nbedm]); //抓取img置換src內的值，以上面nbedm的數字取fimgs清單內的網址

    })
    //$("input") = 抓取按鍵位置
    //on = getElement
});
