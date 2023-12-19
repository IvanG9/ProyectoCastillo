import {generarContenidoHTMLLogin} from '../components/views/login.js';
import {generarContenidoHTMLRegistro} from '../components/views/registro.js';
import {generarContenidoHTML4EnRaya} from "../components/views/cuatroView.js";
import {generarContenidoHTMLHome} from "../components/views/home";
import {profileForm} from "../components/views/profile.js";
import {get_game, list_my_games} from "../services/cuatrohttp";
import {getProfile} from "../services/users";

export {router};

const router = async (ruta) => {

    let contenedor = document.querySelector("#main");
    let id = ruta.split("?")[1];
    ruta = ruta.split("?")[0];
    switch (ruta) {
        case '#/':
            contenedor.innerHTML = '';
            contenedor.append(generarContenidoHTMLHome());
            break;
        case  '#/top':
            contenedor.innerHTML = '';
            break
        case '#/login':
            contenedor.innerHTML = '';
            contenedor.append(generarContenidoHTMLLogin());
            break;
        case '#/register':
            contenedor.innerHTML = '';
            contenedor.append(generarContenidoHTMLRegistro());
            break;
        case '#/4enRaya':
            contenedor.innerHTML = '';
            contenedor.append(generarContenidoHTML4EnRaya(id));
            break;
        case '#/profile':
            contenedor.innerHTML = '';
            contenedor.append(profileForm());
            break;
        default:
            window.location.hash = '#/';
    }
};

