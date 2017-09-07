module.exports = function (app) {
   var graphql = app.get("graphql");
   var termos = {};

   termos.type = new graphql.GraphQLObjectType({
     name : "Termos",
     fields : {
       _key : {type : graphql.GraphQLString},
       termo : {type : graphql.GraphQLString},
       termoTraducao : {type : graphql.GraphQLString}
     }
   })

   termos.typeInput = new graphql.GraphQLInputObjectType({
     name : "TermosInput",
     fields : {
       termo : {type : graphql.GraphQLString},
       termoTraducao : {type : graphql.GraphQLString}
     }
   })

   return termos;
}
