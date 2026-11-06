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

// The blue sector immediately clockwise from the top spans 11.25°–22.5°.
// Rotating its midpoint to the fixed pointer requires 343.125° clockwise.
const blueStop = 343.125;
const duration = 150_000;
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
  const correction = (blueStop - normalized + 360) % 360;
  const finish = start + 40 * 360 + correction;
  const animation = wheel.animate([
    { transform: `rotate(${start}deg)`, offset: 0, easing: 'linear' },
    { transform: `rotate(${finish - 5 * 360}deg)`, offset: 0.75, easing: 'cubic-bezier(.16, 0, .25, 1)' },
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
