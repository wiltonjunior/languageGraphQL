module.exports = function (app) {
   var graphql = app.get("graphql");
   var regiao = {};

   regiao.type = new graphql.GraphQLObjectType({
     name : "Regiao",
     fields : {
       _key : {type : graphql.GraphQLString},
       tipoRegiao : {type : graphql.GraphQLString},
       localizacao : {type : graphql.GraphQLString}
     }
   });

   regiao.typeInput = new graphql.GraphQLInputObjectType({
     name : "RegiaoInput",
     fields : {
       tipoRegiao : {type : graphql.GraphQLString},
       localizacao : {type : graphql.GraphQLString}
     }
   })

   return regiao;
}
