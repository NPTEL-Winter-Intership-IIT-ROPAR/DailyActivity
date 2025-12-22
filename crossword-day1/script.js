const gridSize = 14;

// Crossword layout
// "" = empty block
// letters represent correct answers
const crossword = [
  ["", "", "O","R","I","E","N","T","A","T","I","O","N",""],
  ["", "", "", "", "", "", "", "T", "", "", "", "", "", ""],
  ["A","T","T","E","N","D","A","N","C","E","","","",""],
  ["", "", "", "", "", "", "", "H", "", "", "", "", "", ""],
  ["", "V","I","C","H","A","R","A","N","A","S","H","A","L","A"],
  ["", "", "", "", "", "", "", "R", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "I","I","T","R","O","P","A","R",""]
];

const crosswordDiv = document.getElementById("crossword");

// Render grid
crossword.forEach((row, r) => {
  row.forEach((cell, c) => {
    const div = document.createElement("div");
    div.className = "cell";

    if (cell === "") {
      div.classList.add("block");
    } else {
      const input = document.createElement("input");
      input.maxLength = 1;
      input.dataset.correct = cell;
      div.appendChild(input);
    }

    crosswordDiv.appendChild(div);
  });
});

function checkAnswers() {
  const inputs = document.querySelectorAll("input");
  let correct = true;

  inputs.forEach(input => {
    if (input.value.toUpperCase() !== input.dataset.correct) {
      correct = false;
      input.style.background = "#ffdddd";
    } else {
      input.style.background = "#ddffdd";
    }
  });

  document.getElementById("result").innerText =
  correct
    ? "✅ Excellent! All answers are correct. See you tomorrow for Day 2!"
    : "❌ Some answers are incorrect. Please review the clues and try again.";

}
