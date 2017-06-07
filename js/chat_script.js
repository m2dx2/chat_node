var name='';
var me = {};
me.avatar = "images/me.JPG";

var you = {};
you.avatar = "images/you.jpg";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}            

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time = 0){
    var control = "";
    var date = formatAMPM(new Date());
    
    if (who == "me"){
        
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +                                
                  '</li>';
    }
    setTimeout(
        function(){                        
            $("ul").append(control);

        }, time);
    
}

function resetChat(){
    $("ul").empty();
}

$(".mytext").on("keypress", function(e){
	
getResponse(text);
	//enter key value is 13
    if (e.which == 13){
		alert("sdfsdf");
        var text = $(this).val();
        if (text !== ""){
            insertChat("me", text);              
            $(this).val('');
        }
        //console.log(name);
     if(!name){
		 alert("sdfsd");
		 name=text;
		insertChat("you", "Hello,"+name+"", 1000);
		}else{
            getResponse(text);
        }
    }
    
});

//-- Clear Chat
resetChat();

//-- Print Messages

insertChat("you", "Hello whats your name...", 0);  

// insertChat("me", "What would you like to talk about today?", 3500);
// insertChat("you", "Tell me a joke",7000);
// insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!", 9500);
// insertChat("you", "LOL", 12000);


//-- NOTE: No use time on insertChat.
function getResponse(val){
console.log($('#chat_form').serialize());
    $.ajax({
        type:"POST",
        url:"http://localhost:4200/getResponse",
        data:{
			theme: "somevalue"
			},
        success:function(msg){
            if(msg){
                insertChat("you", msg,1000);  
            }else{
                console.log("response came "+msg)
                insertChat("you","i am not sure what you are talking about", 2000);
            }
        }
    });
}
