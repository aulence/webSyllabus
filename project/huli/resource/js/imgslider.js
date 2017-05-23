/**
* 功能：图片轮播功能
**/
// 图片
var slideList = $(".slideList"),
	imageList = slideList.children("img"),
	imageList_leng = imageList.length;
// 添加控制点
slideList.after("<div class='slideList-point'></div>");
// 控制点容器
var slideList_point = slideList.next()
for(var i = 0; i < imageList_leng; i ++) {
	slideList_point.append("<i></i>")
}
slideList_point.children().first().addClass("ckd");
// 执行轮播
var imgSlideTimer;
imgSlideTimer = setInterval(function() {
	runImgSlide();
},6000);
// 控制点切换图片
slideList_point.children().click(function() {
	var thisIdx = $(this).index();
	$(this).addClass("ckd").siblings().removeAttr("class");
	imageList.eq(thisIdx).addClass("show").siblings().removeAttr("class");
	clearInterval(imgSlideTimer);
	imgSlideTimer = setInterval(function() {
		runImgSlide();
	},6000);
});

/**
* 功能： 图片轮播核心函数
**/
function runImgSlide() {
	// 当前索引
	var showImage = $(".slideList > img.show"),
		showImage_idx = showImage.index();
	// 创建1~4之间的随机数
	var randomNum = Math.round(Math.random() * 3 + 1);
	if(showImage_idx != imageList_leng - 1) {
		showImage.removeAttr("class").next().addClass("show enlarge-" + randomNum);
		slideList_point.children().eq(showImage_idx + 1).addClass("ckd").siblings().removeAttr("class");
	} else {
		showImage.removeAttr("class");
		imageList.eq(0).addClass("show enlarge-" + randomNum);
		slideList_point.children().eq(0).addClass("ckd").siblings().removeAttr("class");
	}
}
