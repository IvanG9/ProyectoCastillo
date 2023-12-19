import {updateGame} from "../../services/cuatrohttp";

export {gameState, verificarGanador, manejarClic, resetGame, startGame, startGameUser}

const gameState = () => ({
    nombreJugadores: {
        1: "",
        2: ""
    },
    cont: 0,
    juegoTerminado: false,
    jugadorActual: 'red',
    tablero: [],
    filas: 6,
    columnas: 7
});

function startGame(state) {

    const stateCopy = structuredClone(state);
    for (let i = 0; i < stateCopy.filas; i++) {
        stateCopy.tablero[i] = Array(stateCopy.columnas).fill('empty');
    }
    return stateCopy;

}

function startGameUser(state, user) {

    const stateCopy = structuredClone(state);
    for (let i = 0; i < stateCopy.filas; i++) {
        stateCopy.tablero[i] = Array(stateCopy.columnas).fill('empty');
    }

    stateCopy.nombreJugadores[1] = user;

    return stateCopy;

}


function resetGame(state) {

    for (let i = 0; i < state.filas; i++) {
        for (let j = 0; j < state.columnas; j++) {
            state.tablero[i][j] = 'empty';
            const cell = document.querySelector(`#tablero tr:nth-child(${i + 1}) td:nth-child(${j + 1})`);
            cell.classList.add('empty');
            cell.style.backgroundColor = 'white';
        }
    }

    state.jugadorActual = 'red';
    state.juegoTerminado = false;
    state.cont = 0;
}

function verificarGanador(state, fila, columna) {

    const direcciones = [
        [0, 1],  // Derecha
        [1, 0],  // Abajo
        [1, 1],  // Diagonal inferior derecha
        [1, -1]  // Diagonal inferior izquierda
    ];

    for (const [dx, dy] of direcciones) {
        let count = 1;
        let x = columna + dx;
        let y = fila + dy;

        while (x >= 0 && x < state.columnas && y >= 0 && y < state.filas && state.tablero[y][x] === state.jugadorActual) {
            count++;
            x += dx;
            y += dy;
        }

        x = columna - dx;
        y = fila - dy;

        while (x >= 0 && x < state.columnas && y >= 0 && y < state.filas && state.tablero[y][x] === state.jugadorActual) {
            count++;
            x -= dx;
            y -= dy;
        }

        if (count >= 4) {
            return true;
        }
    }

    return false;
}

async function manejarClic(state, fila, columna, id) {

    if (state.juegoTerminado) return;

    for (let i = state.filas - 1; i >= 0; i--) {
        if (state.tablero[i][columna] === 'empty') {
            state.tablero[i][columna] = state.jugadorActual;
            const cell = document.querySelector(`#tablero tr:nth-child(${i + 1}) td:nth-child(${columna + 1})`);
            cell.classList.remove('empty');
            cell.style.backgroundColor = state.jugadorActual;

            if (verificarGanador(state, i, columna)) {
                alert(`¡Jugador ${state.jugadorActual === 'red' ? '1' : '2'} ha ganado!`);
                state.juegoTerminado = true;
            } else {
                state.cont++;
                if (state.cont === state.filas * state.columnas) {
                    alert('¡Empate!');
                    state.juegoTerminado = true;
                } else {
                    state.jugadorActual = state.jugadorActual === 'red' ? 'yellow' : 'red';
                }
            }
            break;
        }
    }

    const a = await updateGame(id, state)
}