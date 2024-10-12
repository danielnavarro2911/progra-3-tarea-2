const preguntas = [
    {
        pregunta: "¿Cuál es el planeta más cercano al sol?",
        opciones: ["Marte", "Venus", "Mercurio", "Júpiter"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Qué animal es conocido por su larga trompa?",
        opciones: ["Tigre", "Elefante", "León", "Canguro"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Cuál es el océano más grande del mundo?",
        opciones: ["Atlántico", "Pacífico", "Índico", "Ártico"],
        respuestaCorrecta: 1
    }
];

let preguntaActual = 0;
let tiempoRestante = 10;
let intervalo;
let respuestasCorrectas = 0;
let respuestasIncorrectas = 0;

document.getElementById('comenzar-btn').addEventListener('click', iniciarJuego);
document.getElementById('siguiente-btn').addEventListener('click', siguientePregunta);
document.getElementById('reiniciar-btn').addEventListener('click', reiniciarJuego);

function iniciarJuego() {
    document.getElementById('inicio').classList.add('ocultar');
    document.getElementById('preguntas').classList.remove('ocultar');
    mostrarPregunta();
    iniciarTemporizador();
}

function mostrarPregunta() {
    resetarSeleccion();
    const pregunta = preguntas[preguntaActual];
    document.getElementById('pregunta-texto').innerText = pregunta.pregunta;
    const opcionesLista = document.getElementById('opciones-lista');
    opcionesLista.innerHTML = '';

    pregunta.opciones.forEach((opcion, index) => {
        const li = document.createElement('li');
        li.classList.add('opcion');
        li.innerText = opcion;
        li.addEventListener('click', () => seleccionarOpcion(index));
        opcionesLista.appendChild(li);
    });

    document.querySelector('.respuesta-correcta').classList.add('ocultar');
    document.getElementById('siguiente-btn').classList.add('ocultar');
}

function seleccionarOpcion(index) {
    resetarSeleccion();
    respuestaSeleccionada = index;
    const opciones = document.querySelectorAll('.opcion');
    opciones[index].classList.add('seleccionado');
    
    clearInterval(intervalo);
    const pregunta = preguntas[preguntaActual];
    const respuestaCorrecta = pregunta.respuestaCorrecta;

    const retroalimentacion = document.querySelector('.retroalimentacion');
    const respuestaCorrectaText = document.querySelector('.respuesta-correcta');

    if (respuestaSeleccionada === respuestaCorrecta) {
        respuestasCorrectas++;
        retroalimentacion.innerText = "¡Bien hecho!";
        retroalimentacion.className = 'retroalimentacion correcto';
    } else {
        respuestasIncorrectas++;
        retroalimentacion.innerText = "Incorrecto. La respuesta correcta es: " + pregunta.opciones[respuestaCorrecta];
        retroalimentacion.className = 'retroalimentacion incorrecto';
    }

    respuestaCorrectaText.innerText = "Respuesta correcta: " + pregunta.opciones[respuestaCorrecta];
    respuestaCorrectaText.classList.remove('ocultar');
    document.getElementById('siguiente-btn').classList.remove('ocultar');
}

function iniciarTemporizador() {
    tiempoRestante = 10;
    document.getElementById('tiempo').innerText = tiempoRestante;
    intervalo = setInterval(() => {
        tiempoRestante--;
        document.getElementById('tiempo').innerText = tiempoRestante;
        
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            seleccionarOpcion(-1); // -1 indica que se agotó el tiempo
        }
    }, 1000);
}

function siguientePregunta() {
    if (preguntaActual < preguntas.length - 1) {
        preguntaActual++;
        mostrarPregunta();
        iniciarTemporizador();
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    document.getElementById('preguntas').classList.add('ocultar');
    document.getElementById('resultados').classList.remove('ocultar');
    document.getElementById('correctas').innerText = respuestasCorrectas;
    document.getElementById('incorrectas').innerText = respuestasIncorrectas;
}

function reiniciarJuego() {
    preguntaActual = 0;
    respuestasCorrectas = 0;
    respuestasIncorrectas = 0;
    document.getElementById('resultados').classList.add('ocultar');
    document.getElementById('inicio').classList.remove('ocultar');
}

function resetarSeleccion() {
    const opciones = document.querySelectorAll('.opcion');
    opciones.forEach(opcion => {
        opcion.classList.remove('seleccionado');
    });
    document.querySelector('.retroalimentacion').innerText = '';
    document.querySelector('.respuesta-correcta').classList.add('ocultar');
}

