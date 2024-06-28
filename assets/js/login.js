function show_alert(alert_type) {

    document.getElementById(alert_type).style.display = "block";

    setTimeout(function() {
        document.getElementById(alert_type).style.display = "none";
    }, 5000);
}

function directoreg(){
    window.location.href = "../register/index.php";
}
function submitForm() {

    document.getElementById('process').style.display = "block";
    document.getElementById('loginbtn').disabled = true;
    document.getElementById('regbtn').disabled = true;

    $.ajax({

        type: "POST",
        url: "process.php",
        data: { username: $("#user").val(), password: $("#pass").val() },
        success: function (response) {

            if (response.includes("success")) {

                document.getElementById('process').style.display = "none";
                show_alert("success")

                setTimeout(function() {
                    window.location.href = "../dashboard/index.php";
                }, 2000);

            } else if (response.includes("error")) {

                document.getElementById('process').style.display = "none";
                show_alert("error")
                document.getElementById('loginbtn').disabled = false;
                document.getElementById('regbtn').disabled = false;

            } else if (response.includes("warning")) {
                
                document.getElementById('process').style.display = "none";
                show_alert("warning")
                document.getElementById('loginbtn').disabled = false;
                document.getElementById('regbtn').disabled = false;
            }
        }
    });
}

function submitFormRegister() {

    var username = $("#user").val();
    var email = $("#email").val();
    var discord = $("#discord").val();
    var password = $("#pass").val();
    
    var buttonRegister = document.getElementById("register");

    buttonRegister.disabled = true

    $.ajax({

        type: "POST",
        url: "process.php",
        data: { username: username, email: email, discord: discord, password: password },
        success: function (response) {

            if (response.includes("success")) {

                show_alert("success")

                setTimeout(function() {
                     window.location.href = "../dashboard/index.php";
                }, 2000);

            } else if (response.includes("error")) {

                show_alert("error")
                buttonRegister.disabled = false

            } else if (response.includes("exists")) {
                
                show_alert("exists")
                buttonRegister.disabled = true
            }
        }
    });
}

function submitFormResetPass(code) {

    var password = $("#pass_reset").val();

    $.ajax({

        type: "POST",
        url: "reset_password.php",
        data: { password: password, code: code },
        
        success: function (response) {

           document.getElementById("resetstatus").innerHTML = response;

            if (response.includes("success")) {

                show_alert("success_reset")

                setTimeout(function() {
                     window.location.href = "../login/index.php";
                }, 2000);

            } else if (response.includes("error")) {

                show_alert("error_reset")

            }
        }
    });
}

function DonwloadLink() {

    window.open('https://github.com/GGTEC/VibesBot/releases/download/4.0.2/VibesBotSetup4.0.2.exe', '_blank')
}

function startPayment(time) {

    $.ajax({

        type: "POST",
        url: "startpayment.php",
        data: { time: time },
        success: function (response) {

            if (!response.includes("error")) {

                window.location.href = response;

            }

        }
    }); 

}

function sendCodePasswordForget(){

    document.getElementById('email-sending').style.display = "block";
    document.getElementById('email-send-confirm').style.display = "None";

    var varemail = $("#email_forget").val();

    $.ajax({

        type: "POST",
        url: "send_code.php",
        data: { email: varemail },
        success: function (response) {

            if (!response.includes("error")) {

                document.getElementById('email-send-confirm').style.display = "block";
                document.getElementById('email-sending').style.display = "None";

            }
        }
    }); 
}

function changeUsername(){

    var username = $("#user").val();
    
    $.ajax({

        type: "POST",
        url: "changeusername.php",
        data: { username: username },
        success: function (response) {

            if (response.includes("error")) {

                show_alert("error_username")

            } else if (response.includes('success')){
                
                show_alert("success_username")

                setTimeout(function() {
                    window.location.href = "../dashboard/logout.php";
                },3000);


            } else if (response.includes('logout')){

                window.location.href = "../dashboard/logout.php";
            } 
        }
    });

}

function changeEmail(){

    var email = $("#email").val();
    
    $.ajax({

        type: "POST",
        url: "changeemail.php",
        data: { email: email },
        success: function (response) {

            if (response.includes("error")) {

                show_alert("error_email")

            } else if (response.includes('success')){
                
                show_alert("success_email")

            } else if (response.includes('logout')){

                window.location.href = "../dashboard/logout.php";
            } 
        }
    });
    
}

function changePass(){

    var oldpass = $("#oldpass").val();
    var pass = $("#pass").val();

    $.ajax({

        type: "POST",
        url: "changepass.php",
        data: { oldpass: oldpass, pass: pass},
        success: function (response) {

            if (response.includes("error")) {

                show_alert("error_pass")

            } else if (response.includes('success')){
                
                show_alert("success_pass")

                setTimeout(function() {
                    window.location.href = "../dashboard/logout.php";
                },3000);

            } else if (response.includes('logout')){

                window.location.href = "../dashboard/logout.php";
            } 
        }
    });
    
}