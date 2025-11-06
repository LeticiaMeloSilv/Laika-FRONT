'use strict'
import { getClientesLogin, iniciarTelaCarregamento, postCliente, mostrarToast } from './exports.js'
let infoClientes

document.addEventListener('DOMContentLoaded', async () => {
    const telaCarregamento = document.createElement('div');
    iniciarTelaCarregamento(telaCarregamento)
    infoClientes = await getClientesLogin()
    if (infoClientes) {
        telaCarregamento.classList.add('hidden')
    }
    else {
        mostrarToast('Ocorreu um erro no processamento, tente novamente mais tarde', 'error')
        setTimeout(function () {
            window.history.back();
        }, 2000);
    }
});

document.getElementById('backA').addEventListener('click', () => {
    document.getElementById('telaInfo1').classList.remove('hidden')
    document.getElementById('telaInfo2').classList.add('hidden')
})
document.getElementById('criarConta1').addEventListener('click', () => {
    {
        const nome = document.getElementById('nome').value
        const sobrenome = document.getElementById('sobrenome').value
        const email = document.getElementById('email').value
        const senha = document.getElementById('senha').value
        const confirmarSenha = document.getElementById('confirmar_senha').value
        const telefone = document.getElementById('telefone').value
        let validate1 = true
        if (nome == '') {
            const errorNome = document.getElementById('errorNome')
            errorNome.classList.remove('hidden')
            validate1 = false
            setTimeout(function () {
                errorNome.classList.add('hidden');
            }, 3000);
        }
        if (email == '') {
            const errorEmail = document.getElementById('errorEmail')
            errorEmail.classList.remove('hidden')
            validate1 = false
            setTimeout(function () {
                errorEmail.classList.add('hidden');
            }, 3000);
        }
        if (senha == '') {
            const errorSenha = document.getElementById('errorSenha')
            errorSenha.classList.remove('hidden')
            validate1 = false
            setTimeout(function () {
                errorSenha.classList.add('hidden');
            }, 3000);
        }
        if (confirmarSenha == '' || confirmarSenha != senha) {
            const errorSenha = document.getElementById('errorSenha')
            errorSenha.classList.remove('hidden')
            validate1 = false
            const errorConfirmarSenha = document.getElementById('errorConfirmarSenha')
            errorConfirmarSenha.classList.remove('hidden')

            setTimeout(function () {
                errorConfirmarSenha.classList.add('hidden');
                errorSenha.classList.add('hidden')
            }, 3000);
        }
        infoClientes.forEach(element => {
            if (element.email == email) {
                const errorEmail = document.getElementById('errorEmail')
                errorEmail.classList.remove('hidden')
                validate1 = false
                setTimeout(function () {
                    errorEmail.classList.add('hidden');
                }, 3000);
                mostrarToast("Já existe um usuário cadastrado com esse e-mail", 'error')
            }
        });
        if (validate1) {
            let nomeCompleto = nome
            if (sobrenome != '') {
                nomeCompleto += " " + sobrenome
            }

            document.getElementById('telaInfo1').classList.add('hidden')
            document.getElementById('telaInfo2').classList.remove('hidden')

            document.getElementById('criarConta2').addEventListener('click', async function () {
                const rua = document.getElementById('rua').value
                const cidade = document.getElementById('cidade').value
                const estado = document.getElementById('estado').value
                const bairro = document.getElementById('bairro').value
                const numero = document.getElementById('numero').value
                let validate2 = true
                if (rua == '') {
                    const errorRua = document.getElementById('errorRua')
                    errorRua.classList.remove('hidden')
                    validate2 = false
                    setTimeout(function () {
                        errorRua.classList.add('hidden');
                    }, 3000);
                }
                if (cidade == '') {
                    const errorCidade = document.getElementById('errorCidade')
                    errorCidade.classList.remove('hidden')
                    validate2 = false
                    setTimeout(function () {
                        errorCidade.classList.add('hidden');
                    }, 3000);
                }
                if (estado == '') {
                    const errorEstado = document.getElementById('errorEstado')
                    errorEstado.classList.remove('hidden')
                    validate2 = false
                    setTimeout(function () {
                        errorEstado.classList.add('hidden');
                    }, 3000);
                }
                if (bairro == '') {
                    const errorBairro = document.getElementById('errorBairro')
                    errorBairro.classList.remove('hidden')
                    validate2 = false
                    setTimeout(function () {
                        errorBairro.classList.add('hidden');
                    }, 3000);
                }
                if (validate2) {
                    const novoClienteJSON = {
                        nome: nomeCompleto,
                        telefone: telefone,
                        email: email,
                        senha: senha,
                        img: null,
                        endereco: {
                            rua: rua,
                            bairro: bairro,
                            cidade: cidade,
                            estado: estado,
                            numero: numero
                        }
                    }
                    const result = await postCliente(novoClienteJSON)
                    if (result) {
                        window.location.href = './login.html'
                    } else {
                        mostrarToast("Ocorreu um erro ao criar a sua conta", 'error')
                    }
                }
            })
        }
    }
})


