$(document).ready(function () {
  $("#signupdisplay").click(function () {
    $("#login_box").fadeToggle("fast");
    setTimeout(() => $("#content_rbox").fadeToggle("fast"), 200);
  });

  $("#intro").click(function () {
    $("#login_box").fadeToggle("fast");
    setTimeout(() => $("#content_lbox").fadeToggle("fast"), 200);
  });

  $("#backr").click(function () {
    $("#content_rbox").fadeToggle("fast");
    setTimeout(() => $("#login_box").fadeToggle("fast"), 200);
  });
  $("#backl").click(function () {
    $("#content_lbox").fadeToggle("fast");
    setTimeout(() => $("#login_box").fadeToggle("fast"), 200);
  });


  //login setup ****
  $("#loginButton").on("click", function () {
    if ($("#password").val() == "" || $("#username").val() == "")
      alert("Please check your input");
    else {
      $.get(
        "/login",
        { username: $("#username").val(), password: $("#password").val() },
        function (res) {
          if (!res) alert("User not found");
          else {
            console.log("Login success");
            $(location).attr("href", "main.html?id=" + res);
          }
        }
      );
    }
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  });
  $("#signUpButton").on("click", function () {
    if ($("#signUsername").val() == "" || $("#signPassword").val() == "")
      alert("Please check your input");
    else {
      $.post(
        "/signUp",
        {
          username: $("#signUsername").val(),
          password: $("#signPassword").val(),
        },
        function (res) {
          if (res == "ok") alert("Sign up success");
          else alert("Sign up fail,username is already exist");
        }
      );
    }
    document.getElementById("signUsername").value = "";
    document.getElementById("signPassword").value = "";
  });
});
