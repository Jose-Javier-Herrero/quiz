var models = require('../models/models.js');

// Autoload - factoriza el c�digo si la ruta incluye :commentId
exports.load = function(req, res, next, commentId) {  
  	models.Comment.find({
			where: {
				id: Number(commentId)
			}
		}).then(
		function(comment){
			if(comment){
				req.comment = comment;
				next();
			}else{
				next(new Error('No existe commentId=' + commentId));
			}
		}
	).catch(function(error){ next(error); });
};

//GET /quizes/:quizId(\\d+)/comments/new
exports.new = function(req, res){
	res.render('comments/new.ejs', {quizId: req.params.quizId, errors: []});
};

//POST /quizes/:quizId(\\d+)/comments
exports.create = function(req, res, next){
	var comment = models.Comment.build( 
		{
			texto: req.body.comment.texto,
			QuizId: req.params.quizId
		}
	);
	
	comment
	.validate()
	.then(
		function(err) {
			if(err) {
				res.render('comments/new.ejs', {quizId: req.params.quizId, comment: comment, errors: err.errors});
			} else {
				comment
				.save()
				.then(function(){
						res.redirect('/quizes/' + req.params.quizId);
				});
			}
		}
	).catch(function(error){next(error)});
};

//GET /quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish
exports.publish = function(req, res){

	// Marcamos el flag publicado a true
	req.comment.publicado = true;
	
	// Hacemos una actualizaci�n parcial
	req.comment.save( {fields: ["publicado"]} )
			   .then(function(){res.redirect('/quizes/' + req.params.quizId);})
			   .catch(function(error){next(error)});
			   
};