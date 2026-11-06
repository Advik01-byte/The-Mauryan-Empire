// Quiz: only each question's FIRST answer counts. A wrong answer can still be changed (to see the right one),
// but the score stays as it was. Best score is saved, and the reset button clears everything.
const quizBox = document.querySelector('.quiz');
const scoreBox = document.querySelector('.score');
const scoreMessage = document.querySelector('.js-score-message');
const bestScoreText = document.querySelector('.js-best-score');
const resetButton = document.querySelector('.js-reset-button');
const questions = document.querySelectorAll('.q');
function showBestScore() {
  const best = localStorage.getItem('bestScore');
  if (best !== null) {
    bestScoreText.textContent = 'Best score: ' + best + ' / 6';
  }
}
showBestScore();
function updateScore() {
  const score = document.querySelectorAll('.q[data-first="ok"]').length;
  scoreBox.dataset.score = score;
  return score;
}
quizBox.addEventListener('change', (event) => {
  const question = event.target.closest('.q');
  if (!question) {
    return;
  }
  if (!question.dataset.first) {
    question.dataset.first = event.target.classList.contains('ok') ? 'ok' : 'no';   // remember the first answer only
  }
  const score = updateScore();
  if (score === 6) {
    scoreMessage.textContent = 'Perfect! You are a Mauryan expert!';
  } else if (score >= 4) {
    scoreMessage.textContent = 'Great job! Read the handbook to get them all.';
  } else {
    scoreMessage.textContent = 'Keep going! The handbook has the answers.';
  }
  const best = Number(localStorage.getItem('bestScore'));
  if (score > best) {
    localStorage.setItem('bestScore', score);
    showBestScore();
  }
});
resetButton.addEventListener('click', () => {
  document.querySelectorAll('.quiz input').forEach((input) => {
    input.checked = false;
  });
  questions.forEach((question) => {
    delete question.dataset.first;
  });
  updateScore();
  scoreMessage.textContent = '';
});
