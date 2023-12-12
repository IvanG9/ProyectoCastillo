import {getProfile, updateProfile} from '../../services/users';

export {profileForm};

function profileForm() {

    const divProfile = document.createElement('div');

    getProfile().then((dataProfile) => {
        dataProfile = dataProfile[0];
        //console.log(dataProfile);

        divProfile.innerHTML = `
    
        <div class="row">
            <div class="col d-flex justify-content-center">
                <div class="card mt-5 bg-light"> <!-- Agregamos la clase "bg-light" -->
                    <div class="card-header">
                        <h3 class="text-center">Perfil</h3>
                    </div>
                    <div class="card-body">
                        <form action="action_page.php" id="formProfile">
                            <div class="form-group">
                                <p id="errors"></p>
                            </div>
                            <div class="form-group">
                                <label for="email"><b>Email</b></label>
                                <input
                                        id="signupemail"
                                        type="text"
                                        placeholder="Enter Email"
                                        name="email"
                                        required
                                        readonly
                                        value="${localStorage.getItem('email')}"
                                />
                            </div>
                            <div class="form-group">
                                <label for="psw"><b>Password</b></label>
                                <input
                                        type="password"
                                        id="signuppassword"
                                        placeholder="Enter Password"
                                        name="psw"
                                        required
                                />
                            </div>
                            <div class="form-group">
                                <label for="psw-repeat"><b>Repeat Password</b></label>
                                <input
                                        type="password"
                                        placeholder="Repeat Password"
                                        name="psw-repeat"
                                        required
                                />
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn btn-primary" id="chgpass">Change Password</button>
                            </div>
                            <div class="form-group">
                                <label for="username"><b>Username</b></label>
                                <input
                                        type="text"
                                        placeholder="user name"
                                        name="username"
                                        id="username"
                                        value="${dataProfile.username}"
                                />
                            </div>
                            <div class="form-group">
                                <label for="fullname"><b>Full Name</b></label>
                                <input
                                        type="text"
                                        placeholder="fullname"
                                        name="full_name"
                                        value="${dataProfile.full_name}"
                                />
                            </div>
                            <div class="form-group">
                                <label for="web"><b>Web Site</b></label>
                                <input
                                        type="text"
                                        placeholder="web"
                                        name="website"
                                        value="${dataProfile.website}"
                                />
                            </div>
                            <div class="form-group">
                                <label for="avatar"><b>Avatar</b></label>
                            </div>
                            <div class="text-center">
        
                                <img class="avatar_profile" style="max-width: 200px" id="avatar_prev"
                                     src="${dataProfile.avatar_blob ? dataProfile.avatar_blob : ''}"/>
                            </div>
                            <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                            />
                            <div class="text-center">
                                <button type="button" class="btn btn-primary" id="update">Update Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        `;

        divProfile.querySelector('#update').addEventListener('click', async () => {
            const formData = new FormData(divProfile.querySelector('#formProfile'));
            const {
                username, full_name, website, avatar,
            } = Object.fromEntries(formData);
            console.log({
                username, full_name, website, avatar,
            });

            const dataUpdate = await updateProfile({
                username, full_name, website, avatar,
            });

        });

        function encodeImageFileAsURL(element) {
            const file = element.files[0];
            if (file) {
                divProfile.querySelector('#avatar_prev').src = URL.createObjectURL(file);
            }
        }

        divProfile.querySelector('#avatar').addEventListener('change', function () {
            encodeImageFileAsURL(this);
        });

    });

    return divProfile;
}
