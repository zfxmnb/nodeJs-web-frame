$(function(){
	function wchange(){
		if($("#page").height()<$(window).height()){
			$("#page").addClass("short");
		}
		else{
			$("#page").removeClass("short");
		}
	}
	wchange();
	$(window).resize(function(){
		wchange();
	})
})