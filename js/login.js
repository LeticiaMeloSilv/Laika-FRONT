'use strict'

import {getProdutos, getProduto,getClientes,getCliente,postCliente, putCliente,deleteCliente,getFuncionarios,getFuncionarioId, getCargos,getAnimais,getAnimal, postAnimal,putAnimal,deleteAnimal,getAgendamento,getAgendamentos,postAgendamento,putAgendamento,deleteAgendamento,getTipos,getRaca,getPortes,getCategorias,getServicos} from './exports.js'

console.log('To na tala certa');
const btnLogar = document.getElementById('logar')
const errormessage = document.getElementById('errorMessage')
const olho = document.getElementById('olho')

let visivel = false

olho.addEventListener('click', function () {

    if (visivel) {
        document.getElementById('senha').setAttribute('type', 'password')
        olho.src = 'https://www.svgrepo.com/show/524041/eye-closed.svg'
        visivel = false
    } else {
        document.getElementById('senha').setAttribute('type', 'text')
        olho.src = 'https://www.svgrepo.com/show/522847/eye.svg'
        visivel = true
    }
})

btnLogar.addEventListener('click', async function () {

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value


    const allClients = await getClientes()
    const allFuncionarios = await getFuncionarios()
    let usuarioNãoAchado = false
    if (!usuarioNãoAchado) {

        allClients.forEach(client => {
            console.log('cliente');
            if (client.email == email && client.senha == senha) {
                console.log(client);
                localStorage.setItem('idUsuario', client.id)
                window.location.href = './main.html'
            }
            usuarioNãoAchado = true
        });

        allFuncionarios.forEach(funcionario => {
            if (funcionario.email == email && funcionario.senha == senha) {

                if (funcionario.cargo != "Veterinário" && funcionario.cargo != "ADM") {
                    window.location.href = "../administração (funcionário)/administração_funcionário.html"
                } else if (funcionario.cargo == "Veterinário") {
                    alert('veterinario')
                } else if (funcionario.cargo == "ADM") {
                    alert('ADM')
                }
            } else {
                errormessage.classList.remove('hidden')
                setTimeout(function () {
                    errormessage.classList.add('hidden');
                    }, 3000);
                usuarioNãoAchado = true
            }
        });
    }

    if (usuarioNãoAchado) {
        alert('usuario não encontrado')
    } else {
        alert('Perdão, deve haver algum erro, contate o administrados do site')
    }

})

