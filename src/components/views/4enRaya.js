export {generarContenidoHTML4EnRaya};

function generarContenidoHTML4EnRaya(filas, columnas) {
    const tableRows = Array.from({length: filas}, (_, rowIndex) => {
        const rowCells = Array.from({length: columnas}, (_, columnIndex) => {
            return `<td class="cell empty"></td>`;
        }).join("");

        return `<tr>${rowCells}</tr>`;
    }).join("");


    document.addEventListener('click', (event) => {
        const clickedCell = event.target;
        if (clickedCell.classList.contains('cell') && clickedCell.classList.contains('empty')) {
            if (clickedCell.style.backgroundColor === '' || clickedCell.style.backgroundColor === 'white') {

                const fila = clickedCell.parentElement.rowIndex - 1;
                const columna = clickedCell.cellIndex;

                if (cont === 0) {
                    manejarClic(fila, columna)
                    cont = 1;
                } else {
                    manejarClic(fila, columna)
                    cont = 0;
                }
            }
        }
    });


    return `
            <h1>4 en Línea</h1>
            <div id="div_tablero">
            <table id="tablero">
                ${tableRows}
            </table>
            </div>
            <button id="reiniciar-button">Reiniciar Juego</button>
        `;

}

let cont = 0;
let juegoTerminado = false;
let jugadorActual = 'red';

const tablero = [];
const filas = 6;
const columnas = 7;

// Inicializar el tablero
for (let i = 0; i < filas; i++) {
    tablero[i] = Array(columnas).fill('empty');
}

function verificarGanador(fila, columna) {
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

        while (x >= 0 && x < columnas && y >= 0 && y < filas && tablero[y][x] === jugadorActual) {
            count++;
            x += dx;
            y += dy;
        }

        x = columna - dx;
        y = fila - dy;

        while (x >= 0 && x < columnas && y >= 0 && y < filas && tablero[y][x] === jugadorActual) {
            count++;
            x -= dx;
            y -= dy;
        }

        if (count >= 4) {
            reiniciarJuego();
            return true;
        }
    }

    return false;
}

function manejarClic(fila, columna) {
    if (juegoTerminado) return;

    for (let i = filas - 1; i >= 0; i--) {
        if (tablero[i][columna] === 'empty') {
            tablero[i][columna] = jugadorActual;
            const cell = document.querySelector(`#tablero tr:nth-child(${i + 1}) td:nth-child(${columna + 1})`);
            cell.classList.remove('empty');
            cell.style.backgroundColor = jugadorActual;

            if (verificarGanador(i, columna)) {
                alert(`¡Jugador ${jugadorActual === 'red' ? '1' : '2'} ha ganado!`);
                juegoTerminado = true;
            } else {
                cont++;
                if (cont === filas * columnas) {
                    alert('¡Empate!');
                    juegoTerminado = true;
                } else {
                    jugadorActual = jugadorActual === 'red' ? 'yellow' : 'red';
                }
            }

            break;
        }
    }
}

function reiniciarJuego() {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            tablero[i][j] = 'empty';
            const cell = document.querySelector(`#tablero tr:nth-child(${i + 1}) td:nth-child(${j + 1})`);
            cell.classList.add('empty');
            cell.style.backgroundColor = 'white';
        }
    }
    jugadorActual = 'red';
    juegoTerminado = false;
    cont = 0;
}




