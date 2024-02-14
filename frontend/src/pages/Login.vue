<template>
    <div class="container-login">
        <div class="logo">
            <img src="/assets/logo.png" alt="" srcset="">
        </div>
        <Form class="formulario" @submit="onSubmit" :validation-schema="schema">
            <div class="title-form">
                <h2>Login</h2>
            </div>
            <div class="campo">
                <div class="input-field">
                    <label class="active" for="iusername">Usuário: </label>
                    <input id="iusername" type="text" placeholder=" " v-model="username">
                </div>
            </div>
            <div class="campo">
                <div class="input-field">
                    <label class="active" for="ipassword">Senha: </label>
                    <input id="ipassword" type="password" placeholder=" " v-model="password">
                </div>
            </div>
            <button class="login-button" :disabled="isSubmitting" @click="onSubmit">
                <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                Entrar
            </button>
        </Form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field } from 'vee-validate';

import * as Yup from 'yup';
import { useAuthStore } from '../stores';

const username = ref('');
const password = ref('');

const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});
function onSubmit() {
    const authStore = useAuthStore();
    return authStore.login(username.value, password.value)
        .catch(error => true);
}
</script>

<style scoped>
.container-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    column-gap: 10rem;
    background-color: rgb(10, 50, 169);
    height: 100vh;
}

.item {
    flex: 1;
}

.logo>img {
    height: 5rem;
    width: 15rem;
}

.formulario {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    font-family: 'Roboto', sans-serif;
    backdrop-filter: blur(2px);
    height: 30.9rem !important;
    width: 37.15rem !important;
}

.title-form {
    display: flex;
    justify-content: center;
    margin-top: -2rem;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 47px;

    color: #56575A;
}

.login-button {
    display: inline-block;
    padding: 0.5rem 01rem;
    font-size: 1rem;
    width: 16rem;
    height: 3rem;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    border-radius: 2rem;
    border: none;
    background-color: #062fd0;
    color: #ffffff;
    transition: background-color 0.3s ease;
}

.login-button:hover {
    background-color: #FF8000;
}

.campo {
    margin-top: -2rem;
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
}

.esqueci-minha-senha {
    margin-top: -1rem;
    display: flex;
    justify-content: center;
    width: 95%;
}

.esqueci-minha-senha>a {
    display: inline-block;
    color: #333;
    text-decoration: underline;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

@media screen and (max-width: 80rem) {
    .container {
        flex-direction: column;
        align-items: center;
    }

    .logo {
        size: 1rem;
        display: none;
    }

    .formulario {
        margin: 5rem;
        width: 40rem;
    }
}

input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    /* Remove o contorno ao focar */
    transition: border-color 0.3s ease;
    /* Transição suave para a cor da borda */
}

/* Estilo para o input ao focar */
input:focus {
    border-color: #007bff;
    /* Cor da borda ao focar */
}

.input-field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>