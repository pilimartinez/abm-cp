const users = [
    {'name': 'Pili Lovelace', 'email': 'satisfaceamauricio@gmail.com', 'address': 'Caminito 345', 'phone': '46020289'}, 
    {'name': 'Ceci Hopper', 'email': 'cariciasignificativa@hotmail.com', 'address':'Paseo Colon 678','phone': '45032212'}
]

const getUser = (req, res, next) => {
	res.json(users);
	next();
};

const newUser = (req, res, next) => {
	let data = req.body;
	//acá solamente valido que estén completos los datos, podría ser el formato también
	if (data.hasOwnProperty('name') && data.hasOwnProperty('email') && data.hasOwnProperty('address') && data.hasOwnProperty('phone')) {
		//data.id = users.length + 1; buscar otra forma de generar un id
		users.push(data);
		res.status('201').json(`recibido correctamente`);
	} else {
		res.status('400').json('por favor completar todos los campos');
	}
	next();
};

module.exports = { getUser, newUser };