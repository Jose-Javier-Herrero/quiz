var path = require('path');

//Postgres 	DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite	DATABASE_URL = sqlite://:@:/
var url 		= process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name 	= (url[6]||null);
var user		= (url[2]||null);
var pwd			= (url[3]||null);
var protocol	= (url[1]||null);
var dialect		= (url[1]||null);
var port 		= (url[5]||null);
var host		= (url[4]||null);
var storage		= (process.env.DATABASE_STORAGE||null);

var Sequelize = require('sequelize');

// Usar BBDD SQLite y indicar nombre ase de datos
var sequelize = new Sequelize(DB_name, user, pwd, 
	{	dialect: 	dialect,
		protocol: 	protocol,
		port:		port,
		host:		host,
		storage:	storage,	//solo SQLite (.env)
		omitNull:	true		//solo Postgres 	
	}
);

// Importar la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Exportar el objeto de modelo Quiz
exports.Quiz = Quiz;

// Cración de las tablas importadas
sequelize.sync().then(function() {
	Quiz.count().success(function(count) {
		// Si la tabla está vacia la inicializamos con una pregunta
		if(count === 0) {
			Quiz.create({
				pregunta: 	'Cúal es la capital de Italia',
				respuesta: 	'Roma'
			})
			.success(function(){
				console.log('Base de datos inicializada');
			});
		}
	});
});