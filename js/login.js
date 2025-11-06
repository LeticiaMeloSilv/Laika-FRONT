'use strict'

import { getClientesLogin, iniciarTelaCarregamento, mostrarToast } from "./exports.js"

let allClientes

//TELA DE CARREGAMENTO. AGUARDA A REQUISIÇÃO DO BANCO DE DADOS SER CONCLUÍDA
document.addEventListener('DOMContentLoaded', async () => {
    const telaCarregamento = document.createElement('div');
    iniciarTelaCarregamento(telaCarregamento)
    allClientes = await getClientesLogin()
    if (allClientes) {
        telaCarregamento.classList.add('hidden')
    }
    else {
        mostrarToast('Ocorreu um erro no processamento, tente novamente mais tarde', 'error')
        setTimeout(function () {
            window.history.back();
        }, 2000);
    }
});

let visivel = false
document.getElementById('olho').addEventListener('click', function () {
    if (visivel) {
        document.getElementById('senha').setAttribute('type', 'password')
        document.getElementById('olho').src = 'https://www.svgrepo.com/show/524041/eye-closed.svg'
        visivel = false
    } else {
        document.getElementById('senha').setAttribute('type', 'text')
        document.getElementById('olho').src = 'https://www.svgrepo.com/show/522847/eye.svg'
        visivel = true
    }
})


document.getElementById('logar').addEventListener('click', async function () {
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const errorMessage = document.getElementById('errorMessage')
    let naoLogou = false

    console.log(allClientes)
    allClientes.forEach(client => {

        if (client.email == email && client.senha == senha) {
            localStorage.setItem('idUsuarioLaika', client.id)
            window.location.href = './home.html'
        } else {
            naoLogou = true
        }
    });

    if (naoLogou) {

        errorMessage.classList.remove('hidden')

        setTimeout(function () {
            errorMessage.classList.add('hidden');
        }, 3000);
    }
})