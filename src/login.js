let password = document.getElementById("password");
password.onkeyup = function(e){
    if(e.keyCode == 13){
       checkDetails();
    }
}

function checkDetails(){
    
    $("#wrong").empty();

    if($("#username").val() == "admin" && $("#password").val() == "password"){
        window.location.href = "admin.html"
    }else{
        
        $("#wrong").append("<h2>Invalid Credentials</h2>")
        document.querySelector("#wrong").style.animation = 'none';
        document.querySelector("#wrong").offsetWidth;
        document.querySelector("#wrong").style.animation = '1.2s shake';
    }

}