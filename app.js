// Elementleri Seçme
let successTost = document.querySelector(".success");
let errorTost = document.querySelector(".error");
let todos = document.querySelector("#list");
let todo = document.querySelector("#list").children;
let clearBtn = document.querySelector("#clearAll");

// Sayfa Yüklendğinde Todoları Arayüze Ekleme
document.addEventListener("DOMContentLoaded", loadAllTodostoUI)
function loadAllTodostoUI() {
    let todoss = getTodosFromStorage();
    todoss.forEach(function(todo) {
        let newLi = document.createElement("li");
        let value = todo;
        newLi.textContent = value;
        todos.appendChild(newLi);

        let closeButton = document.createElement("span");
        closeButton.textContent = "x";
        closeButton.classList.add("close");
        closeButton.onclick = removeElement;
        
        newLi.append(closeButton);
        todos.append(newLi);
    })
}

// Todoları Storage'dan Getirme 
function getTodosFromStorage() {
    let todos;
    if(localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
    } else {
        todos = [];
    }
    return todos;
}

// Todoları Storage'a Ekleme 
function addTodostoStorage(todo) {
    let todos = getTodosFromStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Todoları Storage'dan Silme
function removeTodoFromStorage(todo) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let index1 = todo.indexOf("x");
    todo = todo.substring(0, index1);
    let index = todos.indexOf(todo);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Element ekleme
function addItem() {
    if(document.querySelector("#task").value === "") {
        $(errorTost).toast('show')
    }else {
        let newLi = document.createElement("li");
        let value = document.querySelector("#task").value;
        document.querySelector("#task").value = "";
        newLi.textContent = value;
        todos.appendChild(newLi);
        $(successTost).toast('show')

        let closeButton = document.createElement("span");
        closeButton.textContent = "x";
        closeButton.classList.add("close");
        closeButton.onclick = removeElement;
        
        newLi.append(closeButton);
        todos.append(newLi);
        newLi.addEventListener("click", checkElement);

        addTodostoStorage(value);
    }
}

const closes = document.querySelectorAll("ul>li>span");
closes.forEach((close) => close.addEventListener("click", removeElement));


//Element silme
function removeElement(e) {
    e.target.parentElement.remove();
    removeTodoFromStorage(e.target.parentElement.textContent);
}

// Elementleri Seçili Hale getirme
function checkElement() {
    this.classList.add("checked");
}

// Tüm todoları silme
clearBtn.addEventListener("click", clearAllTodos)
function clearAllTodos() {
    for(let i = 0; i < todo.length; i++) {
        todos.removeChild(todo[i]);
    }

    clearAllFromStorage();
}

// Local Storage'ı Temizleme
function clearAllFromStorage() {
    localStorage.clear();
}