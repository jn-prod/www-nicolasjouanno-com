const INITIAL_STATE = {
  cards: [],
  index: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  correctCount: 0,
};

let state = INITIAL_STATE;

// Fonctions pures
function shuffled(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function computeAnswer(state, correct) {
  const streak = correct ? state.streak + 1 : 0;
  return {
    ...state,
    score: correct ? state.score + 10 : state.score,
    streak,
    bestStreak: Math.max(state.bestStreak, streak),
    correctCount: correct ? state.correctCount + 1 : state.correctCount,
  };
}

function getResultMessageId(accuracy) {
  if (accuracy === 100) return "resultMessage100";
  if (accuracy >= 80) return "resultMessage80";
  if (accuracy >= 60) return "resultMessage60";
  return "resultMessageDefault";
}

// Effets de bord — DOM
function startQuiz(difficulty) {
  const cards = shuffled(Array.from(
    document.querySelectorAll(`.c-quiz__question-card[data-difficulty="${difficulty}"]`)
  ));
  state = { ...INITIAL_STATE, cards };

  document.getElementById("startScreen").hidden = true;
  document.getElementById("quizScreen").hidden = false;
  document.getElementById("totalQuestions").textContent = cards.length;
  document.getElementById("quizProgress").max = cards.length;
  document.getElementById("quizProgress").value = 0;

  renderQuestion();
}

function renderQuestion() {
  const { cards, index } = state;
  const card = cards[index];

  document.getElementById("currentQuestion").textContent = index + 1;
  document.getElementById("nextBtn").disabled = true;

  card.querySelector(".c-callout").hidden = true;
  card.querySelectorAll(".c-quiz__feedback").forEach(el => el.hidden = true);
  card.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
  card.disabled = false;
  card.hidden = false;
}

function onAnswer(userAnswer) {
  const card = state.cards[state.index];
  const correct = userAnswer === (card.dataset.hasGluten === "true");
  state = computeAnswer(state, correct);

  card.disabled = true;
  document.getElementById("quizProgress").value = state.index + 1;
  card.querySelector(correct ? ".c-quiz__feedback--correct" : ".c-quiz__feedback--incorrect").hidden = false;
  card.querySelector(".c-callout").hidden = false;
  document.getElementById("currentScore").textContent = state.score;
  document.getElementById("streak").textContent = state.streak;
  document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
  state.cards[state.index].hidden = true;
  state = { ...state, index: state.index + 1 };

  if (state.index < state.cards.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const { score, correctCount, bestStreak, cards } = state;
  const accuracy = Math.round((correctCount / cards.length) * 100);

  const progress = document.getElementById("quizProgress");
  progress.value = progress.max;
  document.getElementById("quizScreen").hidden = true;
  document.getElementById("resultScreen").hidden = false;
  document.getElementById("finalScore").textContent = score;
  document.getElementById("correctAnswers").textContent = `${correctCount}/${cards.length}`;
  document.getElementById("bestStreak").textContent = bestStreak;
  document.getElementById("accuracy").textContent = `${accuracy}%`;
  document.getElementById(getResultMessageId(accuracy)).hidden = false;
}

function shareTwitter() {
  const text = `J'ai obtenu ${state.score} points au quiz Gluten ou Pas Gluten ! 🌾 Testez vos connaissances !`;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
}

function shareFacebook() {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    "_blank"
  );
}

function restartQuiz() {
  document.querySelectorAll('input[name="difficulty"]').forEach(r => r.checked = false);
  document.querySelectorAll(".c-quiz__result-message").forEach(el => el.hidden = true);
  document.getElementById("resultScreen").hidden = true;
  document.getElementById("startScreen").hidden = false;
}

document.getElementById("quizScreen").addEventListener("change", function (e) {
  if (e.target.matches('input[type="radio"][name^="answer-"]')) {
    onAnswer(e.target.value === "true");
  }
});
