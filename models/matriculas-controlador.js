/**
 * Created by edward on 3/11/16.
 */

var db= require('../db');


//hacer matricula

exports.createMatricula= function (id_curso, id_estudiante, done) {

    var matricula = {
        id_curso: id_curso,
        id_estudiante: id_estudiante
    };
    db.get().query('INSERT INTO appnotas_matricula SET ? ',matricula, function (err, rows) {
        if(err){
            return done(err);
        }else{
            done(null, rows);
        }

    });
    
};

//actualizar nota curso

exports.actualizarPut= function (id_curso, id_estudiante, nota_obtenida, done) {

    var act = {
        id_curso: id_curso,
        id_estudiante: id_estudiante,
        nota_obtenida: nota_obtenida
    };
    db.get().query('UPDATE appnotas_matricula SET nota_obtenida = ? WHERE id_curso = ? AND id_estudiante = ?', [nota_obtenida,id_curso,id_estudiante], function (err, rows) {
        if(err){
            return done(err);
        }else{
            done(null, rows);
        }
        
    });
};