/**
 * Created by edward on 3/11/16.
 */
//modulos
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
//mis modulos
var controlcursos = require('../models/cursos-controlador.js');


module.exports = function () {

    var curso_route = express.Router();
    curso_route.use(bodyParser.json());

    //aqui consulto todos los cursos
    curso_route.route('/').get(function (req, res) {
        console.log("informacion de todos los cursos");

        controlcursos.getAll(function (error, names) {
            if(!error){
                res.json(names);
            }else{
                res.json(error);
            }

        });

    });

    //consulto el curso indicado
    curso_route.route('/:id_curso').get(function (req, res) {
        console.log("información del curso:"+ req.params.id_curso);

        id_curso= req.params.id_curso;

        controlcursos.getCurso(id_curso, function (error, curso) {
            if(!error){
                res.json(curso);
            }else{
                res.json(error);
            }
        });

    });

    //se consulta el periodo de un curso

    curso_route.route('/periodo/:periodo').get(function (req, res) {
        periodo= req.params.periodo;
        controlcursos.getPeriodoCurso(periodo, function (error, curso) {
            if (!error){
                res.json(curso);
            }else{
                res.json(error);
            }
        });

    });

    // estudiantes matriculados en un curso

    curso_route.route('/:id_curso/estudiantes').get(function (req, res) {

        id_curso= req.params.id_cursos;
        controlcursos.getEstudiante(id_curso, function (error, curso) {
            if(!error){
                res.json(curso);
            }else{
                res.json(error);

            }
        });
        
    });


    //crear nuevo curso
    curso_route.route('/').post(function (req, res) {
        console.log("ha sido creado un nuevo curso con nombre:"+ req.body.nombre+"y en el periodo"+ req.body.nombre);
        controlcursos.createEstudiente(req.body.nombre, req.body.periodo, function (err, done) {
            if(!err){
            res.json(done);
            }else{
                res.json(err);
            }
        });

    });


    return curso_route;

}();




