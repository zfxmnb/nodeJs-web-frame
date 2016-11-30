function layoutLoad(){
	var data={loadLayout:"index"};
    ajax("/controler",data,function(){
        if(this){

        }
    },"","json");
} 

function layoutSave(ele){
	var pln=ele.parents(".page").attr("id");
	var plc=ele.parents("li.curr").html();
	var d=formatData();
	var data= JSON.stringify(formatData());
    ajax("/updata",{layoutSave:data,page:d[0],pln:pln,plc:plc},function(){
        if(this){
        	
        }
    },"","json");
}

function formatData(){
	var data=[];
	data.push($(".page_body_con li.curr .page").attr("pageName"));
	var allLayoutData=[];
	$(".page_body_con li.curr .page .layout_li").each(function(){
		var layoutData={};
		layoutData.layoutId=$(this).attr("layoutId");
		layoutData.layoutName=$(this).attr("layoutName");
		var editorsData=[];
		$(this).find(".editors").each(function(){
			var subData=[];
			subData=standard($(this));
			editorsData.push(subData);
		});
		layoutData.data=editorsData;
		allLayoutData.push(layoutData);
	});
	data.push(allLayoutData);
	return data;
}
function standard(ele){
        var subData=[];
        ele.find(".editor").each(function(){
            var sd={};
            $(this).find("textarea,input").each(function(){
                eval("sd."+$(this).attr("name")+"=$(this).val()");
            });
            subData.push(sd);
        });
        return subData;
}
