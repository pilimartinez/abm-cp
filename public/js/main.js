//Modal aparece y desaparece
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
        this.name = name; 
        this.email = email; 
        this.address = address;
        this.phone = phone
    }
}

const initialize = () => {
    fetch('/api/users')
        .then(response => response.json())
        .then(res =>{ 
            list = res
            createTable(list,'container')})
}

//Validación
let valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const emailIsValid = correo => valid.test(correo);
const isFilled = input => {
   if (input.value.length !=0) {return isFilled}
}

//Tomo los valores del modal y cargo un usuario nuevo:
const addNew = () => {
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const address = document.getElementById('address')
    const phone = document.getElementById('phone')
    if (isFilled(name) && isFilled(email) && isFilled(address) && isFilled(phone)
        && emailIsValid(email.value)) {
        const newEmployee = new newItem (name.value.toString().toLowerCase(),email.value,address.value,phone.value)
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
    } else { 
        alert("Chequea los campos para seguir")
    }
}

// Esta para editar. Puse cualquiera, esto lo tenemos que ajustar con lo de patch user
const editItem = (btn) => {
    showModal()
    addNew()
}

//Esta es el botón de borrar como lo hacíamos antes
// const deleteItem = (btn) => {
//     let result = list.find((e,i) => e.id == btn)
//     let index = list.indexOf(result)
//     if(index !== -1){
//         list.splice(list.indexOf(result),1)
//         // res
//     } else {
//         // respuesta con
//     }
//     createTable(list,'container')
// }

const deleteItem = (id) => {
    console.log(id)
        fetch (`api/users/delete/${id}`, {
            method:'DELETE',
            headers: {
                'Content-Type':'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                initialize()
                showModal()
            })
    } 

//Esta es para crear botones. Hay que darles amor, pobres chiquitines.
var createButton = (classBtn, btnFunction, id) => {
    btn=document.createElement('button')
    btn.innerText=classBtn
    btn.classList.add(classBtn)
    btn.id=id
    btn.onclick=()=>{btnFunction(id)}
    return btn
}

// crea nueva row, botones incluidos
const createTable = (list,cont) => {
    let container = document.getElementById(cont)
    container.innerHTML = ''
    list.forEach((item,index)=>{
        container.appendChild(createRow(item,index))
    })
}

const createRow = (item) => {
    const tr = document.createElement('tr')
    Object.keys(item).forEach(e=>{
        const td = document.createElement('td')
        td.innerText = item[e]
        tr.appendChild(td)
    })
    const containerButtons=document.createElement('td')
    // containerButtons.classList.add('button')
    containerButtons.appendChild(createButton('Edit', editItem, item.id))
    containerButtons.appendChild(createButton('Remove', deleteItem, item.id))
    tr.appendChild(containerButtons)
    return tr
}

let lastRequest;
const handleSearch = () => {
  let query = event.target.value;
  if ( (event.keyCode === 13 && query !== lastRequest)) {
    lastRequest = query.toString().toLowerCase();
    userSearch(lastRequest)
    container.innerHTML = ''
  }
};

const userSearch = (name) => {
    return fetch(`/api/users/${name}`)
    .then((res) => res.json())
    .then((result) => createTable(result, 'search-result'))

  }