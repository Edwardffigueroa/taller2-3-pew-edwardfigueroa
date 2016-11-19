/**
 * Created by edward on 19/11/16.
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

appModule.controller("controlCursos", function ($scope, $http) {

$scope.idCurso= getParameterByName("curso");


    $http.get("/servicios/cursos/1/estudiantes").then(function (response) {
        $scope.estudiantesCurso = response.data;
        console.log( $scope.estudiantesCurso[0]);

    });


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

});
