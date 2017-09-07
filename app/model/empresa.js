module.exports = function (app) {
   var graphql = app.get("graphql");
   var empresa = {};

   empresa.type = new graphql.GraphQLObjectType({
     name : "Empresa",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeEmpresa : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       email : {type : graphql.GraphQLString},
       cidade : {type : graphql.GraphQLString},
       estado : {type : graphql.GraphQLString},
       pais : {type : graphql.GraphQLString},
       latitude : {type : graphql.GraphQLString},
       longitude : {type : graphql.GraphQLString}
     }
   });

   empresa.typeInput = new graphql.GraphQLInputObjectType({
     name : "EmpresaInput",
     fields : {
       nomeEmpresa : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       email : {type : graphql.GraphQLString},
       cidade : {type : graphql.GraphQLString},
       estado : {type : graphql.GraphQLString},
       pais : {type : graphql.GraphQLString},
       latitude : {type : graphql.GraphQLString},
       longitude : {type : graphql.GraphQLString}
     }
   })

   return empresa;
}
