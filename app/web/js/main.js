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
                this.gameBoard.appendChild(square);
                row.push(square);
                x--;
            }
            scount = scountTmp;
            board.push(row);
        }
        return board;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    // Pasar al siguiente jugador
    nextTurn() {
        // Avanza al siguiente jugador
        this.currentPlayerIndex++;
        // Si hemos llegado al final de la lista de jugadores, volvemos al principio
        if (this.currentPlayerIndex >= this.players.length) {
            this.currentPlayerIndex = 0;
        }
    }

    // Obtener el jugador actual
    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    diceRoll() {

    }

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
    const gameBoard = document.querySelector('.game-board');
    const infoButton = document.querySelector('.info-videogame');
    const infoWrapper = document.querySelector('.popup-info-wrapper');
    const closeInfoBtn = document.querySelector('.btn-close');
    const playerTurnLabel = document.querySelector('.player-turn');
    const rollDiceBtn = document.querySelector('#rollDiceBtn');
    const nextTurnBtn = document.querySelector('#nextTurnBtn');

    const numberOfPlayers = 5;
    let isInGame = false;

    let coloresPastel = [
        "#FF7F50", // Salmón más oscuro
        "#FF69B4", // Rosa más oscuro
        "#1E90FF", // Azul más oscuro
        "#32CD32", // Verde más oscuro
        "#FF1493", // Rosa más oscuro
        "#40E0D0"  // Turquesa más oscuro        
    ];

    // Crear una nueva instancia del juego
    let game = new Game(gameBoard, coloresPastel);

    // Iniciar el juego
    startGame();

    // Manage info button click
    infoButton.addEventListener('click', (e) => {
        e.preventDefault();
        infoWrapper.classList.remove('hide-btn');
        // btnPressedAudio.play();
    });

    closeInfoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        infoWrapper.classList.add('hide-btn');
        // btnPressedAudio.play();
        // if(!isMusicActive) {
        //     videoGameMusic.play();
        //     videoGameMusic.volume = 0.2;
        //     isMusicActive = true;
        // }
    });

    rollDiceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Lanza el dado (genera un número aleatorio entre 1 y 6)
        let diceRoll = Math.floor(Math.random() * 6) + 1;
        console.log(diceRoll);
        // Juega el turno y verifica si el juego ha terminado
        if (game.playTurn(diceRoll)) {
            isInGame = false;
        }
    });

    nextTurnBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Avanza al siguiente turno
        game.nextTurn();
    });

    async function startGame() {
        isInGame = true;
        let playerTest = new Player('Santi', 'yellow');
        let playerTest2 = new Player('Liz', 'blue');
        game.addPlayer(playerTest);
        game.addPlayer(playerTest2);
    }
    

    // Agregar jugadores

    
    function congratulations(ratio, opt) {
        confetti(Object.assign({}, opt, {
            origin: {y: .6},
            particleCount: Math.floor(200 * ratio)
        }));
    }
});
