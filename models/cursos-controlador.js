/**
 * Created by edward on 3/11/16.
 */

var db= require('../db');


    //se consultan los cursos
exports.getAll= function (done) {

    db.get().query('SELECT * FROM appnotas_cursos', function (err, rows) {
        if(err){
            return done(err);
           console.log("hay error");
        }else {
            done(null, rows);
        }
    });
};

    //consulto el curso indicado
exports.getCurso = function (id_curso, done) {
    db.get().query('SELECT nombre, periodo,id_curso FROM appnotas_cursos WHERE id_curso= ?', [id_curso], function (err, rows) {
        if(err){

            return done(err);
        }else{

            done(null, rows);
        }
    });
    
};

    //consulto el periodo de un curso

exports.getPeriodoCurso= function (periodo, done) {
    db.get().query('SELECT nombre FROM appnotas_cursos WHERE periodo=?', [periodo], function (err, rows) {
        if(err){
            return done(err);
        }else{
            done(null, rows);
        }
    });
};

    //ver estudiantes de un curso
exports.getEstudiante= function (id_curso, done) {

    db.get().query('SELECT estudiantes.nombres, estudiantes.apellidos, estudiantes.id_estudiante, matri.nota_obtenida, cursos.id_curso FROM appnotas_estudiantes estudiantes, appnotas_cursos cursos, appnotas_matricula matri WHERE estudiantes.id_estudiante=matri.id_estudiante AND matri.id_curso=cursos.id_curso AND cursos.id_curso= ?', [id_curso], function (err, rows) {
     if(err){
        return done(err);

     }else {
        done(null, rows);
     }
 });
};

    //crear nuevo curso

exports.createEstudiente= function (nombre, periodo, done) {

    var curso = {
        nombre: nombre,
        periodo: periodo

    };

    db.get().query('INSERT INTO appnotas_cursos SET ?', curso, function (err, rows) {
       if(err){
           console.log("error al insertar");
           return done(err);

       } else{

           done(null, rows);
       }
    });
};



