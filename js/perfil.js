import { getCliente, getClientes, deleteCliente, putCliente, getAnimal, deleteAnimal, getAnimais, postAnimal, putAnimal, getTipos, getRaca ,getPortes,postarNovoCliente} from './exports.js'

'use strict'

const idPerfil = localStorage.getItem('idUsuario')
if (!idPerfil) {
  window.location.href = '../index.html'
}
const editar = document.getElementById('btn_confirmar')

const perfilAntigo = await getCliente(idPerfil)

const nome = document.getElementById('nomeUsuario')
nome.value = perfilAntigo.nome
const email = document.getElementById('emailUsuario')
email.value = perfilAntigo.email
const telefone = document.getElementById('telefoneUsuario')
//   .substring(11, 19)
telefone.value = perfilAntigo.telefone
const senha = document.getElementById('senhaUsuario')
//   .substring(0, 10)  
senha.value = perfilAntigo.senha
const endereco = document.getElementById('cep')
endereco.value = '06335040'
const rua = document.getElementById('rua')
rua.value=perfilAntigo.endereco.rua
const bairro = document.getElementById('bairro')
bairro.value=perfilAntigo.endereco.bairro
const cidade = document.getElementById('cidade')
cidade.value=perfilAntigo.endereco.cidade
const estado = document.getElementById('estado')
estado.value=perfilAntigo.endereco.estado
const numero = document.getElementById('numeroDaCasa')
numero.value=perfilAntigo.endereco.numero
// const fotoPerfil = document.getElementById('fotoPerfil')
// fotoPerfil.value = perfilAntigo.img
// preencherCampos()

const btn_excluir = document.getElementById('btn_excluir')
btn_excluir.addEventListener('click', async function () {
  var confirmado = confirm(`Deseja deletar sua conta?`);
  if (confirmado) {
    var certezaDeConfirmacao = confirm(`Tem certeza de que deseja deletar sua conta? essa alteração é irreversivel`);
    if (certezaDeConfirmacao) {
      deleteCliente(idPerfil)
      window.location.reload();
      alert('Conta deletada com sucesso');
    } else {
      alert('Operação cancelada');
    }
  } else {
    alert('Operação cancelada');
  }
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

const containerEditando = document.getElementById('edicao')
const containerInformacoes = document.getElementById('containerCliente')
let salvar=false
editar.addEventListener('click', editarPerfil)
function editarPerfil(){
    editar.textContent='Salvar'
    nome.disabled = false;
    email.disabled = false;
    telefone.disabled = false;
    senha.disabled = false;
    endereco.disabled=false;
    rua.disabled = false;
    cidade.disabled = false;
    estado.disabled = false;
    bairro.disabled = false;
    numero.disabled = false;
  
     salvar=true
    editar.removeEventListener('click', editarPerfil)
    editar.addEventListener('click', () => enviarParaBack(idPerfil))
}

  
  async function enviarParaBack(idPerfil) {
// const cep=await pegarCep(endereco)
    const nomeAtualizado = document.getElementById('nomeUsuario').value
    const emailAtualizado = document.getElementById('emailUsuario').value
    const telefoneAtualizado = document.getElementById('telefoneUsuario').value
    const senhaAtualizado = document.getElementById('senhaUsuario').value
    const ruaAtualizado = document.getElementById('rua').value
    const bairroAtualizado = document.getElementById('bairro').value
    const cidadeAtualizado = document.getElementById('cidade').value
    const estadoAtualizado = document.getElementById('estado').value
    // rua.value = cep.logradouro
    // bairro.value = cep.bairro
    // cidade.value = cep.localidade
    // estado.value = cep.uf
    const numeroAtualizado = document.getElementById('numeroDaCasa').value
    // const fotoPerfil = document.getElementById('fotoPerfil').value
    // fotoPerfil = 'https://osegredo.com.br/wp-content/uploads/2023/09/1-81.jpg.webp'
    const novosDados = {
      img:perfilAntigo.img,
      nome: nomeAtualizado,
      telefone: telefoneAtualizado,
      email: emailAtualizado,
      senha: senhaAtualizado,
      // img: fotoPerfil,
      endereco: {
        rua:ruaAtualizado,
        bairro:bairroAtualizado,
        cidade:cidadeAtualizado,
        estado:estadoAtualizado,
        numero:numeroAtualizado,

      }
    }
    if (novosDados) {
      let status = await putCliente(novosDados, idPerfil)
      console.log(novosDados);
            
      if (status) {
        alert('Dados Atualizados com sucesso')
        // window.location.href = './perfil.html'
      }
      else {
        alert('Não foi possivel atualizar seus dados')
        // window.location.href = './perfil.html'
      }
    }
    nome.disabled = false;
    email.disabled = false;
    telefone.disabled = false;
    senha.disabled = false;
    endereco.disabled = false;
    rua.disabled = false;
    cidade.disabled = false;
    estado.disabled = false;
    bairro.disabled = false;
    numero.disabled = false;
    salvar=false
  }
  async function preencherContainer() {
    const info = await getCliente(idPerfil)
    console.log(info);
    document.getElementById('nomeUser').textContent = info.nome
}
preencherContainer()
// }



// function fecharcampoEdicao() {
//     window.location.href = './perfil.html'
// }
// const fecharCampo = document.getElementById('fecharcampoEdicao')
// fecharCampo.addEventListener('click', fecharcampoEdicao)
