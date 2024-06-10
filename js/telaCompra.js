import {putProduto,getProdutos, getProduto,getClientes,getCliente,postCliente, putCliente,deleteCliente,getFuncionarios,getFuncionarioId, getCargos,getAnimais,getAnimal, postAnimal,putAnimal,deleteAnimal,getAgendamento,getAgendamentos,postAgendamento,putAgendamento,deleteAgendamento,getTipos,getRaca,getPortes,getCategorias,getServicos} from './exports.js'

const idProduto = new URLSearchParams(window.location.search).get('id');
const btn_comprar=document.getElementById('btn_comprar')
if(!idProduto){
    window.location.href='./main.html'
} else {
    let info = await getProduto(idProduto)
    let nome=document.getElementById('nome').textContent = info.nome
    let descricao=document.getElementById('descricao').textContent = info.descricao
    let preco=document.getElementById('preco').textContent = "R$" + info.preco
    let img=document.getElementById('imagem').src = info.img
    const quantidadeCompra=document.getElementById('quantidadeCompra')
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
     btn_comprar.addEventListener('click', ()=>{
        const quantidadeCompra=document.getElementById('quantidadeCompra').value
        console.log('oi9');
        const confirmado=confirm(`Deseja comprar ${quantidadeCompra} unidades do produto ${nome}?`)
        if (confirmado) {
            const fundoGeral=document.getElementById('fundoComprarProduto')
            fundoGeral.classList.add('absolute','top-0', 'left-0', 'w-full', 'h-full', 'bg-black','bg-opacity-40','flex', 'items-center','justify-center')
            const fecharContainer=document.createElement('img')
            fecharContainer.src='../img/Add.png'
fecharContainer.classList.add('self-start','rotate-45')
            const fundo=document.createElement('div')
            fundo.classList.add('bg-white','w-[50%]','h-[50%]','flex','items-center','flex-col')
            const pNome=document.createElement('p')
            pNome.classList.add('text-3xl')
            pNome.textContent=`Produto: ${nome}`
            const pQuantidade=document.createElement('p')
            pQuantidade.classList.add('text-lg')
            pQuantidade.textContent=`Quantidade: ${quantidadeCompra}`
            const pSubTotal=document.createElement('p')
            pSubTotal.textContent=`subTotal: ${preco}`
            pSubTotal.classList.add('text-lg')
            const valorTotal=info.preco*quantidadeCompra
            const pTotal=document.createElement('p')
            pTotal.classList.add('text-xl')
            pTotal.textContent=`Total: R$ ${valorTotal}`
            const btn=document.createElement('button')
            btn.classList.add('bg-purple-500', 'p-5','text-white', 'text-2xl', 'rounded-xl')
            btn.textContent='Comprar'
            fundo.replaceChildren(fecharContainer,pNome,pQuantidade,pSubTotal,pTotal,btn)
            fundoGeral.appendChild(fundo)
            btn.addEventListener('click', async ()=>{
                const quantidadeAtualizada=quantidadeEstoque-quantidadeCompra
                const precoAtualizado=info.preco
                console.log(info);
                const categoriaId=info.categoria_id
                if (quantidadeAtualizada<0) {
                    alert(`Não é possivel realizar a compra de ${quantidadeCompra} produtos por falta de estoque`)
                    window.location.reload();
                } else {
                    if (nome==null||nome==''||nome==undefined||
                        descricao==null||descricao==''||descricao==undefined||
                        precoAtualizado==null||precoAtualizado==''||precoAtualizado==undefined||
                        img==null||img==''||img==undefined||
                        quantidadeAtualizada==null||quantidadeAtualizada==''||quantidadeAtualizada==undefined) {
                    alert('Não foi possivel realizar compra, favor, contate um atendente')
                    window.location.reload();
                    } else {
                        const dados={
                            nome:nome,
                            descricao:descricao,
                            preco: Number(precoAtualizado),
                            idCategoria:categoriaId,
                            img: img,
                            quantidade_estoque: quantidadeAtualizada
                        }
                        console.log(dados);
                        const retornoPut=await putProduto(dados,idProduto)
                        if (retornoPut) {
                            alert('Compra executada com sucesso')
                            window.location.reload();
                        } else {
                            alert('Não foi possivel executar a compra')
                            window.location.reload();
                        }
                    }    
                }
                
            })

        } else {
            alert('Compra cancelada')
        }
    })
}



