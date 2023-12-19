import {create_game, list_my_games, search_game} from "../../services/cuatrohttp.js";
import {getProfile} from "../../services/users";

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
             <br>
             <div class="text-center">
             <button type="submit" class="btn btn-primary" id="submit_listar">Listar Partidas</button>
             </div>
             <div class="text-center" id="divGames">
             </div>
            
        `;

    divHome.querySelector('#submit_crear').addEventListener('click', async () => {

        await create_game();

    });

    divHome.querySelector('#submit_buscar').addEventListener('click', async () => {

        await search_game();

    });

    divHome.querySelector('#submit_listar').addEventListener('click', async () => {
        try {
            const dataGames = await list_my_games();

            const divGames = document.getElementById('divGames');
            divGames.innerHTML = ``;

            dataGames.forEach(({id, game_state}) => {

                const divGame = document.createElement('div');
                divGame.classList.add('game-card');
                divGame.innerHTML =
                    `
                     <h1>Game ${id}</h1>     
                     <div class="text-center">${game_state.nombreJugadores[1]} VS ${game_state.nombreJugadores[2]}</div> 
                     <button class="play-button">Jugar</button>
                    `;
                divGames.appendChild(divGame);

                const playButton = divGame.querySelector('.play-button');
                playButton.addEventListener('click', () => {
                    window.location.assign(`#/4enRaya?${id}`);
                });

            });
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    });


    return divHome;
}