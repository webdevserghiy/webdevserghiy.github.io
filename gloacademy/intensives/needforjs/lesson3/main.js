const score = document.querySelector('.score'),
   start = document.querySelector('.start'),
   gameArea = document.querySelector('.gameArea'),
   car = document.createElement('div'),
   // music = document.createElement('audio'), // 1 способ вставки воспроизведения аудио на странице
   music = document.createElement('embed'); // 2 способ вставки воспроизведения аудио на странице

   music.setAttribute('src', `./audio/treck${getRandomIntInclusive(1, 2)}.mp3`); // 2 способ вставки воспроизведения аудио на странице
   music.setAttribute('type', 'audio/mp3'); // 2 способ вставки воспроизведения аудио на странице
   music.classList.add('music'); // 2 способ вставки воспроизведения аудио на странице

car.classList.add('car');


start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
   ArrowUp: false,
   ArrowDown: false,
   ArrowRight: false,
   ArrowLeft: false
};

const setting = {
   start: false,
   score: 0,
   speed: 3,
   traffic: 3
};

function getQuantityElements(heightElement) {
   return gameArea.offsetHeight / heightElement;
}

function getRandomIntInclusive(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
 }

function startGame(){
   start.classList.add('hide');
   gameArea.innerHTML = '';
   for (let i = 0; i < getQuantityElements(100); i++) {
      const line = document.createElement('div');
      line.classList.add('line');
      line.style.top = (i * 100) + 'px';
      line.y = i * 100;
      gameArea.appendChild(line);
   }

   for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
      const enemy = document.createElement('div');
      let enemyImg = getRandomIntInclusive(1, 3);
      enemy.classList.add('enemy');
      enemy.y = -100 * setting.traffic * (i + 1);
      enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
      enemy.style.top = enemy.y + 'px';
      enemy.style.background = `transparent url(./image/enemy${enemyImg}.png) center / cover no-repeat`;
      gameArea.appendChild(enemy);
   }

   setting.score = 0;
   setting.start = true;

   gameArea.appendChild(car);
   car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
   car.style.bottom = '10px';
   car.style.top = 'auto';
   // music.setAttribute('autoplay', true); // 1 способ вставки воспроизведения аудио на странице
   // music.setAttribute('src', `./audio/treck${getRandomIntInclusive(1, 2)}.mp3`); // 1 способ вставки воспроизведения аудио на странице
   // music.setAttribute('controls', true); // 1 способ вставки воспроизведения аудио на странице
   // gameArea.appendChild(music); // 1 способ вставки воспроизведения аудио на странице
   gameArea.appendChild(music); // 2 способ вставки воспроизведения аудио на странице
   setting.x = car.offsetLeft;
   setting.y = car.offsetTop;
   requestAnimationFrame(playGame);
   // setTimeout(function(){ //остановка движение через определенный интервал времени
   //    setting.start = false;
   // }, 10000);
}

function playGame(){
      
   if (setting.start){
      setting.score += setting.speed;
      score.innerHTML = 'SCORE <br />' + setting.score;
      moveRoad();
      moveEnemy();
      if (keys.ArrowLeft && setting.x > 0) {
         setting.x -= setting.speed;
      }
      if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
         setting.x += setting.speed;
      }
      if (keys.ArrowUp && setting.y > 0) {
         setting.y -= setting.speed;
      }
      if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
         setting.y += setting.speed;
      }
      car.style.left = setting.x + 'px';
      car.style.top = setting.y + 'px';
      requestAnimationFrame(playGame);
   } else {
      music.remove();
   }
}

function startRun(event){
   event.preventDefault();
   if (keys.hasOwnProperty(event.key)){
      keys[event.key] = true;
   }
   // if (event.key in keys) {
   //    keys[event.key] = true;
   // }
}

function stopRun(event){
   event.preventDefault();
   if (keys.hasOwnProperty(event.key)){
      keys[event.key] = false;
   }
   // if (event.key in keys) {
   //    keys[event.key] = false;
   // }
}

function moveRoad() {
   let lines = document.querySelectorAll('.line');
   lines.forEach(function(line){
      line.y += setting.speed;
      line.style.top = line.y + 'px';

      if (line.y >= gameArea.offsetHeight) {
         line.y = -100;
      }

   });
}

function moveEnemy() {
   let enemy = document.querySelectorAll('.enemy');
   let enemyImg = getRandomIntInclusive(1, 3);
   enemy.forEach(function(item){
      let carRect = car.getBoundingClientRect();
      let enemyRect = item.getBoundingClientRect();

      if (carRect.top <= enemyRect.bottom &&
         carRect.right >= enemyRect.left &&
         carRect.left <= enemyRect.right &&
         carRect.bottom >= enemyRect.top) {
            setting.start = false;
            // music.remove();
            start.classList.remove('hide');
            start.style.top = score.offsetHeight;
      }

      item.y += setting.speed / 2;
      item.style.top = item.y + 'px';
      if (item.y >= gameArea.offsetHeight) {
         item.y = -100 * setting.traffic;
         item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
         item.style.background = `transparent url(./image/enemy${enemyImg}.png) center / cover no-repeat`;
      }
   });

   
}