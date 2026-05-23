const STORAGE_KEY = "deenquest-state-v1";
const THEME_KEY = "deenquest-theme";
const GOAL_XP = 20;
const QUESTION_XP = 10;
const XP_PER_LEVEL = 100;

const defaultGoals = [
  "Leer Surah Al-Fatiha",
  "Bid Fajr op tijd",
  "Lees 5 minuten Qur'an",
  "Leer 3 namen van Allah",
];

const dailyAyahs = [
  {
    reference: "Ta-Ha 20:114",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    meaning: "Mijn Heer, vermeerder mij in kennis.",
  },
  {
    reference: "Ash-Sharh 94:5",
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    meaning: "Met moeilijkheid komt ook verlichting.",
  },
  {
    reference: "Al-Baqarah 2:286",
    arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    meaning: "Allah belast niemand boven wat diegene aankan.",
  },
  {
    reference: "Ar-Ra'd 13:28",
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    meaning: "Door het gedenken van Allah vinden harten rust.",
  },
  {
    reference: "Az-Zumar 39:53",
    arabic: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
    meaning: "Wanhoop niet aan de barmhartigheid van Allah.",
  },
  {
    reference: "Aal-Imran 3:139",
    arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا",
    meaning: "Verlies de moed niet en wees niet bedroefd.",
  },
  {
    reference: "Ibrahim 14:7",
    arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
    meaning: "Dankbaarheid opent de deur naar meer zegeningen.",
  },
  {
    reference: "Al-Baqarah 2:153",
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    meaning: "Allah is met degenen die geduldig zijn.",
  },
  {
    reference: "At-Talaq 65:3",
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    meaning: "Wie op Allah vertrouwt, voor diegene is Hij genoeg.",
  },
  {
    reference: "Ash-Sharh 94:6",
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    meaning: "Voorwaar, met moeilijkheid is er verlichting.",
  },
];

const quizQuestions = [
  {
    topic: "Basiskennis Islam",
    question: "Hoeveel zuilen heeft de Islam?",
    answers: ["3", "4", "5", "6"],
    correct: 2,
  },
  {
    topic: "Gebed",
    question: "Hoe heet het gebed dat rond zonsopkomst wordt gebeden?",
    answers: ["Dhuhr", "Fajr", "Isha", "Asr"],
    correct: 1,
  },
  {
    topic: "Qur'an",
    question: "Welke surah wordt in elke rak'ah van het gebed gelezen?",
    answers: ["Al-Fatiha", "Al-Ikhlas", "Yasin", "An-Nas"],
    correct: 0,
  },
  {
    topic: "Profeten",
    question: "Welke profeet bouwde de ark?",
    answers: ["Musa", "Nuh", "Ibrahim", "Yusuf"],
    correct: 1,
  },
  {
    topic: "Namen van Allah",
    question: "Wat betekent Ar-Rahman?",
    answers: ["De Alwetende", "De Meest Barmhartige", "De Koning", "De Schepper"],
    correct: 1,
  },
  {
    topic: "Basiskennis Islam",
    question: "Welke maand vasten moslims?",
    answers: ["Shawwal", "Muharram", "Ramadan", "Rajab"],
    correct: 2,
  },
  {
    topic: "Gebed",
    question: "Hoeveel verplichte gebeden zijn er per dag?",
    answers: ["3", "4", "5", "7"],
    correct: 2,
  },
  {
    topic: "Qur'an",
    question: "In welke taal werd de Qur'an geopenbaard?",
    answers: ["Arabisch", "Perzisch", "Turks", "Urdu"],
    correct: 0,
  },
  {
    topic: "Profeten",
    question: "Wie is de laatste profeet in de Islam?",
    answers: ["Isa", "Musa", "Muhammad", "Ibrahim"],
    correct: 2,
  },
  {
    topic: "Namen van Allah",
    question: "Welke naam van Allah betekent De Alwetende?",
    answers: ["Al-Alim", "Al-Malik", "As-Salam", "Al-Khaliq"],
    correct: 0,
  },
];

const dom = {
  views: document.querySelectorAll(".view"),
  tabButtons: document.querySelectorAll(".tab-button"),
  quickViewButtons: document.querySelectorAll("[data-go-view]"),
  toast: document.querySelector("#toast"),
  settingsButton: document.querySelector("#settingsButton"),
  closeSettingsButton: document.querySelector("#closeSettingsButton"),
  settingsOverlay: document.querySelector("#settingsOverlay"),
  darkModeToggle: document.querySelector("#darkModeToggle"),
  resetDemoButton: document.querySelector("#resetDemoButton"),
  homeLevel: document.querySelector("#homeLevel"),
  homeXp: document.querySelector("#homeXp"),
  homeGoalsDone: document.querySelector("#homeGoalsDone"),
  nextLevelLabel: document.querySelector("#nextLevelLabel"),
  progressCount: document.querySelector("#progressCount"),
  homeProgressBar: document.querySelector("#homeProgressBar"),
  dailyAyahReference: document.querySelector("#dailyAyahReference"),
  dailyAyahArabic: document.querySelector("#dailyAyahArabic"),
  dailyAyahMeaning: document.querySelector("#dailyAyahMeaning"),
  goalForm: document.querySelector("#goalForm"),
  goalInput: document.querySelector("#goalInput"),
  goalList: document.querySelector("#goalList"),
  quizCard: document.querySelector("#quizCard"),
  quizTopic: document.querySelector("#quizTopic"),
  quizStep: document.querySelector("#quizStep"),
  questionText: document.querySelector("#questionText"),
  answerList: document.querySelector("#answerList"),
  quizFeedback: document.querySelector("#quizFeedback"),
  nextQuestionButton: document.querySelector("#nextQuestionButton"),
  restartQuizButton: document.querySelector("#restartQuizButton"),
  quizResultCard: document.querySelector("#quizResultCard"),
  quizResultTitle: document.querySelector("#quizResultTitle"),
  quizResultText: document.querySelector("#quizResultText"),
  newQuizButton: document.querySelector("#newQuizButton"),
  progressLevelChip: document.querySelector("#progressLevelChip"),
  progressTotalXp: document.querySelector("#progressTotalXp"),
  progressRing: document.querySelector("#progressRing"),
  ringPercent: document.querySelector("#ringPercent"),
  quizHistoryList: document.querySelector("#quizHistoryList"),
};

let state = loadState();
let quizSession = createQuizSession();
let toastTimer;
let isDarkMode = localStorage.getItem(THEME_KEY) === "dark";

applyTheme();

function createInitialState() {
  return {
    xp: 0,
    goals: defaultGoals.map((title, index) => ({
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${index}`,
      title,
      completed: false,
      xpAwarded: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    })),
    quizResults: [],
  };
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return createInitialState();

    const parsed = JSON.parse(stored);
    return {
      xp: Number.isFinite(parsed.xp) ? parsed.xp : 0,
      goals: Array.isArray(parsed.goals) ? parsed.goals : createInitialState().goals,
      quizResults: Array.isArray(parsed.quizResults) ? parsed.quizResults : [],
    };
  } catch {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getLevelInfo(xp = state.xp) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const currentLevelXp = xp % XP_PER_LEVEL;
  const progressPercent = Math.round((currentLevelXp / XP_PER_LEVEL) * 100);
  return {
    level,
    currentLevelXp,
    progressPercent,
    nextLevel: level + 1,
  };
}

function awardXp(amount, reason) {
  const beforeLevel = getLevelInfo().level;
  state.xp += amount;
  saveState();
  render();

  const afterLevel = getLevelInfo().level;
  if (afterLevel > beforeLevel) {
    showToast(`Level up! Je bent nu level ${afterLevel}.`);
    return;
  }

  if (reason) showToast(`${reason}: +${amount} XP`);
}

function setView(viewName) {
  dom.views.forEach((view) => {
    view.classList.toggle("active", view.id === `${viewName}View`);
  });

  dom.tabButtons.forEach((button) => {
    const isActive = button.dataset.view === viewName;
    button.classList.toggle("active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function render() {
  renderDashboard();
  renderDailyAyah();
  renderGoals();
  renderProgress();
}

function applyTheme() {
  document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDarkMode ? "#07131f" : "#0b4335");
  if (dom.darkModeToggle) dom.darkModeToggle.checked = isDarkMode;
}

function setDarkMode(enabled) {
  isDarkMode = enabled;
  localStorage.setItem(THEME_KEY, enabled ? "dark" : "light");
  applyTheme();
  showToast(enabled ? "Dark mode staat aan." : "Dark mode staat uit.");
}

function openSettings() {
  dom.settingsOverlay.classList.remove("hidden");
  dom.settingsOverlay.setAttribute("aria-hidden", "false");
  dom.settingsButton.setAttribute("aria-expanded", "true");
  dom.closeSettingsButton.focus();
}

function closeSettings() {
  dom.settingsOverlay.classList.add("hidden");
  dom.settingsOverlay.setAttribute("aria-hidden", "true");
  dom.settingsButton.setAttribute("aria-expanded", "false");
  dom.settingsButton.focus();
}

function renderDailyAyah() {
  const today = new Date();
  const dayKey = Math.floor(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86_400_000
  );
  const ayah = dailyAyahs[dayKey % dailyAyahs.length];

  dom.dailyAyahReference.textContent = ayah.reference;
  dom.dailyAyahArabic.textContent = ayah.arabic;
  dom.dailyAyahMeaning.textContent = ayah.meaning;
}

function renderDashboard() {
  const { level, currentLevelXp, progressPercent, nextLevel } = getLevelInfo();
  const completedGoals = state.goals.filter((goal) => goal.completed).length;

  dom.homeLevel.textContent = level;
  dom.homeXp.textContent = state.xp;
  dom.homeGoalsDone.textContent = completedGoals;
  dom.nextLevelLabel.textContent = nextLevel;
  dom.progressCount.textContent = `${currentLevelXp}/100 XP`;
  dom.homeProgressBar.style.width = `${progressPercent}%`;
}

function renderGoals() {
  if (!state.goals.length) {
    dom.goalList.innerHTML = `<p class="empty-state">Je hebt nog geen doelen. Voeg er eentje toe om te beginnen.</p>`;
    return;
  }

  dom.goalList.innerHTML = state.goals
    .map((goal) => {
      const status = goal.completed ? "Voltooid" : "+20 XP";
      const disabled = goal.completed ? "disabled" : "";
      return `
        <article class="goal-item ${goal.completed ? "completed" : ""}">
          <button class="goal-check" type="button" data-complete-goal="${goal.id}" ${disabled} aria-label="${goal.completed ? "Doel voltooid" : "Doel afstrepen"}">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" /></svg>
          </button>
          <p class="goal-title">${escapeHtml(goal.title)}</p>
          <span class="goal-status">${status}</span>
        </article>
      `;
    })
    .join("");
}

function renderQuiz() {
  const currentQuestion = quizQuestions[quizSession.currentIndex];
  dom.quizCard.classList.toggle("hidden", quizSession.finished);
  dom.quizResultCard.classList.toggle("hidden", !quizSession.finished);

  if (quizSession.finished) {
    renderQuizResult();
    return;
  }

  dom.quizTopic.textContent = currentQuestion.topic;
  dom.quizStep.textContent = `${quizSession.currentIndex + 1}/${quizQuestions.length}`;
  dom.questionText.textContent = currentQuestion.question;
  dom.quizFeedback.textContent = "";
  dom.quizFeedback.className = "feedback";
  dom.nextQuestionButton.disabled = quizSession.selectedAnswer === null;
  dom.nextQuestionButton.textContent =
    quizSession.currentIndex === quizQuestions.length - 1 ? "Afronden" : "Volgende";

  dom.answerList.innerHTML = currentQuestion.answers
    .map((answer, index) => {
      const letter = String.fromCharCode(65 + index);
      return `
        <button class="answer-button" type="button" data-answer-index="${index}">
          <span class="answer-letter">${letter}</span>
          <span>${escapeHtml(answer)}</span>
        </button>
      `;
    })
    .join("");
}

function renderQuizResult() {
  const score = quizSession.answers.filter(Boolean).length;
  const xpEarned = score * QUESTION_XP;
  const percentage = Math.round((score / quizQuestions.length) * 100);

  dom.quizResultTitle.textContent =
    percentage >= 80 ? "Sterke ronde" : percentage >= 50 ? "Goed geoefend" : "Blijf rustig oefenen";
  dom.quizResultText.textContent = `Je had ${score} van de ${quizQuestions.length} goed en verdiende ${xpEarned} XP.`;
}

function renderProgress() {
  const { level, progressPercent } = getLevelInfo();
  const sortedResults = [...state.quizResults].sort((a, b) => new Date(b.date) - new Date(a.date));

  dom.progressLevelChip.textContent = `Level ${level}`;
  dom.progressTotalXp.textContent = state.xp;
  dom.ringPercent.textContent = `${progressPercent}%`;
  dom.progressRing.style.background = `
    radial-gradient(circle, var(--ring-center) 57%, transparent 58%),
    conic-gradient(var(--green) ${progressPercent * 3.6}deg, var(--ring-rest) 0deg)
  `;

  if (!sortedResults.length) {
    dom.quizHistoryList.innerHTML = `<p class="empty-state">Maak je eerste quiz om hier resultaten te zien.</p>`;
    return;
  }

  dom.quizHistoryList.innerHTML = sortedResults
    .slice(0, 5)
    .map((result) => {
      const date = new Intl.DateTimeFormat("nl-NL", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(result.date));

      return `
        <article class="history-item">
          <div>
            <strong>${result.score}/${result.total} goed</strong>
            <span>${date}</span>
          </div>
          <span>+${result.xpEarned} XP</span>
        </article>
      `;
    })
    .join("");
}

function completeGoal(goalId) {
  const goal = state.goals.find((item) => item.id === goalId);
  if (!goal || goal.completed) return;

  goal.completed = true;
  goal.completedAt = new Date().toISOString();

  if (!goal.xpAwarded) {
    goal.xpAwarded = true;
    awardXp(GOAL_XP, "Doel voltooid");
    return;
  }

  saveState();
  render();
}

function createQuizSession() {
  return {
    currentIndex: 0,
    selectedAnswer: null,
    answers: [],
    finished: false,
    xpGranted: false,
  };
}

function selectAnswer(answerIndex) {
  if (quizSession.selectedAnswer !== null || quizSession.finished) return;

  const currentQuestion = quizQuestions[quizSession.currentIndex];
  const isCorrect = answerIndex === currentQuestion.correct;
  quizSession.selectedAnswer = answerIndex;
  quizSession.answers[quizSession.currentIndex] = isCorrect;

  dom.answerList.querySelectorAll(".answer-button").forEach((button) => {
    const buttonIndex = Number(button.dataset.answerIndex);
    button.disabled = true;
    button.classList.toggle("correct", buttonIndex === currentQuestion.correct);
    button.classList.toggle("wrong", buttonIndex === answerIndex && !isCorrect);
  });

  dom.quizFeedback.textContent = isCorrect
    ? "Goed antwoord."
    : `Nog niet. Het juiste antwoord is: ${currentQuestion.answers[currentQuestion.correct]}.`;
  dom.quizFeedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
  dom.nextQuestionButton.disabled = false;
}

function goToNextQuestion() {
  if (quizSession.selectedAnswer === null) return;

  if (quizSession.currentIndex < quizQuestions.length - 1) {
    quizSession.currentIndex += 1;
    quizSession.selectedAnswer = null;
    renderQuiz();
    return;
  }

  finishQuiz();
}

function finishQuiz() {
  if (quizSession.xpGranted) return;

  const score = quizSession.answers.filter(Boolean).length;
  const xpEarned = score * QUESTION_XP;
  quizSession.finished = true;
  quizSession.xpGranted = true;

  state.quizResults.push({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-quiz`,
    score,
    total: quizQuestions.length,
    xpEarned,
    date: new Date().toISOString(),
  });

  if (state.quizResults.length > 20) {
    state.quizResults = state.quizResults.slice(-20);
  }

  saveState();
  if (xpEarned > 0) {
    awardXp(xpEarned, "Quiz afgerond");
  } else {
    render();
  }
  renderQuiz();
}

function resetQuiz() {
  quizSession = createQuizSession();
  renderQuiz();
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  dom.toast.textContent = message;
  dom.toast.classList.add("show");
  toastTimer = window.setTimeout(() => {
    dom.toast.classList.remove("show");
  }, 2600);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function resetDemo() {
  state = createInitialState();
  quizSession = createQuizSession();
  saveState();
  render();
  renderQuiz();
  closeSettings();
  showToast("Demo is opnieuw gestart.");
}

dom.tabButtons.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

dom.quickViewButtons.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.goView));
});

dom.goalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = dom.goalInput.value.trim();
  if (!title) return;

  state.goals.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-goal`,
    title,
    completed: false,
    xpAwarded: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  });

  dom.goalInput.value = "";
  saveState();
  renderGoals();
  showToast("Doel toegevoegd.");
});

dom.goalList.addEventListener("click", (event) => {
  const completeButton = event.target.closest("[data-complete-goal]");
  if (!completeButton) return;
  completeGoal(completeButton.dataset.completeGoal);
});

dom.answerList.addEventListener("click", (event) => {
  const answerButton = event.target.closest("[data-answer-index]");
  if (!answerButton) return;
  selectAnswer(Number(answerButton.dataset.answerIndex));
});

dom.nextQuestionButton.addEventListener("click", goToNextQuestion);
dom.restartQuizButton.addEventListener("click", resetQuiz);
dom.newQuizButton.addEventListener("click", resetQuiz);
dom.settingsButton.addEventListener("click", openSettings);
dom.closeSettingsButton.addEventListener("click", closeSettings);
dom.darkModeToggle.addEventListener("change", (event) => setDarkMode(event.target.checked));
dom.settingsOverlay.addEventListener("click", (event) => {
  if (event.target === dom.settingsOverlay) closeSettings();
});
dom.resetDemoButton.addEventListener("click", resetDemo);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !dom.settingsOverlay.classList.contains("hidden")) {
    closeSettings();
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      // The app still works fully without offline caching.
    });
  });
}

render();
renderQuiz();
