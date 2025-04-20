const rooms = {};
const dominoSet = generateDominoSet();

// Генерація набору доміно
function generateDominoSet() {
  const set = [];
  for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
      set.push([i, j]);
    }
  }
  return set;
}

// Перемішування масиву
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Створення нової кімнати
function createRoom() {
  const username = document.getElementById('username').value;
  if (!username) {
    alert('Будь ласка, введіть ваш нікнейм.');
    return;
  }

  const roomId = generateRoomId();
  rooms[roomId] = { players: [], deck: [...dominoSet], board: [], turn: 0 };
  shuffle(rooms[roomId].deck);
  joinGame(roomId, username);
}

// Приєднання до існуючої кімнати
function joinRoom() {
  const username = document.getElementById('username').value;
  const roomId = document.getElementById('roomId').value;

  if (!username || !roomId) {
    alert('Будь ласка, введіть ваш нікнейм та ID кімнати.');
    return;
  }

  if (!rooms[roomId]) {
    alert('Кімната не існує.');
    return;
  }

  if (rooms[roomId].players.length >= 6) {
    alert('Кімната повна.');
    return;
  }

  joinGame(roomId, username);
}

// Приєднання до гри
function joinGame(roomId, username) {
  const room = rooms[roomId];
  const hand = room.deck.splice(0, 7); // Роздача 7 кісточок
  room.players.push({ name: username, hand });

  // Оновлюємо інтерфейс
  document.querySelector('.lobby').style.display = 'none';
  document.querySelector('.game').style.display = 'flex';

  updateGameDisplay(roomId);
}

// Оновлення інтерфейсу гри
function updateGameDisplay(roomId) {
  const room = rooms[roomId];
  const currentPlayer = room.players[room.turn];

  const playerList = document.getElementById('playerList');
  playerList.innerHTML = '';
  room.players.forEach((player, index) => {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player';
    playerDiv.textContent = `${player.name} (${index === room.turn ? 'Його хід' : ''})`;
    playerList.appendChild(playerDiv);
  });

  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  room.board.forEach(tile => {
    boardDiv.appendChild(renderDominoTile(tile));
  });

  const handContainer = document.getElementById('handContainer');
  handContainer.innerHTML = '';
  currentPlayer.hand.forEach((tile, index) => {
    const tileDiv = renderDominoTile(tile);
    tileDiv.onclick = () => selectTile(index);
    handContainer.appendChild(tileDiv);
  });
}

// Відображення кісточки доміно з крапками
function renderDominoTile(tile) {
  const [top, bottom] = tile;

  // Створюємо контейнер для кісточки
  const tileDiv = document.createElement('div');
  tileDiv.className = 'domino-tile';

  // Функція для створення половини кісточки
  function createHalf(value) {
    const halfDiv = document.createElement('div');
    halfDiv.className = 'domino-half';

    // Розташування крапок у сітці 2x3
    const positions = {
      0: [],
      1: [[1, 1]], // Середина
      2: [
        [0, 0], // Верхній лівий кут
        [2, 2], // Нижній правий кут
      ],
      3: [
        [0, 0], // Верхній лівий кут
        [1, 1], // Середина
        [2, 2], // Нижній правий кут
      ],
      4: [
        [0, 0], // Верхній лівий кут
        [0, 2], // Верхній правий кут
        [2, 0], // Нижній лівий кут
        [2, 2], // Нижній правий кут
      ],
      5: [
        [0, 0], // Верхній лівий кут
        [0, 2], // Верхній правий кут
        [1, 1], // Середина
        [2, 0], // Нижній лівий кут
        [2, 2], // Нижній правий кут
      ],
      6: [
        [0, 0], // Верхній лівий кут
        [0, 1], // Верхній центр
        [0, 2], // Верхній правий кут
        [2, 0], // Нижній лівий кут
        [2, 1], // Нижній центр
        [2, 2], // Нижній правий кут
      ],
    };

    // Додаємо крапки
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        const dotDiv = document.createElement('div');
        dotDiv.className = 'dot';
        if (!positions[value].some(([r, c]) => r === row && c === col)) {
          dotDiv.classList.add('empty-dot'); // Зробити крапку невидимою
        }
        halfDiv.appendChild(dotDiv);
      }
    }

    return halfDiv;
  }

  // Додаємо верхню і нижню половини
  tileDiv.appendChild(createHalf(top));
  tileDiv.appendChild(createHalf(bottom));

  return tileDiv;
}

let selectedTileIndex = null;

// Обрання кісточки
function selectTile(index) {
  selectedTileIndex = index;
}

// Зробити хід
function makeMove() {
  const roomId = Object.keys(rooms).find(roomId => rooms[roomId].players.some(player => player.name === document.getElementById('username').value));
  if (!roomId) return;

  const room = rooms[roomId];
  const currentPlayer = room.players[room.turn];

  if (selectedTileIndex === null) {
    alert('Будь ласка, оберіть кісточку.');
    return;
  }

  const selectedTile = currentPlayer.hand[selectedTileIndex];
  if (room.board.length === 0) {
    // Перший хід
    room.board.push(selectedTile);
  } else {
    const firstTile = room.board[0];
    const lastTile = room.board[room.board.length - 1];

    if (selectedTile[0] === lastTile[1]) {
      room.board.push(selectedTile);
    } else if (selectedTile[1] === lastTile[1]) {
      room.board.push([selectedTile[1], selectedTile[0]]);
    } else if (selectedTile[1] === firstTile[0]) {
      room.board.unshift(selectedTile);
    } else if (selectedTile[0] === firstTile[0]) {
      room.board.unshift([selectedTile[1], selectedTile[0]]);
    } else {
      alert('Ця кісточка не підходить. Спробуйте іншу.');
      return;
    }
  }

  currentPlayer.hand.splice(selectedTileIndex, 1);
  selectedTileIndex = null;

  if (currentPlayer.hand.length === 0) {
    alert(`${currentPlayer.name} переміг!`);
    delete rooms[roomId];
    document.querySelector('.game').style.display = 'none';
    document.querySelector('.lobby').style.display = 'flex';
    return;
  }

  room.turn = (room.turn + 1) % room.players.length;
  updateGameDisplay(roomId);
}

// Генерація унікального ID кімнати
function generateRoomId() {
  let roomId;
  do {
    roomId = Math.random().toString(36).substring(2, 6).toUpperCase();
  } while (rooms[roomId]);
  return roomId;
}

// Оновлення списку кімнат
function updateRoomsDisplay() {
  const roomsDiv = document.getElementById('rooms');
  roomsDiv.innerHTML = '';
  for (const [roomId, room] of Object.entries(rooms)) {
    const roomDiv = document.createElement('div');
    roomDiv.className = 'room';
    roomDiv.textContent = `Кімната ${roomId} (${room.players.length}/6)`;
    roomsDiv.appendChild(roomDiv);
  }
}

setInterval(updateRoomsDisplay, 1000);
