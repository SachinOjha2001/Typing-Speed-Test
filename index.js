const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed is a skill that improves with practice.",
    "JavaScript enables interactive web pages.",
    "Practice makes perfect when it comes to coding.",
    "Fast and accurate typing can save you time."
  ];

  const quoteDiv = document.getElementById("quote");
  const input = document.getElementById("input");
  const stats = document.getElementById("stats");
  const nameInput = document.getElementById("nameInput");
  const highScoresList = document.getElementById("highScoresList");

  let quoteText = "";
  let startTime;

  function startTest() {
    if (!nameInput.value.trim()) {
      alert("Please enter your name to begin.");
      return;
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText = randomQuote;
    quoteDiv.innerHTML = quoteText.split('').map(char => `<span>${char}</span>`).join('');
    input.value = "";
    input.disabled = false;
    input.focus();
    stats.innerText = "";
    startTime = null;
  }

  input.addEventListener("input", () => {
    const quoteSpans = quoteDiv.querySelectorAll("span");
    const value = input.value.split('');

    if (!startTime) {
      startTime = new Date();
    }

    let correct = true;
    quoteSpans.forEach((charSpan, index) => {
      const char = value[index];
      if (char == null) {
        charSpan.classList.remove("correct", "incorrect");
      } else if (char === charSpan.innerText) {
        charSpan.classList.add("correct");
        charSpan.classList.remove("incorrect");
      } else {
        charSpan.classList.add("incorrect");
        charSpan.classList.remove("correct");
        correct = false;
      }
    });

    if (value.length === quoteText.length && correct) {
      const endTime = new Date();
      const timeTaken = (endTime - startTime) / 1000;
      const wordCount = quoteText.split(" ").length;
      const wpm = Math.round((wordCount / timeTaken) * 60);
      stats.innerText = `✅ Completed in ${timeTaken.toFixed(2)} seconds — Speed: ${wpm} WPM`;
      input.disabled = true;

      saveScore(nameInput.value.trim(), wpm);
      showLeaderboard();
    }
  });

  function saveScore(name, wpm) {
    const scores = JSON.parse(localStorage.getItem("highScores")) || [];
    scores.push({ name, wpm });
    scores.sort((a, b) => b.wpm - a.wpm);
    localStorage.setItem("highScores", JSON.stringify(scores.slice(0, 5)));
  }

  function showLeaderboard() {
    const scores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoresList.innerHTML = scores.map(s => `<li>${s.name} - ${s.wpm} WPM</li>`).join('');
  }

  // Show leaderboard on load
  showLeaderboard();
  startTest();
