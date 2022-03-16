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