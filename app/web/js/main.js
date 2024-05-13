class Game {
  constructor(gameBoard, coloresPastel) {
    this.gameBoard = gameBoard;
    this.coloresPastel = coloresPastel;
    this.board = this.createBoard();
    this.players = [];
    this.currentPlayerIndex = 0;
  }

  // Método para crear un tablero dados i filas y j columnas
  createBoard() {
    let board = [];
    let x = 30;
    let scount = 30;
    let scountTmp = 0;
    let snakeImg = './assets/snake.png';
    let ladderImg = './assets/ladder.webp';

    for (let i = 0; i < 5; i++) {
        let row = [];
        
        if (i % 2 === 0) {
            scountTmp = 24 - 6 * i + 1;
        } else {
            scountTmp = x;
        }
        for (let j = 0; j < 6; j++) {
             
            let square = document.createElement('div');
            square.classList.add('board-square');
            square.style.backgroundColor = this.coloresPastel[Math.floor(Math.random() * this.coloresPastel.length)];
            // Si la fila es par, numerar las casillas de izquierda a derecha
            // Si la fila es impar, numerar las casillas de derecha a izquierda
            if (i % 2 === 0) {
                square.dataset.number = scountTmp++;

            } else {
                square.dataset.number = scountTmp--;
            }
            
            /// NUEVO FRAGMENTO DE CODIGO
            //CASILLAS DE ESCALERAS--------------------------------------
            // Agregar imagen de escaleras en las casillas 6
            if (parseInt(square.dataset.number) === 6) {
                square.style.backgroundImage = "url(" + ladderImg + ")";
                square.style.backgroundSize = "cover";
                // Para dar clic en las casilla.
                square.addEventListener('click', () => {
                    this.showNotification("...Casilla 6 - Escalera...\n Avanza a la casilla 18");
                });
            }
            // Agregar imagen de escaleras en las casillas 12
            if (parseInt(square.dataset.number) === 12) {
                square.style.backgroundImage = "url(" + ladderImg + ")";
                square.style.backgroundSize = "cover";
                // Para dar clic en las casilla.
                square.addEventListener('click', () => {
                    this.showNotification("...Casilla 12 - Escalera...\n Avanza a la casilla 24");
                });
            }
            // Agregar imagen de escaleras en las casillas 15
            if (parseInt(square.dataset.number) === 15) {
                square.style.backgroundImage = "url(" + ladderImg + ")";
                square.style.backgroundSize = "cover";
                // Para dar clic en las casilla.
                square.addEventListener('click', () => {
                    this.showNotification("...Casilla 15 - Escalera...\n Avanza a la casilla 27");
                });
            }
            //CASILLAS DE SERPIENTES--------------------------------------
            // Agregar imagen de serpiente en las casillas 11
            if (parseInt(square.dataset.number) === 11) {
                square.style.backgroundImage = "url(" + snakeImg + ")";
                square.style.backgroundSize = "cover";
                // Para dar clic en las casilla.
                square.addEventListener('click', () => {
                    this.showNotification("...Casilla 11 - Serpiente...\n Retrocede a la casilla 3", 'https://youtu.be/jHWBFyZcLPg?si=b6Y-WcAzzeR23Uos');
                });
            }
            // Agregar imagen de serpiente en las casillas 21
            if (parseInt(square.dataset.number) === 21) {
                square.style.backgroundImage = "url(" + snakeImg + ")";
                square.style.backgroundSize = "cover";
                // Para dar clic en las casilla.
                square.addEventListener('click', () => {
                    this.showNotification("...Casilla 21 - Serpiente...\n Retrocede a la casilla 17", 'https://youtu.be/jHWBFyZcLPg?si=b6Y-WcAzzeR23Uos');
                });
            }
            // Agregar imagen de serpiente en las casillas 28
            if (parseInt(square.dataset.number) === 28) {
                square.style.backgroundImage = "url(" + snakeImg + ")";
                square.style.backgroundSize = "cover";
                // Para dar clic en las casilla.
                square.addEventListener('click', () => {
                    this.showNotification("...Casilla 28 - Serpiente...\n Retrocede a la casilla 20", 'https://youtu.be/jHWBFyZcLPg?si=b6Y-WcAzzeR23Uos');
                });
            }
            /// FIN NUEVO FRAGMENTO DE CODIGO

            this.gameBoard.appendChild(square);
            row.push(square);
            x--;
        }
        scount = scountTmp;
        board.push(row);
    }
    return board;
  }

  // NOTIFICAR A QUE CASILLA DEBE MOVERSE EL JUGADOR (IMG SERPIENTE Y ESCALERA).
  showNotification(message, videoPath) {
    // Crear un nuevo cuadro de notificación
    let notification = document.createElement('div');
    notification.classList.add('notification');

    // Crear el contenido del cuadro de notificación (texto y botón de cierre)
    let notificationContent = document.createElement('div');
    notificationContent.classList.add('notification-content');
    notificationContent.textContent = message;

    // INICIO - RANA MEME
    // Verificar si se proporcionó un videoPath
    if (videoPath) {
      // Crear el elemento iframe
      let iframe = document.createElement('iframe');
      iframe.width = "560";
      iframe.height = "315";
      iframe.src = 'https://www.youtube.com/embed/jHWBFyZcLPg?autoplay=1';
      iframe.frameborder = "0";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
  
      // Agregar el iframe al contenido del cuadro de notificación
      notificationContent.appendChild(iframe);
    }
  
    // FIN - RANA MEME

    // Crear el botón de cierre
    let closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'Cerrar';

    // Agregar evento de clic al botón de cierre para eliminar el cuadro de notificación
    closeButton.addEventListener('click', () => {
        notification.remove();
    });

    // Agregar el texto y el botón de cierre al contenido del cuadro de notificación
    notification.appendChild(notificationContent);
    notification.appendChild(closeButton);

    // Agregar el cuadro de notificación al contenedor de notificaciones en tu HTML
    let notificationContainer = document.getElementById('notification-container');
    notificationContainer.appendChild(notification);
  }

  addPlayer(player) {
    this.players.push(player);
  }

  // Obtener el jugador actual
  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  diceRoll() {}

  // Método para jugar un turno
  playTurn(diceRoll) {
    // Obtén el jugador actual
    let currentPlayer = this.getCurrentPlayer();

    // Avanza al jugador en el tablero según el resultado del dado
    currentPlayer.advance(diceRoll);

    // Verifica si el jugador ha ganado
    currentPlayer.checkWin();

    // Si el jugador ha ganado, termina el juego
    if (currentPlayer.getWinStatus()) {
      console.log(currentPlayer.name + " ha ganado el juego!");
      return true; // Indica que el juego ha terminado
    }

    return false; // Indica que el juego no ha terminado
  }
}

class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.currentSquare = 1;
    this.hasWon = false;
  }

  // Método para avanzar en el tablero
  advance(steps) {
    this.currentSquare += steps;
  }

  // Método para retroceder en el tablero
  goBack(steps) {
    this.currentSquare -= steps;
  }

  // Método para verificar si el jugador ha ganado la partida
  checkWin() {
    if (this.currentSquare >= 30) {
      this.hasWon = true;
    }
  }

  // Método para obtener la posición actual del jugador
  getCurrentPosition() {
    return this.currentSquare;
  }

  // Método para obtener el estado de victoria del jugador
  getWinStatus() {
    return this.hasWon;
  }
}

addEventListener("DOMContentLoaded", (event) => {
  // Declaración de variables
  const gameBoard = document.querySelector(".game-board");
  const infoButton = document.querySelector(".info-videogame");
  const infoWrapper = document.querySelector(".popup-info-wrapper");
  const closeInfoBtn = document.querySelector(".btn-close");
  const playerTurnLabel = document.querySelector(".player-turn");
  const rollDiceBtn = document.querySelector("#rollDiceBtn");
  const nextTurnBtn = document.querySelector("#nextTurnBtn");

  let isMusicActive = false;

  const btnPressedAudio = new Audio('./app/web/audio/btn-preesed.wav');
  const correctQuestion = new Audio('./app/web/audio/word-guessed.wav');
  const incorrectQuestion = new Audio('./app/web/audio/incorrect-letter.wav');
  const roundLost = new Audio('./app/web/audio/round-lost.wav');
  const videoGameMusic = new Audio('./app/web/audio/game-music.wav');

  const numberOfPlayers = 5;
  let isInGame = false;

  let coloresPastel = [
    "#FF7F50", // Salmón más oscuro
    "#FF69B4", // Rosa más oscuro
    "#1E90FF", // Azul más oscuro
    "#32CD32", // Verde más oscuro
    "#FF1493", // Rosa más oscuro
    "#40E0D0", // Turquesa más oscuro
  ];

  // Crear una nueva instancia del juego
  let game = new Game(gameBoard, coloresPastel);

  // Iniciar el juego
  startGame();


  // Manage info button click
  infoButton.addEventListener("click", (e) => {
    e.preventDefault();
    infoWrapper.classList.remove("hide-btn");
    // btnPressedAudio.play();
  });

  closeInfoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    infoWrapper.classList.add("hide-btn");
    if(!isMusicActive) {
      videoGameMusic.play();
      videoGameMusic.volume = 0.2;
      isMusicActive = true;
    }
    // btnPressedAudio.play();
    // if(!isMusicActive) {
    //     videoGameMusic.play();
    //     videoGameMusic.volume = 0.2;
    //     isMusicActive = true;
    // }
  });

  rollDiceBtn.addEventListener("click", (e) => {
    e.preventDefault();
    btnPressedAudio.play();
    // Lanza el dado (genera un número aleatorio entre 1 y 6)
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    console.log(diceRoll);
    // Juega el turno y verifica si el juego ha terminado
    if (game.playTurn(diceRoll)) {
      isInGame = false;
    }
  });

  // nextTurnBtn.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   // Avanza al siguiente turno
  //   game.nextTurn();
  // });

  async function startGame() {
    isInGame = true;
    let playerTest = new Player("Santi", "yellow");
    let playerTest2 = new Player("Liz", "blue");
    game.addPlayer(playerTest);
    game.addPlayer(playerTest2);
  }

  // Agregar jugadores

  function congratulations(ratio, opt) {
    confetti(
      Object.assign({}, opt, {
        origin: { y: 0.6 },
        particleCount: Math.floor(200 * ratio),
      })
    );
  }
});


// JUGADORES : Ser arrastrado por el Mouse
const circles = document.querySelectorAll(".circle");

circles.forEach((circle) => {
  dragElement(circle);
});

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// MENSAJE DE TURNOS
document.addEventListener("DOMContentLoaded", function () {
  let turnos = ["P1", "P2", "P3", "P4", "P5", "P6"];
  let turnoIndex = 0;

  document.getElementById("rollDiceBtn").addEventListener("click", function () {
    // Obtener el elemento del mensaje de turno
    let mensajeTurno = document.getElementById("mensajeTurn");

    // Cambiar el contenido del mensaje de turno al siguiente turno
    mensajeTurno.textContent = "Turno de " + turnos[turnoIndex];

    // Incrementar el índice del turno para el próximo clic
    turnoIndex = (turnoIndex + 1) % turnos.length;
  });
});

//  Cuadro de Pregunata Inicial
// document.addEventListener("DOMContentLoaded", function () {
//   const triggerBtn = document.getElementById("triggerBtn");
//   const questionModal = document.getElementById("questionModal");
//   const responseModal = document.getElementById("responseModal");
//   const responseContent = document.getElementById("responseContent");
//   const correctBtn = document.getElementById("correctBtn");
//   const incorrectBtn = document.getElementById("incorrectBtn");
//   const closeBtn = document.getElementById("closeBtn");
//   const questionText = document.getElementById("questionText");

//   triggerBtn.addEventListener("click", function () {
//     questionModal.style.display = "block";
//   });

//   correctBtn.addEventListener("click", function () {
//     responseContent.textContent =
//       "Respuesta Correcta - Te quedas en esta casilla.";
//     responseModal.style.display = "block";
//     questionModal.style.display = "none";
//   });

//   incorrectBtn.addEventListener("click", function () {
//     responseContent.textContent =
//       "Respuesta Incorrecta - Retrocedes una casilla.";
//     responseModal.style.display = "block";
//     questionModal.style.display = "none";
//   });

//   closeBtn.addEventListener("click", function () {
//     responseModal.style.display = "none";
//   });
// });
