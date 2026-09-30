// ======================================
// ECOCLASIFICA
// ======================================


// Objetos del juego

const objetos = [

    {
        emoji: "📱",
        nombre: "Celular",
        tipo: "electronico"
    },

    {
        emoji: "💻",
        nombre: "Computadora",
        tipo: "electronico"
    },

    {
        emoji: "🔋",
        nombre: "Batería",
        tipo: "electronico"
    },

    {
        emoji: "🖥️",
        nombre: "Monitor",
        tipo: "electronico"
    },

    {
        emoji: "🥤",
        nombre: "Botella plástica",
        tipo: "reciclable"
    },

    {
        emoji: "📦",
        nombre: "Caja de cartón",
        tipo: "reciclable"
    },

    {
        emoji: "🥫",
        nombre: "Lata",
        tipo: "reciclable"
    },

    {
        emoji: "📰",
        nombre: "Periódico",
        tipo: "reciclable"
    },

    {
        emoji: "🍌",
        nombre: "Cáscara de banana",
        tipo: "basura"
    },

    {
        emoji: "🧻",
        nombre: "Papel sanitario usado",
        tipo: "basura"
    },

    {
        emoji: "🍬",
        nombre: "Envoltorio sucio",
        tipo: "basura"
    },

    {
        emoji: "☕",
        nombre: "Vaso desechable sucio",
        tipo: "basura"
    }

];


// Variables

let puntos = 0;

let vidas = 3;

let tiempo = 30;

let objetoActual;

let temporizador;

let jugando = false;


// Elementos HTML

const inicio =
    document.getElementById("inicio");

const juego =
    document.getElementById("juego");

const final =
    document.getElementById("final");

const comenzar =
    document.getElementById("comenzar");

const reintentar =
    document.getElementById("reintentar");

const emoji =
    document.getElementById("emoji");

const nombreObjeto =
    document.getElementById("nombreObjeto");

const puntosTexto =
    document.getElementById("puntos");

const vidasTexto =
    document.getElementById("vidas");

const tiempoTexto =
    document.getElementById("tiempo");

const mensaje =
    document.getElementById("mensaje");

const resultado =
    document.getElementById("resultado");

const mensajeFinal =
    document.getElementById("mensajeFinal");

const barraProgreso =
    document.getElementById("barraProgreso");

const botonesCategoria =
    document.querySelectorAll(".categoria");


// ======================================
// COMENZAR JUEGO
// ======================================

comenzar.addEventListener(
    "click",
    iniciarJuego
);


reintentar.addEventListener(
    "click",
    iniciarJuego
);


function iniciarJuego() {

    puntos = 0;

    vidas = 3;

    tiempo = 30;

    jugando = true;


    inicio.classList.add("oculto");

    final.classList.add("oculto");

    juego.classList.remove("oculto");


    puntosTexto.textContent =
        puntos;

    vidasTexto.textContent =
        vidas;

    tiempoTexto.textContent =
        tiempo;


    barraProgreso.style.width =
        "100%";


    mensaje.textContent =
        "¡Clasifica correctamente!";


    clearInterval(temporizador);


    mostrarObjeto();


    iniciarTemporizador();

}


// ======================================
// MOSTRAR OBJETO
// ======================================

function mostrarObjeto() {

    const indice =
        Math.floor(
            Math.random() *
            objetos.length
        );


    objetoActual =
        objetos[indice];


    emoji.textContent =
        objetoActual.emoji;


    nombreObjeto.textContent =
        objetoActual.nombre;

}


// ======================================
// TEMPORIZADOR
// ======================================

function iniciarTemporizador() {

    temporizador =
        setInterval(function() {

            tiempo--;

            tiempoTexto.textContent =
                tiempo;


            const porcentaje =
                (tiempo / 30) * 100;


            barraProgreso.style.width =
                porcentaje + "%";


            if (tiempo <= 0) {

                terminarJuego();

            }

        }, 1000);

}


// ======================================
// SELECCIONAR CATEGORÍA
// ======================================

botonesCategoria.forEach(
    function(boton) {

        boton.addEventListener(
            "click",
            function() {

                clasificar(
                    boton.dataset.tipo
                );

            }
        );

    }
);


// ======================================
// CLASIFICAR
// ======================================

function clasificar(tipoSeleccionado) {

    if (!jugando) {

        return;

    }


    if (
        tipoSeleccionado ===
        objetoActual.tipo
    ) {

        // RESPUESTA CORRECTA

        puntos += 10;

        puntosTexto.textContent =
            puntos;

        mensaje.textContent =
            "✅ ¡Correcto! +10 puntos";

    }

    else {

        // RESPUESTA INCORRECTA

        vidas--;

        vidasTexto.textContent =
            vidas;

        mensaje.textContent =
            "❌ Incorrecto. ¡Cuidado!";

    }


    if (vidas <= 0) {

        terminarJuego();

        return;

    }


    // Esperar un momento
    // antes del siguiente objeto

    setTimeout(
        function() {

            if (jugando) {

                mostrarObjeto();

            }

        },
        500
    );

}


// ======================================
// TERMINAR JUEGO
// ======================================

function terminarJuego() {

    jugando = false;

    clearInterval(temporizador);


    juego.classList.add(
        "oculto"
    );


    final.classList.remove(
        "oculto"
    );


    resultado.textContent =
        puntos;


    if (puntos >= 100) {

        mensajeFinal.textContent =
            "🏆 ¡Increíble! ¡Eres un maestro del reciclaje!";

    }

    else if (puntos >= 70) {

        mensajeFinal.textContent =
            "🌱 ¡Excelente! Tienes muy buenos conocimientos.";

    }

    else if (puntos >= 40) {

        mensajeFinal.textContent =
            "👍 ¡Muy bien! Sigue aprendiendo.";

    }

    else {

        mensajeFinal.textContent =
            "📚 ¡Buen intento! Ahora sabes más sobre reciclaje.";

    }

}