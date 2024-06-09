const url = `https://laika-back.onrender.com`
const versao = "v1"
// const url = `http://localhost:8080/`
// ----------------------------------------------------PRODUTOS----------------------------------------------------
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
    const link = `${url}/${versao}/laika/produtos?nome=${nomeSearch}&valorMin=${valorMinSearch}&valorMax=${valorMaxSearch}&categoria=${categoriaSearch}`
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
// ----------------------------------------------------CLIENTES----------------------------------------------------
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

export async function postCliente(cliente){
    const link = `${url}/${versao}/laika/cliente`
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cliente),
    };

        const response = await fetch(link, options);
        return response.ok;
}
export async function putCliente(cliente,id) {
    const link=`${url}/${versao}/laika/cliente/${id}`
    const options={
        method:`PUT`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(cliente)
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
// ----------------------------------------------------FUNCIONARIOS----------------------------------------------------
export async function getFuncionarios() {
    const link = `${url}/${versao}/laika/funcionarios`;
    const funcionariosApi = await fetch(link);
    const listFuncionarios = await funcionariosApi.json();
    return listFuncionarios.dados;
}
export async function getFuncionarioId(id) {
    const link = `${url}/${versao}/laika/funcionario/${id}`;
    const funcionariosApi = await fetch(link);
    const listFuncionarios = await funcionariosApi.json();
    return listFuncionarios.dados;
}
// ----------------------------------------------------CARGO----------------------------------------------------
export async function getCargos() {
    const link = `${url}/${versao}/laika/cargos`;
    const funcionariosApi = await fetch(link);
    const listFuncionarios = await funcionariosApi.json();
    return listFuncionarios.dados;
}
// ----------------------------------------------------ANIMAIS----------------------------------------------------

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
// ----------------------------------------------------AGENDAMENTOS----------------------------------------------------

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

export async function postAgendamento(agendamento) {
    const link=`${url}/${versao}/laika/agendamento`
    const options={
        method:`POST`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(agendamento)
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
// ----------------------------------------------------TIPOS----------------------------------------------------
export async function getTipos() {
        const link = `${url}/${versao}/laika/tipos`
        const response=await fetch(link)
        const data=await response.json()
        
        return data.dados


}
// ----------------------------------------------------RACAS----------------------------------------------------

export async function getRaca(id) {
    
    const link =`${url}/${versao}/laika/racas/tipo/${id}`
    
    const response=await fetch(link)
    const data= await response.json()    

    return data.dados
}
// ----------------------------------------------------PORTES----------------------------------------------------
export async function getPortes() {
    const link = `${url}/${versao}/laika/portes`
    const response=await fetch(link)
    const data=await response.json()
    
    return data.dados
}
// ----------------------------------------------------CATEGORIAS----------------------------------------------------
export async function getCategorias() {
    const link = `${url}/${versao}/laika/categorias`
    const response=await fetch(link)
    const data=await response.json()
    return data.dados
}
// ----------------------------------------------------SERVICOS----------------------------------------------------
export async function getServicos() {
    
    const endpoint = 'https://laika-back.onrender.com/v1/laika/servicos';
    const funcionariosApi = await fetch(endpoint);
    const listFuncionarios = await funcionariosApi.json();
    return listFuncionarios.servicos;
}
