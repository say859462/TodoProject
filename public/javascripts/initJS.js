const myAllTasks = [];
const month = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};
function addItem(item, time) {
  this.item = item;
  this.time = time;
}
function refresh(ev) {
  // console.log(ev);
  let area = document.getElementById("tasks");
  let sort_Array = new Array();
  if ($(ev).val() == "All") {
    area.innerHTML = "";
    for (let i = 0; i < myAllTasks.length; i++) {
      $(myAllTasks[i].item).hide();
      area.appendChild(myAllTasks[i].item);
      $(myAllTasks[i].item).show(100);
    }
  } else if ($(ev).val() == "Completed") {
    area.innerHTML = "";
    for (let i = 0; i < myAllTasks.length; i++) {
      if ($(myAllTasks[i].item).css("text-decoration") == "line-through") {
        $(myAllTasks[i].item).hide();
        area.appendChild(myAllTasks[i].item);
        $(myAllTasks[i].item).show(100);
      }
    }
  } else if ($(ev).val() == "Active") {
    area.innerHTML = "";
    for (let i = 0; i < myAllTasks.length; i++) {
      if ($(myAllTasks[i].item).css("text-decoration") == "") {
        $(myAllTasks[i].item).hide();
        area.appendChild(myAllTasks[i].item);
        $(myAllTasks[i].item).show(100);
      }
    }
  } else {
    area.innerHTML = "";
    let curTime = new Date();
    for (let i = 0; i < myAllTasks.length; i++) {
      if (myAllTasks[i].time == "") continue;
      let tmp = myAllTasks[i].time;
      if (parseInt(tmp.substring(0, 4)) < curTime.getFullYear()) {
        $(myAllTasks[i].item).hide();
        area.appendChild(myAllTasks[i].item);
        $(myAllTasks[i].item).show(100);
      } else if (
        parseInt(tmp.substring(0, 4)) == curTime.getFullYear() &&
        parseInt(tmp.substring(5, 7)) < curTime.getMonth() + 1
      ) {
        $(myAllTasks[i].item).hide();
        area.appendChild(myAllTasks[i].item);
        $(myAllTasks[i].item).show(100);
      } else if (
        parseInt(tmp.substring(0, 4)) == curTime.getFullYear() &&
        parseInt(tmp.substring(5, 7)) == curTime.getMonth() + 1 &&
        parseInt(tmp.substring(8, 10) < curTime.getDate())
      ) {
        $(myAllTasks[i].item).hide();
        area.appendChild(myAllTasks[i].item);
        $(myAllTasks[i].item).show(100);
      } else {
        continue;
      }
    }
  }
}

function check(id) {
  if (!id) {
    //if id not exist back to past page
    history.go(-1);
    return;
  }

  $.get("/check", { myid: id }, function (res) {
    if (!res) {
      alert("Please go to sign up...");
      history.go(-1);
    } else {
      //console.log(res);
      //setting tasks display
      $("#tasks").html(res.tasks);
      $("body").css("background-image", res.backgroundURL);
      $("body").css("background-size", res.backgroundSize);

      if (res.star) {
        $("#stars").show();
      }
      if (res.firework) {
        $(".pyro").show();
      }
      if (res.ring) {
        $("#ring").show();
      }
      if (res.downStar) {
        $("#downStar").show();
      }
      if (res.rippleRound) {
        $("#rippleRound").show();
      }
      let element = document.getElementById("tasks").children;
      for (let i = 0; i < element.length; i++) {
        if (element[i].style.backgroundColor != "gray") continue;
        else element[i].querySelector("input").checked = true;
      }
      for (let i = 0; i < element.length; i++) {
        if (element[i].querySelector(".showDueDate")) {
          myAllTasks.push(
            new addItem(element[i], element[i].querySelector(".showDueDate"))
          );
        } else {
          myAllTasks.push(new addItem(element[i], ""));
        }
      }
      $.get("/getImg", { myid: id }, function (res) {
        if (res != "nothing") {
          let area = document.getElementById("backgroundList");
          for (let i = 0; i < res.length; i++) {
            let myButton = document.getElementById("fileButton");
            let newNode = document.createElement("button");
            let newBack = document.createElement("img");
            newBack.src = res[i].imgURL;
            newBack.setAttribute("class", "selectBackground");
            newNode.appendChild(newBack);
            area.insertBefore(newNode, myButton);
          }
        }
      });
    }
  });
}
function UPDATE() {
  $.post(
    "/refresh",
    {
      myid: window.location.search.substring(4),
      tasks: $("#tasks").html(),
      backgroundURL: $("body").css("background-image"),
      star: $("#stars").is(":visible"),
      firework: $(".pyro").is(":visible"),
      downStar: $("#downStar").is(":visible"),
      rippleRound: $("#rippleRound").is(":visible"),
      ring: $("#ring").is(":visible"),
      backgroundSize: $("body").css("background-size"),
    },
    function (res) {}
  );
}
//對tasks不斷進行更新 避免刷新頁面或者其他原因而失去資料
setInterval(function () {
  UPDATE();
}, 1000);

window.addEventListener(
  "load",
  function () {
    let area = document.getElementById("tasks");
    area.innerHTML = "";
    for (let i = 0; i < myAllTasks.length; i++) {
      $(myAllTasks[i].item).hide();
      area.appendChild(myAllTasks[i].item);
      $(myAllTasks[i].item).show(100);
    }
  },
  false
);

$(document).ready(function () {
  check(window.location.search.substring(4));
  $("#logOutButton").on("click", function () {
    //console.log($("#tasks").html());

    alert("Log Out Success");
    history.go(-1);
  });

  $("#starButton").on("click", function () {
    $("#stars").toggle();
  });
  $("#fireworkButton").on("click", function () {
    $(".pyro").toggle();
  });
  $("#downStarButton").on("click", function () {
    $("#downStar").toggle();
  });
  $("#rippleRoundButton").on("click", function () {
    $("#rippleRound").toggle();
  });

  $("#ringButton").on("click", function () {
    $("#ring").toggle();
  });
  $("#ring").hide();
  $("#linearBackground").hide();
  $("#rippleRound").hide();
  $("#downStar").hide();
  $("#stars").hide();
  $(".pyro").hide();
  $("#themeList").hide();
  $("#backgroundList").hide();
  $("#ascendingToolTip").hide();
  $("#popOut").hide(); //hide the warning block
  $("select").change(function () {
    //console.log($(this).val());
    refresh(this);
  });
  $("#sideBarButton i").on("click", function () {
    //for sidebar animation
    $("#sideBar").toggleClass("visible");
    $("#sideBarButton").toggleClass("visible");
  });
  $();
  $("#ascendingButton").mouseenter(function () {
    $("#ascendingToolTip").show(100);
  });
  $("#ascendingButton").mouseleave(function () {
    $("#ascendingToolTip").hide();
  });

  $("#addButton").on("click", function () {
    //add task
    //check if input field is empty , if yes =>show the warning
    if ($("#inputField").val() == "") {
      $("#popOut").stop(true).fadeIn(800);
      document.getElementById("inputField").focus();
      $("#popOut").fadeOut("slow");
      return;
    }
    let area = document.getElementById("tasks");
    let inputValue = $("#inputField").val();
    let dueTime = $("#dueDate").val();
    const curTime = new Date();
    //console.log(curTime.getMonth); //Jan start at 0
    if (parseInt(dueTime.substring(0, 4)) < curTime.getFullYear()) {
      alert("Due Date is past. Please setting a correct date");
      return;
    }

    if (
      parseInt(dueTime.substring(0, 4)) == curTime.getFullYear() &&
      parseInt(dueTime.substring(5, 7)) < curTime.getMonth() + 1
    ) {
      alert("Due Date is past. Please setting a correct date");
      return;
    }
    if (
      parseInt(dueTime.substring(0, 4)) == curTime.getFullYear() &&
      parseInt(dueTime.substring(5, 7)) == curTime.getMonth() + 1 &&
      parseInt(dueTime.substring(8, 10)) < curTime.getDate()
    ) {
      alert("Due Date is past. Please setting a correct date");
      return;
    }
    let status = "";
    if (curTime.getDate() == 1) {
      status = "st";
    } else if (curTime.getDate() == 2) {
      status = "nd";
    } else if (curTime.getDate() == 3) {
      status = "rd";
    } else status = "th";

    let settingTime =
      String(curTime.getDate()) +
      status +
      " " +
      String(month[curTime.getMonth() + 1]) +
      " " +
      String(curTime.getFullYear());

    /*
        <ul>
          <input type="checkbox"/>something here
          <div class="functionField">

            <button class="delIMG">
              <i class="fas fa-trash-alt" title="Delete todo"></i>
            </button>
          </div>
          <div class="showAddTime">
            <i class="fas fa-info-circle me-2"></i>
            <span></span>
          </div>
        </ul>
    */

    let newNode = document.createElement("ul");
    newNode.setAttribute("class", "taskUl");
    let newCheckBox = document.createElement("input");
    let newField = document.createElement("div");

    let newDelButton = document.createElement("button");
    newDelButton.setAttribute("class", "delIMG");

    let newDelImg = document.createElement("i");
    newDelImg.setAttribute("class", "fas fa-trash-alt");
    newDelImg.setAttribute("title", "Delete Task");
    newCheckBox.setAttribute("type", "checkbox");
    newDelButton.appendChild(newDelImg);
    let newTimeBlock = document.createElement("div");
    newTimeBlock.setAttribute("class", "showAddTime");
    let newTimeImg = document.createElement("i");
    newTimeImg.setAttribute("class", "fas fa-info-circle me-2");
    let newTask = document.createElement("span");
    newTimeBlock.appendChild(newTimeImg);
    newTimeBlock.appendChild(newTask);
    newTask.innerHTML = settingTime;
    newNode.appendChild(newCheckBox);
    newNode.innerHTML += "<span>" + inputValue + "</span>";
    newField.setAttribute("class", "functionField");
    let newItem = new addItem(newNode, "");
    if (dueTime) {
      let DueDate = document.createElement("span");
      newItem.time = dueTime;
      DueDate.innerHTML =
        "<i class='fas fa-hourglass-half me-2 text-warning'></i>" + dueTime;
      DueDate.setAttribute("id", "showDueDate");
      newField.appendChild(DueDate);
    }
    newField.appendChild(newDelButton);
    newNode.appendChild(newField);
    newNode.appendChild(newTimeBlock);
    newNode.setAttribute("id", "new");
    area.appendChild(newNode);
    $("#new").hide();
    $("#new").show(200);
    newNode.setAttribute("id", "");

    myAllTasks.push(newItem);
    //console.log(myAllTasks);
    //console.log("newNode :>> ", newNode);

    document.getElementById("dueDate").value = "";
    document.getElementById("inputField").value = "";
  });
  $("body").on("keypress", function (e) {
    //user use "Enter" key to input a task
    if (e.which == 13) {
      if ($("#inputField").val() == "") {
        $("#popOut").stop(true).fadeIn(800);
        document.getElementById("inputField").focus();
        $("#popOut").fadeOut("slow");
        return;
      }
      this.blur();
      $("#addButton").click();
    }
  });
  $(document).on("click", "ul input", function () {
    /*
        .editIMG {
            color: rgb(103, 199, 241);
        }
        .delIMG {
            color: #e7286b;
        }
    */
    //console.log(this.parentNode);
    if ($(this).is(":checked")) {
      $(this.parentNode).css({ transform: "rotateX(" + "369" + "deg)" });
      $(this.parentNode).css({ "text-decoration": "line-through" });
      $(this.parentNode).css({ "background-color": "gray" });
      $(this.parentNode).css({ color: "white" });
      $(this.parentNode).find(".editIMG").css({ "background-color": "gray" });
      $(this.parentNode).find(".delIMG").css({ "background-color": "gray" });
      $(this.parentNode).find("#showDueDate").css({ display: "none" });
      //console.log(this.parentNode);
    } else {
      $(this.parentNode).css({ transform: "rotateX(" + "360" + "deg)" });
      $(this.parentNode).css({ "text-decoration": "none" });
      $(this.parentNode).css({ transform: "none" });
      $(this.parentNode).css({ "background-color": "rgb(253, 247, 247)" });
      $(this.parentNode).css({ color: "rgb(104, 101, 101)" });
      $(this.parentNode)
        .find(".editIMG")
        .css({ "background-color": "rgb(253, 247, 247)" });
      $(this.parentNode)
        .find(".delIMG")
        .css({ "background-color": "rgb(253, 247, 247)" });
      $(this.parentNode).find("#showDueDate").css({ display: "" });
    }
  });
  $(document).on("click", ".delIMG", function () {
    //this.parentNode.parentNode
    $(this.parentNode.parentNode).animate(
      {
        height: "0px",
        "margin-left": "-10px",
        "font-size": "0px",
      },
      300,
      function () {
        let idx = myAllTasks.indexOf(this);
        myAllTasks.splice(idx, 1);
        this.remove();
        //console.log(myAllTasks);
      }
    );
  });
  //自訂背景大小
  $(document).on("click", ".selectBackground", function () {
    let picture = $(this).attr("src");
    let width = window.prompt("Background width: ");
    let height = window.prompt("Background height: ");
    $("body").css("background-image", "url(" + picture + ")");
    $("body").css(
      "background-size",
      String(width) + "px " + String(height) + "px"
    );
  });
  $("#themeButton").on("click", function () {
    $("#themeList").show(100);
    $(this).mouseleave(function () {
      if ($("#themeList").is(":hover")) {
        $("#themeList").mouseenter(function () {
          $("#themeList").mouseleave(function () {
            $("#themeList").hide(100);
          });
        });
      } else $("#themeList").hide(100);
    });
  });
  //open background and effect list

  $("#backgroundButton").on("click", function () {
    $("#backgroundList").show(100);
    $(this).mouseleave(function () {
      if ($("#backgroundList").is(":hover")) {
        $("#backgroundList").mouseenter(function () {
          $("#backgroundList").mouseleave(function () {
            $("#backgroundList").hide(100);
          });
        });
      } else $("#backgroundList").hide(100);
    });
  });

  $("#fileButton").on("click", function () {
    $("#file-uploader").click();
  });
  $("#file-uploader").change(function () {
    readURL(this);
  });
});

//for upload new image
const reader = new FileReader();
function readURL(input) {
  reader.readAsDataURL(input.files[0]);
}
reader.addEventListener(
  "load",
  function () {
    //this.result
    let area = document.getElementById("backgroundList");
    let myButton = document.getElementById("fileButton");
    let newNode = document.createElement("button");
    let newBack = document.createElement("img");
    newBack.src = this.result;
    $.post("/uploadImg", {
      myid: window.location.search.substring(4),
      url: this.result,
    });
    newBack.setAttribute("class", "selectBackground");
    newNode.appendChild(newBack);
    area.insertBefore(newNode, myButton);
  },
  false
);
