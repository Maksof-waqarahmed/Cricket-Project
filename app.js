let contentContainer = document.getElementsByClassName("content_container")[0];
let ballsDiv = document.createElement('div');
ballsDiv.className = "balls_div";
contentContainer.insertBefore(ballsDiv, contentContainer.firstChild);

let winMsg = document.createElement("p");
winMsg.className = "text_runs";
let runsCountDiv = document.querySelector(".runs_count_div");
runsCountDiv.appendChild(winMsg);

// Initialize array to show per ball score
var scores = [];

// Global variable to count total runs
var totalRuns1 = 0;
var totalRuns2 = 0;

// Global variable to count the number of balls
var count = 0;

// Count how many wickets are down
var wicket1 = 0;
var wicket2 = 0;

// Count overs
var over = 0;

let team = 1;

// Function to handle runs and update the UI
function runs(btn) {
    if (team === 2 && totalRuns2 > totalRuns1) {
        displayWinMessage("Team 2 Wins");
        disableButtons(true);
        return;
    }

    var btnValue = btn.value;
    scores.push(btnValue);
    let length = scores.length - 1;

    let roundDiv = document.createElement('div');
    roundDiv.className = "round";

    let p = document.createElement('p');
    p.textContent = scores[length];

    roundDiv.appendChild(p);
    ballsDiv.appendChild(roundDiv);

    if (btnValue != '.' && btnValue != 'WD' && btnValue != 'NB') {
        if (btnValue != 'W') {
            if (team === 1) {
                totalRuns1 += Number(btnValue);
            } else {
                totalRuns2 += Number(btnValue);
            }
        }
        count++;
    }

    if (btnValue === "W") {
        if (team === 1) {
            wicket1 += 1;
        } else {
            wicket2 += 1;
        }
    }

    if (count === 6) {
        disableButtons(true);
        document.getElementById('startNewOver').disabled = false;
        over += 1;
        console.log(over);
        if (over === 2 && team === 1) {
            document.getElementById('startNewOver').innerHTML = "Team 2";
        }
    }

    if (team === 2 && (wicket2 === 10 || over === 2)) {
        displayWinMessage(totalRuns2 > totalRuns1 ? "Team 2 Wins" : "Team 1 Wins");
        disableButtons(true);
        return;
    }

    updateScores();
}

let team1 = document.getElementById("team1");
let team2 = document.getElementById("team2");

function updateScores() {
    if (team == 1) {
        team1.innerHTML = `Team ${team}, Total Score: ${totalRuns1}, Wicket: ${wicket1}`;
    } else {
        team2.innerHTML = `Team ${team}, Total Score: ${totalRuns2}, Wicket: ${wicket2}`;
    }
}

// Function to start a new over or switch teams
const startNewOver = () => {
    if (team === 1 && over < 2) {
        ballsDiv.innerHTML = "";
        count = 0;
        scores = [];
        disableButtons(false);
        document.getElementById('startNewOver').disabled = true;
    } else if (team === 1 && over === 2) {
        team = 2;
        ballsDiv.innerHTML = "";
        count = 0;
        over = 0;
        scores = [];
        disableButtons(false);
        document.getElementById('startNewOver').innerHTML = "Start Over";
        document.getElementById('startNewOver').disabled = true;
        updateScores();
    } else if (team === 2 && over < 2) {
        ballsDiv.innerHTML = "";
        count = 0;
        scores = [];
        disableButtons(false);
        document.getElementById('startNewOver').disabled = true;
    } else if (team === 2 && over === 2) {
        displayWinMessage(totalRuns2 > totalRuns1 ? "Team 2 Wins" : "Team 1 Wins");
        disableButtons(true);
    }
}

// Function to disable or enable buttons
const disableButtons = (disable) => {
    let buttons = document.querySelectorAll('.btn, .btn_options');
    buttons.forEach(button => {
        if (button.id !== 'startNewOver') {
            button.disabled = disable;
            if (disable) {
                button.classList.add('disabled');
            } else {
                button.classList.remove('disabled');
            }
        } else {
            button.disabled = !disable;
        }
    });
}

// Initially disable the 'New Over' button
document.getElementById('startNewOver').disabled = true;

function displayWinMessage(message) {
    winMsg.textContent = message;
    disableButtons(true);
}
