// ✅ Correct answers (stored in UPPERCASE)
const ANSWERS = {
  Across_2: "CLIQ",
  Across_3: "STRING",
  Across_5: "SUPPORT_DESK",
  Across_6: "BOOLEAN",
  Across_7: "MERN",
  Across_9: "VIBE",
  Down_1: "ARRAY",
  Down_2: "CONSOLE",
  Down_4: "VARIABLE",
  Down_8: "NPTEL"
};

// 🔗 Replace with your Google Apps Script Web App URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxnf4DJlXNf60KvSrN2Zn-oonKcoqJJjz_gzHhI_B9h07mbPTJqNUAk9oU892RvtDe7/exec";

const form = document.getElementById("crosswordForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let score = 0;

  // Clear old feedback
  document.querySelectorAll(".answer-feedback").forEach(el => el.remove());
  document.querySelectorAll("input").forEach(input => {
    input.classList.remove("correct", "incorrect");
  });

  const formData = new FormData(form);

  Object.keys(ANSWERS).forEach(key => {
    const input = form.querySelector(`input[name="${key}"]`);

    // ✅ Case-insensitive comparison
    const userAnswer = input.value.trim().toUpperCase();
    const correctAnswer = ANSWERS[key];

    if (userAnswer === correctAnswer) {
      score += 2;
      input.classList.add("correct");

      const feedback = document.createElement("div");
      feedback.textContent = "✔ Correct";
      feedback.className = "answer-feedback correct-text";
      input.after(feedback);
    } else {
      input.classList.add("incorrect");

      const feedback = document.createElement("div");
      feedback.innerHTML = `✖ Incorrect. Correct answer: <b>${correctAnswer}</b>`;
      feedback.className = "answer-feedback incorrect-text";
      input.after(feedback);
    }
  });

  // Prepare payload for Google Sheets
  const payload = {
    Timestamp: new Date().toLocaleString(),
    Name: formData.get("Name"),
    Email: formData.get("Email"),
    ...Object.fromEntries(formData),
    Score: score,
    Status: "Completed"
  };

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });

    message.textContent = `✅ Submitted! Your Score: ${score} / 20`;
    message.style.color = "#2ecc71";
  } catch (err) {
    message.textContent = "❌ Submission failed. Please retry.";
    message.style.color = "#e74c3c";
  }
});
