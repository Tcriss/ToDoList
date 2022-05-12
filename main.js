const input = document.querySelector('input');
const addBtn = document.querySelector('.btnadd');
const ul = document.querySelector('ul');
const empty = document.querySelector('.empty');
const message = document.querySelector('.li-container');
let tasks = [];
let id = Date.now();

showTasks();

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const text = input.value;

    if (text !== "") {

        const task = {
            text,
            id
        }
        tasks = [...tasks,task]

        localStorage.setItem('tasks',JSON.stringify(tasks));
        const p = document.createElement('p');
        p.textContent = text;
              
        const li = document.createElement('li');
        li.appendChild(p);
        li.appendChild(DeleteBtn());
        ul.appendChild(li);
        
        input.value = "";
        empty.style.display = "none";
    } else {
        alert("No se pueden crear tareas vacias");
    }
});

function DeleteBtn(e) {
    const deleteBtn = document.createElement("button");
    
    deleteBtn.textContent = "x";
    deleteBtn.setAttribute("id", id);
    deleteBtn.className = "btndelete";
    
    deleteBtn.addEventListener("click", (e) => {
        const task = e.target.parentElement;
        ul.removeChild(task);
        let tasks = JSON.parse( localStorage.getItem('tasks'))
        tasks.splice(e, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(tasks);

        const items = document.querySelectorAll("li");
        if (items.length == 0){
            empty.style.display = "block";
        }
    });
    return deleteBtn;
}

function showTasks(){
    document.addEventListener('DOMContentLoaded',() => {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.innerHTML = `${task.text}`;
            li.appendChild(p);
            li.setAttribute("id", `${task.text}`);
            li.appendChild(DeleteBtn());
            ul.appendChild(li);
            empty.style.display = "none";
        });
    });
}
