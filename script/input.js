document.addEventListener('DOMContentLoaded', () => {
  const translate = () => {
    const input = document.getElementById('input-text').value;
    const soundButton = document.getElementById('sound');
    if (morsePattern.test(input)) {
      document.getElementById('morse-output-text').innerText = translateToText(input);
      soundButton.classList.add('hidden');
    } else {
      document.getElementById('morse-output-text').innerText = translateToMorse(input);
      soundButton.classList.remove('hidden');
    }
  }

  document.body.addEventListener('click', event => {
    if (event.target.id === 'morse-button') {
      translate();
    } else if (event.target.id === 'sound') {
      handleSoundButtonClick();
    } else if (event.target.id === 'morse-output') {
      handleMorseOutputClick();
    }
  });

  document.getElementById('input-text').addEventListener('keypress', event => {
    if (event.key === 'Enter') translate();
  });

})

function handleSoundButtonClick() {
  if (playing) {
    document.getElementById('sound').innerText = 'Play';
    playing = false;
    stopSound();
  } else {
    if (!morsePattern.test(document.getElementById('morse-output-text').innerText)) {
      document.getElementById('morse-output-text').innerText = "Error: This is not morse code"
      document.getElementById('sound').innerText = 'Play';
      playing = false;
      return;
    }
    document.getElementById('sound').innerText = 'Stop';
    playing = true;
    playMorse(document.getElementById('morse-output-text').innerText);
  }
}

function handleMorseOutputClick() {
  const textToCopy = document.getElementById('morse-output-text').innerText;
  const textarea = document.createElement('textarea');
  textarea.value = textToCopy;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  const notification = document.createElement('div');
  notification.className = 'copy-notification';
  notification.innerText = 'Text copied!';
  document.getElementById('morse-output').appendChild(notification);
  setTimeout(() => notification.remove(), 1500);
}
