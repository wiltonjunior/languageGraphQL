module.exports = function (app) {
   var graphql = app.get("graphql");
   var administrador = {};

   administrador.type = new graphql.GraphQLObjectType({
     name : "Administrador",
     fields : {
       _key : {type : graphql.GraphQLString},
       nomeAdministrador : {type : graphql.GraphQLString},
       emailAdministrador : {type : graphql.GraphQLString},
       senhaAdministrador : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       sexo : {type : graphql.GraphQLString},
       caminhoImagem : {type : graphql.GraphQLString},
       status : {type : graphql.GraphQLInt}
     }
   });

   administrador.typeInput = new graphql.GraphQLInputObjectType({
     name : "AdministradorInput",
     fields : {
       nomeAdministrador : {type : graphql.GraphQLString},
       emailAdministrador : {type : graphql.GraphQLString},
       senhaAdministrador : {type : graphql.GraphQLString},
       telefone : {type : graphql.GraphQLString},
       sexo : {type : graphql.GraphQLString},
       caminhoImagem : {type : graphql.GraphQLString},
       status : {type : graphql.GraphQLInt}
     }
   });

   return administrador;
}
