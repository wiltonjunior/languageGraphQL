module.exports = function (app) {
   var graphql = app.get("graphql");
   var idioma = {};

   idioma.type = new graphql.GraphQLObjectType({
     name : "Idioma",
     fields : {
       _key : {type : graphql.GraphQLString},
       idioma : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString},
       caminhoImagem : {type : graphql.GraphQLString}
     }
   });


   idioma.typeInput = new graphql.GraphQLInputObjectType({
     name : "IdiomaInput",
     fields : {
       idioma : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString}
     }
   })

   return idioma;
}
