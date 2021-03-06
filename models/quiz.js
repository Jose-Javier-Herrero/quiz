﻿module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
		'Quiz',
		{
			pregunta:  {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Falta introducir la pregunta"} }
			},
			respuesta:  {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Falta introducir la respuesta"} }
			},
			tema:  {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Falta seleccionar la temática"} }
			}
		}
	);
}