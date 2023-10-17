


$(document).ready(function () {
  
  $("#don").hide();

  
              $("#login-form").submit(function (event) {
                  event.preventDefault();
                  
                  var username = $("#username").val();
                  var password = $("#password").val();
                  
                  
                  
                  // اینجا می توانید کد بررسی اعتبار نام کاربری و رمز عبور را قرار دهید
                  // اگر اطلاعات صحیح باشند، می توانید کاربر را به صفحه مورد نظر هدایت کنید
                  // مثال:
                  if (username === "mahdi" && password === "1384") {
                      //   window.location.href = "index-2.html";
                      // $(".link-download").html("<a  href='download/preview.jpg' downloads='download/preview.jpg'> download file </a>")
  
                      $("#don").show();
  
                      
  
  
  
                  } else {
                      alert("نام کاربری یا رمز عبور اشتباه است!");
                  }
              });
          });