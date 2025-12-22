function submitQuiz() {
  const name = document.getElementById("studentName").value.trim();

  if (!name) {
    alert("Please enter your full name.");
    return;
  }

  const inputs = document.querySelectorAll("[data-answer]");
  let correct = 0;
  const answers = [];

  inputs.forEach(input => {
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = input.dataset.answer.toLowerCase();

    answers.push(userAnswer || "");

    if (userAnswer === correctAnswer) {
      correct++;
      input.style.background = "#ddffdd";
    } else {
      input.style.background = "#ffdddd";
    }
  });

  const totalQuestions = inputs.length;
  const scoreValue = correct * 5;
  const totalValue = totalQuestions * 5;
  const score = `${scoreValue}/${totalValue}`;
  const status = correct === totalQuestions ? "Completed" : "Incomplete";

  document.getElementById("result").innerText =
    `✅ You scored ${score}`;

  submitToGoogleSheet(name, answers, score, status);
}

function submitToGoogleSheet(name, answers, score, status) {
  const payload = {
    name: name,
    day: "Day 1",
    answer1: answers[0] || "",
    answer2: answers[1] || "",
    answer3: answers[2] || "",
    answer4: answers[3] || "",
    score: score,
    status: status
  };

  fetch("https://script.google.com/macros/s/AKfycbxnf4DJlXNf60KvSrN2Zn-oonKcoqJJjz_gzHhI_B9h07mbPTJqNUAk9oU892RvtDe7/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}
