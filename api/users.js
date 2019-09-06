const users = [
    {nombre: 'Pili', apellido: 'Lovelace',telefono: '46020289', email: 'satisfaceamauricio@gmail.com'}, 
    {nombre: 'Ceci', apellido: 'Hopper', telefono: '45032212', email: 'cariciasignificativa@hotmail.com'}
]

const handler = (req, res, next) => {
	console.log('Pidiendo usuarios');
	res.json({ users });
	next();
};

module.exports = handler;