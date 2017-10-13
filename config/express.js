var express = require("express");
var graphql = require("graphql");
var graphqlHTTP = require("express-graphql");
var load = require("express-load");
const database = require("./database")();
const auth = require("./auth")();

module.exports = function () {
   var app = express();

   app.set("database",database);
   app.set("graphql",graphql);
   app.set("graphqlHTTP",graphqlHTTP);
   app.set("auth",auth);

   app.use(auth.initialize());

   load("model",{cwd : 'app'}).then("query").then("mutation").into(app);
   load("app").into(app);

   return app;

}
