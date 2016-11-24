/**
 * Created by edward on 19/11/16.
 * Suport by Andres GC
 */
var appModule = angular.module('app', ['angular.filter']);

appModule.controller("control", function ($scope, $http) {


    $http.get("/servicios/cursos").then(function (response) {
        $scope.cursos = response.data;

    });

    $scope.per;

    $scope.cambiarperiodo= function(val){
        $scope.per=val;
    }

});

//-----------------------------CONTROL CURSOS---------------------------------------------------------------------------


appModule.controller("controlCursos", function ($scope, $http) {

$scope.idCurso= getParameterByName("curso");

    $http.get("/servicios/cursos/"+$scope.idCurso).then(function (response) {
        $scope.curso = response.data;

    });

    $http.get("/servicios/cursos/"+$scope.idCurso+"/estudiantes").then(function (response) {
        $scope.estudiantesCurso = response.data;
       console.log( $scope.estudiantesCurso[0]);

        $scope.promedio = promedio();

    });

    $http.get("/servicios/estudiantes/" + $scope.id_estudiante + "/curso").then(function (response) {
        $scope.cursosEstudiante = response.data;
    });

    //realiza el promedio
    function promedio() {

        est = $scope.estudiantes;
        var prom = 0;

        for (var i = 0; i < est.length; i++) {
            console.log(est[i].nota_obtenida);
            prom += parseInt(est[i].nota_obtenida);
        }

        prom = prom / est.length;
        return prom;
    }


    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }



   // $scope.actualizar= function() {
        $scope.actualizar = function (idcurso, idestudiante, notaNew) {

            window.alert("Nota Actualizada");
        var data = {

            id_curso: idcurso,
            id_estudiante: idestudiante,
            nota_obtenida: notaNew

        };

        $http.put('/servicios/matriculas/', JSON.stringify(data)).then(function (response) {
            if (response.data) {
                $scope.msg = "Put Data Method Executed Successfully!";
                console.log($scope.msg);
            }

        }, function (response) {
            $scope.msg = "Service not Exists";
            $scope.statusval = response.status;
            $scope.statustext = response.statusText;
            $scope.headers = response.headers();

        });
    }

});

//-----------------------------------CONTROL ESTUDIANTES----------------------------------------------------------------

appModule.controller("controlEstudiante", function ($scope, $http) {

    $scope.id_estudiante = getParameterByName("idestudiante");

    //aqui obtengo todos los estudiante
    $http.get("/servicios/estudiantes/"+ $scope.id_estudiante).then(function (response) {
        $scope.infoEstudiante = response.data;
    });

    //y aqui obtengo los cursos por estudiante

    $http.get("/servicios/estudiantes/" + $scope.id_estudiante + "/curso").then(function (response) {
        $scope.cursosEstudiante = response.data;
     });


    $scope.promedioCursos = function promedio() {
        est = $scope.cursosEstudiante;
        var prom = 0;

        for (var i = 0; i < est.length; i++) {
            console.log(est[i].nota_obtenida);
            prom += parseInt(est[i].nota_obtenida);
        }
        prom = prom / est.length;
        return prom;
    }

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    $scope.actualizarM = function (idcurso, idestudiante, notaNew) {

        window.alert("Nota Actualizada");
        var data = {

            id_curso: idcurso,
            id_estudiante: idestudiante,
            nota_obtenida: notaNew

        };

        $http.put('/servicios/matriculas/', JSON.stringify(data)).then(function (response) {
            if (response.data) {
                $scope.msg = "Put Data Method Executed Successfully!";
                console.log($scope.msg);

            }

        }, function (response) {
            $scope.msg = "Service not Exists";
            $scope.statusval = response.status;
            $scope.statustext = response.statusText;
            $scope.headers = response.headers();

        });
    }



});


//-----------------------------------CONTROL NOTAS-------------//POR TERMINAR SÓLO ESTOY MOSTRANDO LA INFORMACIÓN DE UN ESTUDIANTE

appModule.controller("controlNota", function ($scope, $http) {


        $scope.id_estudiante=1;




    //aqui obtengo todos los estudiante
    $http.get("/servicios/estudiantes/"+ $scope.id_estudiante).then(function (response) {
        $scope.infoEstudiante = response.data;
    });

    //y aqui obtengo los cursos por estudiante

    $http.get("/servicios/estudiantes/" + $scope.id_estudiante + "/curso").then(function (response) {
        $scope.cursosEstudiante = response.data;
    });


    $scope.promedioCursos = function promedio() {
        est = $scope.cursosEstudiante;
        var prom = 0;

        for (var i = 0; i < est.length; i++) {
            console.log(est[i].nota_obtenida);
            prom += parseInt(est[i].nota_obtenida);
        }
        prom = prom / est.length;
        return prom;
    }

    $scope.actualizarM = function (idcurso, idestudiante, notaNew) {

        window.alert("Nota Actualizada");
        var data = {

            id_curso: idcurso,
            id_estudiante: idestudiante,
            nota_obtenida: notaNew

        };

        $http.put('/servicios/matriculas/', JSON.stringify(data)).then(function (response) {
            if (response.data) {
                $scope.msg = "Put Data Method Executed Successfully!";
                console.log($scope.msg);

            }

        }, function (response) {
            $scope.msg = "Service not Exists";
            $scope.statusval = response.status;
            $scope.statustext = response.statusText;
            $scope.headers = response.headers();

        });
    }



});

//-----------------------------CONTROL MATRICULA------------------------------------------------------------------------

appModule.controller("controlMatricula", function ($scope, $http) {

    $http.get("/servicios/cursos/").then(function (response) {
        $scope.cursosnotas = response.data;

    });

    $http.get("/servicios/estudiantes/").then(function (response) {
        $scope.estudiantesNotas = response.data;
    });

    $scope.seleccionCurso;
    $scope.seleccionEstudiante;

    $scope.matricular= function() {

        var data = {

            id_curso: $scope.seleccionCurso,
            id_estudiante: $scope.seleccionEstudiante

        };

        $http.post('/servicios/matriculas/', JSON.stringify(data)).then(function (response) {
            if (response.data) {
                $scope.msg = "Put Data Method Executed Successfully!";
                console.log($scope.msg);

            }

        }, function (response) {

            $scope.msg = "Service not Exists";
            $scope.statusval = response.status;
            $scope.statustext = response.statusText;
            $scope.headers = response.headers();

        });
    }
});



