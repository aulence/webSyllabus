$(function() {
	
	/* 显隐设置面板 */
	$(".toggleSet").click(function() {
		if($(this).text() === "显示设置面板") {
			$(this).text("隐藏设置面板");
		} else {
			$(this).text("显示设置面板");
		}
		$(".setContent").slideToggle(300);
	});

	/* 生成创建内容 */
	$(".createListItem").click(function() {
		$(this).closest(".setContent").slideUp(300);
		// 获取去设置框内的值
		var titleContent = $(".listTitle").val();
		var content = $(".listContent").val();
		var item = `
			<li>
			<a>${titleContent}<i></i></a>
			<div>${content}</div>
			</li>
		`;
		$(".contentUl").append(item);
		// 清除设置框内的值
		$(".setContent div").children(".listTitle, .listContent").val("");
	});

	/* 显隐列表下拉内容 */
	$(".contentUl").on("click", "li > a", function() {
		$(this).parent().toggleClass("checked")
		$(this).next().slideToggle(300);
		$(this).parent().siblings().removeClass("checked").children("div").slideUp(300);
	});
	
	/* 删除项 */
	$(".contentUl").on("click", "li > a > i", function(e) {
		e.stopPropagation();
		$(this).closest("li").fadeOut(300, function() {
			$(this).remove();
		});
	})
	
});