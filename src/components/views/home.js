import {create_game} from "../../services/cuatrohttp.js";

export {generarContenidoHTMLHome};

function generarContenidoHTMLHome() {

    const divHome = document.createElement('div');

    divHome.innerHTML =
        `    
             <h1>Home</h1>
             <div class="text-center">
             <button type="submit" class="btn btn-primary" id="submit_crear">Crear Partida</button>
             </div>
             <br>
             <div class="text-center">
             <button type="submit" class="btn btn-primary" id="submit_buscar">Buscar Partida</button>
             </div>
            
        `;

    divHome.querySelector('#submit_crear').addEventListener('click', async () => {

        await create_game();

    });

    return divHome;
}