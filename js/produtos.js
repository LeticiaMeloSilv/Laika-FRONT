import { getProdutos, getCategorias} from './exports.js'

const containerProdutos=document.getElementById('containerProdutos')
const listaCategorias = await getCategorias()

const searchBar = document.getElementById('searchBar')

let search = {
    nome: null,
    valorMin: null,
    valorMax: null,
    categoria: null
}

const classe = 'bg-cyan-500'
document.getElementById('searchIcon').addEventListener('click',()=>{
    search = {
        nome: searchBar.value
    }
    const selecionado = document.querySelector(`.${classe}`)
    if(selecionado){
        selecionado.classList.remove(classe)
    }
    preencherContainer()
})

searchBar.addEventListener('keypress',(event)=>{
    if(event.key==='Enter'){
        document.getElementById('searchIcon').click()
    }
})

listaCategorias.forEach(categoria => {
    const nome = document.createElement('p')
    nome.value = categoria.id
    nome.textContent=categoria.nome
    nome.classList.add('cursor-pointer','h-full','px-10','py-6')
    nome.addEventListener('click',()=>{
        const selecionado = document.querySelector(`.${classe}`)
        if(selecionado){
            selecionado.classList.remove(classe)
        }
        nome.classList.add(classe)
        search.nome = searchBar.value
        search.categoria = categoria.id
        preencherContainer()
    })
    document.getElementById('navCategorias').appendChild(nome)
});
function criarCardProduto(produto) {

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

    btn_comprar.addEventListener('click',()=>{
        window.location.href='./telaCompra.html?id='+produto.id
    })
}




async function preencherContainer() {
    containerProdutos.innerHTML = ''
    const produtos = await getProdutos(search)
    produtos.forEach(produto => {
        criarCardProduto(produto)
    })
}
preencherContainer()

