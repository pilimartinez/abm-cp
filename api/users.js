const users = [
    {'name': 'Pili Lovelace', 'email': 'satisfaceamauricio@gmail.com', 'address': 'Caminito 345', 'phone': '46020289'}, 
    {'name': 'Ceci Hopper', 'email': 'cariciasignificativa@hotmail.com', 'address':'Paseo Colon 678','phone': '45032212'}
]

const handler = (req, res, next) => {
	console.log('Pidiendo usuarios');
	res.json({ users });
	// next();
};

module.exports = handler;