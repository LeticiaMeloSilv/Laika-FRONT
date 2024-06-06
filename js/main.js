import { getProdutos, getProduto,  getCategorias} from './exports.js'

const containerProdutos=document.getElementById('containerProdutos')

const listaCategorias = await getCategorias()

listaCategorias.forEach(categoria => {
    const nome = document.createElement('p')
    nome.value = categoria.id
    nome.textContent=categoria.nome
    nome.classList.add('cursor-pointer')
    nome.addEventListener('click',()=>{
        containerProdutos.innerHTML = ''

        alert(categoria.id)
    })
    document.getElementById('navCategorias').appendChild(nome)
});
function criarCard(produto) {

    const card = document.createElement('div')
    card.classList.add('max-w-[229px]','rounded-xl','bg-white','p-4','text-black','flex','flex-col','justify-between')
    //card.addEventListener('click', () => abrirproduto(id));

    const imagemProduto = document.createElement('img')
    imagemProduto.src = produto.img
    imagemProduto.classList.add('w-[125px]','flex','justify-center','items-center','self-center','mt-2.5')

    const nomeProduto = document.createElement('h3')
    nomeProduto.textContent = produto.nome
    nomeProduto.classList.add('mt-4','font-bold')

    const preco = document.createElement('h4')
    preco.classList.add('mt-3','text-violet-950')
    // .toFixed(2).replace('.', ',')
    preco.textContent = `R$ ${produto.preco}`
    
    const btn_comprar=document.createElement('button')
    btn_comprar.textContent='Comprar'
    btn_comprar.classList.add('mt-5','w-auto','bg-slate-300','border','border-solid','border-violet-950','rounded-xl','py-2.5','px-11','text-violet-950')

    const contentBottom = document.createElement('div')
    contentBottom.replaceChildren(nomeProduto,preco,btn_comprar)
    card.replaceChildren(imagemProduto,contentBottom)
    containerProdutos.appendChild(card)

    card.addEventListener('click',()=>{
        window.location.href='./telaCompra.html?id='+produto.id
    })
}


let search = {
    categoria:1
}
async function preencherContainer(search) {
    
    const produtos = await getProdutos(search)
    produtos.forEach(produto => {
        criarCard(produto)
    })
}

preencherContainer(search)

