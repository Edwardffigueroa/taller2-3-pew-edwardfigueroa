/**
 * Created by edward on 3/11/16.
 */

var db= require('../db');

//consultar todos los estudiantes

exports.getAll= function (done) {
    db.get().query('SELECT * FROM appnotas_estudiantes', function (err, rows) {
        if(err){
            return done(err);

        }else{

            done(null, rows);

        }
    });
};

//consulto un estudiante en particular

exports.getEstudiante= function (id_estudiante, done) {
    db.get().query('SELECT nombres, apellidos, semestre FROM appnotas_estudiantes WHERE id_estudiante=? ',id_estudiante, function (err, rows) {
        if(err){
            return done(err);
        }else{
            done(null, rows);
        }
    });
    ;
} 


//informacion de los cursos de un estudiante

exports.getCursosEstudiantes= function (id_estudiante, done) {
    db.get().query("SELECT nc.nombre ,nm.nota_obtenida, nc.id_curso, nm.id_estudiante FROM  appnotas_matricula nm, appnotas_cursos nc  WHERE nm.id_estudiante= ?  AND nm.id_curso = nc.id_curso", id_estudiante, function (err,rows) {
     if(err){
        return done(err);

     }else{

         done(null, rows);

     }
    });
};


//agregar estudiante

exports.createEstudiante= function (nombre, apellido, semestre, done) {

    var estudiante = {

        nombres: nombre,
        apellidos: apellido,
        semestre: semestre
    };
    db.get().query('INSERT INTO appnotas_estudiantes SET ? ',estudiante, function (err, rows) {
        if(err){
            return done(err);
        }else{
            done(null, rows);

        }
    });
};