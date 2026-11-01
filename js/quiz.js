// Quiz: message by score, best score saved, reset button.
const quizBox = document.querySelector('.quiz');
const scoreMessage = document.querySelector('.js-score-message');
const bestScoreText = document.querySelector('.js-best-score');
const resetButton = document.querySelector('.js-reset-button');
function showBestScore() {
  const best = localStorage.getItem('bestScore');
  if (best !== null) {
    bestScoreText.textContent = 'Best score: ' + best + ' / 6';
  }
}
showBestScore();
quizBox.addEventListener('change', () => {
  const score = document.querySelectorAll('.quiz input.ok:checked').length;
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
  scoreMessage.textContent = '';
});
