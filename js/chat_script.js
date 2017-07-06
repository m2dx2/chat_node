var cust_data=[];
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
function insertChat(who, text, time = 0,flag){
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
    }else if(flag==true){
        $("#chat_box").attr("disabled", "disabled"); 
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro ">' +
                            '<div class="text text-r">' +
                                '<button class="btn btn-default answerButton" style="background-color: #00daff" >'+text+'</button>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +                                
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
    if (e.which == 13){
        var text = $(this).val();

        if (text != ""){cust_data.push(text);}
         if(cust_data.length==3){
            $('#chat_box').type="number";
         }
        
        if(cust_data.length>3){
            insertChat("me", text); 

            finish();
        }else{
             if (text != ""){
            insertChat("me", text);              
            $(this).val('');
        }else{
                 alert("write a message first");
                 return false;
        }
     if(!name){
         name=text;
         options=['Personal Loan','Home Loan','LAP']
        insertChat("you", "Hello,"+name, 1000);
        insertChat("you", "What kind of loan do you required?", 1000);
        
       
       $.each(options,function(key,value){
                insertChat("you",value,2000,true);
        }); 

        }else{
           // console.log("calling ...");
            getResponse(text);
        }
    }
 }
        
       
   
});

//-- Clear Chat
resetChat();
insertChat("you", "Welcome to RupeeBoss.com ...", 0);  
insertChat("you", "What's your good name?", 0);  


function getResponse(val){

    $.ajax({
        type:"POST",
        url:"http://localhost:4200/getResponse",
        data:{"msg":val},
        success:function(msg){
            if(msg.status){
                console.log(msg)
                if(msg.result.length>1){
                     //console.log(msg.result[0].comment);
                    insertChat("you",msg.result[0].comment,500);
                    $.each(msg.result,function(key,value){
                        insertChat("you",value.answer,1000,true);
                    }); 
                   
                    $('#chat_box').prop( "disabled", true );
                    
                }else{
                   
                     insertChat("you",msg.result[0].answer,1000);
                      $('#chat_box').prop( "disabled", false );
                }  
                
            }else if(msg.err){
                console.log(msg.err.message);
                insertChat("you","Ooops, something is broken here.Let me fix it first.", 2000);

            }else{
                insertChat("you","Thanks We will reach you soon.", 2000);
            }
        }
    });
}
//on clicking on of the options
 $(document).on('click','.answerButton',function(){
    
   var data=$(this).text();
   cust_data.push(data);
   insertChat("me",data,0);
   if(data=='salaried'){
        insertChat("you",name +",What's your monthly Income?", 0);  
         $('#chat_box').prop( "disabled", false );
    }else if(data=='self Employed'){
        insertChat("you",name +",What's your profit after tax?", 0);  
         $('#chat_box').prop( "disabled", false );
    } else{
        getResponse(data);
    }
   
  // $( ".answerButton" ) .closest( "li" ).hide();
   $('.answerButton').removeClass('answerButton');
    //insertChat("you","Good choice,Let me know a bit more about your choice", 1000);
});
function finish(){

    if(cust_data.length==4){
        insertChat("you","Existing EMI Amount?", 1000); 
    }else if(cust_data.length==5){
        loan_eligible_calc();

        insertChat("you","What's your phone number?", 2000); 
    }else if(cust_data.length==6){
         insertChat("you","What's your email-id?", 1000); 
    }else{
        store_cust_data(cust_data);
        insertChat("you","Thanks,Our executives working around the clock. we will reach you soon.", 1000); 
    }
    $('#chat_box').val('');
    console.log(cust_data);
}
function loan_eligible_calc(){
    var salary=cust_data[3];
    var emi=cust_data[4];
    var net_income=salary-emi;
    var foir=45/100;
    if(net_income<20000){
        foir=35/100;
    }else if(net_income>20000 && net_income<75000){
        foir=40/100;
    }
    if(emi==0)emi=1;

    var elig=net_income*foir*60;

    if(isNaN(elig)){
        cust_data.splice(4,1);
        cust_data.splice(5,1);
        insertChat("you","Enter your income again", 1000); 
        return false;
    }
    insertChat("you","Congrats, you are eligible for "+elig+" Rupees.", 1000); 
}  

function store_cust_data(data){
   
     $.ajax({
        type:"POST",
        url:"http://localhost:4200/SaveCustomer",
        data:{"data":data},
        success:function(msg){
            console.log(msg);
        }
    });
}