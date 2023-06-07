<template>
    <div class="d-flex bg-auth border-top border-top-2 border-primary h-100">
        <div class="container" style="margin-top: 6rem;">
            <div class="row justify-content-center">
                <div class="col-12 col-md-5 col-xl-4 my-5">

                    <h1 class="titulo">FINAL<div
                            style="width: 7px; height: 7px; background-color: black; display: inline-block;"></div>
                    </h1>
                    <!-- Heading -->
                    <h2 class="display-4 text-center mb-3">
                        Iniciar sesión
                    </h2>

                    <!-- Subheading -->
                    <p class="text-muted text-center mb-5">
                        Panel administrador
                    </p>

                    <!-- Form -->
                    <form>

                        <div v-if="msg_error" class="alert alert-danger" role="alert">
                            {{ msg_error }}
                        </div>
                        <!-- Email address -->
                        <div class="form-group">

                            <!-- Label -->
                            <label class="form-label">
                                Correo electrónico
                            </label>

                            <!-- Input -->
                            <input v-model="email" type="email" class="form-control" placeholder="nombre@direccion.com">

                        </div>

                        <!-- Password -->
                        <div class="form-group">
                            <div class="row">
                                <div class="col">

                                    <!-- Label -->
                                    <label class="form-label">
                                        Contraseña
                                    </label>

                                </div>
                            </div> <!-- / .row -->

                            <!-- Input group -->
                            <div class="input-group">

                                <!-- Input -->
                                <input v-model="password" class="form-control" type="password"
                                    placeholder="Introduce la contraseña">

                            </div>
                        </div>

                        <!-- Submit -->
                        <button @click="validar()" class="btn btn-lg w-100 btn-primary mb-3" type="button">
                            Acceder
                        </button>

                    </form>

                </div>
            </div> <!-- / .row -->
        </div>
    </div>
</template>

<style scoped>
.titulo {
    width: 100%;
    display: inline-block;
    margin-bottom: 2rem;
    font-family: 'Proxima Nova' !important;
    font-weight: 400;
    color: black;
    text-align: center;
    letter-spacing: 3px;
    font-size: 4rem;
    line-height: 4rem;
    cursor: pointer;
}
</style>
  
<script>

import axios from 'axios';

export default {
    name: 'LoginApp',
    data() {
        return {
            email: '',
            password: '',
            msg_error: ''
        }
    },
    methods: {
        validar() {
            if (!this.email) {
                this.msg_error = "Introduzca un correo electrónico.";
            } else if (!this.password) {
                this.msg_error = "Introduzca la contraseña."
            } else {
                this.msg_error = "";
                this.login();
            }
        },
        login() {
            let data = {
                email: this.email,
                password: this.password
            }

            axios.post(this.$url + '/login_usuario', data).then(result => {
                if (result.data.data == undefined) {
                    this.msg_error = result.data.message;
                }

                if (result.data.token) {
                    this.$store.dispatch('saveToken', result.data.token);

                    this.$router.push({ name: 'inicio' });
                }
            }).catch(error);
        }
    }
}

</script>
  