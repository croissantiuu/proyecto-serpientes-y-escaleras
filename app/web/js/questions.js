let preguntas;
let preguntaActual = 0;
const btnPressedAudio = new Audio('./app/web/audio/btn-preesed.wav');
const correctQuestion = new Audio('./app/web/audio/word-guessed.wav');
const incorrectQuestion = new Audio('./app/web/audio/incorrect.mp3');

addEventListener("DOMContentLoaded", (event) => {
    
    fetch('./app/data/questions.json')
    .then(response => response.json())
    .then(data => {
        preguntas = data.Preguntas;
        // mostrarPregunta(); // Muestra la primera pregunta al cargar la página
    })
    .catch((error) => console.error('Error:', error));

    // Agrega un eventListener al botón
    document.getElementById('questionBtn').addEventListener('click', () => {
        // preguntaActual++;
        console.log('pregunta actual:' + preguntaActual);
        mostrarPregunta();
        hideOrShowQuestionContainer();
    });
});

function mostrarPregunta() {
    btnPressedAudio.play();
    if(preguntaActual < preguntas.length) {
        const pregunta = preguntas[preguntaActual];
        const divPregunta = document.getElementById('pregunta');
        divPregunta.textContent = pregunta.pregunta;

        // Limpia las respuestas anteriores
        const divRespuestas = document.getElementById('respuestas');
        divRespuestas.innerHTML = '';

        // Muestra las opciones de respuesta
        pregunta.grupo_de_respuestas.forEach((respuesta, index) => {
            const botonRespuesta = document.createElement('button');
            botonRespuesta.textContent = Object.values(respuesta)[0];
            botonRespuesta.addEventListener('click', () => verificarRespuesta(Object.values(respuesta)[0]));
            divRespuestas.appendChild(botonRespuesta);
        });
    } else {
        alert('No hay más preguntas.');
    }
}

function verificarRespuesta(respuestaUsuario) {
    const pregunta = preguntas[preguntaActual];
    if (respuestaUsuario === pregunta.respuesta) {
        // Si la respuesta es correcta, pasa a la siguiente pregunta.
        // alert('Respuesta correcta.');
        correctQuestion.play();
        preguntaActual++;
        // mostrarPregunta();
        hideOrShowQuestionContainer();
        congratulations(.25, {
            spread: 30,
            startVelocity: 60
        });
        congratulations(.2, {
            spread: 60
        });
        congratulations(.35, {
            spread: 130,
            startVelocity: 30,
            decay: .92,
            scalar: 1.2
        });
        congratulations(.2, {
            spread: 120,
            startVelocity: 45
        });
    } else {
        // Si la respuesta no es correcta, muestra un mensaje de error.
        incorrectQuestion.play();
        hideOrShowQuestionContainer();
        // alert('Respuesta incorrecta. Intenta de nuevo.');
    }
}

function hideOrShowQuestionContainer() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.classList.toggle('hide');
}

function congratulations(ratio, opt) {
    confetti(
        Object.assign({}, opt, {
        origin: { y: 0.6 },
        particleCount: Math.floor(200 * ratio),
        })
    );
}