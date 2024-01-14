const form = document.querySelector('.form');
const searchInput = document.querySelector('#Text');
const ul = document.querySelector('.tarefas');


function limpaInput() {
    searchInput.value = '';
    searchInput.focus();
}

function criaButton(li) {
    const buttonApagar = document.createElement('buton');
    buttonApagar.innerHTML = 'Apagar';
    buttonApagar.setAttribute('class', 'apagar');
    li.appendChild(buttonApagar);
}

function criaTarefa(textoInput) {
    const li = document.createElement('li');
    li.innerHTML = textoInput;
    ul.appendChild(li);
    criaButton(li);
    limpaInput();
    salvaTarefas()
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!searchInput.value) return alert('Digie algo para criar uma Tarefa!');
    criaTarefa(searchInput.value);
})

document.addEventListener('click', (e) => {
    const el = e.target;
    
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvaTarefas()
    }
    
})

function salvaTarefas() {
    const liTarefas = document.querySelectorAll('li');
    const listaDeTarefas = [];

    for (tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefaSalva() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefaSalva();