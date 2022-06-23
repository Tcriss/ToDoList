const input = document.querySelector('input');
const addBtn = document.querySelector('.btnadd');
const ul = document.querySelector('ul');
const empty = document.querySelector('.empty');
const message = document.querySelector('.li-container');
const mode = document.querySelector('i');
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
        ul.style.height = "30vh";
    } else {
        Message('','Alto ahi!','No puedes agregar listas vacias');
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
        console.log(tasks)
        localStorage.setItem('tasks', JSON.stringify(tasks));

        const items = document.querySelectorAll("li");
        if (items.length == 0){
            empty.style.display = "block";
            ul.style.height = "1vh";
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

function Message(icono,titulo,mensaje){
    Swal.fire({
        position: 'center',
        icon: icono,
        title: titulo,
        text: mensaje,
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__shakeX'
          },
          hideClass: {
            popup: 'animate__animated animate__bounceOut'
          }
    });
}

var dark_mode = true;

function darkMode(){
    if (dark_mode){
        document.querySelector('.container').style.backgroundColor = "#04293A";
        document.querySelector('ul').style.backgroundColor = "#04293A";
        document.querySelector('#toogle').style.color = "white";
        document.querySelector('h1').style.color = "white";
        empty.style.color = "white";

        dark_mode = false;
    } else {
        document.querySelector('.container').style.backgroundColor = "rgb(255, 255, 255)";
        document.querySelector('ul').style.backgroundColor = "";
        document.querySelector('#toogle').style.color = "black";
        document.querySelector('h1').style.color = "darkslategrey";
        empty.style.color = "black";

        dark_mode = true;
    }
}
