module.exports = function (app) {
   var graphql = app.get("graphql");
   var database = app.get("database");
   var model = app.model.type.administrador;

   var administrador = {};

   administrador.listar = {
     type : new graphql.GraphQLList(model),
     resolve : function (_,args) {
       var res = listar();
       return res;
     }
   };

   administrador.listarAdministrador = {
     type : model,
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
      var resultados = await database.query("FOR administrador IN administrador RETURN administrador");
      return resultados._result;
   };

   async function buscar(id) {
      var resultados = await database.query("FOR administrador IN administrador FILTER administrador._key == @id RETURN administrador",{'id' : id});
      return resultados._result[0];
   }

   return administrador;
}
