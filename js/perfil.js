import { getClienteResumo, idUsuario, iniciarTelaCarregamento, putCliente, verificarUsuarioExistente, mostrarToast } from './exports.js'

'use strict'

if (!idUsuario) {
  window.location.href = './login.html'
} else {
  if (!verificarUsuarioExistente(idUsuario)) {
    window.location.href = './login.html'
  }
}
let perfilAntigo
document.addEventListener('DOMContentLoaded', async () => {
  const telaCarregamento = document.createElement('div');
  iniciarTelaCarregamento(telaCarregamento)
  perfilAntigo = await getClienteResumo(idUsuario)
  if (perfilAntigo) {
    telaCarregamento.classList.add('hidden')
  }
  else {
    mostrarToast('Ocorreu um erro no processamento, tente novamente mais tarde', 'error')
    setTimeout(function () {
      window.history.back();
    }, 2000);
  }
  executarSite()
});

async function executarSite() {
  document.getElementById('nomeUser').textContent = perfilAntigo.nome

  const editar = document.getElementById('btn_confirmar')

  const nome = document.getElementById('nomeUsuario')
  nome.value = perfilAntigo.nome

  const email = document.getElementById('emailUsuario')
  email.value = perfilAntigo.email

  const telefone = document.getElementById('telefoneUsuario')
  telefone.value = perfilAntigo.telefone

  const senha = document.getElementById('senhaUsuario')
  senha.value = perfilAntigo.senha

  const rua = document.getElementById('rua')
  rua.value = perfilAntigo.endereco.rua

  const bairro = document.getElementById('bairro')
  bairro.value = perfilAntigo.endereco.bairro

  const cidade = document.getElementById('cidade')
  cidade.value = perfilAntigo.endereco.cidade

  const estado = document.getElementById('estado')
  estado.value = perfilAntigo.endereco.estado

  const numero = document.getElementById('numeroDaCasa')
  if (perfilAntigo.endereco.numero) {
    numero.value = perfilAntigo.endereco.numero
  }

  document.getElementById('btn_logout').addEventListener('click', async function () {
    localStorage.removeItem('idUsuarioLaika')
    window.location.reload();
  })

  async function pegarCep(endereco) {
    const url = `https://viacep.com.br/ws/${endereco.value}/json/`
    const response = await fetch(url)
    const cepInfo = await response.json()

    return cepInfo
  }

  async function preencherCampos() {
    const rua = document.getElementById('rua')
    const bairro = document.getElementById('bairro')
    const cidade = document.getElementById('cidade')
    const estado = document.getElementById('estado')
    const cepInfo = await pegarCep(endereco)
    rua.value = cepInfo.logradouro
    bairro.value = cepInfo.bairro
    cidade.value = cepInfo.localidade
    estado.value = cepInfo.uf
  }

  editar.addEventListener('click', editarPerfil)
  function editarPerfil() {
    editar.textContent = 'Salvar'
    alternarBlockInput(false)
    editar.removeEventListener('click', editarPerfil)
    editar.addEventListener('click', enviarParaBack)
  }
  async function enviarParaBack() {
    const novosDados = {
      img: perfilAntigo.img,
      nome: document.getElementById('nomeUsuario').value,
      telefone: document.getElementById('telefoneUsuario').value,
      email: document.getElementById('emailUsuario').value,
      senha: document.getElementById('senhaUsuario').value,
      endereco: {
        rua: document.getElementById('rua').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        numero: document.getElementById('numeroDaCasa').value
      }
    }
    if (novosDados) {
      // if()
      if (perfilAntigo.nome == novosDados.nome &&
        perfilAntigo.email == novosDados.email &&
        perfilAntigo.senha == novosDados.senha &&
        perfilAntigo.img == novosDados.img &&
        perfilAntigo.telefone == novosDados.telefone &&
        perfilAntigo.endereco.estado == novosDados.endereco.estado &&
        perfilAntigo.endereco.cidade == novosDados.endereco.cidade &&
        perfilAntigo.endereco.bairro == novosDados.endereco.bairro &&
        perfilAntigo.endereco.rua == novosDados.endereco.rua &&
        perfilAntigo.endereco.numero == novosDados.endereco.numero) {
        mostrarToast("Erro: Nenhum dado foi alterado", 'error')
      } else {
        alternarBlockInput(true)
        let status = await putCliente(novosDados, idUsuario)
        if (status) {
          window.location.reload()
        }
        else {
          mostrarToast('Ocorreu um erro', 'error')
        }
      }
    }
  }

  function alternarBlockInput(valor) {
    nome.disabled = valor;
    email.disabled = valor;
    telefone.disabled = valor;
    senha.disabled = valor;
    rua.disabled = valor;
    cidade.disabled = valor;
    estado.disabled = valor;
    bairro.disabled = valor;
    numero.disabled = valor;
  }
}

