//Magia Con Bello Modal
const showModal = () => {
    let modal = document.getElementById("modal");
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}

//De acá para adelante vamos a trabajar con datos. Tal vez queramos hacer módulos o algo así
let list = []

//Acá le podría pasar list por parámetro? quiero? Sería traer de la api y poner todo en pantalla
const initialize = () => {
    fetch('/api/users')
        .then(response => response.json())
        .then(res => {
            list = res.users
            printList()
        })
}

//Tomo los valores del modal:
var addNew = () => {
    //Me interesa una cosa que no me acuerdo sobre instanciamiento de datos
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const address = document.getElementById('address')
    const phone = document.getElementById('phone')
    
//validacion pedorra, solo ve si esta todo completo.
//cuando hay cosas incompletas, limpia todos los campos (arreglar)
    if (name.value.length && email.value.length && address.value.length && phone.value.length != 0) {
        const newItem = {"name":name.value, "email":email.value, "address":address.value, "phone": phone.value}
        list.push(newItem) 
        showModal()
        name.value =""
        email.value =""
        address.value =""
        phone.value =""
        printList()
    } else { 
        alert("Todos los campos deben estar completos")
    }
}

// Esto sé que hacía algo al apretar enter. Me parece que no lo vamos a querer, 
// salvo que sea en el último input. O por ahí si verificamos que están todos los campos llenos.
// también ver que en el filtrado está más piola como queda
// Veamo
const keyPress = (event) => {
    event.code === 'Enter'?addNew():false
}

// Esta para editar. Puse cualquiera, debería traer el dato completo en vez de estar vacío
const editItem = (btn) => {
    showModal()
    printList()
}

//Esta es el botón de borrar pero seguro cambia porque esto no va al servidor
const deleteItem = (btn) => {
    list.splice (btn.id,1)
    printList()
}

//Esta es para crear botones. Hay que darles amor, pobres chiquitines.
var createButton = (classBtn, btnFunction) => {
    btn=document.createElement('button')
    btn.innerText=classBtn
    btn.classList.add(classBtn)
    btn.onclick=function(){btnFunction(this)}
    return btn
}

// crea nueva row, botones incluidos
const createTr = (list) => {
    let container = document.getElementById('container')
    container.innerHTML = ''
    list.forEach(field => {
       let tr = document.createElement('tr')
       const containerButtons=document.createElement('td')
       containerButtons.classList.add('button')
       containerButtons.appendChild(createButton('Edit', editItem))
       containerButtons.appendChild(createButton('Remove', deleteItem))
       Object.keys(field).forEach( e=> {
          let td = document.createElement('td')
        td.innerText = field[e]
          tr.appendChild(td)
          tr.appendChild(containerButtons)
       })
       container.appendChild(tr)
    })
  }

const printList = () => {
    createTr(list)
}

//La función de filtrado también puede ir aparte tranquilamente
//La base es esta pero no sé debería haber otra api con keywords o algo???
const filter = () => {
    let query = event.target.value
    if (query.length>=3 || (event.keyCode===13 && query!==lastRequest)) {
        lastRequest=query
    //recorro list.name y traigo todo lo que tiene un string que coincide?    
        fetch ('/api/users')
            .then(res=>res.json())
            .then(res=>printList())
}}