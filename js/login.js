'use strict'

const btnLogar = document.getElementById('logar')
const errormessage = document.getElementById('errorMessage')
const olho = document.getElementById('olho')

let visivel = false

olho.addEventListener('click', function(){

    if(visivel){
        document.getElementById('senha').setAttribute('type', 'password')
        olho.src = 'https://www.svgrepo.com/show/524041/eye-closed.svg'
        visivel = false
    } else {
        document.getElementById('senha').setAttribute('type', 'text')
        olho.src = 'https://www.svgrepo.com/show/522847/eye.svg'
        visivel = true
    }
})

btnLogar.addEventListener('click', async function(){

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    console.log(email);
    console.log(senha);
    

    const allClients = await getAllClients()
    const allFuncionarios = await getAllFuncionarios()

    console.log(allClients);

    allClients.forEach(client => {

        console.log(client);

        if(client.email == email && client.senha == senha){
            localStorage.setItem('idUsuario', client.id)
                    window.location.href = './main.html'

        } else {
            allFuncionarios.forEach(funcionario => {
                
                if(funcionario.email == email && funcionario.senha == senha){


                    if(funcionario.cargo != "Veterinário" && funcionario.cargo != "ADM" ){
                        window.location.href = "../administração (funcionário)/administração_funcionário.html"
                    } else if (funcionario.cargo == "Veterinário"){
                        alert('veterinario')
                    } else if (funcionario.cargo == "ADM") {
                        alert('ADM')
                    }
                } else {
                    errormessage.classList.remove('hidden')

                    setTimeout(function() {
                        errormessage.classList.add('hidden');
                    }, 3000);
                }
            });
        }
    });
})

async function getAllClients() {

    const endpoint = 'https://laika-back.onrender.com/v1/laika/clientes';
    const clientsApi = await fetch(endpoint);
    const listClients = await clientsApi.json();
    return listClients.dados;
}

async function getAllFuncionarios() {

    const endpoint = 'https://laika-back.onrender.com/v1/laika/funcionarios';
    const funcionariosApi = await fetch(endpoint);
    const listFuncionarios = await funcionariosApi.json();
    return listFuncionarios.dados;
}