/**
 * Created by edward on 3/11/16.
 */

//modulo msql que se encargara de conectarce con la base de datos
var mysql= require("mysql");

var state = {
    pool : null,
};

exports.connect= function (done) {
    state.pool= mysql
        .createPool({
            host: "programacion-web-test.cejfwltsp021.sa-east-1.rds.amazonaws.com",
            user: "14212012",
            password: "14212012",
            database:"14212012"
        });
    done();
};

exports.get= function () {
    return state.pool;
};