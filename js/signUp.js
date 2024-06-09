'use strict'
import { getCliente, getClientes, deleteCliente, putCliente,postCliente, getAnimal, deleteAnimal, getAnimais, postAnimal, putAnimal, getTipos, getRaca ,getPortes,getAllAnimals,getAllServicos,animalDataById} from './exports.js'

const btn_criarConta = document.getElementById('btn_criarConta')
const telaInfo1 = document.getElementById('telaInfo1')
const criarConta2 = document.getElementById('criarConta2')
const telaInfo2 = document.getElementById('telaInfo2')

btn_criarConta.addEventListener('click',getInfo1)
function getInfo1(){

    console.log('iiii');

    const nome = document.getElementById('nome').value
    const sobrenome = document.getElementById('sobrenome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const confirmarSenha = document.getElementById('confirmar_senha').value
    const telefone = document.getElementById('telefone').value

    const telefoneNumero = parseInt(telefone)

    console.log(nome);

    if(nome == ''){
        const errorNome = document.getElementById('errorNome')
        errorNome.classList.remove('hidden')

        setTimeout(function() {
            errorNome.classList.add('hidden');
        }, 3000);
    } else if(email == ''){
        const errorEmail = document.getElementById('errorEmail')
        errorEmail.classList.remove('hidden')

        setTimeout(function() {
            errorEmail.classList.add('hidden');
        }, 3000);
    } else if(senha == ''){
        const errorSenha = document.getElementById('errorSenha')
        errorSenha.classList.remove('hidden')

        setTimeout(function() {
            errorSenha.classList.add('hidden');
        }, 3000);
    } else if (confirmarSenha == '' || confirmarSenha != senha){

        console.log(confirmarSenha);
        console.log(senha);
        const errorConfirmarSenha = document.getElementById('errorConfirmarSenha')
        errorConfirmarSenha.classList.remove('hidden')

        setTimeout(function() {
            errorConfirmarSenha.classList.add('hidden');
        }, 3000);
    } else if (telefoneNumero === ''){
        const errorTelefone = document.getElementById('errorTelefone')
        errorTelefone.classList.remove('hidden')

        setTimeout(function() {
            errorTelefone.classList.add('hidden');
        }, 3000);
    } else {

        const nomeCompleto = `${nome} ${sobrenome}`

        console.log(nomeCompleto);
        telaInfo1.classList.add('hidden')
        telaInfo2.classList.remove('hidden')

        criarConta2.addEventListener('click', async function(){

            const rua = document.getElementById('rua').value
            const cidade = document.getElementById('cidade').value
            const estado = document.getElementById('estado').value
            const bairro = document.getElementById('bairro').value

            if(rua == ''){
                const errorRua = document.getElementById('errorRua')
                errorRua.classList.remove('hidden')
        
                setTimeout(function() {
                    errorRua.classList.add('hidden');
                }, 3000);
            } else if(cidade == ''){
                const errorCidade = document.getElementById('errorCidade')
                errorCidade.classList.remove('hidden')
        
                setTimeout(function() {
                    errorCidade.classList.add('hidden');
                }, 3000);
            } else if(estado == ''){
                const errorEstado = document.getElementById('errorEstado')
                errorEstado.classList.remove('hidden')
        
                setTimeout(function() {
                    errorEstado.classList.add('hidden');
                }, 3000);
            } else if (bairro == ''){
        
                const errorBairro = document.getElementById('errorBairro')
                errorBairro.classList.remove('hidden')
        
                setTimeout(function() {
                    errorBairro.classList.add('hidden');
                }, 3000);
            } else {

                const novoClienteJSON = {
                    nome: nomeCompleto,
                    telefone: telefone,
                    email: email,
                    senha: senha,
                    img: '../img/perfilSemFoto.jpg',
                    endereco: {
                        rua: rua,
                        bairro: bairro,
                        cidade: cidade,
                        estado: estado
                        // complemento: ""
                    }
                }

                console.log(novoClienteJSON);

                const retornoApi= await postCliente(novoClienteJSON)
            if (retornoApi) {
                alert('Conta criada com sucesso')
                window.location.href='./login.html'
            } else {
                alert('Não foi possivel criar conta, verifique as informações')
            }
            }

        })


    }

}
