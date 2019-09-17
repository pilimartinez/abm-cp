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

// Este será un nuevo tipo de dato - también tendría que tener un id pero no pensé cómo generarlo
class newItem {
    constructor(name, email, address, phone) {
        this.name = name; //tu first_name es que se recibe por parámetro.
        this.email = email; //this es un elemento referencial, llama a la función en la que estoy.
        this.address = address;
        this.phone = phone
    }
}

//Acá le podría pasar list por parámetro? quiero? Sería traer de la api y poner todo en pantalla
const initialize = () => {
    fetch('/api/users')
        .then(response => response.json())
        .then(res => {
            list = res
            printList()
        })
}

//Tomo los valores del modal:
const addNew = () => {
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const address = document.getElementById('address')
    const phone = document.getElementById('phone')
    //  VALIDACIÓN - todo lo que sigue solo me interesa hacerlo si es válido el dato
    const newEmployee = new newItem (name.value,email.value,address.value,phone.value)
    fetch ('api/users', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newEmployee)
    })
        .then(res => res.json())
        .then(res => {
            name.value =""
            email.value =""
            address.value =""
            phone.value =""
            initialize()
            showModal()
        })
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
var createButton = (classBtn, index, btnFunction) => {
    btn=document.createElement('button')
    btn.innerText=classBtn
    btn.classList.add(classBtn)
    btn.id=index
    btn.onclick=()=>{btnFunction(this)}
    return btn
}

//Esta crea una fila nueva, por favor veámosla, la veo tan horrible.
var createRow = (newItem,index) => {
    const newRow = document.createElement('tr')
    const newNameCell=document.createElement('td')
    newNameCell.innerText=newItem.name
    newRow.appendChild(newNameCell)
    const newEmailCell=document.createElement('td')
    newEmailCell.innerText=newItem.email
    newRow.appendChild(newEmailCell)
    const newAddressCell=document.createElement('td')
    newAddressCell.innerText=newItem.address
    newRow.appendChild(newAddressCell)
    const newPhoneCell=document.createElement('td')
    newPhoneCell.innerText=newItem.phone
    newRow.appendChild(newPhoneCell)
    const containerButtons=document.createElement('td')
    containerButtons.classList.add('button')
    containerButtons.appendChild(createButton('edit',index,editItem))
    containerButtons.appendChild(createButton('remove',index,deleteItem))
    newRow.appendChild(containerButtons)
       
    return newRow
}

//La función genérica!!! Querré pasarle la lista por parámetro? Ver
const printList = () => {
    const container = document.getElementById('container')
    container.innerHTML=''
    list.map((newItem, index) => container.appendChild (createRow(newItem,index)))
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

/* esto todavía no entiendo cómo usar
const customFetch = (url, method, payload = '') => {
    const endpoint = `/api/users/${url}`
    let options = {
      method: method,
      headers: {'Content-Type': 'application/json'}
    }
    if(method !== 'GET' && payload) options.body = payload
    return fetch(endpoint, options)
      .then( response => response.json())
}*/

