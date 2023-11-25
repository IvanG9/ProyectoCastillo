export { generarContenidoHTMLLogin };

    function generarContenidoHTMLLogin() {
    return `
        <div class="container">
            <h1>Login</h1>
                <div class="row">
                    <div class="col d-flex justify-content-center">
                        <div class="card mt-5 bg-light"> <!-- Agregamos la clase "bg-light" -->
                            <div class="card-header">
                                <h3 class="text-center">Inicio de sesión</h3>
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
                                    <div class="text-center">
                                        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    `;
}