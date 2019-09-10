let list = []

//Acá le podría pasar list por parámetro? quiero?
fetch('/api/users')
    .then(response => response.json())
    .then(res =>list =[])

//Tomo los valores del modal:
var addNew = (list) =>{
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const address = document.getElementById('address').value
    const phone = document.getElementById('phone').value
// Acá vamos a querer validación y tal vez limpiar el value de todo, veremos  
    list.push({"name":name, "email":email, "address":address, "phone": phone}) 
    printTask()
}


var allTasks=[]
var btn, completed, containerButtons, item, listItem, listItemContent, newTask, toDo

//Esto sé que hacía algo al apretar enter
var keyPress=function(event){
    event.code === 'Enter'?addTask():false
}

//Esta era para el botón de pasar a hecho. No lo necesitamos
var toggleTask = function (btn) {
    allTasks[btn.id].isCompleted=!allTasks[btn.id].isCompleted
    printTask()
}

//Esta sí la vamos a usar, es del botón de borrar.
var deleteTask=function (btn) {
    allTasks.splice (btn.id,1)
    printTask()
}

//Esta es para crear botones
var createButton=function(classBtn, index, btnFunction){
    btn=document.createElement('button')
    btn.classList.add(classBtn)
    btn.id=index
    btn.onclick=function(){btnFunction(this)}
    return btn
}

//Esta creo que creaba un elemento nuevo, así que la queremos

var createLi = function (task,index) {
    listItem = document.createElement('li')
            
    listItemContent=document.createElement('p')
    listItemContent.innerText=task.text
    
    containerButtons=document.createElement('div')
    containerButtons.classList.add('button')
    containerButtons.appendChild(createButton('toggle', index,toggleTask))
    containerButtons.appendChild(createButton('remove',index,deleteTask))
    containerButtons.appendChild(createButton('edit',index,createNewInput))

    listItem.appendChild(listItemContent)
    listItem.appendChild(containerButtons)

    return listItem
}

//La función genérica!!!
var printTask=function(){
    toDo=document.getElementById('toDo')
    toDo.innerHTML=''

    completed=document.getElementById('completed')
    completed.innerHTML=''
    
    allTasks.map(function(task, index){
        task.isCompleted? completed.appendChild (createLi(task,index)) : toDo.appendChild (createLi(task,index))
    })

    //este pedacito adicional imprime el textito cuando no hay tareas
    textWhenEmpty(toDo, '¡No hay tareas pendientes!')
    textWhenEmpty(completed, 'No hay tareas terminadas.')
}

