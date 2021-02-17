// UI Variables

const form = document.querySelector('#task-form')

const taskList = document.querySelector('.collection')

const clearBtn = document.querySelector('.clear-tasks')

const filter  = document.querySelector('#filter')

const taskInput = document.querySelector('#task')


// Load all event listeners

loadEventListners();

// Function

function loadEventListners(){

    // DOM Load Event
    document.addEventListener('DOMContentLoaded',getTasks)
    // Adding task event
    form.addEventListener('submit',addTask)

    // Removing the task elements from the list
    taskList.addEventListener('click',removeTask)

    // Clear Tasks 
    clearBtn.addEventListener('click',clearTasks)

    // Filter Tasks
    filter.addEventListener('keyup',filterTasks)
}

function addTask(e){
    if(taskInput.value===''){
        alert('Add a task')
    }
    // Create li element
    const li = document.createElement('li')
    li.className = 'collection-item'
    // Text node for the li item and append to the li
    li.appendChild(document.createTextNode(taskInput.value))
    // Create a new link element
    const link = document.createElement('a')
    // Add class to that link
    link.className = 'delete-item secondary-content'
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append link to li
    li.appendChild(link)
    // append li to ul
    taskList.appendChild(li)

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value)

    //Clear input
    taskInput.value=''
    e.preventDefault()
}

function storeTaskInLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks')===null){
        tasks = []
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks))
        
}

function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks')===null){
        tasks = []
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task) {

        // Create li element
        const li = document.createElement('li')
        li.className = 'collection-item'
        // Text node for the li item and append to the li
        li.appendChild(document.createTextNode(task))
        // Create a new link element
        const link = document.createElement('a')
        // Add class to that link
        link.className = 'delete-item secondary-content'
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // Append link to li
        li.appendChild(link)
        // append li to ul
        taskList.appendChild(li)
        
    });
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove()
            alert('Task has been deleted successfully!')
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
    
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks')===null){
        tasks = []
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task,index) {
        if(taskItem.textContent===task){
            tasks.splice(index,1)
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function clearTasks(e){
    if(e.target.classList.contains('clear-tasks')){
        if(confirm('Are you sure you want to clear all Tasks?')){
            // taskList.innerHTML =''
            while(taskList.firstChild){
                taskList.removeChild(taskList.firstChild)
            }
        }
    }
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear()
}


function filterTasks(e){
    const text = e.target.value.toLowerCase()
    // console.log(text)
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent
            if(item.toLowerCase().indexOf(text)!=-1){
                task.style.display='block'
            }
            else{
                task.style.display='none'
            }
        }
    )

}
