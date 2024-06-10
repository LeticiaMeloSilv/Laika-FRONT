import {getProdutos, getProduto,getClientes,getCliente,postCliente, putCliente,deleteCliente,getFuncionarios,getFuncionarioId, getCargos,getAnimais,getAnimal, postAnimal,putAnimal,deleteAnimal,getAgendamento,getAgendamentos,postAgendamento,putAgendamento,deleteAgendamento,getTipos,getRaca,getPortes,getCategorias,getServicos} from './exports.js'

'use strict'

//o de cadastrar ta tinindo(falta só arrumar o bglh de porte, raca e tipo), o de aparecer tds os pets precisa de uma alteração no back pra funcionar tinindo, falta o de editar

const idPerfil = localStorage.getItem('idUsuario')
if (!idPerfil) {
    window.location.href = '../index.html'
}


const btn_cadastrar = document.getElementById('btn_cadastrarPet')
const telaCriar = document.getElementById('criarPet')
const telaNormal = document.getElementById('telaNormal')
const telaEditar = document.getElementById('editarPet')


btn_cadastrar.addEventListener('click', () => {
    telaCriar.classList.remove('hidden')
    telaNormal.classList.add('hidden');
}
)
const criar=document.getElementById('btn_mandarInfo')
criar.addEventListener('click', cadastrarPet)


document.addEventListener('DOMContentLoaded', async (event) => {
    const categoriaSelect = document.getElementById('novoTipo');
    const data=await getTipos()
    data.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nome;
        categoriaSelect.appendChild(option);
});

document.getElementById('novoTipo').addEventListener('change', async function() {
const categoriaId = this.value;
const subcategoriaSelect = document.getElementById('novaRaca');
subcategoriaSelect.innerHTML = '<option value=""></option>';

if (categoriaId) {
        const data=await getRaca(categoriaId)
            data.forEach(subcategoria => {
                const option = document.createElement('option');
                option.value = subcategoria.id;
                option.textContent = subcategoria.nome;
                subcategoriaSelect.appendChild(option);
            });
}
});
});

document.addEventListener('DOMContentLoaded', async (event) => {
    const porteSelect = document.getElementById('novoPorte');
    const data=await getPortes()
    data.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nome;
        porteSelect.appendChild(option);
});
});

async function cadastrarPet() {

    let nome = document.getElementById('novoNome').value
    let porte = document.getElementById('novoPorte').value
    let peso = document.getElementById('novoPeso').value
    let dataNascimento = document.getElementById('novaDataNascimento').value
    let raca = document.getElementById('novaRaca').value
const img=document.getElementById('novaFotoPet').value

if (nome == '' || porte == '' || peso == '' || dataNascimento == '' || raca == ''|| img==''||
nome == null || porte == null || peso == '' || dataNascimento == null || raca == null|| img==null||
nome == undefined || porte == undefined || peso == undefined || dataNascimento == undefined || raca == undefined|| img==undefined) {
        alert('Preencha todos os campos')
    }
    else {
        const animal = {
            nome: nome,
            nascimento: dataNascimento,
            peso: peso,
            img: img,
            dono_id: idPerfil,
            porte_id: Number(porte),
            raca_id: Number(raca)
        }

        try {
            const retornoInsert= await postAnimal(animal)
            if (retornoInsert) {
                alert('Pet Cadastrado com sucesso')
            telaCriar.classList.add('hidden');
            telaNormal.classList.remove('hidden')
            } else {
                alert('Não foi possivel cadastrar novo pet, verifique as informações')
            }
        }
        catch (error) {
            console.error(error)
        }
    }
}

const today = new Date();
const diaAtual = String(today.getDate()).padStart(2, '0');
const mesAtual = String(today.getMonth() + 1).padStart(2, '0');
const anoAtual = today.getFullYear();

function criarCard(dados) {
    const card = document.createElement('div')
    card.classList.add('flex', 'flex-col', 'items-center', 'bg-white', 'p-1.5', 'w-52', 'h-68', 'rounded-xl')
    card.addEventListener('click', () => {
        abrirCardAnimal(dados.id)
    })

    const iconeAnimal = document.createElement('img')
    iconeAnimal.src = dados.tipo.icon
    iconeAnimal.classList.add('self-end','w-[32px]')

    const ImagemAnimal = document.createElement('img')
    ImagemAnimal.src = dados.img
    ImagemAnimal.classList.add('self-center', 'rounded-full','w-32','h-32')


    const nomeAnimal = document.createElement('h2')
    nomeAnimal.textContent = dados.nome
    nomeAnimal.classList.add('mt-2.5', 'text-xl', 'font-extrabold', 'self-center')

    const nomeanimal = document.createElement('h3')
    nomeanimal.textContent = dados.nome
    nomeanimal.classList.add('mt-4', 'font-bold')

    const racaAnimal = document.createElement('h2')
if (dados.raca) {
    racaAnimal.textContent = dados.raca.nome
    
} else {
    racaAnimal.textContent='SRD'
}
    racaAnimal.classList.add('self-center')

    const linha = document.createElement('hr')
    linha.classList.add('border-2', 'border-solid', 'bg-violet-950', 'border-violet-950', 'w-[80%]')


    const divIdadePeso = document.createElement('div')
    divIdadePeso.classList.add('flex', 'gap-5', 'mt-2', 'text-zinc-900')

    const anoNascimento = dados.nascimento.substring(0, 4)
    const mesNascimento = dados.nascimento.substring(5, 6)
    const diaNascimento = dados.nascimento.substring(7, 8)

    const sumIdade = anoAtual - anoNascimento
    const idadeAnimal = document.createElement('p')
    idadeAnimal.textContent = sumIdade + ' anos'

    const pesoAnimal = document.createElement('p')
    pesoAnimal.textContent = `${dados.peso} Kg`


    divIdadePeso.replaceChildren(idadeAnimal, pesoAnimal)
    card.replaceChildren(iconeAnimal, ImagemAnimal, nomeAnimal, racaAnimal, linha, divIdadePeso)
    telaNormal.appendChild(card)

    return telaNormal
}
async function preencherContainer() {
    const container = document.querySelector('main')
    const info = await getCliente(idPerfil)
    document.getElementById('nomeUser').textContent = info.nome
    const infoAnimal = info.animais
    infoAnimal.forEach(dado => {
        const main = criarCard(dado)
        container.appendChild(telaNormal)
    });
}
preencherContainer()

async function abrirCardAnimal(idBixo) {
    telaEditar.classList.remove('hidden')
    telaNormal.classList.add('hidden')

const animalAntigo = await getAnimal(idBixo)

const imgLink=document.getElementById('imgEditadaLink')
imgLink.value=animalAntigo.img
const img=document.getElementById('imgEditada')
img.src=imgLink.value

const textoMeusPets=document.getElementById('meusPets')
textoMeusPets.classList.add('hidden')
const iconEditar=document.getElementById('iconEditar')
iconEditar.classList.remove('hidden')
const nome = document.getElementById('nomeEditado')
nome.classList.remove('hidden')
nome.value = animalAntigo.nome

const dataNascimento = document.getElementById('editarData')
dataNascimento.value = animalAntigo.nascimento.substring(0, 10)

const porteSelect = document.getElementById('editarPorte');


        const data=await getPortes()
            data.forEach(dado => {
                const option = document.createElement('option');
                option.value = dado.id;
                option.textContent = dado.nome;
                porteSelect.appendChild(option);
            });



const porte = document.getElementById('editarPorte')
porte.value = animalAntigo.porte.id

const tipoId = animalAntigo.tipo.id;
const racaSelect = document.getElementById('editarRaca');

if (tipoId) {

        const data=await getRaca(tipoId)
            data.forEach(dado => {
                const option = document.createElement('option');
                option.value = dado.id;
                option.textContent = dado.nome;
                racaSelect.appendChild(option);
            });

}


const raca = document.getElementById('editarRaca')
if (animalAntigo.raca) {
    raca.value = animalAntigo.raca.id
} else {
    raca.value='0'
}

const peso = document.getElementById('editarPeso')
peso.value = animalAntigo.peso

const editar = document.getElementById('btn_confirmar')
editar.addEventListener('click', async ()=>{

    const imgLink=document.getElementById('imgEditadaLink').value

    const nomeAtualizado = document.getElementById('nomeEditado').value
    const nascimentoAtualizado = document.getElementById('editarData').value
    const porteAtualizado = document.getElementById('editarPorte').value
    const racaAtualizado = document.getElementById('editarRaca').value
    const pesoAtualizado = document.getElementById('editarPeso').value
    // const fotoPerfil = document.getElementById('fotoPerfil').value
    // fotoPerfil = 'https://osegredo.com.br/wp-content/uploads/2023/09/1-81.jpg.webp'
    const novosDados = {
        nome: nomeAtualizado,
        nascimento: nascimentoAtualizado,
        peso:Number(pesoAtualizado),
        img:imgLink,
        dono_id:idPerfil,
      porte_id: Number(porteAtualizado),
      raca_id: Number(racaAtualizado)
    }
    if (novosDados) {
      let status = await putAnimal(novosDados, idBixo)
            
      if (status) {
        // alert('Dados Atualizados com sucesso')
        // telaEditar.classList.remove('hidden')
        // telaNormal.classList.add('hidden')
        // window.location.href = './pets.html'
        window.location.reload();

      }
      else {
        alert('Não foi possivel atualizar seus dados')
        // window.location.href = './pets.html'
        window.location.reload();

      }
    }
  
})

const btn_excluir = document.getElementById('btn_excluir')
btn_excluir.addEventListener('click', async function () {
  const confirmado = confirm(`Deseja deletar pet ${nome.value}?`);
  if (confirmado) {
    const certezaDeConfirmacao = confirm(`Tem certeza de que deseja deletar o pet ${nome.value}? essa alteração é irreversivel`);
    if (certezaDeConfirmacao) {
      deleteAnimal(idBixo)
      window.location.reload();
      alert('Pet deletado com sucesso');
    } else {
      alert('Operação cancelada');
    }
  } else {
    alert('Operação cancelada');
  }
})
}