/**
 * Created by edward on 3/11/16.
 */
//modulos
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
//mis modulos
var controlmatriculas = require('../models/matriculas-controlador');


module.exports = function () {

    var matriculas_route = express.Router();
    matriculas_route.use(bodyParser.json());

    //matricular estudiante

    matriculas_route.route('/').post(function (req, res) {
        console.log("has matriculado el estudiante: "+ req.body.id_estudiante+" en el curso: "+ req.body.id_curso);
        controlmatriculas.createMatricula(req.body.id_curso, req.body.id_estudiante, function (err, done) {
            if(!err){
                res.json(done);
            }else{
                res.json(err);
            }
        });

    });

    //actualizar nota en curso
    matriculas_route.route('/').put(function (req, res) {
        console.log("actualizando notilla en :"+ req.body.nota_obtenida);

        controlmatriculas.actualizarPut(req.body.id_curso, req.body.id_estudiante, req.body.nota_obtenida, function (error, matricula) {
            if(!error){
                res.json(matricula);
            }else{
                res.json(error);
            }
        });

    });


    return matriculas_route;

}();




