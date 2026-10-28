// ==========================================
// E-WASTE: OPERACIÓN ZERO
// ==========================================


// ELEMENTOS

const menu =
    document.getElementById("menu");

const niveles =
    document.getElementById("niveles");

const gameScreen =
    document.getElementById("gameScreen");

const levelComplete =
    document.getElementById(
        "levelComplete"
    );

const gameOver =
    document.getElementById(
        "gameOver"
    );

const victory =
    document.getElementById(
        "victory"
    );


const gameArea =
    document.getElementById(
        "gameArea"
    );


const player =
    document.getElementById(
        "player"
    );


const scoreText =
    document.getElementById(
        "score"
    );


const livesText =
    document.getElementById(
        "lives"
    );


const timeText =
    document.getElementById(
        "time"
    );


const levelText =
    document.getElementById(
        "levelNumber"
    );


const progressBar =
    document.getElementById(
        "progressBar"
    );


const message =
    document.getElementById(
        "message"
    );


// ==========================================
// VARIABLES
// ==========================================

let score = 0;

let lives = 3;

let time = 30;

let currentLevel = 1;

let playerPosition = 50;

let playing = false;

let timer;

let spawner;

let requiredScore = 100;


// ==========================================
// CONFIGURACIÓN DE NIVELES
// ==========================================

const levelsConfig = {

    1: {
        time: 30,
        goal: 100,
        speed: 2,
        spawn: 900
    },

    2: {
        time: 30,
        goal: 180,
        speed: 3,
        spawn: 750
    },

    3: {
        time: 35,
        goal: 280,
        speed: 3.5,
        spawn: 650
    },

    4: {
        time: 40,
        goal: 400,
        speed: 4,
        spawn: 550
    },

    5: {
        time: 45,
        goal: 550,
        speed: 5,
        spawn: 450
    }

};


// ==========================================
// OBJETOS
// ==========================================

const objects = [

    {
        emoji: "📱",
        points: 10,
        dangerous: false
    },

    {
        emoji: "💻",
        points: 20,
        dangerous: false
    },

    {
        emoji: "🖥️",
        points: 20,
        dangerous: false
    },

    {
        emoji: "🎧",
        points: 15,
        dangerous: false
    },

    {
        emoji: "🔌",
        points: 10,
        dangerous: false
    },

    {
        emoji: "🔋",
        points: 30,
        dangerous: false
    },

    {
        emoji: "⌨️",
        points: 15,
        dangerous: false
    },

    {
        emoji: "🖱️",
        points: 15,
        dangerous: false
    },

    {
        emoji: "☢️",
        points: 0,
        dangerous: true
    },

    {
        emoji: "💣",
        points: 0,
        dangerous: true
    }

];


// ==========================================
// BOTÓN INICIO
// ==========================================

document
    .getElementById("startButton")
    .addEventListener(
        "click",
        () => {

            menu.classList.add(
                "hidden"
            );

            niveles.classList.remove(
                "hidden"
            );

        }
    );


// ==========================================
// SELECCIONAR NIVEL
// ==========================================

document
    .querySelectorAll(".level")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const level =
                        Number(
                            button.dataset.level
                        );


                    if (
                        button.classList
                            .contains("locked")
                    ) {

                        return;

                    }


                    currentLevel =
                        level;


                    startLevel();

                }
            );

        }
    );


// ==========================================
// INICIAR NIVEL
// ==========================================

function startLevel() {

    const config =
        levelsConfig[
            currentLevel
        ];


    score = 0;

    lives = 3;

    time =
        config.time;

    requiredScore =
        config.goal;

    playerPosition = 50;

    playing = true;


    niveles.classList.add(
        "hidden"
    );

    levelComplete.classList.add(
        "hidden"
    );

    gameOver.classList.add(
        "hidden"
    );

    gameScreen.classList.remove(
        "hidden"
    );


    scoreText.textContent =
        score;

    livesText.textContent =
        lives;

    timeText.textContent =
        time;

    levelText.textContent =
        currentLevel;


    progressBar.style.width =
        "100%";


    player.style.left =
        playerPosition + "%";


    message.textContent =
        "⚡ ¡Misión iniciada!";


    clearInterval(timer);

    clearInterval(spawner);


    timer =
        setInterval(
            updateTimer,
            1000
        );


    spawner =
        setInterval(
            createObject,
            config.spawn
        );

}


// ==========================================
// TEMPORIZADOR
// ==========================================

function updateTimer() {

    if (!playing) {

        return;

    }


    time--;


    timeText.textContent =
        time;


    const percentage =
        (time /
        levelsConfig[currentLevel].time)
        * 100;


    progressBar.style.width =
        percentage + "%";


    if (time <= 0) {

        checkLevel();

    }

}


// ==========================================
// MOVER JUGADOR
// ==========================================

function moveLeft() {

    if (!playing) {

        return;

    }


    playerPosition -= 8;


    if (playerPosition < 8) {

        playerPosition = 8;

    }


    player.style.left =
        playerPosition + "%";

}


function moveRight() {

    if (!playing) {

        return;

    }


    playerPosition += 8;


    if (playerPosition > 92) {

        playerPosition = 92;

    }


    player.style.left =
        playerPosition + "%";

}


document
    .getElementById("leftButton")
    .addEventListener(
        "click",
        moveLeft
    );


document
    .getElementById("rightButton")
    .addEventListener(
        "click",
        moveRight
    );


// ==========================================
// TECLADO
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "ArrowLeft"
        ) {

            moveLeft();

        }


        if (
            event.key === "ArrowRight"
        ) {

            moveRight();

        }

    }
);


// ==========================================
// CREAR OBJETO
// ==========================================

function createObject() {

    if (!playing) {

        return;

    }


    const item =
        document.createElement(
            "div"
        );


    item.classList.add(
        "item"
    );


    const random =
        Math.floor(
            Math.random() *
            objects.length
        );


    const data =
        objects[random];


    item.textContent =
        data.emoji;


    item.dataset.points =
        data.points;


    item.dataset.dangerous =
        data.dangerous;


    item.style.left =
        (
            Math.random() *
            90 +
            5
        ) + "%";


    item.style.top =
        "-60px";


    gameArea.appendChild(
        item
    );


    dropObject(item);

}


// ==========================================
// CAER OBJETO
// ==========================================

function dropObject(item) {

    let positionY = -60;


    const speed =
        levelsConfig[
            currentLevel
        ].speed;


    const movement =
        setInterval(
            () => {

                if (!playing) {

                    clearInterval(
                        movement
                    );

                    item.remove();

                    return;

                }


                positionY += speed;


                item.style.top =
                    positionY + "px";


                checkCollision(
                    item,
                    movement
                );


                if (
                    positionY >
                    gameArea.clientHeight
                ) {

                    clearInterval(
                        movement
                    );

                    item.remove();

                }

            },
            20
        );

}


// ==========================================
// COLISIONES
// ==========================================

function checkCollision(
    item,
    movement
) {

    const playerRect =
        player.getBoundingClientRect();


    const itemRect =
        item.getBoundingClientRect();


    const collision =

        playerRect.left <
        itemRect.right &&

        playerRect.right >
        itemRect.left &&

        playerRect.top <
        itemRect.bottom &&

        playerRect.bottom >
        itemRect.top;


    if (!collision) {

        return;

    }


    clearInterval(
        movement
    );


    const dangerous =
        item.dataset.dangerous
        === "true";


    if (dangerous) {

        lives--;

        livesText.textContent =
            lives;


        message.textContent =
            "💥 ¡Cuidado! Residuo peligroso";


        if (lives <= 0) {

            endGame();

        }

    }

    else {

        const points =
            Number(
                item.dataset.points
            );


        score += points;


        scoreText.textContent =
            score;


        message.textContent =
            "⚡ +" +
            points +
            " XP";


        if (
            score >= requiredScore
        ) {

            checkLevel();

        }

    }


    item.remove();

}


// ==========================================
// COMPROBAR NIVEL
// ==========================================

function checkLevel() {

    if (!playing) {

        return;

    }


    playing = false;


    clearInterval(timer);

    clearInterval(spawner);


    if (
        score >= requiredScore
    ) {

        completeLevel();

    }

    else {

        endGame();

    }

}


// ==========================================
// COMPLETAR NIVEL
// ==========================================

function completeLevel() {

    gameScreen.classList.add(
        "hidden"
    );


    levelComplete.classList.remove(
        "hidden"
    );


    document.getElementById(
        "levelScore"
    ).textContent =
        "+" +
        score +
        " XP";


    unlockNextLevel();

}


// ==========================================
// DESBLOQUEAR NIVEL
// ==========================================

function unlockNextLevel() {

    const next =
        currentLevel + 1;


    if (next > 5) {

        return;

    }


    const nextButton =
        document.querySelector(
            `[data-level="${next}"]`
        );


    if (nextButton) {

        nextButton.classList.remove(
            "locked"
        );

    }

}


// ==========================================
// SIGUIENTE NIVEL
// ==========================================

document
    .getElementById("nextLevel")
    .addEventListener(
        "click",
        () => {

            if (
                currentLevel >= 5
            ) {

                showVictory();

            }

            else {

                currentLevel++;

                startLevel();

            }

        }
    );


// ==========================================
// GAME OVER
// ==========================================

function endGame() {

    playing = false;


    clearInterval(timer);

    clearInterval(spawner);


    document
        .querySelectorAll(".item")
        .forEach(
            item => item.remove()
        );


    gameScreen.classList.add(
        "hidden"
    );


    gameOver.classList.remove(
        "hidden"
    );


    document.getElementById(
        "finalScore"
    ).textContent =
        score +
        " XP";

}


// ==========================================
// REINTENTAR
// ==========================================

document
    .getElementById("retry")
    .addEventListener(
        "click",
        () => {

            startLevel();

        }
    );


// ==========================================
// VICTORIA
// ==========================================

function showVictory() {

    levelComplete.classList.add(
        "hidden"
    );


    victory.classList.remove(
        "hidden"
    );


    document.getElementById(
        "victoryScore"
    ).textContent =
        score +
        " XP";

}


// ==========================================
// REINICIAR
// ==========================================

document
    .getElementById("restart")
    .addEventListener(
        "click",
        () => {

            victory.classList.add(
                "hidden"
            );

            niveles.classList.remove(
                "hidden"
            );

        }
    );