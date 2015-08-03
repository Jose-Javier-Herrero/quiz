var express = require('express');
var router = express.Router();

//Importar los controladores
var quizController = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/author', function(req, res) {
  res.render('author', { author: 'José Javier Herrero Javaloy' });
});

//Autoload de parametros con :quizId
router.param('quizId', quizController.load);

//Quiz Controller routes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
