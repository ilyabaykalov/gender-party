const wheel = document.querySelector('#wheel');
const button = document.querySelector('#spin');
const status = document.querySelector('#status');
const result = document.querySelector('#result');
const messages = [
  'Кто же будет?',
  'Пу-пу-пу...',
  'Ух, как долго!',
  'Мальчик или девочка?',
  'Уже совсем скоро узнаем...',
  'Интересно, кто там прячется?',
  'Волшебство начинается ✨'
];

// The boundary at 11.25° lies between the first pink and blue sectors.
const boundaryStop = 348.75;
const blueOffset = -5.625;
const duration = 60_000;
let rotation = 0;

button.addEventListener('click', () => {
  button.disabled = true;
  let messageIndex = 0;
  status.textContent = messages[messageIndex];
  const messageTimer = setInterval(() => {
    messageIndex = (messageIndex + 1) % messages.length;
    status.textContent = messages[messageIndex];
  }, 5000);

  const start = rotation;
  const normalized = ((start % 360) + 360) % 360;
  const correction = (boundaryStop - normalized + 360) % 360;
  const boundary = start + 30 * 360 + correction;
  const finish = boundary + blueOffset;
  const animation = wheel.animate([
    { transform: `rotate(${start}deg)`, offset: 0, easing: 'linear' },
    { transform: `rotate(${start + 10 * 360}deg)`, offset: 10 / 60, easing: 'cubic-bezier(.33, .72, .67, .991)' },
    { transform: `rotate(${boundary - 22.5}deg)`, offset: 53.7 / 60, easing: 'linear' },
    { transform: `rotate(${boundary}deg)`, offset: 58.7 / 60, easing: 'linear' },
    { transform: `rotate(${boundary}deg)`, offset: 59.7 / 60, easing: 'ease-out' },
    { transform: `rotate(${finish}deg)`, offset: 1 }
  ], { duration, fill: 'forwards' });

  animation.finished.then(() => {
    clearInterval(messageTimer);
    rotation = finish;
    wheel.style.transform = `rotate(${rotation}deg)`;
    animation.cancel();
    button.disabled = false;
    status.textContent = 'Колесо остановилось!';
    result.showModal();
  });
});
