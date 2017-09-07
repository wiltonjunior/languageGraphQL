module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.dialogo;

   var dialogo = {};

   dialogo.listar = {
     type : new graphql.GraphQLList(model.type),
     resolve : function (_,args) {
        var res = listar();
        return res;
     }
   };

   dialogo.listarDialogo = {
     type : model.type,
     args : {
       _key : {
         type : graphql.GraphQLString
       }
     },
     resolve : function (_,args) {
        var res = buscar(args._key);
        return res;
     }
   };


   async function listar() {
      var resultados = await database.query("FOR dialogo IN dialogo RETURN dialogo");
      return resultados._result[0];
   };

   async function buscar(id) {
      var resultados = await database.query("FOR dialogo IN dialogo FILTER dialogo._key == @id RETURN dialogo",{'id' : id});
      return resultados._result[0];
   }

   return dialogo;
}
