$(document).ready(function(){
	var flag=false;
//------------------------------------------------------------------------------------------------------------------		
	$("#chat-header").on("click",function(){
		$("#chat-content").slideToggle();
		if(flag){
			$(".chat-name").text("Chat (Tap to maximize)");
		}else{
			$(".chat-name").text("Chat (Tap to minimize)");
		}
		flag=!flag;
		});
//------------------------------------------------------------------------------------------------------------------		
	$("#chat").on("click","#sendChat",function(){
		var chatMessage=$("#chatBox").val().trim();
		if(chatMessage.length > 0){
			$("#chatBox").val("");
			$("#chat-message").append("<div class='messageSent'>"+chatMessage+"</div>");
		    $.ajax({
					type : 'post',
					url : 'Your Python Server Location', //Python Location
					cache : false,
					data : {
						"message" : chatMessage,
					},
					success : function(data) {
						if (data != "" && data != null) {
							$("#chat-message").append("<div class='messageReceived'>"+data.trim()+"</div>");
				        }else{
				        	$("#chat-message").append("<div class='messageReceived'>Sorry, There was error from our side</div>");
				        }
						$("#chat-message").scrollTop($("#chat-message")[0].scrollHeight);
					},
					error: function(jqXHR,exception)
					{
						errorAjax(jqXHR,exception);
					}
				});
		}
		
	});
//------------------------------------------------------------------------------------------------------------------		
$(document).on("click",function(){
	$("#chatBox").focus();
});	
//------------------------------------------------------------------------------------------------------------------		
	
});