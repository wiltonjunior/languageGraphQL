module.exports = function (app) {
   var graphql = app.get("graphql");

   var licao = {};

   licao.type = new graphql.GraphQLObjectType({
     name : "Licao",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeLicao : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString},
       data : {type : graphql.GraphQLString},
       avaliacao : {type : graphql.GraphQLInt},
       quantidadeVotos : {type : graphql.GraphQLInt},
       idAutor : {type : graphql.GraphQLString},
       idIdioma : {type : graphql.GraphQLString},
       idNivel : {type : graphql.GraphQLString},
       idSituacao : {type : graphql.GraphQLString}
     }
   });

   licao.typeInput = new graphql.GraphQLInputObjectType({
     name : "LicaoInput",
     fields : {
       nomeLicao : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString},
       data : {type : graphql.GraphQLString},
       avaliacao : {type : graphql.GraphQLInt},
       quantidadeVotos : {type : graphql.GraphQLInt},
       idAutor : {type : graphql.GraphQLString},
       idIdioma : {type : graphql.GraphQLString},
       idNivel : {type : graphql.GraphQLString},
       idSituacao : {type : graphql.GraphQLString}
     }
   })


   return licao;
}
