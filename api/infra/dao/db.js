/**Configuração padrão de conexão**/
var mongoose = require('mongoose');
var APIManager = require('../../business/control/apiManager');

var dbURI = 'mongodb://localhost/provas-api';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function (err) {
    console.log('\nMongoose connected to ' + dbURI);
    new APIManager().initialize();
});

mongoose.connection.on('error', function (err) {
    console.log('\nMongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function (err) {
    console.log('\nMongoose disconnected');
});

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log("\nMongoose dsiconnected through " + msg);
        callback();
    });
}

process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

process.on('SIGTERM', function () {
    gracefulShutdown('heroku app shutdown', function () {
        process.exit(0);
    });
});
