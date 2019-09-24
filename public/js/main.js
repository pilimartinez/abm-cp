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
            createTr(list)
        })
}

let valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const emailIsValid = correo => valid.test(correo);
const isFilled = input => {
   if (input.value.length !=0) {return isFilled}
}

//Tomo los valores del modal:
const addNew = () => {
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const address = document.getElementById('address')
    const phone = document.getElementById('phone')
    if (isFilled(name) && isFilled(email) && isFilled(address) && isFilled(phone)
        && emailIsValid(email.value)) {
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
    } else { 
        alert("Chequea los campos para seguir")
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
    createTr(list)
}

//Esta es el botón de borrar pero seguro cambia porque esto no va al servidor
const deleteItem = (btn) => {
    // list.splice (btn.id,1)
    // createTr(list)
    fetch ('api/users', {
        method:'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
        body: 
    })
        .then(res => res.json())
        .then(res => {
            initialize()
            showModal()
        })
}

//Esta es para crear botones. Hay que darles amor, pobres chiquitines.
var createButton = (classBtn, btnFunction) => {
    btn=document.createElement('button')
    btn.innerText=classBtn
    btn.classList.add(classBtn)
    // btn.id=index
    btn.onclick=()=>{btnFunction(this)}
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
}
}

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

