module.exports = function (app) {
   var graphql = app.get("graphql");

   var dialogo = {};

   dialogo.type = new graphql.GraphQLObjectType({
     name : "Dialogo",
     fields : {
       _key : {type : graphql.GraphQLString},
       texto : {type : graphql.GraphQLString},
       idLicao : {type : graphql.GraphQLString}
     }
   }),


   dialogo.typeInput = new graphql.GraphQLInputObjectType({
     name : "DialogoInput",
     fields : {
       texto : {type : graphql.GraphQLString},
       idLicao : {type : graphql.GraphQLString}
     }
   })


   return dialogo;
}
