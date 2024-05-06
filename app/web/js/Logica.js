class Game {
    constructor(gameBoard, coloresPastel) {
        this.gameBoard = gameBoard;
        this.coloresPastel = coloresPastel;
        this.board = this.createBoard();
        this.players = [];
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
                square.textContent = square.dataset.number; // Añadir los numeros en el tablero
                this.gameBoard.appendChild(square);
                row.push(square);
                x--;
            }
            scount = scountTmp;
            board.push(row);
        }

        // Mensaje en consola
        if (board.length > 0) {
            console.log("Tablero creado correctamente.");
        } else {
            console.log("No se pudo crear el tablero.");
        }

        return board;
    }

    addPlayer(player) {
        this.players.push(player);
        console.log(`Jugador ${player.name} agregado.`);
    }

    startGame() {
        if (this.players.length === 0) {
            console.log("No se pueden iniciar el juego sin jugadores.");
            return;
        }

        console.log("El juego ha comenzado.");
    }
}

addEventListener("DOMContentLoaded", (event) => {
    // Declaración de variables
    const gameBoard = document.querySelector('.game-board');
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

    // Agregar jugadores
    game.addPlayer({ name: "Jugador 1" });
    game.addPlayer({ name: "Jugador 2" });

    // Iniciar el juego
    game.startGame();
});

