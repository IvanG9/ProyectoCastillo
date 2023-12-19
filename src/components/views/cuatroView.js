import * as cuatro from '../functions/cuatro.js';
import {get_game} from "../../services/cuatrohttp";
import {getProfile} from "../../services/users";
import {subscribeToGameState} from "../../services/http";

export {generarContenidoHTML4EnRaya};

function generarContenidoHTML4EnRaya(id) {

    const divCuatro = document.createElement('div');

    get_game(id).then((data) => {
        data = data[0];
        const state = data.game_state;

        const tableRows = Array.from({length: state.filas}, (_, rowIndex) => {
            const rowCells = Array.from({length: state.columnas}, (_, columnIndex) => {

                const cellValue = state.tablero[rowIndex][columnIndex];

                // Determinar la clase CSS en función del valor de la celda
                let cellClass = 'cell';
                if (cellValue === 'red') {
                    cellClass += ' red';
                } else if (cellValue === 'yellow') {
                    cellClass += ' yellow';
                } else if (cellValue === 'empty') {
                    cellClass += ' empty';
                }

                // Crear la celda con la clase determinada
                return `<td class="${cellClass}"></td>`;

            }).join("");

            return `<tr>${rowCells}</tr>`;
        }).join("");

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
                        cuatro.manejarClic(state, fila, columna,id);
                        state.cont = 1;
                    } else {
                        cuatro.manejarClic(state, fila, columna,id);
                        state.cont = 0;
                    }
                }
            }
        });

    });


    return divCuatro;
}