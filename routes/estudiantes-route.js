/**
 * Created by edward on 3/11/16.
 */
//modulos
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
//mis modulos
var controlestudiantes = require('../models/estudiantes-controlador.js');


module.exports = function () {

    var estudiante_route = express.Router();
    estudiante_route.use(bodyParser.json());

    //aqui consulto todos los estudiantes
    estudiante_route.route('/').get(function (req, res) {
        console.log("informacion de todos los estudiantes");

        controlestudiantes.getAll(function (error, names) {
            if(!error){
                res.json(names);
            }else{
                res.json(error);
            }

        });

    });

    //consulto un estudiante en particular
    estudiante_route.route('/:id_estudiante').get(function (req, res) {
        console.log("información del estudiante:"+ req.params.id_estudiante);

        id_estudiante= req.params.id_estudiante;

        controlestudiantes.getEstudiante(id_estudiante, function (error, estudiante) {
            if(!error){
                res.json(estudiante);
            }else{
                res.json(error);
            }
        });

    });

    //informacion de los cursos de un estudiante

    estudiante_route.route('/:id_estudiante/curso').get(function (req, res) {
        id_estudiante= req.params.id_estudiante;
        controlestudiantes.getCursosEstudiantes(id_estudiante, function (error, estudiante) {
            if (!error){
                res.json(estudiante);
            }else{
                res.json(error);
            }
        });

    });


    //agregar estudiante

    estudiante_route.route('/').post(function (req, res) {
        console.log("ha sido agregado el estudiante: "+ req.body.nombres+"y apellido"+ req.body.apellidos);
        controlestudiantes.createEstudiante(req.body.nombres, req.body.apellidos, req.body.semestre, function (err, done) {
            if(!err){
                res.json(done);
            }else{
                res.json(err);
            }
        });

    });


    return estudiante_route;

}();




