$(function(){
	//控制高度；
	$(".page_body").height($(window).height()-50);
	$("#custom .tab-title").css("min-height",$(window).height()-105+"px");
	$(window).resize(function(){
		var ww=$(this).height();
		$(".page_body").height(ww-50);
		$("#custom .tab-title").css("min-height",ww-105+"px");
	});

	//nav选择
	$(".page_body_nav li").each(function(index){
		$(this).click(function(){
			$(".page_body_nav li").removeClass("curr");
			$(this).addClass("curr");
			$(".page_body_con>ul.tab_content>li").removeClass("curr");
			$(".page_body_con>ul.tab_content>li").eq(index).addClass("curr");
		});
	});
	$(".layout_select").css("bottom",-$(".layout_select").height()+"px");
	$(".layout_select #closeSelect").click(function(){
		$(".layout_select").animate({bottom:-$(".layout_select").height()+"px"},300,function(){});
	})
	addEditor();
	removeOperation();
	addImgSrc();
	addLink();
	togglelayout();
});

function setVal(){
	$(".page input,.page textarea").off().on("change",function(){
		$(this).attr("value",$(this).val());
	})
}

function ajax(u,d,s,cT,dT,as){
	$.ajax({
	     type:'POST',
	     url: u,
	     data: d,
	     cache:false,
	     async:as||true,
	     //xhrFields: {  withCredentials: wc  },
	     //contentType:"application/json;charset=UTF-8",
	     dataType:"json",
	     success: function(rdata){
	     	s.call(rdata);
	     }

	});
}

function dialogBox(ele,w,h,txt,callback){
	$("#dialogCon").append("<div id='bg' style='position:fixed;top:0;left:0;background:#666;opacity:0.5;width:100%;height:100%;z-index:9998;'></div>");
	$("#dialogCon").append("<div id='dialog' style='background:#fff;height:"+h+"px;width:"+w+"px;position:fixed;z-index:9999;top:50%;left:50%;margin-top:"+(-h/2)+"px;margin-left:"+(-w/2)+"px;border-radius:5px;border:1px solid #ddd;box-shadow:0 0 10px #fff;overflow:hidden;'></div>");
	if(ele)
		$("#dialog").html($(ele).html());
	else
		$("#dialog").html(txt);
	$("#dialog").append("<a href='javascript:void(0);' class='close' style='text-decoration: none;position:absolute;top:5px;right:5px;display:block;width:20px;height:20px;line-height:18px;text-align:center;border-radius:50%;background:#ccc;color:#fff;'>x</a>");
	
	$("#dialog .close").click(function(){
		$("#dialog,#bg").animate({opacity:0},500,function(){
			$("#dialog,#bg").remove();
		});
	});
	
	$("#dialog .confirm").click(function(){
		callback.call(this,true);
		$("#dialog,#bg").animate({opacity:0},500,function(){
			$("#dialog,#bg").remove();
		});
	});
}

$(".page").each(function(){
    $(".page").off().on("click",".layout",function(){
        var ele=$(this);
        $(".layout_select").animate({bottom:0},300,function(){
            addLayout(ele);
        });
    });
});



function addLayout(ele){
    $(".layout_select>li").off().on("click",function(){
        ele.after($(this).clone());
        var id="layout"+parseInt(Math.random()*10000),layoutName=$(this).find(".layout_name").html();
        ele.next().attr({"layoutId":id,"layoutName":layoutName});
        ele.next().after('<div class="layout">增加新模块</div>');
        $(".layout_select #closeSelect").trigger("click");
        removeOperation();
        addEditor();
        setTimeout(function(){
        	addImgSrc();
        	addLink();
        },100)
        setVal();
        togglelayout();
        
    });
}

function togglelayout(){
		$(".page_body .tab_content li .page .layout_li .select").click(function(){
			$(this).parent().toggleClass("open");
		});
}

function addEditor(){
	$(".page .addEditor").off().on("click",function(){
        $(this).after($(this).parent().find(".editor").eq(0).clone());
        $(this).next().find("input,textarea").attr("value","");
        $(this).next().append('<a href="javascript:void(0);" class="removeEditor remove">x</a>');
        $(this).next().after('<div class="addEditor">新增装饰</div>');
        removeOperation();
        addEditor();
        setVal();
        addImgSrc();
        addLink();
    });
}
function removeOperation(){
	$(".page_container .removeLayout").off().on("click",function(){
		$(this).parents(".layout_li").next().remove();
		$(this).parents(".layout_li").remove();
	});
	$(".page_container .removeEditor").off().on("click",function(){
		$(this).parents(".editor").next().remove();
		$(this).parents(".editor").remove();
	})
}
function addImgSrc(){
	$(".page input[content='img']").off().on("click",function(){
		var ele=$(this);
		if($("#img .img_con .img_list_con").length>0){
			var con=$("#img .img_con").html();
			var txt="<div id='selectimg'>"+con+"</div>";
	        dialogBox("",750,450,txt,function(s){
	        });
	        $("#dialog #selectimg .img_list_con").off().on('click',function(){
	        	ele.attr("value",$(this).find("img").attr('src'));
	        	$("#dialog .close").trigger("click");
	        })
		}else{
			reloadimg(false);
			setTimeout(function(){
				var con=$("#img .img_con").html();
				var txt="<div id='selectimg'>"+con+"</div>";
	        	dialogBox("",780,450,txt,function(s){
	        	});
	        	$("#dialog #selectimg .img_list_con").off().on('click',function(){
	        		ele.attr("value",$(this).find("img").attr('src'));
	        		$("#dialog .close").trigger("click");
	        	})
			},300)
		}
	})
}
function addLink(){
	$(".page input[content='link']").off().on("click",function(){
		var ele=$(this);

		if($("#custom .tab-title li").length>0){
			var txt="<div id='selectlink'>";
			$(".page_body_nav ul>li[link]").each(function(){
				txt+="<div class='link_list_con'><div class='linkname'>"+
				$(this).html()+"</div><div class='link'>"+
				$(this).attr("link")+"</div></div>";
			});
			$("#custom .tab-title>li[link]").each(function(){
				txt+="<div class='link_list_con'><div class='linkname'>"+
				$(this).find(".name").html()+"</div><div class='link'>"+
				$(this).attr("link")+"</div></div>";
			});

			txt+="</div>";
			console.log(txt);
	        dialogBox("",650,400,txt,function(s){
	        });
	        $("#dialog #selectlink .link_list_con").off().on('click',function(){
	        	ele.attr("value",$(this).find(".link").html());
	        	$("#dialog .close").trigger("click");
	        });
		}else{
			pullCustom();
			setTimeout(function(){
				var txt="<div id='selectlink'>";
				$(".page_body_nav ul>li[link]").each(function(){
					txt+="<div class='link_list_con'><div class='linkname'>"+
					$(this).html()+"</div><div class='link'>"+
					$(this).attr("link")+"</div></div>";
				});
				$("#custom .tab-title>li[link]").each(function(){
					txt+="<div class='link_list_con'><div class='linkname'>"+
					$(this).find(".name").html()+"</div><div class='link'>"+
					$(this).attr("link")+"</div></div>";
				});

				txt+="</div>";
		        dialogBox("",650,400,txt,function(s){
		        });
		        $("#dialog #selectlink .link_list_con").off().on('click',function(){
		        	ele.attr("value",$(this).find(".link").html());
		        	$("#dialog .close").trigger("click");
		        });
			},500)
		}
	});
}

$(".page #save").click(function(){
	layoutSave($(this));
});

