module.exports = function (app) {
   var graphql = app.get("graphql");

   var nivel = {};

   nivel.type = new graphql.GraphQLObjectType({
     name : "Nivel",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeNivel : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString}
     }
   });

   nivel.typeInput = new graphql.GraphQLInputObjectType({
     name : "NivelInput",
     fields : {
       nomeNivel : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString}
     }
   })


   return nivel;
}
