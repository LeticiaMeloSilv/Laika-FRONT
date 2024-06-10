import { getFuncionario, getProdutos, getServico, iniciarTelaCarregamento} from './exports.js'

//TELA DE CARREGAMENTO. AGUARDA A REQUISIÇÃO DO BANCO DE DADOS SER CONCLUÍDA


let produtos
let hospedagem
let babySitter
let creche
let f1
let f2
let f3
let f4


document.addEventListener('DOMContentLoaded', async () => {
    const telaCarregamento = document.createElement('div');
    iniciarTelaCarregamento(telaCarregamento)
    produtos = await getProdutos({})
    hospedagem = await getServico(8)
    babySitter = await getServico(7)
    creche = await getServico(6)
    f1 = await getFuncionario(25)
    f2 = await getFuncionario(1)
    f3 = await getFuncionario(24)
    f4 = await getFuncionario(23)
    if(produtos && hospedagem && babySitter && creche && f1 && f2 && f3 && f4){
        telaCarregamento.classList.add('hidden')
        executarSite()
    }
});

function executarSite(){
    function criarCardProduto(info) {
        const card = document.createElement('div')
        card.classList.add('bg-white','w-1/4','h-80','rounded-xl','flex','flex-col','items-center','p-4')
        
        card.style.border = '3px'
        card.style.borderStyle = 'solid';

        const imagemProduto = document.createElement('img')
        imagemProduto.src = info.img
        imagemProduto.classList.add('h-1/2')
    
        const contentBottom = document.createElement('div')
        contentBottom.classList.add('h-1/2','flex','flex-col','items-center','w-full','justify-around')
    
        const textInfos= document.createElement('div') 
        textInfos.classList.add('w-full')
    
        const nome = document.createElement('h2')
        nome.textContent = info.nome
    
        const preco = document.createElement('h2')
        preco.classList.add('text-[#2A00A8]','font-medium')
        // .toFixed(2).replace('.', ',')
        preco.textContent = `R$${info.preco}`
        
        const btn_comprar=document.createElement('button')
        btn_comprar.textContent='Adicionar'
        btn_comprar.classList.add('bg-[#86A7FC]','duration-500','border-[#2A00A8]','border-1','rounded-full','p-2','text-[#2A00A8]','w-2/3','hover:bg-[#6385EC]','hover:text-white')
        btn_comprar.style.border = '2px'
        btn_comprar.style.borderStyle = 'solid';


        textInfos.replaceChildren(nome,preco)
        contentBottom.replaceChildren(textInfos,btn_comprar)
        card.replaceChildren(imagemProduto,contentBottom)
        document.getElementById('containerProdutos').appendChild(card)
    
        btn_comprar.addEventListener('click',()=>{
            window.location.href='./telaCompra.html?id='+info.id
        })
    }
    for (let index = 0; index < 4; index++) {
        criarCardProduto(produtos[index])
    }
      
    
    function criarCardServico(dados) {
        const info = dados.dados
        const icone = dados.img
        const card = document.createElement('div')
        card.classList.add('bg-white', 'w-1/3', 'flex', 'items-center', 'flex-col', 'rounded-xl', 'h-full', 'justify-evenly', 'p-4')

        card.style.border = '3px'
        card.style.borderStyle = 'solid';

        const top = document.createElement('div')
        top.classList.add('flex', 'w-full', 'items-center', 'justify-around')
        const nome = document.createElement('h2')
        nome.textContent = info.nome
        nome.classList.add('font-bold', 'text-[#2A00A8]', 'text-3xl')
        const img = document.createElement('img')
        img.src = icone
        const sinopse =document.createElement('h4')
        sinopse.textContent = info.descricao
        sinopse.classList.add('text-center')
    
        top.replaceChildren(nome,img)
        card.replaceChildren(top,sinopse)
        document.getElementById('containerServicos').appendChild(card)
    
    }

    const servicos = []
    servicos.push({dados: hospedagem, img:"../img/servicos/Pillow.png"})
    servicos.push({dados: babySitter, img:"../img/servicos/Dog House.png"})
    servicos.push({dados: creche, img:"../img/servicos/Baby Mobile.png"})
    
    for (let index = 0; index < 3; index++) {
        criarCardServico(servicos[index])    
    }
    
    const funcionarios = []
    funcionarios.push(f1)
    funcionarios.push(f2)
    funcionarios.push(f3)
    funcionarios.push(f4)

    function criarCardFuncionario(dados) {
        const card = document.createElement('div')
        card.classList.add('gap-5','bg-white', 'flex', 'flex-col', 'items-center', 'rounded-xl', 'h-full', 'justify-center')

        const foto = document.createElement('img')
        foto.src = dados.img
        foto.classList.add('h-1/2','aspect-square','object-cover','rounded-full')
        const nome = document.createElement('h2')
        nome.textContent=dados.nome
        nome.classList.add('font-bold','text-[#2A00A8]','text-3xl')

        let stringCargos = ''
        const listaCargos = dados.cargos
        listaCargos.forEach(element => {
            stringCargos += element.nome+', '
        });
        const cargos = document.createElement('h4')
        cargos.textContent=stringCargos.slice(0,stringCargos.length-2)
        cargos.classList.add('text-center','text-xl','font-semibold')
    
        card.replaceChildren(nome,foto,cargos)
        document.getElementById('containerFuncionarios').appendChild(card)
    }
    funcionarios.forEach(element => {
        criarCardFuncionario(element)     
    });
}

document.getElementById('goToProdutos').addEventListener('click',()=>{
    document.getElementById('produtosField').scrollIntoView({ behavior: 'smooth' });
})
document.getElementById('goToServicos').addEventListener('click',()=>{
    document.getElementById('servicosField').scrollIntoView({ behavior: 'smooth' });
})
document.getElementById('goToFuncionarios').addEventListener('click',()=>{
    document.getElementById('funcionariosField').scrollIntoView({ behavior: 'smooth' });
})