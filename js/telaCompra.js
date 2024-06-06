import { getProduto } from './exports.js'

const idProduto = new URLSearchParams(window.location.search).get('id');
if(!idProduto){
    window.location.href='./main.html'
}
const info = await getProduto(idProduto)
document.getElementById('nome').textContent = info.nome
document.getElementById('descricao').textContent = info.descricao
document.getElementById('preco').textContent = "R$" +info.preco
document.getElementById('imagem').src = info.img




console.log(info);