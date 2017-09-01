/**
 * Created by Administrator on 2017/5/7.
 */
$(function () {
	$(".car_select").on("focus",function(){
		$(".container").show();
	})
	$(".btn").click(function(){
			var phone = $(".phone_num").val();
			if(phone == "" || !(/^1[34578]\d{9}$/.test(phone))){
				alert("手机号码不正确");
			}else{
				wait=60;
				time($(this));
			}
			
		});
		
	function time(o) {
		      if (wait == 0) {
		      		o.removeAttr('disabled')
		            o.val("重新获取");
		            o.removeClass('dis_btn');
		            
		        }else{
		        	o.attr('disabled','disabled')
		            o.val("重新发送(" + wait + ")");
		            o.addClass('dis_btn');
		            wait--;
		            setTimeout(function() {
		                time(o)
		            },
		            1000)
		    }  
	
	    }
	
    //加载城市事件
    $.ajax({
		type:"get",
		url:"js/city.json",
		success: function(data){
			$.each(data,function(i,item){
				var lists="<li><a href=#"+item.name+"1>"+item.name+"</a></li>";
				var lis= "<div class='city-list'><span class='city-letter' id="+item.name+"1>"+item.name+"</span>";
				var ps="";
				for(var i=0;i<item.carlist.length;i++){
					 ps+="<p data-name="+ item.carlist[i].name +">"+item.carlist[i].name+"</p>";
				}
				lis+=ps;
				lis+="</div>";
				$(".city").append(lis);
				$(".letter ul").append(lists);
				$.each(item.carlist,function(k,items){
					var txts = items.series;
					$(".city-list p").on("click",function(e){
						$(".container").css("width","150px");
						$(".city-list p").removeClass("color");
						$(".show_car").show(100);
						$(this).addClass("color");
						var txt = e.target.getAttribute('data-name');
						var list = "";
						if(txt == items.name){
							for(var i=0;i<txts.length;i++){
								 list += "<li class="+items.name+">" + txts[i] + "</li>";

							};
							$("#show_car").html(list);
							$("#show_car li").on("click",function(){
								var part2=$(this).text();
								console.log(part2);
								$(".car_select").val(part2);
								$("#show_car").hide();
								$(".container").hide();
								$(".container").css("width","300px");
							});
						};

						
					});
				})
			});
		}
	});
})