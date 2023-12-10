import * as cuatro from '../functions/cuatro.js';
import {gameState} from "../functions/cuatro.js";

export {generarContenidoHTML4EnRaya};

function generarContenidoHTML4EnRaya() {

    const state = cuatro.startGame(cuatro.gameState());

    const tableRows = Array.from({length: state.filas}, (_, rowIndex) => {
        const rowCells = Array.from({length: state.columnas}, (_, columnIndex) => {
            return `<td class="cell empty"></td>`;
        }).join("");

        return `<tr>${rowCells}</tr>`;
    }).join("");

    const divCuatro = document.createElement('div');

    divCuatro.innerHTML =
        `
            <h1>4 en Línea</h1>
            <div id="div_tablero">
                <table id="tablero">
                    ${tableRows}
                </table>
                <button id="reiniciar-button">Reiniciar Juego</button>
            </div>
            
            `;

    document.addEventListener('click', (event) => {

        const reiniciarButton = document.getElementById('reiniciar-button');

        if (reiniciarButton) {
            reiniciarButton.addEventListener('click', () => {
                cuatro.resetGame(state);
            });
        }

        const clickedCell = event.target;

        if (clickedCell.classList.contains('cell') && clickedCell.classList.contains('empty')) {
            if (clickedCell.style.backgroundColor === '' || clickedCell.style.backgroundColor === 'white') {

                const fila = clickedCell.parentElement.rowIndex - 1;
                const columna = clickedCell.cellIndex;

                if (state.cont === 0) {
                    cuatro.manejarClic(state, fila, columna)
                    state.cont = 1;
                } else {
                    cuatro.manejarClic(state, fila, columna)
                    state.cont = 0;
                }
            }
        }
    });

    return divCuatro
}