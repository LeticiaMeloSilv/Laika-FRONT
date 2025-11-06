
'use strict'
import { deleteAgendamento, idUsuario, getAgendamentosCliente, iniciarTelaCarregamento, verificarUsuarioExistente, getClienteNome, mostrarToast } from './exports.js'

if (!idUsuario) {
    window.location.href = './login.html'
} else {
    if (!verificarUsuarioExistente(idUsuario)) {
        window.location.href = './login.html'
    }
}
let info
document.addEventListener('DOMContentLoaded', async () => {
    const telaCarregamento = document.createElement('div');
    iniciarTelaCarregamento(telaCarregamento)
    info = await getAgendamentosCliente(idUsuario)
    if (info) {
        telaCarregamento.classList.add('hidden')
        executarSite()
    } else {
        mostrarToast('Você não possui agendamentos :(', 'error')    
        window.history.back()
        telaCarregamento.classList.add('hidden')
    }
});
async function executarSite() {
    const agendamentos = info
    console.log(agendamentos);
    document.getElementById('nomeUser').textContent = await getClienteNome(idUsuario)
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = today.getMonth(); // Note que aqui pegamos o mês como um índice (0 a 11)
    const yyyy = today.getFullYear();
    const nomesMeses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    document.getElementById('mesCalendario').textContent = nomesMeses[mm]; // Define o nome do mês


    const daysInMonth = new Date(yyyy, mm + 1, 0).getDate(); // +1 porque Date usa 0-11 para meses
    const calendar = document.getElementById('calendar');
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day rounded-lg bg-gray-200';
        if (day == dd) {
            dayElement.className = 'calendar-day rounded-lg bg-gray-500';
            dayElement.style.color='white';

        }
        dayElement.innerHTML = day;
        calendar.appendChild(dayElement);
    }


    try {
        if (!agendamentos || agendamentos.length === 0) {
            // throw new Error("Você não tem nenhum agendamento este mês");
        }
        else {
            agendamentos.forEach(agendamento => {
                const diaAgendamento = agendamento.data_agendamento.substring(8, 10);
                let servicoString = 'Serviço: ';
                let nomePet = 'Pet: ';
                const arrayServicos = agendamento.servicos;

                arrayServicos.forEach(element => {
                    servicoString += element.nome + ', ';
                    nomePet += agendamento.animal.nome;
                });

                let json = {
                    id: agendamento.id,
                    diaId: diaAgendamento,
                    servicos: servicoString.slice(0, servicoString.length - 2),
                    pet: nomePet
                };

                const dayElement = calendar.children[json.diaId - 1];

                dayElement.classList.add('has-appointment');
                dayElement.addEventListener('click', () => {
                    const id = agendamento.id
                    const infoAgendamentoServico = document.getElementById('agendamento_servico');
                    const infoAgendamentoPet = document.getElementById('agendamento_pet');
                    infoAgendamentoServico.textContent = json.servicos;
                    infoAgendamentoPet.textContent = json.pet;
                    document.getElementById('appointment-details').classList.remove('hidden');
                    const btn_excluir = document.getElementById('btn_excluir')
                    btn_excluir.addEventListener('click', async () => {
                        const confirmado = confirm(`Deseja cancelar agendamento?`);
                        if (confirmado) {
                            const status = await deleteAgendamento(id)
                            if (status) {
                                window.location.reload();
                            } else {
                                alert('Não foi possivel executar Operação');
                            }
                        }
                    })
                    const btn_editar = document.getElementById('btn_editar')
                    btn_editar.addEventListener('click', () => {
                        alert('Contate um atendente para alterar agendamento')
                    })
                });

            });
        }
    } catch (error) {
        console.log(error);
    }

    document.getElementById('close-button').addEventListener('click', () => {
        document.getElementById('appointment-details').classList.add('hidden');
    });
}