const teamBtn = document.getElementById("team");
const statBtn = document.getElementById("stat");
const comsBtn = document.getElementById("coms");

const teamSec = document.getElementById("teamSec");
const statSec = document.getElementById("statSec");
const comsSec = document.getElementById("comsSec");

teamSec.style.display = "none";
statSec.style.display = "none";
comsSec.style.display = "none";

const teamForm = document.getElementById("team-form");
const teamNumber = document.getElementById("team-number");

teamBtn.onclick = function () {
  teamSec.style.display = "block";
  statSec.style.display = "none";
  comsSec.style.display = "none";
}

teamForm.onsubmit = function () {
  event.preventDefault();
     window.open("https://www.thebluealliance.com/team/" + teamNumber.value)
}

const comsForm = document.getElementById("coms-form");
const username = document.getElementById("username");
const msg = document.getElementById("msg");
const chatbox = document.getElementById("chatbox");

comsBtn.onclick = function () {
  comsSec.style.display = "block";
  statSec.style.display = "none";
  teamSec.style.display = "none";
}

comsForm.onsubmit = function () {
  event.preventDefault();

  fetch ("/chat", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      user : username.value,
      msg : msg.value
    })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    msg.value = "";
  })
  .catch(error => {
    throw error;
  })
}

setInterval(function () {
  fetch ("/chat")
  .then(response => response.text())
  .then(data => {
    chatbox.innerHTML = data;
  })
  .catch(error => {
    throw error;
  });
}, 500);

const statForm = document.getElementById("stat-form");
const teamName = document.getElementById("team-name");
const match = document.getElementById("match");
const info = document.getElementById("info");
const infoBox = document.getElementById("infobox")

statBtn.onclick = function () {
  statSec.style.display = "block";
  comsSec.style.display = "none";
  teamSec.style.display = "none";
}

statForm.onsubmit = function () {
  event.preventDefault();

  fetch ("/stat", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      team : teamName.value,
      match : match.value,
      info : info.value
    })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    info.value = "";
    teamName.value = "";
    match.value = "";
  })
  .catch(error => {
    throw error;
  })
}

setInterval(function () {
  fetch ("/stat")
  .then(response => response.text())
  .then(data => {
    infobox.innerHTML = data;
  })
  .catch(error => {
    throw error;
  });
}, 500);