let form = document.getElementById("task_list")
let list = document.getElementById("list")
let filter = document.getElementById("filter")
let clearBtn = document.getElementById("clear")
let newTask = document.getElementById("newTask")

// define event listeners...........

form.addEventListener("submit", addTask)
list.addEventListener("click", deleteTask)
clearBtn.addEventListener("click", clearTask)
filter.addEventListener("keyup", filterTask)
document.addEventListener("DOMContentLoaded", getTask)

// functionalty

// Add Task
function addTask(e) {
    if (newTask.value === "") {
        alert("Add a Task!")
    } else {
        let li = document.createElement("li")
        li.innerText = `${newTask.value}  `
        let a = document.createElement("a")
        a.setAttribute("href", "#")
        a.innerText = "x"
        li.appendChild(a)
        list.appendChild(li)

        storeTaskInLocalStorage(newTask.value)

        newTask.value = ""
    }
    e.preventDefault()
}

// Remove Task

function deleteTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are You Sure?")) {
            let ele = e.target.parentElement
            ele.remove()
            removeFromLocalStorage(ele)
        }
    }
}

// Clear Task

function clearTask() {

    if (confirm("Are You Sure?")) {
        list.innerHTML = ""
    }
    localStorage.clear()
}

// Filter Task

function filterTask(e) {
    let text = e.target.value.toLowerCase()
    document.querySelectorAll("li").forEach(task => {
        let item = task.firstChild.textContent.toLocaleLowerCase().indexOf(text)
        if (item != -1) {
            task.style.display = "block"
        } else {
            task.style.display = "none"
        }
    })

}

// Store in Local Store

function storeTaskInLocalStorage(task) {
    console.log(task)
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.push(task)

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function getTask() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    tasks.forEach(task => {
        let li = document.createElement("li")
        li.innerText = `${task}  `
        let a = document.createElement("a")
        a.setAttribute("href", "#")
        a.innerText = "x"
        li.appendChild(a)
        list.appendChild(li)
    });
}

function removeFromLocalStorage(element) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    let li = element
    li.removeChild(li.lastChild)
    console.log(li)
    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
}