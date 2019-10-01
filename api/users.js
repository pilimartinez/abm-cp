const users = [
   {'name': 'ceci hopper', 'email': 'cariciasignificativa@hotmail.com', 'address':'Paseo Colon 678','phone': '45032212','id':'1'},
   {'name': 'pili lovelace', 'email': 'papitaparaelloro@hotmail.com', 'address':'Caminito 123','phone': '46020289', 'id':'2'}
]

// No me acuerdo para qué usábamos esto :(
const getUser = (req, res, next) => {
	res.json(users);
	next();
};

const newUser = (req, res, next) => {
	let data = req.body;
	//acá solamente valido que estén completos los datos, podría ser el formato también
	if (data.hasOwnProperty('name') && data.hasOwnProperty('email') && data.hasOwnProperty('address') && data.hasOwnProperty('phone')) {
		data.id = users.length+1;
		users.push(data);
		res.status('201').json(`recibido correctamente`);
	} else {
		res.status('400').json('por favor completar todos los campos');
	}
	next();
};

// Esto debería ser para reemplazar un pedazo que usamos mucho. Ver.
// const getUserById = (req, res, next) => {
// 	let resUser = users.find((e) => e.id === req.params.id);
// 	if (resUser) {
// 		res.json(resUser);
// 	} else {
// 		res.status(404).send('no encontramos al usuario');
// 	}
// 	next();
// };

const deleteUser = (req,res,next) => {
	let index = ''
	let resUser = users.find((e,i)=>{
		index = i 
		return e.id === req.params.id})

	if (resUser) {
		users.splice(1,index)
		res.status(200).json(users)
	} else {
		res.status(404).send('no encontramos al usuario');
	}
	next();
}

const patchUser = (req, res, next) => {
	let data = req.body
	let index = ''
	let resUser = users.find((e,i) => {
		index=i
		return e.id === req.params.id});

	if (resUser) {
		let editedUser = {...resUser,...data} //toma lo que había y lo pisa con las propiedades
		// de lo que sea que esté viniendo
		users.splice(1,index)
		users.push(editedUser)
	} else {
		res.status(404).send('no encontramos al usuario');
	}
	next();
}

const getSearchUser= (req, res, next) => {
	let searchUser = users.filter(e => e.name === req.params.name)
	if (searchUser) {
		  res.json(searchUser);
	  }  else {
		  res.status(404).send('no encontramos al usuario');
	  } 
  };

module.exports = { getUser, newUser, deleteUser, patchUser, getSearchUser};