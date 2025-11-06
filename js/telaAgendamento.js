'use strict'
import { getCliente, getFuncionarios, getAnimal, postAgendamento, getServicos, iniciarTelaCarregamento, verificarUsuarioExistente, idUsuario, mostrarToast } from './exports.js'


if (!idUsuario) {
    window.location.href = './login.html'
} else {
    if (!verificarUsuarioExistente(idUsuario)) {
        window.location.href = './login.html'
    }
}

let listaServicos
let cliente
let employees

document.addEventListener('DOMContentLoaded', async () => {
    const telaCarregamento = document.createElement('div');
    iniciarTelaCarregamento(telaCarregamento)
    listaServicos = await getServicos()
    cliente = await getCliente(idUsuario)
    employees = await getFuncionarios()
    if (listaServicos && cliente && employees) {
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
    const dropdown = document.getElementById('dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    const selectedEmployeesContainer = document.querySelector('.selected-employees');
    dropdown.addEventListener('click', () => {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });
    let servicoString = '';
    employees.forEach(employee => {
        let employeeCargos = employee.cargos
        if (employeeCargos) {
            employeeCargos.forEach(cargo => {
                servicoString += cargo.nome + ', '
            })
        } else {
            servicoString = 'Sem cargo atribuido'
        }
        const employeeDiv = document.createElement('div');
        employeeDiv.classList.add('employee');
        employeeDiv.id = employee.id;
        const cargos = servicoString.slice(0, servicoString.length - 2)
        let img = '../img/perfilSemFoto.jpg'
        if (employee.img) {
            img = employee.img
        }
        employeeDiv.innerHTML = `<img src="${img}" alt="${employee.nome}"><div class="name">${employee.nome} - ${cargos}</div>`;
        dropdownContent.appendChild(employeeDiv);

        employeeDiv.addEventListener('click', () => {
            addEmployeeToSelection(employee);
            employeeDiv.classList.toggle('selected')
        });
    });

    function addEmployeeToSelection(employee) {
        const existingSelectedEmployee = document.querySelector(`.selected-employees .employee[id="${employee.id}"]`);
        if (!existingSelectedEmployee) {
            const selectedEmployeeDiv = document.createElement('div');
            selectedEmployeeDiv.classList.add('employee', 'flex', 'items-center', 'p-2', 'border', 'border-gray-200', 'bg-white');
            selectedEmployeeDiv.id = employee.id;
            let img = '../img/perfilSemFoto.jpg'
            if (employee.img) {
                img = employee.img
            }
            selectedEmployeeDiv.innerHTML = `<img src="${img}" alt="${employee.nome}" class="w-8 h-8 rounded-full mr-3"><div class="name">${employee.nome}</div>`;
            selectedEmployeesContainer.appendChild(selectedEmployeeDiv);

            selectedEmployeeDiv.addEventListener('click', () => {
                selectedEmployeesContainer.removeChild(selectedEmployeeDiv);
            });
        } else {
            selectedEmployeesContainer.removeChild(existingSelectedEmployee);
        }
    }

    window.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });


    async function getDataAnimalSelected() {
        let select = document.getElementById("petSelect");
        let selectedValue = select.options[select.selectedIndex].value;
        await makeAnimalSelected(selectedValue)
    }

    async function makeAnimalSelected(id) {

        const dadosAnimal = await getAnimal(id)

        document.getElementById('imgAnimal').src = dadosAnimal.img
        document.getElementById('nomeAnimal').textContent = dadosAnimal.nome
    }


    listaServicos.forEach(element => {
        const servicoCheck = document.createElement('div')
        servicoCheck.id = 'divCheckbox'
        servicoCheck.classList.add('w-full', 'space-x-2', 'flex', 'justify-center', 'items-center', 'flex', 'flex-row', 'p-0')
        const input = document.createElement('input')
        input.setAttribute('type', 'checkbox')
        input.classList.add('h-1/2', 'w-1/6')
        input.value = element.id
        const nome = document.createElement('span')
        nome.classList.add('text-xl')
        nome.textContent = element.nome
        servicoCheck.replaceChildren(input, nome)
        document.getElementById('servicos').appendChild(servicoCheck)
    });

    if (cliente.animais) {
        const listaAnimais = cliente.animais
        listaAnimais.forEach(animal => {

            const animalOpção = document.createElement('option')
            animalOpção.textContent = animal.nome
            animalOpção.value = animal.id

            let select = document.getElementById('petSelect')
            select.appendChild(animalOpção)
            select.addEventListener('focusout', getDataAnimalSelected)
        });

    } else {
        mostrarToast("Você não tem animais cadastrados, logo, não é possivel realizar um agendamento", 'error')

        window.location.href = './home.html'
    }

    const dataAgendamento = document.getElementById('dataAgendamento')
    dataAgendamento.addEventListener('focusout', verificarDiaAgendamento)

    function verificarDiaAgendamento() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        if (dataAgendamento.value.substring(8, 10) < dd + 1) {
            mostrarToast('Não é possivel fazer agendamento para um dia que já passou ou para o mesmo dia em que o agendamento foi feito, verifique a data escolhida', 'error')
        }
        else {
            dataAgendamento.removeEventListener('focusout', verificarDiaAgendamento)
            return dataAgendamento
        }
    }


    const btn_agendar = document.getElementById('btn_agendar')
    btn_agendar.addEventListener('click', async () => {
        const dataAgendamento = document.getElementById('dataAgendamento').value

        let select = document.getElementById("petSelect");


        var divSelecionados = document.getElementById("divSelecionados");
        var selecionados = divSelecionados.getElementsByTagName("div");
        let arrayDivFuncionarios = []

        for (var i = 0; i < selecionados.length; i++) {
            var id = selecionados[i].getAttribute("id");
            if (id) { // Verifica se o elemento possui um ID
                arrayDivFuncionarios.push(Number(id));
            }
            // arrayDivFuncionarios.push(Number(selecionados[i].value))
        }

        let selectedValue = select.options[select.selectedIndex].value;

        var div = document.getElementById("servicos");
        var checkboxes = div.getElementsByTagName("input");
        let arrayCheckboxServicos = []

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type == "checkbox") {
                if (checkboxes[i].checked) {
                    arrayCheckboxServicos.push(Number(checkboxes[i].value))
                } else {
                }
            }

        }
        if (dataAgendamento == null || dataAgendamento == undefined || dataAgendamento == '' || selectedValue == null || selectedValue == undefined || selectedValue == '' || arrayCheckboxServicos == undefined || arrayCheckboxServicos == null || arrayCheckboxServicos == '' || arrayDivFuncionarios == null || arrayDivFuncionarios == undefined || arrayDivFuncionarios == '') {
            mostrarToast('todos os campos devem ser preenchidos, verifique-os', 'error')
        } else {

            const novoAgendamentoJSON = {
                data_agendamento: dataAgendamento,
                animal_id: Number(selectedValue),
                servicos: arrayCheckboxServicos,
                funcionarios: arrayDivFuncionarios
            }
            const result = await postAgendamento(novoAgendamentoJSON)
            if (result) {
                window.location.href = './agendamento.html'
            } else {
                mostrarToast('Não foi possivel realizar agendamento, verifique as informações', 'error')
            }
        }
    })


}


