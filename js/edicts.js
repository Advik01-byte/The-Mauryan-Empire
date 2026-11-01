// Edict tablets: read the message aloud with the browser voice.
const readButtons = document.querySelectorAll('.js-read');
readButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const text = button.closest('.tablet').querySelector('.msg p').textContent;
    speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(voice);
    window.__spoken = text;
  });
});
