var express = require("express");
var graphql = require("graphql");
var graphqlHTTP = require("express-graphql");
var load = require("express-load");
const database = require("./database")();

module.exports = function () {
   var app = express();

   app.set("database",database);
   app.set("graphql",graphql);
   app.set("graphqlHTTP",graphqlHTTP);

   load("model",{cwd : 'app'}).then("query").then("mutation").into(app);
   load("app").into(app);

   return app;

}
