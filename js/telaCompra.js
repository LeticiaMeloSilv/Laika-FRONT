import { putProduto, getProduto, iniciarTelaCarregamento, mostrarToast } from './exports.js'

const idProduto = new URLSearchParams(window.location.search).get('id');
if (!idProduto) {
    window.location.href = './produtos.html'
}

let info

document.addEventListener('DOMContentLoaded', async () => {
    const telaCarregamento = document.createElement('div');
    iniciarTelaCarregamento(telaCarregamento)
    info = await getProduto(idProduto)
    if (info) {
        telaCarregamento.classList.add('hidden')
        executarSite()
    }
    else {
        mostrarToast('Ocorreu um erro no processamento, tente novamente mais tarde', 'error')
        setTimeout(function () {
            window.history.back();
        }, 2000);
    }
});
function executarSite() {
    document.getElementById('nome').textContent = info.nome
    document.getElementById('descricao').textContent = info.descricao
    document.getElementById('preco').textContent = "R$" + info.preco
    document.getElementById('imagem').src = info.img
    const quantidadeCompra = document.getElementById('quantidadeCompra')
    let quantidadeEstoqueElement = document.getElementById('quantidadeEstoque');
    let quantidadeEstoque = info.quantidade_estoque;
    quantidadeEstoqueElement.textContent = quantidadeEstoque;
    if (quantidadeEstoque <= 5) {
        quantidadeEstoqueElement.style.backgroundColor = 'red';
        quantidadeEstoqueElement.style.color = 'white';
    } else if (quantidadeEstoque <= 15) {
        quantidadeEstoqueElement.style.backgroundColor = 'orange';
        quantidadeEstoqueElement.style.color = 'white';
    }
    document.getElementById('fecharContainer').addEventListener('click', () => {
        document.getElementById('fundoComprarProduto').classList.add('hidden')
    })

    let precoTotal = info.preco

    document.getElementById('btn_comprar').addEventListener('click', () => {
        document.getElementById('fundoComprarProduto').classList.remove('hidden')
        document.getElementById('pNome').textContent = info.nome
        document.getElementById('pSubTotal').textContent = "Subtotal: R$" + info.preco
        document.getElementById('pTotal').textContent = "Total: R$" + precoTotal

        quantidadeCompra.addEventListener('input', () => {
            precoTotal = info.preco * quantidadeCompra.value
            if (quantidadeCompra.value >= 0)
                document.getElementById('pTotal').textContent = "Total: R$" + precoTotal
        })



        const btn = document.getElementById('btnComprar')
        btn.addEventListener('click', async () => {
            const quantidadeAtualizada = quantidadeEstoque - quantidadeCompra.value
            if (quantidadeAtualizada < 0) {
                alert(`Não é possivel realizar a compra de ${quantidadeCompra.value} produtos por falta de estoque`)
            } else {
                const dados = {
                    nome: info.nome,
                    descricao: info.descricao,
                    preco: info.preco,
                    idCategoria: info.categoria_id,
                    img: info.img,
                    quantidade_estoque: quantidadeAtualizada
                }
                console.log(dados);
                const retornoPut = await putProduto(dados, idProduto)
                if (retornoPut) {
                    alert('Compra executada com sucesso')
                    window.location.reload();
                } else {
                    alert('Não foi possivel executar a compra')
                    window.location.reload();
                }
            }

        })
    })
}



