import {getProfile} from "./users";
import {createData, getData, updateData} from "./http";
import * as cuatro from "../components/functions/cuatro";

export {create_game, search_game, list_my_games};

async function create_game() {
    try {
        const access_token = localStorage.getItem('access_token');
        const uid = localStorage.getItem('uid');
        const dataProfile = await getProfile();
        const username = dataProfile[0]?.username;

        if (!username) {
            console.error("No se pudo obtener el nombre de usuario del perfil.");
            return;
        }

        const state = cuatro.startGameUser(cuatro.gameState(), username);
        const data = {
            game_state: state,
            player_1: uid
        };

        const responseUpdate = await createData("game_state", access_token, data);

        console.log("Juego creado correctamente:", responseUpdate);
    } catch (error) {
        console.error("Error durante la creación del juego:", error);
    }
}

async function search_game() {
    try {
        const access_token = localStorage.getItem('access_token');
        const uid = localStorage.getItem('uid');

        const data = await getData(`game_state?select=*&player_2=is.null&player_1=neq.${uid}`, access_token);

        if (data.length > 0) {
            const game_state = data[0];
            const state = game_state.game_state;
            const gameId = game_state.id;

            await update_game_player(gameId, uid, state);
            console.log(game_state);
        } else {
            console.log("No se encontró un juego válido.");
        }

    } catch (error) {
        console.error("Error durante la búsqueda y actualización del juego:", error);
    }
}

async function update_game_player(gameId, playerUid, state) {

    const access_token = localStorage.getItem('access_token');

    try {
        const dataProfile = await getProfile();
        const profile = dataProfile[0];

        if (profile) {
            state.nombreJugadores[2] = profile.username;
            const data = {
                player_2: playerUid,
                game_state: state
            }

            await updateData(`game_state?id=eq.${gameId}`, access_token, data);
        } else {
            console.error("No se pudo obtener el perfil del jugador.");
        }
    } catch (error) {
        console.error("Error al obtener el perfil del jugador:", error);
    }

}

async function updateGame(gameId, state) {
    try {
        const access_token = localStorage.getItem('access_token');
        await updateData(`game_state?id=eq.${gameId}`, access_token, {game_state: state});
        console.log(`Juego con ID ${gameId} actualizado correctamente.`);
    } catch (error) {
        console.error(`Error durante la actualización del juego con ID ${gameId}:`, error);
    }
}

async function list_my_games() {

    try {
        const access_token = localStorage.getItem('access_token');
        const uid = localStorage.getItem('uid');
        const data = await getData(`game_state?select=*&or=(player_1.eq.${uid},player_2.eq.${uid})`, access_token);
        console.log("Juegos del usuario:", data);
        return data;
    } catch (error) {
        console.error("Error al obtener juegos del usuario:", error);
    }

}