var models = require('../models/models.js');

// GET quizes/statistics
exports.index = function(req, res, next) { 

	// Variables de salida
	var totalQuizes = 0;
	var totalComments = 0;
	var averageComments = 0;
	var quizesWithoutComments = 0;
	var quizesWithComments = 0;
	
	// Variables temporales
	var comentariosPorPregunta = new Array();
	
	// El número de comentarios totales
	models.Quiz.findAll({
			include: [{model: models.Comment}]
		}).then(
		function(quizes){
			
			if(quizes) {
				for(var i = 0; i < quizes.length; i++){
					var quiz = quizes[i];
					comentariosPorPregunta.push((quiz.Comments)?quiz.Comments.length:0);
				}
				totalQuizes = comentariosPorPregunta.length;
				if(totalQuizes > 0) {
					for(var i = 0; i < comentariosPorPregunta.length; i++){
						if(comentariosPorPregunta[i] === 0){
							quizesWithoutComments++;
						}else{
							quizesWithComments++;
							totalComments += comentariosPorPregunta[i];
						}
					}
					averageComments = totalComments / totalQuizes;
				}
				
				res.render('statistics/index.ejs', {	
					totalQuizes: totalQuizes, 
					totalComments: totalComments,
					averageComments: averageComments,
					quizesWithComments: quizesWithComments,
					quizesWithoutComments: quizesWithoutComments,
					errors: []
				});
			}
		}
	).catch(function(error){ next(error); });
};
