export {create_game};

import {createData, supaRequest} from "./http";
import {startGameUser} from "../components/functions/cuatro";
import * as cuatro from "../components/functions/cuatro";

async function create_game() {

    const access_token = localStorage.getItem('access_token');
    const uid = localStorage.getItem('uid');
    const username = localStorage.getItem('username');
    const state = startGameUser(cuatro.gameState(), username);

    const data = {
        game_state: state,
        player_1: uid
    };

    const responseUpdate = await createData("game_state", access_token, data);

}
