const gridSize = 14;

// Crossword layout
// "" = empty block
// letters represent correct answers
const crossword = [
  ["O","R","I","E","N","T","A","T","I","O","N"],
  ["A","T","T","E","N","D","A","N","C","E"],
  ["V","I","C","H","A","R","A","N","A","S","H","A","L","A"]
];




const crosswordDiv = document.getElementById("crossword");

// Render grid
const crosswordDiv = document.getElementById("crossword");
crosswordDiv.innerHTML = "";

crossword.forEach(row => {
  const rowDiv = document.createElement("div");
  rowDiv.className = "row";

  row.forEach(letter => {
    const cell = document.createElement("input");
    cell.maxLength = 1;
    cell.classList.add("cw-cell");
    cell.dataset.correct = letter;
    rowDiv.appendChild(cell);
  });

  crosswordDiv.appendChild(rowDiv);
});


function checkAnswers() {
  const inputs = document.querySelectorAll(".cw-cell");
  let correct = true;
  let correctCount = 0;

  inputs.forEach(input => {
    if (input.value.toUpperCase() !== input.dataset.correct) {
      correct = false;
      input.style.background = "#ffdddd";
    } else {
      input.style.background = "#ddffdd";
      correctCount++;
    }
  });

  const total = inputs.length;
  const status = correctCount === total ? "Completed" : "Incomplete";

  document.getElementById("result").innerText =
    status === "Completed"
      ? "✅ Excellent! All answers are correct. See you tomorrow for Day 2!"
      : "❌ Some answers are incorrect. Please review the clues and try again.";

  autoSubmitToGoogleSheet(
    `${correctCount}/${total}`,
    status
  );
}


function autoSubmitToGoogleSheet(score, status) {
  const studentNameInput = document.getElementById("studentName");
  const studentName = studentNameInput && studentNameInput.value.trim();

  if (!studentName) {
    alert("Please enter your name before submitting.");
    return;
  }

  const payload = {
    name: studentName,
    day: "Day 1",
    score: score,
    status: status
  };

  fetch("https://script.google.com/macros/s/AKfycbypBKbBnTNpSAM7g5QsbJkhTHKJzS1U5JQkdeXA-PyKxr-4XxZpAADhXdR_4lsHBKwq/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  console.log("Auto-submitted to Google Sheets");
}


