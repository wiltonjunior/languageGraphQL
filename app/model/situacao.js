module.exports = function (app) {
   var graphql = app.get("graphql");

   var situacao = {};

   situacao.type = new graphql.GraphQLObjectType({
     name : "Situacao",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeSituacao : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString}
     }
   });

   situacao.typeInput = new graphql.GraphQLInputObjectType({
     name : "SituacaoInput",
     fields : {
       nomeSituacao : {type : graphql.GraphQLString},
       descricao : {type : graphql.GraphQLString}
     }
   })


   return situacao;
}
