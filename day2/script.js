// 🔐 Correct answers (UPPERCASE)
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

// ❗ REPLACE this with your Apps Script Web App URL
const SCRIPT_URL = "PASTE_YOUR_WEB_APP_URL_HERE";

document.getElementById("crosswordForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  let score = 0;

  Object.keys(ANSWERS).forEach(key => {
    const userAnswer = (formData.get(key) || "").trim().toUpperCase();
    if (userAnswer === ANSWERS[key]) {
      score += 2;
    }
  });

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

    document.getElementById("message").textContent =
      `✅ Submitted successfully! Your Score: ${score}/20`;

    this.reset();

  } catch (error) {
    document.getElementById("message").textContent =
      "❌ Submission failed. Please try again.";
  }
});
