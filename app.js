
var express = require("express");
var morgan= require("morgan");
var bodyparser= require("body-parser");

var db= require("./db");

// inicialización de modulos


var app= express();
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

//rutas

var route_curso= require("./routes/cursos-route.js");
var route_estudiantes= require("./routes/estudiantes-route.js");
var route_matrica =require("./routes/matriculas-route.js");


app.use('/servicios/cursos', route_curso);
app.use('/servicios/estudiantes', route_estudiantes);
app.use('/servicios/matriculas', route_matrica);


// conexion con base de datos
db.connect(function (err) {
    if(err){

        console.log("lo sentimos no se pudo conectar a la base de datos");
        process.exit(1);//se cierra la app
    }else {

        var host= 'localhost';
        var puerto = 4000;

        app.listen(puerto, host, function () {

            console.log('servidor iniciado en http//'+host+':'+puerto+'/');

        });

    }



});

