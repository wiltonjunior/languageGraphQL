module.exports = function (app) {
   var graphql = app.get("graphql");
   var autor = {};

   autor.type = new graphql.GraphQLObjectType({
     name : "Autor",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeAutor : {type : graphql.GraphQLString},
       emailAutor : {type : graphql.GraphQLString},
       senhaAutor : {type : graphql.GraphQLString},
       sexo : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       pais : {type : graphql.GraphQLString},
       estado : {type : graphql.GraphQLString},
       cidade : {type : graphql.GraphQLString},
       idIdioma : {type : graphql.GraphQLString},
       caminhoImagem : {type : graphql.GraphQLString},
       status : {type : graphql.GraphQLInt}
     }
   });


   autor.typeInput = new graphql.GraphQLInputObjectType({
     name : "AutorInput",
     fields : {
       nomeAutor : {type : graphql.GraphQLString},
       emailAutor : {type : graphql.GraphQLString},
       senhaAutor : {type : graphql.GraphQLString},
       sexo : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       pais : {type : graphql.GraphQLString},
       estado : {type : graphql.GraphQLString},
       cidade : {type : graphql.GraphQLString},
       idIdioma : {type : graphql.GraphQLString},
       caminhoImagem : {type : graphql.GraphQLString},
       status : {type : graphql.GraphQLString}
     }
   })

   return autor;
}
