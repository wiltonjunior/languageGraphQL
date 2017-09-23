module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.termos;

   var termos = {};

   termos.listar = {
     type : new graphql.GraphQLList(model),
     resolve : function (_,args) {
        var res = listar();
        return res;
     }
   };

   termos.listarTermo = {
     type : model,
     args : {
       _key : {
         type : graphql.GraphQLString
       }
     },
     resolve : function (_,args) {
       var res = buscar(id);
       return res;
     }
   };

   async function listar() {
      var resultados = await database.query("FOR termos IN termos RETURN termos");
      return resultados._result;
   };

   async function buscar(id) {
      var resultados = await database.query("FOR termos IN termos FILTER termos._key == @id RETURN termos",{'id' : id});
      return resultados._result[0];
   }

   return termos;
}
