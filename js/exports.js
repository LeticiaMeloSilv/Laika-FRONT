const url = `https://laika-back.onrender.com`
const versao = "v1"
//const url = `http://localhost:8080`

export async function getProdutos(filtro) {
    // const link = `${url}/${versao}/laika/produtos`
    let nomeSearch=''
    let valorMinSearch=''
    let valorMaxSearch =''
    let categoriaSearch = ''
    if(filtro.nome){
        nomeSearch=filtro.nome
    }
    if(filtro.valorMin){
        valorMinSearch=filtro.valorMin
    }
    if(filtro.valorMax){
        valorMaxSearch=filtro.valorMax
    }
    if(filtro.categoria){
        categoriaSearch=filtro.categoria
    }
    const link = `${url}/${versao}/laika/produtos?pesquisa=${nomeSearch}&valorMin=${valorMinSearch}&valorMax=${valorMaxSearch}&categoria=${categoriaSearch}`
    const response=await fetch(link)
    const data=await response.json()
    
    return data.produtos
}
export async function getProduto(id) {
    const link =`${url}/${versao}/laika/produto/${id}`
    const response=await fetch(link)
    const data= await response.json()
    return data.dados
}
// export async function postProduto(Produto) {
//     const link=`http://localhost:8080/V2/ACMEProdutos/Produto`
//     const options={
//         method:`POST`,
//         headers:{
//             `Content-type`:`application/json`
//         },
//         body:JSON.stringify(Produto)
//     }
//     const response=await fetch(link,options)
//     return response.ok
// }

export async function putProduto(Produto,id) {
    const link=`${url}/${versao}/laika/produto/${id}`
    const options={
        method:`PUT`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(Produto)
    }
    const response=await fetch(link,options)
    return response.ok
}
// export async function deleteProduto(id) {
//     const link=`http://localhost:8080/V2/ACMEProdutos/Produto/${id}`
//     const options={
//         method:`DELETE`
//     }
//     const response=await fetch(link,options)
//     return response.ok
// }
export async function getClientes() {
    const link = `${url}/${versao}/laika/clientes`
    const response=await fetch(link)
    const data=await response.json()
    
    return data.dados
}
export async function getCliente(id) {
    const link =`${url}/${versao}/laika/cliente/${id}`
    
    const response=await fetch(link)
    const data= await response.json()    
    return data.dados
}
export async function getClientesResumo() {
    const link = `${url}/${versao}/laika/clientes/resumo`
    const response=await fetch(link)
    const data=await response.json()
    
    return data.dados
}
export async function getClienteResumo(id) {
    const link =`${url}/${versao}/laika/cliente/resumo/${id}`
    
    const response=await fetch(link)
    const data= await response.json()    
    return data.dados
}
export async function getClientesLogin() {
    const link = `${url}/${versao}/laika/clientes/login`
    const response=await fetch(link)
    const data=await response.json()
    return data.dados
}
export async function getClienteImg(id) {
    const link =`${url}/${versao}/laika/cliente/img/${id}`
    
    const response=await fetch(link)
    const data= await response.json()    
    return data.dados
}
export async function getClienteNome(id) {
    const link =`${url}/${versao}/laika/cliente/nome/${id}`
    
    const response=await fetch(link)
    const data= await response.json()    
    return data.dados.nome
}
/*export async function getClienteFiltro(filtro) {
    const link =`http://localhost:8080/V2/ACMEClientes/Clientes/filtro?nome=${filtro}`
    const response=await fetch(link)
    const data= await response.json()
    return data.Cliente
}

*/

export async function postCliente(dados) {
    const link=`${url}/${versao}/laika/cliente`
    const options={
        method:`POST`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(dados)
    }
    const response=await fetch(link,options)
    return response.ok
}

export async function putCliente(dados,id) {
    const link=`${url}/${versao}/laika/cliente/${id}`
    const options={
        method:`PUT`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(dados)
    }
    const response=await fetch(link,options)
    return response.ok
}
export async function deleteCliente(id) {
    const link=`${url}/${versao}/laika/cliente/${id}`
    const options={
        method:`DELETE`
    }
    const response=await fetch(link,options)
    return response.ok
}

export async function getFuncionarios() {

    const link = `${url}/${versao}/laika/funcionarios`
    const response=await fetch(link)
    const data=await response.json()
    
    return data.dados
}
export async function getFuncionario(id) {
    const link =`${url}/${versao}/laika/funcionario/${id}`
    
    const response=await fetch(link)
    const data= await response.json()    
    return data.dados
}

export async function getFuncionariosLogin() {
    const link = `${url}/${versao}/laika/funcionarios/login`
    const response=await fetch(link)
    const data=await response.json()
    return data.dados
}













export async function getAnimais() {
    const link = `${url}/${versao}/laika/animais`
    const response=await fetch(link)
    const data=await response.json()
    
    return data.animais
}
export async function getAnimal(id) {
    const link =`${url}/${versao}/laika/animal/${id}`
    
    const response=await fetch(link)
    const data= await response.json()    
    
    return data.dados
}
export async function getAnimaisCliente(id){

    const link =`${url}/${versao}/laika/animais/cliente/${id}`
    const response = await fetch(link);
    const dados = await response.json();
    return dados;
}

export async function postAnimal(animal) {
    const link=`${url}/${versao}/laika/animal`
    const options={
        method:`POST`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(animal)
    }
    const response=await fetch(link,options)
    return response.ok
}

export async function putAnimal(animal,id) {
        const link=`${url}/${versao}/laika/animal/${id}`
    const options={
        method:`PUT`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(animal)
    }
    const response=await fetch(link,options)
    return response.ok

    
}
export async function deleteAnimal(id) {
    const link=`${url}/${versao}/laika/animal/${id}`
    const options={
        method:`DELETE`
    }
    const response=await fetch(link,options)
    return response.ok
}















export async function getAgendamentos() {
    const link = `${url}/${versao}/laika/agendamentos`
    const response=await fetch(link)
    const data=await response.json()
    
    return data.Agendamentos
}
export async function getAgendamento(id) {
    const link =`${url}/${versao}/laika/agendamento/${id}`
    
    const response=await fetch(link)
    const data= await response.json()    
    
    return data.dados
}
export async function getAgendamentosCliente(id) {
    const link =`${url}/${versao}/laika/agendamentos/cliente/${id}`
    
    const response=await fetch(link)
    const data= await response.json()    
    return data.dados
}

export async function postAgendamento(Agendamento) {
    const link=`${url}/${versao}/laika/agendamento`
    const options={
        method:`POST`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(Agendamento)
    }
    const response=await fetch(link,options)
    return response.ok
}

export async function putAgendamento(Agendamento,id) {
    const link=`${url}/${versao}/laika/agendamento/${id}`
    const options={
        method:`PUT`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(Agendamento)
    }
    const response=await fetch(link,options)
    return response.ok
}
export async function deleteAgendamento(id) {
    const link=`${url}/${versao}/laika/agendamento/${id}`
    const options={
        method:`DELETE`
    }
    const response=await fetch(link,options)
    return response.ok
}
















export async function getTipos() {
        const link = `${url}/${versao}/laika/tipos`
        const response=await fetch(link)
        const data=await response.json()
        
        return data.dados


}
export async function getRacas() {
    
    const link =`${url}/${versao}/laika/racas`
    const response=await fetch(link)
    const data= await response.json()    

    return data.dados
}

export async function getRacaByTipo(id) {
    
    const link =`${url}/${versao}/laika/racas/tipo/${id}`
    const response=await fetch(link)
    const data= await response.json()    

    return data.dados
}


export async function getPortes() {
    const link = `${url}/${versao}/laika/portes`
    const response=await fetch(link)
    const data=await response.json()
    
    return data.dados


}

export async function getCategorias() {
    const link = `${url}/${versao}/laika/categorias`
    const response=await fetch(link)
    const data=await response.json()
    return data.dados
}











export async function getServicos() {
    const link =`${url}/${versao}/laika/servicos`
    const funcionariosApi = await fetch(link);
    const listFuncionarios = await funcionariosApi.json();
    return listFuncionarios.servicos;
}
export async function getServico(id) {
    const link =`${url}/${versao}/laika/servico/${id}`
    const response=await fetch(link)
    const data= await response.json()
    return data.dados
}




async function postarNovoCliente(cliente){

    console.log('enviar');

    const endpoint = `${url}${versao}/laika/cliente`
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cliente),
    };

    try {
        const response = await fetch(endpoint, options);
        return response.ok;
      } catch (error) {
        console.error('Erro ao enviar cliente: ', error);
      }
}

export async function verificarUsuarioExistente(id){
    const info = await getClienteImg(id) 
    if(info){
        return info
    } else {
        return false
    }
}

export const idUsuario = localStorage.getItem('idUsuarioLaika')


export async function iniciarTelaCarregamento(telaCarregamento){
    telaCarregamento.classList.add('h-full', 'w-full','top-0','left-0','fixed', 'bg-black', 'z-50');
    telaCarregamento.innerHTML=`
    <div class="loader-div">
        <div class="content">
            <img class="dog" src="../img/dog.gif" alt="">
            <span class="loader">
                <span></span>
                <span></span>
            </span>
        </div>
    </div>
    <STYLE>
    * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.loader-div {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #FFDD95;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loader {
    position: relative;
    width: 10vw;
    height: 5vw;
    padding: 1.5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2vh;
}

.loader span {
    position: absolute;
    height: 0.5vw;
    width: 0.5vw;
    border-radius: 50%;
    background-color: #06038F;
}

.loader span:nth-child(1) {
    animation: loading-dotsA 1s infinite linear;
}

.loader span:nth-child(2) {
    animation: loading-dotsB 1s infinite linear;
}

@keyframes loading-dotsA {
    0% {
        transform: none;
    }
    25% {
        transform: translateX(2vw);
    }
    50% {
        transform: none;
    }
    75% {
        transform: translateY(2vw);
    }
    100% {
        transform: none;
    }
}

@keyframes loading-dotsB {
    0% {
        transform: none;
    }
    25% {
        transform: translateX(-2vw);
    }
    50% {
        transform: none;
    }
    75% {
        transform: translateY(-2vw);
    }
    100% {
        transform: none;
    }
}

</STYLE>
    `
    document.body.append(telaCarregamento);
}
