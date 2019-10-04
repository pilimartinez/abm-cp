const showModal = () => {
    let modal = document.getElementById("modal");
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}

let list = []

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

let valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const emailIsValid = correo => valid.test(correo);
const isFilled = input => {if (input.value.length !=0) {return isFilled}}

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

const editItem = (id) => {
    const editButton=document.getElementById('modal-button')
    editButton.innerHTML=''
    editButton.appendChild(createButton('Edit', editItem2, id))
    showModal()
    let user =''
    fetch(`api/users/byid/${id}`)
        .then(res=>res.json())
        .then(res=> {
            user = res
            document.getElementById('name').value=user.name
            document.getElementById('email').value=user.email
            document.getElementById('address').value=user.address
            document.getElementById('phone').value=user.phone
        })
}

const editItem2 = (id) => {    
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const address = document.getElementById('address')
    const phone = document.getElementById('phone')
    if (isFilled(name) && isFilled(email) && isFilled(address) && isFilled(phone)
        && emailIsValid(email.value)) {
        const newEmployee = new newItem (name.value.toString().toLowerCase(),email.value,address.value,phone.value)
        fetch (`/api/users/edit/${id}`, {
            method:'PATCH',
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


    // fetch (`api/users/edit/${id}`, {
    //     method:'PATCH',
    //     headers: {'Content-Type':'application/json'},
    //     body:JSON.stringify(user)        
    // })
    //     .then(res => res.json())
    //     .then(res => initialize())


const deleteItem = (id) => {
    fetch (`api/users/delete/${id}`, {
        method:'DELETE',
        headers: {
            'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            initialize()
        })
    } 

const createButton = (classBtn, btnFunction, id) => {
    btn=document.createElement('button')
    btn.innerText=classBtn
    btn.classList.add(classBtn)
    btn.id=id
    btn.onclick=()=>{btnFunction(id)}
    return btn
}

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
    containerButtons.classList.add('button')
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
    fetch(`/api/users/byname/${name}`)
        .then((res) => res.json())
        .then((result) => createTable(result, 'search-result'))
}