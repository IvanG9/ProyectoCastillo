import {registerUser} from "../../services/users";

export {generarContenidoHTMLRegistro};

function generarContenidoHTMLRegistro() {

    const divRegister = document.createElement('div');

    divRegister.innerHTML =
        `
        <div class="col d-flex justify-content-center">
            <div class="card mt-5 bg-light">
                <div class="card-header">
                    <h3 class="text-center">Registro</h3>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="email">Correo electrónico:</label>
                            <input type="email" class="form-control" id="email" placeholder="Ingrese su correo electrónico">
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña:</label>
                            <input type="password" class="form-control" id="password" placeholder="Ingrese su contraseña">
                        </div>
                        <div class="form-group">
                            <label for="confirm-password">Confirmar contraseña:</label>
                            <input type="password" class="form-control" id="confirm-password" placeholder="Confirme su contraseña">
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary" id="submit">Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    divRegister.querySelector('#submit').addEventListener('click', async (event) => {
        event.preventDefault();
        const email = divRegister.querySelector('#email').value;
        const password = divRegister.querySelector('#password').value;
        const dataLogin = registerUser(email, password);
        console.log(dataLogin);
    });

    return divRegister;

}