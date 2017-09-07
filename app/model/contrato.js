module.exports = function (app) {
   var graphql = app.get("graphql");
   var contrato = {};


   contrato.type = new graphql.GraphQLObjectType({
     name : "Contrato",
     fields : {
       _key : {type : graphql.GraphQLString},
       dataInicio : {type : graphql.GraphQLString},
       dataTermino : {type : graphql.GraphQLString},
       palavraChave : {type : graphql.GraphQLString},
       idEmpresa : {type : graphql.GraphQLString},
       idRegiao : {type : graphql.GraphQLString},
       idTermo : {type : new graphql.GraphQLList(graphql.GraphQLString)}
     }
   });


   contrato.typeInput = new graphql.GraphQLInputObjectType({
     name : "ContratoInput",
     fields : {
       dataInicio : {type : graphql.GraphQLString},
       dataTermino : {type : graphql.GraphQLString},
       palavraChave : {type : graphql.GraphQLString},
       idEmpresa : {type : graphql.GraphQLString},
       idRegiao : {type : graphql.GraphQLString},
       idTermo : {type : new graphql.GraphQLList(graphql.GraphQLString)}
     }
   })


  return contrato;
}
